# Deploying the Zhilly website

**Chosen setup: Cloudflare Pages + the calendar Worker, all free. Follow [DEPLOY-CLOUDFLARE.md](DEPLOY-CLOUDFLARE.md).**
The options below are older alternatives; without the calendar Worker the site still works, it just shows no booked nights and the enquiry form can't send.

This is the source code: Next.js 16 + TypeScript, built as a fully static site.
It needs Node.js 20.9 or newer.

## Option A: Vercel (recommended)

1. Put this folder in a GitHub repository (or use `npx vercel` from inside it).
2. On https://vercel.com/new, import the repository.
3. Keep the defaults (Framework: Next.js, no root directory change) and click Deploy.

## Option B: any other host

```
npm ci
npm run build
```

This writes the finished site to `out/`. Upload the contents of `out/` to the web root.
On Apache hosts (e.g. Hostinger) the included `.htaccess` serves the 404 page.

## Before going public

The site is deliberately hidden from search engines until the owner signs off the content.
To launch, set `launched: true` in `src/lib/site.ts` and redeploy.
More detail is in `README.md`.
