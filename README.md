# Zhilly website

Next.js 16 (App Router) + TypeScript, built as a fully static site and deployed on Vercel: every push to `main` redeploys.

```bash
npm ci          # first time: installs the exact versions in package-lock.json
npm run dev     # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build   # static site in out/
```

Needs Node 20.9 or newer (developed on Node 24.19, npm 11.17).

**Design source:** the Figma file https://www.figma.com/design/O1iYJns6jOzX4ArTniLqWo. Design changes go into Figma first, then into this code.

**Opening the dev site on a phone:** open the `Network:` address that `npm run dev` prints. `next.config.ts` adds this computer's current LAN addresses to `allowedDevOrigins` each time it starts. Without them the phone gets a 403 on the dev scripts, and nothing on the page is interactive.

## How it's put together

| Path | What it is |
|---|---|
| `src/lib/site.ts` | **Business facts.** WhatsApp number, email, Instagram, address, nav, launch flag. `null` means "waiting on the owner" and shows a dotted `[to confirm]` tag. |
| `src/app/layout.tsx` | `<html>`, the self-hosted fonts (next/font), the skip link and the shared SVG symbols. |
| `src/app/globals.css` | Base styles shared by every page (from the homepage design) plus the inner-page parts. |
| `src/app/<page>/page.tsx` + `page.css` | One folder per page. Each page's CSS is scoped with `:where([data-page="…"])`, so pages can't restyle each other. |
| `src/app/not-found.tsx` | The 404 page (exported as `out/404.html`). |
| `src/components/PageShell.tsx` | Header, `<main>` and footer around every page. |
| `src/components/SiteEffects.tsx` | Progressive enhancements: bunting, the scroll-drawn trail with its spring-eased walker, dust puffs and map symbols, the route-ticket jeep. |
| `src/lib/trailSymbols.ts` | The map-legend symbols stamped along the trail (Figma: Components › Trail symbol). |
| `src/components/DatePlanner.tsx` | The working date calendar in every closing band. It turns the chosen dates and guests into a pre-filled WhatsApp message (Figma: Components › Date planner). |
| `src/components/CloseBand.tsx` | The "Send us your dates" band: the planner plus its WhatsApp button. |
| `public/photos/` | The owner's photos, already sized (`-sm` = 720 px). |
| `public/art/` | Drawn art used by the pages (the café bamboo grove and divider sprig). |
| `public/.htaccess` | Only used if the site is ever hosted on Apache (e.g. Hostinger): points it at `404.html`. Vercel ignores it. |

## Before launch

- Fill in the `null` values in `src/lib/site.ts`. Placeholder tags in page copy (`<span className="ph">`) also mark facts still to confirm: prices, hours, check-in times, policies.
- Set `launched: true` in `src/lib/site.ts`. This drops the `noindex` tag and the "Concept draft" footer line.
- Point zhilly.in at the Vercel project (Vercel → Project → Settings → Domains).

The pages were ported from earlier static HTML drafts, which are kept outside this repo. Edit the TSX here; the drafts are no longer the source.
