# Zhilly website

[![CI](https://github.com/I-am-sayantan/Zhilly/actions/workflows/ci.yml/badge.svg)](https://github.com/I-am-sayantan/Zhilly/actions/workflows/ci.yml)

The website for **Zhilly**, a small homestay and café in Kalimpong, West Bengal: **https://zhilly.life**.

It is a static site (no server) plus one small Cloudflare Worker that runs the availability calendar and the booking enquiry form.

## Stack

| Part | What | Where |
|---|---|---|
| Site | Next.js 16 (App Router) + TypeScript, static export to `out/` | `src/`, `public/` |
| Hosting | Cloudflare Pages, project `zhilly` (direct upload) | zhilly.life, www.zhilly.life |
| Calendar + enquiries | Cloudflare Worker `zhilly-calendar` + D1 database | `calendar/`, cal.zhilly.life |
| Spam check | Cloudflare Turnstile | site key in `src/lib/site.ts` |
| Enquiry emails | Resend | `calendar/src/enquiry.js` |
| CI/CD | GitHub Actions | `.github/workflows/ci.yml` |

Business facts (email, WhatsApp, address, links, the calendar address, the launch flag) live in one file: `src/lib/site.ts`.

## Local development

Needs Node 22.5 or newer (CI uses Node 24).

```bash
npm ci
npm run dev        # http://localhost:3000
npx tsc --noEmit
npm run lint
npm run build      # static site in out/

cd calendar
npm ci
npm test           # Worker tests: helpers + the real handlers on in-memory SQLite
```

To try the booking form locally against a local Worker, see "Local testing" in [DEPLOY-CLOUDFLARE.md](DEPLOY-CLOUDFLARE.md).

## Deploy and rollback

Every push and pull request runs the checks: install, type check, lint, build, and the calendar tests.

A push to `main` that passes the checks deploys automatically:

- the site goes to Cloudflare Pages (`wrangler pages deploy out --project-name=zhilly --branch=main`), labelled with the commit;
- the calendar Worker is redeployed too, every time.

Deploys run one at a time and are never cancelled half-way. They need two repository secrets: `CLOUDFLARE_API_TOKEN` (a Cloudflare API token with Workers and Pages edit rights) and `CLOUDFLARE_ACCOUNT_ID`.

**Rolling back the site** (either way works):

1. Cloudflare dashboard → **Workers & Pages → zhilly → Deployments** → on an older deployment, **⋯ → Rollback to this deployment**. Instant, no rebuild. Each deployment shows the commit it came from.
2. GitHub → **Actions → CI** → open an older successful run on `main` → **Re-run all jobs**. That rebuilds and redeploys that commit.

**Rolling back the Worker:** Cloudflare dashboard → **Workers & Pages → zhilly-calendar → Deployments** → pick an older version → **Deploy**. Or `cd calendar && npx wrangler rollback`.

To undo a change for good, `git revert` the commit and push; the pipeline deploys the result.

## Booking setup

Guests pick dates on the calendar and send a booking enquiry. It is not a booking: the owner confirms by hand by email or WhatsApp.

- The Worker (`calendar/`) serves booked nights at `/availability`, takes enquiries at `/enquiry` (Turnstile, a honeypot and 5 per IP per hour), stores them in D1 and emails the owner and the guest through Resend.
- `/admin` (password protected) lists enquiries, confirms or declines them, blocks nights and holds the iCal links for Booking.com, Airbnb and others. Confirming or blocking refuses nights that are already taken.
- OTA calendars sync every 15 minutes. If a feed starts failing, the owner gets one email and the old blocks are kept.
- Worker secrets (set in Cloudflare, never in this repo): `ADMIN_PASSWORD`, `RESEND_API_KEY`, `TURNSTILE_SECRET`, `OWNER_EMAIL`.

Full setup, OTA instructions and the limits of iCal sync: [DEPLOY-CLOUDFLARE.md](DEPLOY-CLOUDFLARE.md).

## Editing content

- Page copy: `src/app/<page>/page.tsx`. Shared parts: `src/components/`.
- Photos: `public/photos/`, each as `name.jpg` and a smaller `name-sm.jpg`.
- Facts the owner hasn't supplied yet (UPI ID, café menu, directions, policies) are simply left out rather than shown as blanks.
- `launched: false` in `src/lib/site.ts` keeps every page `noindex`. Set it to `true` when the content is signed off.

Design source: the Figma file https://www.figma.com/design/O1iYJns6jOzX4ArTniLqWo.

## License

No license. The code, text and photos are © Canopy Ventures, all rights reserved. The repository is public so the work can be seen, not reused.
