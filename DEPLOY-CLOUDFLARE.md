# Putting Zhilly live on Cloudflare (free)

Everything here is on free plans. The only thing you pay for is the domain **zhilly.life**.

What you end up with:

| Piece | Where | What it does |
|---|---|---|
| The website | Cloudflare Pages, at **zhilly.life** | The static site from this repo (`npm run build` → `out/`) |
| The calendar | A Cloudflare Worker + D1 database, at **cal.zhilly.life** (code in `calendar/`) | One central availability calendar per room. Pulls bookings from Booking.com, Airbnb etc. every 15 minutes, gives every OTA one link to pull from, shows booked nights on the website, takes booking enquiries |
| Enquiry emails | Resend (free: 3,000 emails a month, 100 a day) | Emails you each enquiry, and sends the guest an acknowledgement |
| Spam check | Cloudflare Turnstile (free) | Stops bots sending enquiries |

You need: a computer with Node.js 20 or newer, and this repo cloned (`git clone https://github.com/I-am-sayantan/Zhilly`).
Commands below run in a terminal inside the repo folder unless they say `cd calendar`.

---

## 1. Cloudflare account and the domain

1. Sign up free at https://dash.cloudflare.com/sign-up and verify your email.
2. Buy the domain: **Domain Registration → Register Domains**, search `zhilly.life`, buy it (Cloudflare sells at cost).
   *Bought it somewhere else instead?* In Cloudflare: **Add a domain** → `zhilly.life` → **Free** plan, then at your registrar
   replace the nameservers with the two Cloudflare shows you. Wait until Cloudflare says the domain is **Active** (minutes to a few hours).

## 2. The website on Cloudflare Pages

1. **Workers & Pages → Create → Pages → Connect to Git.** Allow access to GitHub and pick the repo **I-am-sayantan/Zhilly**.
2. Build settings:
   - Production branch: `main`
   - Framework preset: `Next.js (Static HTML Export)` (or `None`)
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variable: `NODE_VERSION` = `22`
3. **Save and Deploy.** You get a `*.pages.dev` address to check it. (If a build ever stops on Next's security warning, press **Retry deployment**.)
4. In the Pages project: **Custom domains → Set up a custom domain** → `zhilly.life` → Activate. Do it once more for `www.zhilly.life`.

From now on every push to `main` redeploys the site by itself.

## 3. The calendar Worker

```
cd calendar
npm install
npx wrangler login                                   # opens the browser; allow access
npx wrangler d1 create zhilly-calendar               # prints a database_id
```

Open `calendar/wrangler.toml` and replace the `database_id = "00000000-..."` value with the id it printed. Then:

```
npx wrangler d1 execute zhilly-calendar --remote --file=schema.sql   # tables + the first room, room-1

npx wrangler secret put ADMIN_PASSWORD     # type a long password for the admin page (only you know it)
npx wrangler secret put OWNER_EMAIL        # the inbox that receives enquiries, e.g. your Gmail
npx wrangler secret put TURNSTILE_SECRET   # from step 4 below
npx wrangler secret put RESEND_API_KEY     # from step 5 below

npx wrangler deploy
```

Attach the address: dashboard → **Workers & Pages → zhilly-calendar → Settings → Domains & Routes → Add → Custom domain** → `cal.zhilly.life`.

Check it: https://cal.zhilly.life/availability should show `{"room":"all","rooms":["room-1"],...,"booked":[]}`.
The admin page is **https://cal.zhilly.life/admin** (any username, your ADMIN_PASSWORD).

Commit the `database_id` change (`git commit -am "Set D1 id" && git push`). The id is not a secret.

### More rooms

Rooms are rows in the database. Room count not decided yet, so there is one, `room-1`. To add one (lowercase letters, digits, dashes):

```
npx wrangler d1 execute zhilly-calendar --remote --command "INSERT INTO rooms (id) VALUES ('room-2')"
```

It gets its own secret export link on the admin page. Each OTA listing should map to one room. The website shows a night as
booked only when **every** room is booked, and the enquiry form shows a room choice once there are two or more.

## 4. Turnstile (spam check on the enquiry form)

1. Dashboard → **Turnstile → Add widget**. Name `zhilly`, hostnames `zhilly.life` and `www.zhilly.life`, mode **Managed**.
2. Copy the **Site key** into `src/lib/site.ts` → `turnstileSiteKey` (it is public; replaces the test key `1x00000000000000000000AA`), commit and push.
3. Put the **Secret key** in the Worker: `cd calendar && npx wrangler secret put TURNSTILE_SECRET`.

Until both are set the form can't send (it fails closed, and says to use WhatsApp).

## 5. Resend (enquiry emails)

1. Sign up free at https://resend.com.
2. **Domains → Add domain** → `zhilly.life` (region: any). Resend lists a few DNS records (MX + TXT for SPF on a `send`
   subdomain, a TXT DKIM record, optionally DMARC). Either click Resend's **Sign in to Cloudflare** button to add them
   automatically, or add each one by hand in Cloudflare → `zhilly.life` → **DNS → Records** (for these records, set Proxy status to **DNS only**).
   Press **Verify** in Resend; it usually turns green within minutes.
3. **API Keys → Create API key**, permission **Sending access**, domain `zhilly.life`. Copy it once and run
   `cd calendar && npx wrangler secret put RESEND_API_KEY`.
4. The sender is `FROM_EMAIL = "bookings@zhilly.life"` in `calendar/wrangler.toml` (change it there if you like, then `npx wrangler deploy`).
   Replies go straight to the guest (owner email) or to you (guest email); you don't need a real inbox at bookings@.

**Until the domain is verified**, Resend only sends from `onboarding@resend.dev`, and only to the email you signed up to Resend with,
so guests would get nothing. Verify the domain before going live. If an email fails, the enquiry is still saved and shows on the admin page.

## 6. Connect the OTAs

On https://cal.zhilly.life/admin each room has:

- an **export link** (`https://cal.zhilly.life/ical/room-1/<secret>.ics`). Paste it into **every** OTA. It holds all blocked nights:
  your direct bookings plus every other OTA's bookings. Keep it private; anyone with it can see which nights are taken (no names).
- **import links**: paste each OTA's own export link here with a short name (`booking`, `airbnb`, `mmt`). They sync every 15 minutes; **Sync now** pulls at once.
  If an OTA's link fails, its old bookings stay blocked and the row shows the error.

Each OTA also gets its own bookings back in the export link. That's normal and standard for iCal sync; it doesn't double anything.

### Booking.com
- Extranet → **Rates & Availability → Sync calendars** (or **Calendar → Sync calendars**) → choose the room type.
- **Import**: "Import calendar" / "Add calendar connection" → paste the Zhilly **export link**, name it Zhilly.
- **Export**: "Export calendar" → copy Booking.com's link → paste it on the Zhilly admin page as `booking`.
- Note: Booking.com may only offer iCal sync to properties without a channel manager, and to room types with a single unit. If you don't see "Sync calendars", ask Booking.com partner support.

### Airbnb
- Hosting → **Listings** → the listing → **Availability** (Calendar) → **Connect calendars** / "Sync calendars".
- **Import**: "Connect another website" → paste the Zhilly **export link**, name it Zhilly.
- **Export**: "Export calendar" → copy Airbnb's link → paste it on the Zhilly admin page as `airbnb`.

### MakeMyTrip / Goibibo (InGo-MMT) and others
iCal support on InGo-MMT varies by property type and isn't guaranteed. Log in to the InGo-MMT extranet and look for
"Calendar sync", "iCal" or "Channel manager" under inventory. If it offers import/export links, use them like above.
If not, the fallback is manual: when MMT sends a booking, block those nights on the Zhilly admin page (they then flow to every other OTA),
and when another OTA or a direct guest books, close those dates in the InGo-MMT extranet by hand.
Any other site with iCal (Agoda, Hostelworld, Vrbo...) works the same way as Booking.com.

### The honest limit
OTAs re-read iCal links on their own schedule, usually every 1 to 6 hours (Zhilly reads theirs every 15 minutes). So there's a window
of a few hours where the same night could be sold on two sites. When it's busy, block nights quickly on the admin page, and if double bookings
start to happen, the upgrade path is a paid channel manager (e.g. eZee, STAAH, Cloudbeds) that pushes availability in real time.

## 7. Booking enquiries

The **Send us your dates** band at the bottom of most pages has the calendar (booked nights struck through) and the enquiry form.
When a guest sends it:
1. It's saved (admin page → **Booking enquiries**), you get an email (reply goes to the guest), and the guest gets an acknowledgement
   promising an answer **within 24 hours** (change `REPLY_HOURS` in `calendar/src/index.js` and the line in `src/components/BookingForm.tsx` together).
2. You **Confirm + block** (pick the room) or **Decline** it on the admin page. Confirming blocks the nights, so every OTA sees them at its next sync.
   Either way, tell the guest yourself (reply to the enquiry email, call or WhatsApp). The site never shows or emails a price.

Spam guards: Turnstile, a hidden honeypot field, and at most 5 enquiries per IP per hour.

## Free-tier limits (plenty for one homestay)
Workers: 100,000 requests/day. D1: 5 GB, 5 million row reads/day. Cron: the one 15-minute trigger. Resend: 3,000 emails/month, 100/day
(each enquiry uses 2). Pages: 500 builds/month. Turnstile: free.

## Local testing (optional)
```
cd calendar
npm install && npm test                                   # parser, merge, validation, escaping checks
cp .dev.vars.example .dev.vars                            # test password + Turnstile always-pass test secret
npx wrangler d1 execute zhilly-calendar --local --file=schema.sql
npx wrangler dev                                          # http://127.0.0.1:8787/admin, emails are logged, not sent
```
Website against the local Worker (second terminal, repo root): `NEXT_PUBLIC_CALENDAR_API=http://127.0.0.1:8787 npm run dev`, open http://localhost:3000.
