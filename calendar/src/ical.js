// Pure date/iCal helpers, no Worker APIs, so `node --test` can run them.
// A block is { start, end } as "YYYY-MM-DD", end exclusive: the nights start..end-1 are taken
// (the same convention as an all-day iCal DTEND, and as an OTA checkout day).

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isDate(s) {
  if (typeof s !== "string" || !DATE_RE.test(s)) return false;
  const d = new Date(s + "T00:00:00Z");
  return !isNaN(d) && d.toISOString().slice(0, 10) === s;
}

export function addDays(s, n) {
  const d = new Date(s + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

// "20261201" or "20261201T140000" (any params before the colon) -> "2026-12-01".
// UTC times ("...Z") are moved to India time first, so IST midnight written as 18:30Z lands on the right day.
// shortcut: a TZID other than India keeps its written date; OTAs send all-day DATE values in practice.
function icalDate(value) {
  const v = value.trim();
  const z = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(v);
  if (z) {
    const t = Date.UTC(+z[1], z[2] - 1, +z[3], +z[4], +z[5], +z[6]);
    return isNaN(t) ? null : new Date(t + 19_800_000).toISOString().slice(0, 10);
  }
  const m = /^(\d{4})(\d{2})(\d{2})/.exec(v);
  if (!m) return null;
  const s = `${m[1]}-${m[2]}-${m[3]}`;
  return isDate(s) ? s : null;
}

/** Parse VEVENT date ranges out of an iCalendar text. Returns [{ start, end }], end exclusive. */
export function parseIcs(text) {
  if (typeof text !== "string" || !text.includes("BEGIN:VCALENDAR")) throw new Error("not an iCalendar file");
  // a download cut off part-way must fail, not read as "no bookings" (which would free every night)
  if (!text.includes("END:VCALENDAR")) throw new Error("iCalendar file is cut off (no END:VCALENDAR)");
  const lines = text.replace(/\r\n|\r/g, "\n").replace(/\n[ \t]/g, "").split("\n"); // unfold RFC 5545 folded lines
  const out = [];
  let ev = null;
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line === "BEGIN:VEVENT") ev = {};
    else if (line === "END:VEVENT") {
      if (ev && ev.start && ev.status !== "CANCELLED") {
        const end = ev.end && ev.end > ev.start ? ev.end : addDays(ev.start, 1); // no/same-day DTEND = one night
        out.push({ start: ev.start, end });
      }
      ev = null;
    } else if (ev) {
      const i = line.indexOf(":");
      if (i < 0) continue;
      const name = line.slice(0, i).split(";")[0].toUpperCase();
      const value = line.slice(i + 1);
      if (name === "DTSTART") ev.start = icalDate(value);
      else if (name === "DTEND") ev.end = icalDate(value);
      else if (name === "STATUS") ev.status = value.trim().toUpperCase();
    }
  }
  return out;
}

/** Sort and merge overlapping or touching ranges. */
export function mergeRanges(ranges) {
  const sorted = ranges.filter((r) => r.end > r.start).map((r) => ({ start: r.start, end: r.end })).sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));
  const out = [];
  for (const r of sorted) {
    const last = out[out.length - 1];
    if (last && r.start <= last.end) {
      if (r.end > last.end) last.end = r.end;
    } else out.push(r);
  }
  return out;
}

/** Every blocked night of the ranges that falls in [from, to). */
export function nightsIn(ranges, from, to) {
  const set = new Set();
  for (const r of mergeRanges(ranges)) {
    for (let d = r.start < from ? from : r.start; d < r.end && d < to; d = addDays(d, 1)) set.add(d);
  }
  return set;
}

const compact = (s) => s.replaceAll("-", "");

/** A minimal, valid iCalendar feed: one all-day "Not available" event per merged range. */
export function toIcs(room, ranges, now = new Date()) {
  const stamp = now.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Zhilly//Availability//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
  for (const r of mergeRanges(ranges)) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${compact(r.start)}-${compact(r.end)}-${room}@zhilly.life`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${compact(r.start)}`,
      `DTEND;VALUE=DATE:${compact(r.end)}`,
      "SUMMARY:Not available",
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}
