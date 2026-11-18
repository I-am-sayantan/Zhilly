"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { fromIso, hitsBooked, iso, key, nightsBetween, usePlan, EmailDatesLink, WhatsAppDatesLink } from "./DatePlanner";

/*
 * The booking enquiry form, beside the date planner in the closing band. It posts to the calendar
 * Worker's /enquiry (Turnstile-checked, emailed to us and acknowledged to the guest). It is an
 * enquiry, not a booking: we confirm by hand. WhatsApp and email links with the dates stay as small secondary links.
 */

const MAX_GUESTS = 20;
type Field = "checkin" | "checkout" | "room" | "adults" | "children" | "name" | "phone" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
const ORDER: Field[] = ["checkin", "checkout", "room", "adults", "children", "name", "phone", "email", "message"];

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, o: { sitekey: string; callback: (t: string) => void; "expired-callback": () => void; "error-callback": () => void }) => string;
      reset: (id?: string) => void;
    };
  }
}

/** Load Cloudflare Turnstile once and render the widget into `el`. */
function useTurnstile(el: React.RefObject<HTMLDivElement | null>, onToken: (t: string) => void) {
  const id = useRef<string | undefined>(undefined);
  useEffect(() => {
    const render = () => {
      if (!el.current || !window.turnstile || id.current !== undefined) return;
      id.current = window.turnstile.render(el.current, {
        sitekey: site.turnstileSiteKey,
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    };
    if (window.turnstile) return render();
    const src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    const s = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`) ?? document.head.appendChild(Object.assign(document.createElement("script"), { src, async: true }));
    s.addEventListener("load", render);
    return () => s.removeEventListener("load", render);
  }, [el, onToken]);
  return () => window.turnstile?.reset(id.current);
}

export default function BookingForm() {
  const { arrive, leave, setArrive, setLeave, booked, rooms } = usePlan();
  const [errors, setErrors] = useState<Errors>({});
  const [general, setGeneral] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ name: string; hours: number } | null>(null);
  const [token, setToken] = useState("");
  const [today, setToday] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const tsBox = useRef<HTMLDivElement>(null);
  const resetTurnstile = useTurnstile(tsBox, setToken);

  useEffect(() => {
    const t = new Date(); // the guest's own calendar day, read after hydration (as DatePlanner does)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(iso({ y: t.getFullYear(), m: t.getMonth(), d: t.getDate() }));
  }, []);
  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  function focusFirst(e: Errors) {
    const first = ORDER.find((f) => e[f]);
    if (first) form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  function check(fd: FormData): Errors {
    const e: Errors = {};
    const ci = fromIso(String(fd.get("checkin") ?? ""));
    const co = fromIso(String(fd.get("checkout") ?? ""));
    if (!ci) e.checkin = "Choose a check-in date.";
    else if (today && iso(ci) < today) e.checkin = "Check-in can't be in the past.";
    if (!co) e.checkout = "Choose a check-out date.";
    else if (ci && key(co) <= key(ci)) e.checkout = "Check-out must be after check-in.";
    else if (ci && nightsBetween(ci, co) > 90) e.checkout = "For stays over 90 nights, message us directly.";
    if (ci && co && !e.checkin && !e.checkout && hitsBooked(booked, ci, co)) e.checkin = "Some of those nights are already booked. Please pick other dates.";
    const adults = Number(fd.get("adults"));
    const children = Number(fd.get("children") || 0);
    if (!Number.isInteger(adults) || adults < 1 || adults > MAX_GUESTS) e.adults = `Adults: 1 to ${MAX_GUESTS}.`;
    else if (!Number.isInteger(children) || children < 0 || adults + children > MAX_GUESTS) e.children = `At most ${MAX_GUESTS} guests in all.`;
    const name = String(fd.get("name") ?? "").trim();
    if (name.length < 2) e.name = "Tell us your full name.";
    const phone = String(fd.get("phone") ?? "").trim();
    const digits = phone.replace(/\D/g, "").length;
    if (!/^\+[1-9][0-9 ()-]{6,22}$/.test(phone) || digits < 8 || digits > 15) e.phone = "Phone with country code, starting with +.";
    if (!/^[^\s@<>"(),;:]{1,64}@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i.test(String(fd.get("email") ?? "").trim())) e.email = "Check the email address.";
    return e;
  }

  async function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setGeneral(null);
    const fd = new FormData(ev.currentTarget);
    const e = check(fd);
    setErrors(e);
    if (Object.keys(e).length) return focusFirst(e);
    if (!token) {
      setGeneral("Please wait a moment for the spam check below to finish, then send again.");
      return;
    }
    setSending(true);
    try {
      const body = Object.fromEntries([...fd.entries()].map(([k, v]) => [k, String(v)]));
      const res = await fetch(`${site.calendarApi}/enquiry`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...body, turnstile: token }),
      });
      const out = await res.json().catch(() => ({}));
      if (res.ok && out.ok) {
        setDone({ name: String(body.name).trim().split(/\s+/)[0], hours: out.replyHours ?? 24 });
        return;
      }
      if (out.errors) {
        setErrors(out.errors);
        focusFirst(out.errors);
      } else setGeneral(out.error ?? "Something went wrong. Please try again, or message us on WhatsApp.");
    } catch {
      setGeneral("We couldn't send that just now. Please try again, or message us on WhatsApp.");
    } finally {
      setSending(false);
      setToken("");
      resetTurnstile();
    }
  }

  if (done) {
    return (
      <div className="enq done" role="status" tabIndex={-1} ref={doneRef}>
        <h3>Thanks, {done.name}. We've got your dates.</h3>
        <p>We'll confirm within {done.hours} hours by email or WhatsApp.</p>
        <p>This isn't a booking yet: nothing is held until we confirm.</p>
      </div>
    );
  }

  const err = (f: Field) => (errors[f] ? { "aria-invalid": true as const, "aria-describedby": `enq-${f}-err` } : {});
  const msg = (f: Field) => errors[f] && <p className="err" id={`enq-${f}-err`}>{errors[f]}</p>;

  return (
    <form className="enq" ref={form} onSubmit={submit} noValidate aria-labelledby="enq-h">
      <h3 id="enq-h">Booking enquiry</h3>
      <div className="two">
        <div>
          <label htmlFor="enq-checkin">Check-in</label>
          <input id="enq-checkin" name="checkin" type="date" required min={today || undefined} value={arrive ? iso(arrive) : ""} onChange={(e) => setArrive(fromIso(e.target.value))} {...err("checkin")} />
          {msg("checkin")}
        </div>
        <div>
          <label htmlFor="enq-checkout">Check-out</label>
          <input id="enq-checkout" name="checkout" type="date" required min={arrive ? iso(arrive) : today || undefined} value={leave ? iso(leave) : ""} onChange={(e) => setLeave(fromIso(e.target.value))} {...err("checkout")} />
          {msg("checkout")}
        </div>
      </div>
      {rooms.length > 1 && (
        <div>
          <label htmlFor="enq-room">Room</label>
          <select id="enq-room" name="room" defaultValue="" {...err("room")}>
            <option value="">Any room</option>
            {rooms.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {msg("room")}
        </div>
      )}
      <div className="two">
        <div>
          <label htmlFor="enq-adults">Adults</label>
          <input id="enq-adults" name="adults" type="number" inputMode="numeric" min={1} max={MAX_GUESTS} defaultValue={2} required {...err("adults")} />
          {msg("adults")}
        </div>
        <div>
          <label htmlFor="enq-children">Children</label>
          <input id="enq-children" name="children" type="number" inputMode="numeric" min={0} max={MAX_GUESTS - 1} defaultValue={0} {...err("children")} />
          {msg("children")}
        </div>
      </div>
      <div>
        <label htmlFor="enq-name">Full name</label>
        <input id="enq-name" name="name" autoComplete="name" required maxLength={100} {...err("name")} />
        {msg("name")}
      </div>
      <div className="two">
        <div>
          <label htmlFor="enq-phone">Phone, with country code</label>
          <input id="enq-phone" name="phone" type="tel" autoComplete="tel" required maxLength={24} placeholder="+91 …" {...err("phone")} />
          {msg("phone")}
        </div>
        <div>
          <label htmlFor="enq-email">Email</label>
          <input id="enq-email" name="email" type="email" autoComplete="email" required maxLength={254} {...err("email")} />
          {msg("email")}
        </div>
      </div>
      <div>
        <label htmlFor="enq-message">Anything else? <span className="opt">(optional)</span></label>
        <textarea id="enq-message" name="message" rows={3} maxLength={1000} {...err("message")} />
        {msg("message")}
      </div>
      {/* honeypot: hidden from people and screen readers, bots fill it in */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="enq-website">Website</label>
        <input id="enq-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="ts" ref={tsBox} />
      {general && <p className="err general" role="alert">{general}</p>}
      <div className="go">
        <button className="btn" type="submit" disabled={sending}>{sending ? "Sending…" : "Send booking enquiry"}</button>
        <WhatsAppDatesLink className="wa-alt">Or send these dates on WhatsApp</WhatsAppDatesLink>
        <EmailDatesLink className="wa-alt">or by email</EmailDatesLink>
      </div>
      <p className="fine">We reply within 24 hours. Nothing is charged or held until we confirm.</p>
    </form>
  );
}

