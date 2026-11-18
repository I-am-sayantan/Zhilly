/**
 * Business facts in one place.
 *
 * Anything set to `null` is still waiting on the owner (see research/09 Part B and the
 * decision log in research/10-executive-recommendations.md). Pending values render as the
 * dotted "[to confirm]" placeholder tags, so a missing fact is visible, never invented.
 */

export const site = {
  name: "Zhilly",
  /** Legal entity: shown in legal notices only. A partnership firm. */
  operator: "Canopy Ventures",
  operatorType: "a partnership firm",
  domain: "https://zhilly.life",
  /** Keep false until the owner signs off the content: pages ship with noindex. */
  launched: false,

  whatsappNumber: "918293326469" as string | null, // international format without "+"
  /** The same number, for calls and WhatsApp, as people read it. */
  phoneDisplay: "+91 82933 26469",
  email: null as string | null,
  instagram: null as string | null,
  address: "Lower Bong Basti" as string | null,
  pin: "734301",
  town: "Kalimpong, West Bengal",
  /** The gate: 27°03'28.9"N 88°28'25.3"E */
  mapUrl: "https://www.google.com/maps?q=27.058037,88.473698",

  /** The calendar Worker (calendar/ folder): availability JSON and booking enquiries. Local dev: set NEXT_PUBLIC_CALENDAR_API. */
  calendarApi: process.env.NEXT_PUBLIC_CALENDAR_API ?? "https://cal.zhilly.life",
  /** Cloudflare Turnstile site key (public). 1x00000000000000000000AA is Cloudflare's always-pass test key: replace it at launch. */
  turnstileSiteKey: "1x00000000000000000000AA",
} as const;

export const nav = [
  { key: "stay", href: "/stay/", label: "Stay" },
  { key: "cafe", href: "/cafe/", label: "Café" },
  { key: "around", href: "/around-kalimpong/", label: "Around Kalimpong" },
  { key: "plan", href: "/plan-your-stay/", label: "Plan your stay" },
  { key: "find", href: "/find-us/", label: "Find us" },
] as const;

export type NavKey = (typeof nav)[number]["key"];

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber ?? "91XXXXXXXXXX"}?text=${encodeURIComponent(message)}`;
}

/** Pre-filled WhatsApp chats used by the buttons across the site. */
export const wa = {
  checkDates: whatsappUrl("Hi Zhilly! I'd like to check dates…"),
  roadQuestion: whatsappUrl("Hi Zhilly! I'm travelling up tomorrow. How's the road?"),
};
