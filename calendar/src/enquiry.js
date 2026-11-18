// Booking enquiry: pure validation and email bodies (no Worker APIs, so `node --test` covers them).
import { addDays, isDate } from "./ical.js";

export const MAX_GUESTS = 20;
export const MAX_NIGHTS = 90;
export const MAX_DAYS_AHEAD = 580;
const CTRL = /[\u0000-\u0008\u000b-\u001f\u007f]/; // control chars except \t and \n
const EMAIL_RE = /^[^\s@<>"(),;:]{1,64}@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;
const PHONE_RE = /^\+[1-9][0-9 ()-]{6,22}$/;

export const escapeHtml = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const str = (v) => (typeof v === "string" ? v.trim() : "");
const int = (v) => (typeof v === "number" ? v : typeof v === "string" && /^\d{1,3}$/.test(v.trim()) ? Number(v) : NaN);

/**
 * Check an enquiry body against the rules. `today` is "YYYY-MM-DD"; `rooms` the known room ids.
 * Returns { value } or { errors: { field: message } }. Overlap with booked nights is checked by the caller.
 */
export function validateEnquiry(body, today, rooms) {
  const b = body && typeof body === "object" ? body : {};
  const e = {};
  const v = {
    checkin: str(b.checkin),
    checkout: str(b.checkout),
    room: str(b.room),
    adults: int(b.adults),
    children: b.children === undefined || b.children === "" ? 0 : int(b.children),
    name: str(b.name),
    phone: str(b.phone),
    email: str(b.email).toLowerCase(),
    message: str(b.message),
  };

  if (!isDate(v.checkin)) e.checkin = "Choose a check-in date.";
  else if (v.checkin < today) e.checkin = "Check-in can't be in the past.";
  else if (v.checkin > addDays(today, MAX_DAYS_AHEAD)) e.checkin = "We only take enquiries up to 18 months ahead.";
  if (!isDate(v.checkout)) e.checkout = "Choose a check-out date.";
  else if (!e.checkin && v.checkout <= v.checkin) e.checkout = "Check-out must be after check-in.";
  else if (!e.checkin && v.checkout > addDays(v.checkin, MAX_NIGHTS)) e.checkout = `For stays over ${MAX_NIGHTS} nights, message us directly.`;

  if (v.room && !rooms.includes(v.room)) e.room = "Choose a room from the list.";
  if (!Number.isInteger(v.adults) || v.adults < 1 || v.adults > MAX_GUESTS) e.adults = `Adults: 1 to ${MAX_GUESTS}.`;
  if (!Number.isInteger(v.children) || v.children < 0 || v.children > MAX_GUESTS - 1) e.children = "Children: 0 or more.";
  else if (!e.adults && v.adults + v.children > MAX_GUESTS) e.children = `At most ${MAX_GUESTS} guests in all.`;

  if (v.name.length < 2 || v.name.length > 100 || CTRL.test(v.name) || /[\n\t<>]/.test(v.name)) e.name = "Tell us your full name.";
  const digits = v.phone.replace(/\D/g, "").length;
  if (!PHONE_RE.test(v.phone) || digits < 8 || digits > 15) e.phone = "Phone with country code, e.g. +91 98765 43210.";
  if (v.email.length > 254 || !EMAIL_RE.test(v.email)) e.email = "Check the email address.";
  if (v.message.length > 1000 || CTRL.test(v.message)) e.message = "Keep the message under 1,000 characters.";

  return Object.keys(e).length ? { errors: e } : { value: v };
}

const fmt = (d) => new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const nights = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);
const guests = (v) => `${v.adults} adult${v.adults === 1 ? "" : "s"}${v.children ? `, ${v.children} child${v.children === 1 ? "" : "ren"}` : ""}`;

/** The two emails, as Resend payload fields. Every user value goes through escapeHtml. */
export function enquiryEmails(v, id, replyHours) {
  const n = nights(v.checkin, v.checkout);
  const stay = `${fmt(v.checkin)} to ${fmt(v.checkout)} (${n} night${n === 1 ? "" : "s"})`;
  const rows = [
    ["Dates", stay],
    ["Room", v.room || "Any"],
    ["Guests", guests(v)],
    ["Name", v.name],
    ["Phone", v.phone],
    ["Email", v.email],
    ["Message", v.message || "(none)"],
  ];
  const table = (rows) => `<table cellpadding="6" style="border-collapse:collapse">${rows.map(([k, val]) => `<tr><th align="left" valign="top">${k}</th><td style="white-space:pre-wrap">${escapeHtml(val)}</td></tr>`).join("")}</table>`;
  const text = (rows) => rows.map(([k, val]) => `${k}: ${val}`).join("\n");
  // the guest's message stays out of the guest copy, so the form can't send free text to any address
  const guestRows = rows.filter(([k]) => k !== "Message");
  const subjectName = v.name.replace(/[\r\n]/g, " ");
  return {
    owner: {
      subject: `Booking enquiry #${id}: ${subjectName}, ${v.checkin} to ${v.checkout}`,
      html: `<p>New booking enquiry #${id} from zhilly.life. Reply to this email to answer the guest. Confirm or decline it on the calendar admin page.</p>${table(rows)}`,
      text: `New booking enquiry #${id}\n\n${text(rows)}`,
    },
    guest: {
      subject: "We got your Zhilly enquiry",
      html: `<p>Hi ${escapeHtml(v.name)},</p><p>Thanks for asking about a stay at Zhilly. This is not a booking yet: we check the dates by hand and will confirm within ${replyHours} hours by email or phone.</p>${table(guestRows)}<p>Just reply to this email if anything changes.</p><p>Zhilly, Kalimpong</p>`,
      text: `Hi ${v.name},\n\nThanks for asking about a stay at Zhilly. This is not a booking yet: we check the dates by hand and will confirm within ${replyHours} hours by email or phone.\n\n${text(guestRows)}\n\nJust reply to this email if anything changes.\nZhilly, Kalimpong`,
    },
  };
}
