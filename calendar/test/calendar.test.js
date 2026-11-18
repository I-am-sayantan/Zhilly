// Self-checks for the pure parts: `npm test` (node --test) inside calendar/.
import test from "node:test";
import assert from "node:assert/strict";
import { addDays, isDate, mergeRanges, nightsIn, parseIcs, toIcs } from "../src/ical.js";
import { enquiryEmails, escapeHtml, validateEnquiry } from "../src/enquiry.js";

const SAMPLE = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Booking.com//EN",
  "BEGIN:VEVENT",
  "DTSTART;VALUE=DATE:20261201",
  "DTEND;VALUE=DATE:20261204",
  "SUMMARY:CLOSED - Not available",
  "END:VEVENT",
  "BEGIN:VEVENT",
  "DTSTART:20261210T140000Z", // DATE-TIME, checks in on the 10th
  "DTEND;TZID=Asia/Kolkata:20261212T110000",
  "DESCRIPTION:a long folded",
  "  description line",
  "END:VEVENT",
  "BEGIN:VEVENT",
  "DTSTART;VA",
  " LUE=DATE:20261220", // folded inside the property name
  "END:VEVENT",
  "BEGIN:VEVENT",
  "DTSTART;VALUE=DATE:20261225",
  "DTEND;VALUE=DATE:20261226",
  "STATUS:CANCELLED",
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

test("parseIcs: DATE, DATE-TIME, folded lines, missing DTEND, cancelled", () => {
  assert.deepEqual(parseIcs(SAMPLE), [
    { start: "2026-12-01", end: "2026-12-04" },
    { start: "2026-12-10", end: "2026-12-12" },
    { start: "2026-12-20", end: "2026-12-21" },
  ]);
  assert.deepEqual(parseIcs("BEGIN:VCALENDAR\nEND:VCALENDAR\n"), []);
  assert.throws(() => parseIcs("<html>login</html>"));
});

test("mergeRanges merges overlapping and touching ranges", () => {
  assert.deepEqual(
    mergeRanges([
      { start: "2026-01-05", end: "2026-01-07" },
      { start: "2026-01-01", end: "2026-01-03" },
      { start: "2026-01-03", end: "2026-01-04" }, // touches
      { start: "2026-01-06", end: "2026-01-10" }, // overlaps
      { start: "2026-02-01", end: "2026-02-01" }, // empty, dropped
    ]),
    [
      { start: "2026-01-01", end: "2026-01-04" },
      { start: "2026-01-05", end: "2026-01-10" },
    ],
  );
});

test("nightsIn clips to the window; check-out day stays free", () => {
  const n = nightsIn([{ start: "2026-12-30", end: "2027-01-02" }], "2026-12-31", "2027-02-01");
  assert.deepEqual([...n], ["2026-12-31", "2027-01-01"]);
});

test("isDate / addDays", () => {
  assert.ok(isDate("2028-02-29"));
  assert.ok(!isDate("2027-02-29"));
  assert.ok(!isDate("2027-2-1"));
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
});

test("toIcs round-trips through parseIcs and is valid-looking iCalendar", () => {
  const blocks = [
    { start: "2026-12-01", end: "2026-12-04" },
    { start: "2026-12-03", end: "2026-12-06" },
  ];
  const ics = toIcs("room-1", blocks, new Date("2026-11-19T10:00:00Z"));
  assert.ok(ics.startsWith("BEGIN:VCALENDAR\r\nVERSION:2.0\r\n"));
  assert.ok(ics.endsWith("END:VCALENDAR\r\n"));
  assert.ok(!/[^\r]\n/.test(ics), "CRLF line endings only");
  for (const line of ics.split("\r\n")) assert.ok(line.length <= 75, "no line needs folding");
  assert.match(ics, /UID:20261201-20261206-room-1@zhilly\.life/);
  assert.deepEqual(parseIcs(ics), [{ start: "2026-12-01", end: "2026-12-06" }]);
});

const TODAY = "2026-11-19";
const good = { checkin: "2026-12-01", checkout: "2026-12-03", adults: 2, children: "1", name: "Asha Rai", phone: "+91 98765 43210", email: "asha@example.com", message: "Late arrival" };

test("validateEnquiry accepts a good enquiry", () => {
  const r = validateEnquiry(good, TODAY, ["room-1"]);
  assert.equal(r.errors, undefined);
  assert.equal(r.value.children, 1);
});

test("validateEnquiry rejects bad input field by field", () => {
  const bad = (patch) => validateEnquiry({ ...good, ...patch }, TODAY, ["room-1"]).errors || {};
  assert.ok(bad({ checkin: "2026-11-18" }).checkin, "past");
  assert.ok(bad({ checkin: "2026-02-30" }).checkin, "invalid date");
  assert.ok(bad({ checkout: "2026-12-01" }).checkout, "same day");
  assert.ok(bad({ checkout: "2027-06-01" }).checkout, "too long");
  assert.ok(bad({ checkin: "2029-01-01", checkout: "2029-01-02" }).checkin, "too far ahead");
  assert.ok(bad({ room: "room-9" }).room);
  assert.ok(bad({ adults: 0 }).adults);
  assert.ok(bad({ adults: 21 }).adults);
  assert.ok(bad({ adults: 15, children: 6 }).children, "over 20 in all");
  assert.ok(bad({ adults: "2; DROP" }).adults);
  assert.ok(bad({ name: "A" }).name);
  assert.ok(bad({ name: "x".repeat(101) }).name);
  assert.ok(bad({ name: "Bad\nBcc: you" }).name, "no header-ish newlines");
  assert.ok(bad({ phone: "98765 43210" }).phone, "needs country code");
  assert.ok(bad({ phone: "+91 98765 43210 1234567" }).phone);
  assert.ok(bad({ email: "not-an-email" }).email);
  assert.ok(bad({ email: "a@b" }).email);
  assert.ok(bad({ message: "x".repeat(1001) }).message);
  assert.deepEqual(Object.keys(validateEnquiry(null, TODAY, [])).sort(), ["errors"]);
});

test("escapeHtml and the emails never carry raw user markup", () => {
  assert.equal(escapeHtml(`<script>"x"&'y'</script>`), "&lt;script&gt;&quot;x&quot;&amp;&#39;y&#39;&lt;/script&gt;");
  const v = validateEnquiry({ ...good, message: `<img src=x onerror=alert(1)> & "hi"` }, TODAY, ["room-1"]).value;
  const mails = enquiryEmails(v, 7, 24);
  for (const m of [mails.owner, mails.guest]) {
    assert.ok(!m.html.includes("<img"), "message is escaped");
    assert.ok(m.html.includes("&lt;img src=x onerror=alert(1)&gt; &amp; &quot;hi&quot;"));
    assert.ok(!/₹|price|rate/i.test(m.html), "no prices");
  }
  assert.match(mails.owner.subject, /#7: Asha Rai, 2026-12-01 to 2026-12-03/);
  assert.match(mails.guest.html, /within 24 hours/);
});
