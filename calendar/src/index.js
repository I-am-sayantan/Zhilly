// Zhilly availability calendar: one Cloudflare Worker + D1.
//   GET  /availability[?room=]       public JSON of booked nights (no names, no prices), CORS for zhilly.life
//   GET  /ical/<room>/<token>.ics    export feed of ALL blocks of a room, for the OTAs to import
//   POST /enquiry                    booking enquiry from the website: Turnstile + honeypot + per-IP limit, D1, emails via Resend
//   GET/POST /admin                  owner page (HTTP Basic auth, password = secret ADMIN_PASSWORD)
//   cron every 15 min                pulls every OTA import URL into D1
import { addDays, isDate, nightsIn, parseIcs, toIcs } from "./ical.js";
import { enquiryEmails, escapeHtml as esc, validateEnquiry } from "./enquiry.js";

const MAX_FEED_BYTES = 1_000_000;
const DAYS_AHEAD = 550; // ~18 months, same as the website's date planner
const SOURCE_RE = /^[a-z0-9-]{1,32}$/;
const ROOM_RE = /^[a-z0-9-]{1,32}$/;
const REPLY_HOURS = 24; // promised in the website's success message and the guest email
const ENQUIRIES_PER_HOUR = 5; // per IP

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    try {
      if (url.pathname === "/availability" && req.method === "GET") return await availability(env, url, req);
      const ical = /^\/ical\/([a-z0-9-]{1,32})\/([a-f0-9]{32})\.ics$/.exec(url.pathname);
      if (ical && req.method === "GET") return await exportFeed(env, ical[1], ical[2]);
      if (url.pathname === "/enquiry") return await enquiry(env, req, ctx);
      if (url.pathname === "/admin") return await admin(env, req, url);
      return new Response("Not found", { status: 404 });
    } catch (e) {
      console.error(e);
      return new Response("Server error", { status: 500 });
    }
  },
  async scheduled(_event, env) {
    await syncAll(env);
  },
};

// ---------- public ----------

async function availability(env, url, req) {
  const room = url.searchParams.get("room");
  const cors = corsHeaders(env, req);
  if (room !== null && !ROOM_RE.test(room)) return json({ error: "bad room" }, 400, cors);
  const rooms = (await env.DB.prepare("SELECT id FROM rooms").all()).results.map((r) => r.id);
  if (!rooms.length || (room !== null && !rooms.includes(room))) return json({ error: "unknown room" }, 404, cors);

  const from = today();
  const to = addDays(from, DAYS_AHEAD);
  // without ?room= a night counts as booked only when every room is taken
  const booked = [...(await bookedNights(env, room ?? "", from, to))].sort();
  return json({ room: room ?? "all", rooms, from, to, booked }, 200, { ...cors, "cache-control": "public, max-age=300" });
}

/** Booked nights of one room, or (room "") the nights when every room is booked. */
async function bookedNights(env, room, from, to) {
  const rooms = room ? [room] : (await env.DB.prepare("SELECT id FROM rooms").all()).results.map((r) => r.id);
  const sets = [];
  for (const r of rooms) sets.push(nightsIn(await blocksOf(env, r), from, to));
  return sets.length ? new Set([...sets[0]].filter((d) => sets.every((s) => s.has(d)))) : new Set();
}

function corsHeaders(env, req) {
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  const origin = req.headers.get("origin");
  return origin && allowed.includes(origin) ? { "access-control-allow-origin": origin, vary: "origin" } : { vary: "origin" };
}

async function exportFeed(env, room, token) {
  const row = await env.DB.prepare("SELECT token FROM rooms WHERE id = ?").bind(room).first();
  if (!row || !(await safeEqual(row.token, token))) return new Response("Not found", { status: 404 });
  return new Response(toIcs(room, await blocksOf(env, room)), {
    headers: { "content-type": "text/calendar; charset=utf-8", "cache-control": "no-store" },
  });
}

async function blocksOf(env, room) {
  return (await env.DB.prepare("SELECT start, end FROM blocks WHERE room = ?").bind(room).all()).results;
}

// ---------- booking enquiry ----------

async function enquiry(env, req, ctx) {
  const cors = corsHeaders(env, req);
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: { ...cors, "access-control-allow-methods": "POST", "access-control-allow-headers": "content-type", "access-control-max-age": "86400" } });
  }
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, cors);
  if (!cors["access-control-allow-origin"]) return json({ error: "Bad origin" }, 403, cors);
  if (!env.TURNSTILE_SECRET) return json({ error: "Enquiries are not switched on yet. Please message us on WhatsApp." }, 503, cors);

  const ip = req.headers.get("cf-connecting-ip") || "unknown";
  const now = Date.now();
  const recent = await env.DB.prepare("SELECT COUNT(*) AS n FROM hits WHERE ip = ? AND at > ?").bind(ip, now - 3_600_000).first();
  if (recent.n >= ENQUIRIES_PER_HOUR) return json({ error: "Too many enquiries from here. Please try again in an hour, or message us on WhatsApp." }, 429, cors);
  await env.DB.batch([
    env.DB.prepare("INSERT INTO hits (ip, at) VALUES (?, ?)").bind(ip, now),
    env.DB.prepare("DELETE FROM hits WHERE at < ?").bind(now - 86_400_000),
  ]);

  const raw = await req.text();
  if (raw.length > 10_000) return json({ error: "Too large" }, 413, cors);
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Bad request" }, 400, cors);
  }
  if (!body || typeof body !== "object") return json({ error: "Bad request" }, 400, cors);
  // honeypot: people never see this field, bots fill it. Pretend it worked.
  if (body.website) return json({ ok: true, replyHours: REPLY_HOURS }, 200, cors);

  if (!(await turnstileOk(env, body.turnstile, ip))) return json({ error: "The spam check failed. Please try again." }, 400, cors);

  const rooms = (await env.DB.prepare("SELECT id FROM rooms").all()).results.map((r) => r.id);
  const { value: v, errors } = validateEnquiry(body, today(), rooms);
  if (errors) return json({ errors }, 422, cors);
  const taken = await bookedNights(env, v.room, v.checkin, v.checkout);
  if (taken.size) return json({ errors: { checkin: `Some of those nights are already booked (from ${[...taken].sort()[0]}). Please pick other dates.` } }, 409, cors);

  const row = await env.DB.prepare(
    "INSERT INTO enquiries (created, checkin, checkout, room, adults, children, name, phone, email, message, ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id",
  ).bind(new Date(now).toISOString(), v.checkin, v.checkout, v.room || null, v.adults, v.children, v.name, v.phone, v.email, v.message || null, ip).first();

  // the enquiry is safe in D1 now; email trouble is logged, never shown to the guest
  ctx.waitUntil(sendEnquiryEmails(env, v, row.id).catch((e) => console.error(`enquiry #${row.id} email failed:`, e)));
  return json({ ok: true, replyHours: REPLY_HOURS }, 200, cors);
}

async function turnstileOk(env, token, ip) {
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET);
  form.append("response", token);
  form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  return res.ok && (await res.json()).success === true;
}

async function sendEnquiryEmails(env, v, id) {
  const mails = enquiryEmails(v, id, REPLY_HOURS);
  await sendEmail(env, { to: env.OWNER_EMAIL, reply_to: v.email, ...mails.owner });
  await sendEmail(env, { to: v.email, reply_to: env.OWNER_EMAIL, ...mails.guest });
}

async function sendEmail(env, mail) {
  if (!env.RESEND_API_KEY || !env.OWNER_EMAIL || !env.FROM_EMAIL) {
    console.log("[email stub: RESEND_API_KEY, OWNER_EMAIL or FROM_EMAIL not set]", JSON.stringify({ to: mail.to, reply_to: mail.reply_to, subject: mail.subject }));
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ from: `Zhilly <${env.FROM_EMAIL}>`, ...mail, to: [mail.to] }),
  });
  if (!res.ok) throw new Error(`Resend HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

// ---------- OTA import ----------

export async function syncAll(env) {
  const feeds = (await env.DB.prepare("SELECT id, room, source, url FROM feeds").all()).results;
  for (const f of feeds) {
    try {
      const ranges = parseIcs(await fetchCapped(f.url));
      // one batch = one transaction: the old blocks of this source go only if the new ones land
      await env.DB.batch([
        env.DB.prepare("DELETE FROM blocks WHERE room = ? AND source = ?").bind(f.room, f.source),
        ...ranges.map((r) => env.DB.prepare("INSERT INTO blocks (room, source, start, end) VALUES (?, ?, ?, ?)").bind(f.room, f.source, r.start, r.end)),
        env.DB.prepare("UPDATE feeds SET last_ok = ?, last_error = NULL, last_count = ? WHERE id = ?").bind(new Date().toISOString(), ranges.length, f.id),
      ]);
    } catch (e) {
      // a failing feed keeps its previous blocks; only the error is recorded
      await env.DB.prepare("UPDATE feeds SET last_error = ? WHERE id = ?").bind(`${new Date().toISOString()} ${String(e.message || e).slice(0, 200)}`, f.id).run();
    }
  }
}

async function fetchCapped(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20_000), headers: { "user-agent": "zhilly-calendar/1" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (Number(res.headers.get("content-length")) > MAX_FEED_BYTES) throw new Error("feed larger than 1 MB");
  const reader = res.body.getReader();
  const chunks = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > MAX_FEED_BYTES) {
      await reader.cancel();
      throw new Error("feed larger than 1 MB");
    }
    chunks.push(value);
  }
  return new Blob(chunks).text();
}

// ---------- admin ----------

async function admin(env, req, url) {
  if (!env.ADMIN_PASSWORD) return new Response("ADMIN_PASSWORD secret is not set", { status: 503 });
  if (!(await authorised(env, req))) {
    return new Response("Password required", { status: 401, headers: { "www-authenticate": 'Basic realm="Zhilly calendar", charset="UTF-8"' } });
  }
  if (req.method === "POST") {
    // Basic auth rides along on cross-site form posts, so only accept posts from this page
    if (req.headers.get("origin") !== url.origin) return new Response("Bad origin", { status: 403 });
    const msg = await adminAction(env, await req.formData());
    return Response.redirect(`${url.origin}/admin?msg=${encodeURIComponent(msg)}`, 303);
  }
  if (req.method !== "GET") return new Response("Method not allowed", { status: 405 });
  return new Response(await adminPage(env, url), {
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-frame-options": "DENY", "referrer-policy": "no-referrer" },
  });
}

async function authorised(env, req) {
  const h = req.headers.get("authorization") || "";
  if (!h.startsWith("Basic ")) return false;
  let decoded;
  try {
    decoded = new TextDecoder().decode(Uint8Array.from(atob(h.slice(6)), (c) => c.charCodeAt(0)));
  } catch {
    return false;
  }
  const pass = decoded.slice(decoded.indexOf(":") + 1); // any username
  return safeEqual(pass, env.ADMIN_PASSWORD);
}

/** Constant-time string compare: hash both sides so lengths never leak, then XOR every byte. */
export async function safeEqual(a, b) {
  const enc = new TextEncoder();
  const [x, y] = await Promise.all([a, b].map((s) => crypto.subtle.digest("SHA-256", enc.encode(String(s)))));
  const ua = new Uint8Array(x), ub = new Uint8Array(y);
  let diff = 0;
  for (let i = 0; i < ua.length; i++) diff |= ua[i] ^ ub[i];
  return diff === 0;
}

async function adminAction(env, form) {
  const f = (k) => String(form.get(k) ?? "").trim();
  const room = f("room");
  const known = room && (await env.DB.prepare("SELECT 1 FROM rooms WHERE id = ?").bind(room).first());
  switch (f("action")) {
    case "add-block": {
      const start = f("start"), end = f("end"), note = f("note").slice(0, 200);
      if (!known) return "Unknown room.";
      if (!isDate(start) || !isDate(end) || end <= start) return "Dates must be valid, and check-out after check-in.";
      if (end > addDays(start, 400)) return "A block can be at most 400 nights.";
      await env.DB.prepare("INSERT INTO blocks (room, source, start, end, note) VALUES (?, 'direct', ?, ?, ?)").bind(room, start, end, note || null).run();
      return `Blocked ${start} to ${end} (check-out day stays free).`;
    }
    case "remove-block": {
      const id = Number(f("id"));
      if (!Number.isInteger(id)) return "Bad block.";
      await env.DB.prepare("DELETE FROM blocks WHERE id = ? AND source = 'direct'").bind(id).run();
      return "Block removed.";
    }
    case "add-feed": {
      const source = f("source").toLowerCase(), feedUrl = f("url");
      if (!known) return "Unknown room.";
      if (!SOURCE_RE.test(source) || source === "direct") return "Name: lowercase letters, digits and dashes (e.g. booking, airbnb). Not 'direct'.";
      let u;
      try {
        u = new URL(feedUrl);
      } catch {
        return "That is not a valid link.";
      }
      if (!["https:", "http:"].includes(u.protocol) || feedUrl.length > 2000) return "The link must start with https://.";
      await env.DB.prepare("INSERT INTO feeds (room, source, url) VALUES (?, ?, ?) ON CONFLICT(room, source) DO UPDATE SET url = excluded.url, last_error = NULL").bind(room, source, feedUrl).run();
      return `Saved the ${source} link. Press "Sync now" to pull it.`;
    }
    case "remove-feed": {
      const id = Number(f("id"));
      const feed = Number.isInteger(id) && (await env.DB.prepare("SELECT room, source FROM feeds WHERE id = ?").bind(id).first());
      if (!feed) return "Bad link.";
      await env.DB.batch([
        env.DB.prepare("DELETE FROM feeds WHERE id = ?").bind(id),
        env.DB.prepare("DELETE FROM blocks WHERE room = ? AND source = ?").bind(feed.room, feed.source),
      ]);
      return `Removed the ${feed.source} link and its blocks.`;
    }
    case "enquiry": {
      const id = Number(f("id"));
      const status = f("status");
      const q = Number.isInteger(id) && (await env.DB.prepare("SELECT * FROM enquiries WHERE id = ? AND status = 'new'").bind(id).first());
      if (!q) return "That enquiry is gone or already handled.";
      if (status === "declined") {
        await env.DB.prepare("UPDATE enquiries SET status = 'declined' WHERE id = ?").bind(id).run();
        return `Enquiry #${id} declined. Remember to tell the guest.`;
      }
      if (status !== "confirmed" || !known) return "Pick a room to confirm into.";
      // confirming blocks the nights, so they reach every OTA through the export feed
      await env.DB.batch([
        env.DB.prepare("UPDATE enquiries SET status = 'confirmed', room = ? WHERE id = ?").bind(room, id),
        env.DB.prepare("INSERT INTO blocks (room, source, start, end, note) VALUES (?, 'direct', ?, ?, ?)").bind(room, q.checkin, q.checkout, `Enquiry #${id} ${q.name}`.slice(0, 200)),
      ]);
      return `Enquiry #${id} confirmed and ${q.checkin} to ${q.checkout} blocked in ${room}. Remember to tell the guest.`;
    }
    case "sync":
      await syncAll(env);
      return "Synced. Check each link's status below.";
    default:
      return "Unknown action.";
  }
}

async function adminPage(env, url) {
  const rooms = (await env.DB.prepare("SELECT id, token FROM rooms ORDER BY id").all()).results;
  const feeds = (await env.DB.prepare("SELECT * FROM feeds ORDER BY room, source").all()).results;
  const blocks = (await env.DB.prepare("SELECT * FROM blocks WHERE end >= ? ORDER BY room, start").bind(today()).all()).results;
  const enquiries = (await env.DB.prepare("SELECT * FROM enquiries ORDER BY status = 'new' DESC, id DESC LIMIT 100").all()).results;
  const msg = url.searchParams.get("msg");
  const post = (fields, label) => `<form method="post">${Object.entries(fields).map(([k, v]) => `<input type="hidden" name="${k}" value="${esc(v)}">`).join("")}<button>${label}</button></form>`;

  const roomHtml = rooms.map((r) => {
    const exportUrl = `${url.origin}/ical/${r.id}/${r.token}.ics`;
    const rf = feeds.filter((f) => f.room === r.id);
    const rb = blocks.filter((b) => b.room === r.id);
    return `<section><h2>${esc(r.id)}</h2>
<h3>Export link (paste this into every OTA)</h3>
<p><input readonly value="${esc(exportUrl)}" onclick="this.select()"></p>
<h3>Import links (from the OTAs)</h3>
<table><tr><th>Name</th><th>Link</th><th>Status</th><th></th></tr>
${rf.map((f) => `<tr><td>${esc(f.source)}</td><td class="u">${esc(f.url)}</td><td>${f.last_error ? `<b class="err">Failing: ${esc(f.last_error)}</b> (older blocks kept)` : f.last_ok ? `OK ${esc(f.last_ok.slice(0, 16).replace("T", " "))} UTC, ${f.last_count} bookings` : "Not synced yet"}</td><td>${post({ action: "remove-feed", id: f.id }, "Remove")}</td></tr>`).join("") || `<tr><td colspan="4">None yet.</td></tr>`}
</table>
<form method="post" class="row"><input type="hidden" name="action" value="add-feed"><input type="hidden" name="room" value="${esc(r.id)}">
<input name="source" placeholder="booking" required pattern="[a-z0-9\\-]{1,32}" size="10"><input name="url" type="url" placeholder="https://… .ics link from the OTA" required size="50"><button>Add / replace</button></form>
<h3>Blocked nights</h3>
<table><tr><th>Check-in</th><th>Check-out</th><th>Source</th><th>Note</th><th></th></tr>
${rb.map((b) => `<tr><td>${esc(b.start)}</td><td>${esc(b.end)}</td><td>${esc(b.source)}</td><td>${esc(b.note)}</td><td>${b.source === "direct" ? post({ action: "remove-block", id: b.id }, "Remove") : "<small>change it on the OTA</small>"}</td></tr>`).join("") || `<tr><td colspan="5">Nothing blocked.</td></tr>`}
</table>
<form method="post" class="row"><input type="hidden" name="action" value="add-block"><input type="hidden" name="room" value="${esc(r.id)}">
<label>Check-in <input type="date" name="start" required></label><label>Check-out <input type="date" name="end" required></label>
<input name="note" placeholder="Note (only you see this)" maxlength="200"><button>Block these nights</button></form>
</section>`;
  }).join("");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Zhilly calendar</title>
<style>body{font:15px/1.5 system-ui,sans-serif;max-width:960px;margin:0 auto;padding:16px;color:#1d2320;background:#fbf8f1}h2{margin-top:32px;border-bottom:2px solid #1d2320}
table{border-collapse:collapse;width:100%;margin:8px 0}td,th{border:1px solid #ccc;padding:4px 6px;text-align:left;vertical-align:top}td.u{word-break:break-all;font-size:12px}
input[readonly]{width:100%}.row{display:flex;flex-wrap:wrap;gap:8px;align-items:end;margin:8px 0}.err{color:#b83a26}.msg{background:#e9a23b33;padding:8px;border:1px solid #e9a23b}form{margin:0}</style></head>
<body><h1>Zhilly calendar</h1>${msg ? `<p class="msg">${esc(msg)}</p>` : ""}
<p>OTA links sync every 15 minutes. Check-out day is not blocked. ${post({ action: "sync" }, "Sync now")}</p>
<section><h2>Booking enquiries</h2><table><tr><th>#</th><th>Dates</th><th>Guests</th><th>Contact</th><th>Message</th><th>Status</th></tr>
${enquiries.map((q) => `<tr><td>${q.id}<br><small>${esc(q.created.slice(0, 10))}</small></td><td>${esc(q.checkin)} to ${esc(q.checkout)}<br><small>${esc(q.room || "any room")}</small></td><td>${q.adults} adults, ${q.children} children</td><td>${esc(q.name)}<br><a href="tel:${esc(q.phone.replace(/[^+0-9]/g, ""))}">${esc(q.phone)}</a><br><a href="mailto:${esc(q.email)}">${esc(q.email)}</a></td><td style="white-space:pre-wrap">${esc(q.message)}</td><td>${q.status === "new" ? `<form method="post" class="row"><input type="hidden" name="action" value="enquiry"><input type="hidden" name="id" value="${q.id}"><input type="hidden" name="status" value="confirmed"><select name="room" aria-label="Room">${rooms.map((r) => `<option${r.id === q.room ? " selected" : ""}>${esc(r.id)}</option>`).join("")}</select><button>Confirm + block</button></form>${post({ action: "enquiry", id: q.id, status: "declined" }, "Decline")}` : esc(q.status)}</td></tr>`).join("") || `<tr><td colspan="6">No enquiries yet.</td></tr>`}
</table></section>${roomHtml}</body></html>`;
}

// ---------- helpers ----------

// shortcut: "today" is the UTC date, up to 5.5 h behind India; harmless for a nights calendar.
const today = () => new Date().toISOString().slice(0, 10);

function json(body, status, headers = {}) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...headers } });
}
