// End-to-end checks: the real Worker handlers on an in-memory SQLite stand-in for D1, with fake OTA feeds, Turnstile and Resend.
// Needs Node 22.5+ (node:sqlite). Runs with `npm test`.
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const REPO = new URL("../", import.meta.url).href;
const worker = (await import(REPO + "src/index.js")).default;
const { parseIcs } = await import(REPO + "src/ical.js");

const sqlite = new DatabaseSync(":memory:");
sqlite.exec(readFileSync(new URL("schema.sql", REPO), "utf8"));
sqlite.exec("INSERT INTO rooms (id) VALUES ('room-2')");
const stmt = (sql, args = []) => ({
  sql, args,
  bind: (...a) => stmt(sql, a),
  first: async () => sqlite.prepare(sql).get(...args) ?? null,
  all: async () => ({ results: sqlite.prepare(sql).all(...args) }),
  run: async () => sqlite.prepare(sql).run(...args),
});
const DB = {
  prepare: (sql) => stmt(sql),
  batch: async (list) => {
    sqlite.exec("BEGIN");
    try { for (const s of list) sqlite.prepare(s.sql).run(...s.args); sqlite.exec("COMMIT"); } catch (e) { sqlite.exec("ROLLBACK"); throw e; }
  },
};
const env = { DB, ALLOWED_ORIGINS: "https://zhilly.life,https://www.zhilly.life", FROM_EMAIL: "bookings@zhilly.life", ADMIN_PASSWORD: "s3cret-pass", TURNSTILE_SECRET: "ts-secret", OWNER_EMAIL: "owner@example.com", RESEND_API_KEY: "re_x" };

// fake outside world
const feeds = {}; const sent = []; const turnstileCalls = [];
globalThis.fetch = async (url, init) => {
  url = String(url);
  if (url.includes("turnstile")) { const t = init.body.get("response"); turnstileCalls.push({ t, secret: init.body.get("secret") }); return Response.json({ success: t === "good-token" }); }
  if (url.includes("resend")) { sent.push(JSON.parse(init.body)); return Response.json({ id: "x" }); }
  if (feeds[url] !== undefined) return typeof feeds[url] === "number" ? new Response("no", { status: feeds[url] }) : new Response(feeds[url]);
  return new Response("nope", { status: 404 });
};
const waits = [];
const ctx = { waitUntil: (p) => waits.push(p) };
const call = async (path, init = {}) => { const r = await worker.fetch(new Request("https://cal.zhilly.life" + path, init), env, ctx); await Promise.all(waits.splice(0)); return r; };
const basic = "Basic " + btoa("me:s3cret-pass");
const adminPost = (fields, headers = {}) => call("/admin", { method: "POST", headers: { authorization: basic, origin: "https://cal.zhilly.life", "content-type": "application/x-www-form-urlencoded", ...headers }, body: new URLSearchParams(fields).toString() });
const today = new Date().toISOString().slice(0, 10);
const plus = (n) => { const d = new Date(today + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const c = (s) => s.replaceAll("-", "");
const ics = (events) => ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//OTA//EN", ...events.flatMap(([s, e, extra = []]) => ["BEGIN:VEVENT", `UID:${s}@ota`, `DTSTART;VALUE=DATE:${c(s)}`, `DTEND;VALUE=DATE:${c(e)}`, "SUMMARY:Reserved", ...extra, "END:VEVENT"]), "END:VCALENDAR"].join("\r\n") + "\r\n";
const avail = async (room) => (await call("/availability" + (room ? "?room=" + room : ""), { headers: { origin: "https://zhilly.life" } })).json();
const results = []; const t = async (name, fn) => { try { await fn(); results.push("PASS  " + name); } catch (e) { results.push("FAIL  " + name + "\n        " + String(e.message).split("\n").slice(0, 6).join("\n        ")); } };

// ---- admin auth
await t("admin: no auth 401, wrong password 401, right password 200", async () => {
  assert.equal((await call("/admin")).status, 401);
  assert.equal((await call("/admin", { headers: { authorization: "Basic " + btoa("me:wrong") } })).status, 401);
  assert.equal((await call("/admin", { headers: { authorization: "Basic !!!notbase64" } })).status, 401);
  assert.equal((await call("/admin", { headers: { authorization: basic } })).status, 200);
});
await t("admin: cross-site POST (CSRF) refused, missing Origin refused", async () => {
  assert.equal((await adminPost({ action: "sync" }, { origin: "https://evil.example" })).status, 403);
  assert.equal((await call("/admin", { method: "POST", headers: { authorization: basic, "content-type": "application/x-www-form-urlencoded" }, body: "action=sync" })).status, 403);
});
await t("admin: ADMIN_PASSWORD unset -> 503, never open", async () => {
  const r = await worker.fetch(new Request("https://cal.zhilly.life/admin"), { ...env, ADMIN_PASSWORD: "" }, ctx);
  assert.equal(r.status, 503);
});

// ---- import from two OTAs, overlapping
const A = "https://ota-a.example/a.ics", B = "https://ota-b.example/b.ics";
feeds[A] = ics([[plus(10), plus(13)], [plus(40), plus(42)]]); // nights 10,11,12 and 40,41
feeds[B] = ics([[plus(12), plus(15)], [plus(13), plus(14), ["STATUS:CANCELLED"]]]); // nights 12,13,14: overlaps A on night 12
await t("import: two OTA feeds added and synced by the cron handler", async () => {
  assert.equal((await adminPost({ action: "add-feed", room: "room-1", source: "booking", url: A })).status, 303);
  assert.equal((await adminPost({ action: "add-feed", room: "room-1", source: "airbnb", url: B })).status, 303);
  await worker.scheduled({}, env);
  assert.equal(sqlite.prepare("SELECT COUNT(*) n FROM blocks").get().n, 3);
});
await t("availability?room=room-1: blocked nights, overlap counted once, check-out day free", async () => {
  const a = await avail("room-1");
  assert.deepEqual(a.booked, [plus(10), plus(11), plus(12), plus(13), plus(14), plus(40), plus(41)]);
  assert.ok(!a.booked.includes(plus(15)), "check-out day free");
});
await t("availability (all rooms): empty while room-2 is free", async () => {
  const a = await avail();
  assert.deepEqual(a.rooms, ["room-1", "room-2"]); assert.deepEqual(a.booked, []);
});
let exportUrl, exported;
await t("export: token URL works, wrong token 404, merged feed, no guest detail", async () => {
  const tok = sqlite.prepare("SELECT token FROM rooms WHERE id='room-1'").get().token;
  exportUrl = `/ical/room-1/${tok}.ics`;
  assert.equal((await call(`/ical/room-1/${"0".repeat(32)}.ics`)).status, 404);
  assert.equal((await call(`/ical/room-2/${tok}.ics`)).status, 404);
  const r = await call(exportUrl);
  assert.equal(r.status, 200); assert.match(r.headers.get("content-type"), /^text\/calendar/);
  exported = await r.text();
  assert.deepEqual(parseIcs(exported), [{ start: plus(10), end: plus(15) }, { start: plus(40), end: plus(42) }]);
  assert.ok(!/Reserved|ota/i.test(exported), "no guest or OTA detail leaks");
});
await t("resync is idempotent (no duplicate rows); a cancelled OTA booking frees its nights", async () => {
  feeds[B] = ics([]);
  await adminPost({ action: "sync" }); await adminPost({ action: "sync" });
  assert.equal(sqlite.prepare("SELECT COUNT(*) n FROM blocks").get().n, 2);
  assert.deepEqual((await avail("room-1")).booked, [plus(10), plus(11), plus(12), plus(40), plus(41)]);
});
await t("failing feed (HTTP 500, HTML login page) keeps old blocks and records the error", async () => {
  feeds[A] = 500; await adminPost({ action: "sync" });
  assert.equal(sqlite.prepare("SELECT COUNT(*) n FROM blocks WHERE source='booking'").get().n, 2);
  feeds[A] = "<html>please log in</html>"; await adminPost({ action: "sync" });
  assert.equal(sqlite.prepare("SELECT COUNT(*) n FROM blocks WHERE source='booking'").get().n, 2);
  assert.match(sqlite.prepare("SELECT last_error e FROM feeds WHERE source='booking'").get().e, /not an iCalendar/);
  feeds[A] = ics([[plus(10), plus(13)], [plus(40), plus(42)]]); await adminPost({ action: "sync" });
});
await t("truncated feed (download cut off mid-file) must not wipe that OTA's blocks", async () => {
  feeds[A] = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nDTSTART;VALUE=DATE:2027";
  await adminPost({ action: "sync" });
  const n = sqlite.prepare("SELECT COUNT(*) n FROM blocks WHERE source='booking'").get().n;
  feeds[A] = ics([[plus(10), plus(13)], [plus(40), plus(42)]]); await adminPost({ action: "sync" });
  assert.equal(n, 2, `truncated feed left ${n} booking blocks (the 2 old ones should be kept)`);
});

// ---- enquiry
const good = { checkin: plus(20), checkout: plus(22), adults: "2", children: "0", name: "Asha Rai", phone: "+91 98765 43210", email: "asha@example.com", message: "hi", website: "", turnstile: "good-token" };
let ipn = 0;
const enq = (body, headers = {}) => call("/enquiry", { method: "POST", headers: { origin: "https://zhilly.life", "content-type": "application/json", "cf-connecting-ip": "10.0.0." + ++ipn, ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
await t("enquiry: CORS preflight ok for zhilly.life, not for others", async () => {
  const ok = await call("/enquiry", { method: "OPTIONS", headers: { origin: "https://zhilly.life" } });
  assert.equal(ok.headers.get("access-control-allow-origin"), "https://zhilly.life");
  const bad = await call("/enquiry", { method: "OPTIONS", headers: { origin: "https://evil.example" } });
  assert.equal(bad.headers.get("access-control-allow-origin"), null);
});
await t("enquiry: wrong origin 403, no origin 403, GET 405", async () => {
  assert.equal((await enq(good, { origin: "https://evil.example" })).status, 403);
  assert.equal((await call("/enquiry", { method: "POST", body: JSON.stringify(good) })).status, 403);
  assert.equal((await call("/enquiry", { headers: { origin: "https://zhilly.life" } })).status, 405);
});
await t("enquiry: Turnstile token missing or bad -> rejected, nothing saved; secret goes to Cloudflare only", async () => {
  assert.equal((await enq({ ...good, turnstile: undefined })).status, 400);
  assert.equal((await enq({ ...good, turnstile: "bad" })).status, 400);
  assert.equal(sqlite.prepare("SELECT COUNT(*) n FROM enquiries").get().n, 0);
  assert.equal(turnstileCalls.at(-1).secret, "ts-secret");
});
await t("enquiry: TURNSTILE_SECRET unset -> 503 (fails closed)", async () => {
  const r = await worker.fetch(new Request("https://cal.zhilly.life/enquiry", { method: "POST", headers: { origin: "https://zhilly.life" }, body: JSON.stringify(good) }), { ...env, TURNSTILE_SECRET: undefined }, ctx);
  assert.equal(r.status, 503);
  console.log("        503 text:", (await r.json()).error);
});
await t("enquiry: bad JSON 400, oversize 413, validation 422 per field", async () => {
  assert.equal((await enq("{nope")).status, 400);
  assert.equal((await enq(JSON.stringify({ ...good, message: "x".repeat(11000) }))).status, 413);
  const r = await enq({ ...good, checkin: plus(-1), phone: "12345", email: "x", adults: "0" });
  assert.equal(r.status, 422);
  assert.deepEqual(Object.keys((await r.json()).errors).sort(), ["adults", "checkin", "email", "phone"]);
});
await t("enquiry: honeypot filled -> fake ok, nothing saved, no email", async () => {
  sent.length = 0; // forget the feed-failure alerts sent above
  const r = await enq({ ...good, website: "http://spam" });
  assert.equal(r.status, 200);
  assert.equal(sqlite.prepare("SELECT COUNT(*) n FROM enquiries").get().n, 0); assert.equal(sent.length, 0);
});
await t("enquiry: the exact shape BookingForm posts is accepted, saved, 2 emails sent", async () => {
  const r = await enq({ ...good, "cf-turnstile-response": "good-token" }); // Turnstile's own hidden input rides along
  assert.equal(r.status, 200); assert.deepEqual(await r.json(), { ok: true, replyHours: 24 });
  const row = sqlite.prepare("SELECT * FROM enquiries").get();
  assert.equal(row.adults, 2); assert.equal(row.children, 0); assert.equal(row.room, null); assert.equal(row.status, "new");
  assert.equal(sent.length, 2); assert.deepEqual(sent[0].to, ["owner@example.com"]); assert.equal(sent[0].reply_to, "asha@example.com");
  assert.deepEqual(sent[1].to, ["asha@example.com"]); assert.equal(sent[1].from, "Zhilly <bookings@zhilly.life>");
  assert.ok(!/₹|price|rate|rs\.?\s?\d/i.test(JSON.stringify(sent)), "no prices in emails");
});
await t("enquiry: nights already booked -> 409; arriving on an OTA check-out day and leaving on an OTA check-in day are fine", async () => {
  assert.equal((await enq({ ...good, room: "room-1", checkin: plus(11), checkout: plus(14) })).status, 409);
  assert.equal((await enq({ ...good, room: "room-1", checkin: plus(13), checkout: plus(15) })).status, 200);
  assert.equal((await enq({ ...good, room: "room-1", checkin: plus(8), checkout: plus(10) })).status, 200);
});
await t("SQL injection attempts are stored as data or refused", async () => {
  const evil = "Robert'); DROP TABLE enquiries;--";
  assert.equal((await enq({ ...good, name: evil, message: "' OR 1=1 --" })).status, 200);
  assert.equal(sqlite.prepare("SELECT name FROM enquiries ORDER BY id DESC").get().name, evil);
  assert.equal((await call("/availability?room=" + encodeURIComponent("room-1' OR '1'='1"))).status, 400);
  assert.equal((await enq({ ...good, room: "x' OR '1'='1" })).status, 422);
  assert.equal((await call("/ical/room-1'--/" + "a".repeat(32) + ".ics")).status, 404);
  const r = await adminPost({ action: "remove-block", id: "1 OR 1=1" });
  assert.match(decodeURIComponent(r.headers.get("location")), /Bad block/);
});
await t("rate limit: 6th request from one IP in an hour -> 429", async () => {
  let last; for (let i = 0; i < 6; i++) last = await enq({ ...good, turnstile: "bad" }, { "cf-connecting-ip": "9.9.9.9" });
  assert.equal(last.status, 429);
  console.log("        429 text:", (await last.json()).error);
});
await t("admin page: guest input is HTML-escaped (stored XSS)", async () => {
  await enq({ ...good, message: `<script>alert(1)</script><img src=x onerror=alert(2)>`, name: `O'Brien "Q" & co` });
  const html = await (await call("/admin?msg=" + encodeURIComponent("<script>x</script>"), { headers: { authorization: basic } })).text();
  assert.ok(!html.includes("<script>alert(1)") && !html.includes("<img src=x") && !html.includes("<script>x</script>"));
});

// ---- confirm -> block -> export; then the double-booking probes
await t("confirm enquiry: nights blocked, shown in availability and in the OTA export", async () => {
  const id = sqlite.prepare("SELECT id FROM enquiries WHERE checkin = ? ORDER BY id").get(plus(20)).id;
  await adminPost({ action: "enquiry", id, status: "confirmed", room: "room-1" });
  const b = (await avail("room-1")).booked;
  assert.ok(b.includes(plus(20)) && b.includes(plus(21)) && !b.includes(plus(22)));
  assert.ok(parseIcs(await (await call(exportUrl)).text()).some((r) => r.start <= plus(20) && r.end >= plus(22)));
});
await t("confirming an enquiry whose nights were sold on an OTA meanwhile must be refused", async () => {
  await enq({ ...good, room: "room-1", checkin: plus(60), checkout: plus(63) });
  const id = sqlite.prepare("SELECT id FROM enquiries ORDER BY id DESC").get().id;
  feeds[B] = ics([[plus(61), plus(62)]]); await adminPost({ action: "sync" });
  const r = await adminPost({ action: "enquiry", id, status: "confirmed", room: "room-1" });
  const msg = decodeURIComponent(r.headers.get("location").split("msg=")[1]);
  const st = sqlite.prepare("SELECT status FROM enquiries WHERE id = ?").get(id).status;
  assert.equal(st, "new", `enquiry was confirmed on top of an Airbnb booking. Admin said: "${msg}"`);
});
await t("two enquiries for overlapping nights: the second confirm must be refused", async () => {
  await enq({ ...good, room: "room-1", checkin: plus(80), checkout: plus(82) });
  await enq({ ...good, room: "room-1", checkin: plus(81), checkout: plus(83), email: "b@example.com" });
  const ids = sqlite.prepare("SELECT id FROM enquiries ORDER BY id DESC LIMIT 2").all().map((r) => r.id);
  await adminPost({ action: "enquiry", id: ids[1], status: "confirmed", room: "room-1" });
  await adminPost({ action: "enquiry", id: ids[0], status: "confirmed", room: "room-1" });
  const st = sqlite.prepare("SELECT status FROM enquiries WHERE id = ?").get(ids[0]).status;
  assert.equal(st, "new", "both overlapping enquiries ended up confirmed");
});
await t("admin manual block on top of an OTA booking should warn", async () => {
  const r = await adminPost({ action: "add-block", room: "room-1", start: plus(10), end: plus(12), note: "walk-in" });
  const msg = decodeURIComponent(r.headers.get("location").split("msg=")[1]);
  assert.ok(!/^Blocked/.test(msg), `no warning. Admin said: "${msg}"`);
});
await t("a feed that starts failing should alert the owner by email", async () => {
  const before = sent.length; feeds[A] = 500; await worker.scheduled({}, env);
  const n = sent.length - before; feeds[A] = ics([[plus(10), plus(13)]]);
  assert.ok(n > 0, "no email when a feed starts failing; the error only shows on /admin");
});

// ---- date and timezone edge cases
await t("month end, year end and leap day in a feed", async () => {
  assert.deepEqual(parseIcs(ics([["2027-12-30", "2028-01-02"], ["2028-02-28", "2028-03-01"]])), [{ start: "2027-12-30", end: "2028-01-02" }, { start: "2028-02-28", end: "2028-03-01" }]);
});
await t("IST: DATE-TIME feed in UTC, check-in 14:00 IST on the 10th (08:30Z), check-out 11:00 IST on the 12th (05:30Z) -> nights 10, 11", async () => {
  const r = parseIcs("BEGIN:VCALENDAR\r\nBEGIN:VEVENT\r\nDTSTART:20270110T083000Z\r\nDTEND:20270112T053000Z\r\nEND:VEVENT\r\nEND:VCALENDAR");
  assert.deepEqual(r, [{ start: "2027-01-10", end: "2027-01-12" }]);
});
await t("IST: DATE-TIME feed that writes IST midnight in UTC (10th 00:00 IST = 9th 18:30Z, 12th 00:00 IST = 11th 18:30Z) -> nights 10, 11", async () => {
  const r = parseIcs("BEGIN:VCALENDAR\r\nBEGIN:VEVENT\r\nDTSTART:20270109T183000Z\r\nDTEND:20270111T183000Z\r\nEND:VEVENT\r\nEND:VCALENDAR");
  assert.deepEqual(r, [{ start: "2027-01-10", end: "2027-01-12" }], `got ${JSON.stringify(r)}: night of the 11th is left open, the 9th is blocked by mistake`);
});
await t("IST: 'today' between 00:00 and 05:30 IST", async () => {
  const RealDate = Date; const fake = RealDate.parse("2027-03-01T20:00:00Z"); // 01:30 IST on 2 March
  globalThis.Date = class extends RealDate { constructor(...a) { super(...(a.length ? a : [fake])); } static now() { return fake; } };
  try {
    const a = await avail("room-1");
    assert.equal(a.from, "2027-03-02", `availability 'from' is ${a.from} while it is already 2 March in India`);
  } finally { globalThis.Date = RealDate; }
});
await t("unknown paths 404; unknown room 404", async () => {
  assert.equal((await call("/")).status, 404); assert.equal((await call("/availability?room=room-9")).status, 404);
});
await t("two rooms: the all-rooms view shows a night as booked only once BOTH rooms are taken", async () => {
  await adminPost({ action: "add-block", room: "room-2", start: plus(40), end: plus(41) });
  assert.deepEqual((await avail()).booked, [plus(40)]);
});

console.log(results.join("\n"));
console.log(`\n${results.filter((r) => r.startsWith("PASS")).length} pass, ${results.filter((r) => r.startsWith("FAIL")).length} fail`);
if (results.some((r) => r.startsWith("FAIL"))) process.exitCode = 1;
