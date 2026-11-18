/**
 * Business facts in one place.
 *
 * Anything set to `null` is still waiting on the owner (see research/09 Part B and the
 * decision log in research/10-executive-recommendations.md). Every fact the pages use is filled in
 * now; a null would render as a dotted placeholder (Pending), so a missing fact is never invented.
 */

export const site = {
  name: "Zhilly",
  /** Legal entity: shown in legal notices only. A partnership firm. */
  operator: "Canopy Ventures",
  operatorType: "a partnership firm",
  domain: "https://zhilly.life",
  /** false adds noindex to every page. */
  launched: true,

  /** WhatsApp (owner-approved exception to "no phone in public", website only), international format without "+". */
  whatsappNumber: "918293326469",
  /** The same number as people read it. */
  phoneDisplay: "+91 82933 26469",
  email: "zhilly.life@gmail.com" as string | null,
  instagram: "@zhilly.life" as string | null,
  instagramUrl: "https://www.instagram.com/zhilly.life/",
  facebookUrl: "https://www.facebook.com/zhilly.life",
  address: "Lower Bong Basti" as string | null,
  pin: "734301",
  town: "Kalimpong, West Bengal",
  /** The gate: 27°03'28.9"N 88°28'25.3"E */
  mapUrl: "https://www.google.com/maps?q=27.058037,88.473698",

  /**
   * The calendar Worker (calendar/ folder): availability JSON and booking enquiries. Local dev: set NEXT_PUBLIC_CALENDAR_API.
   */
  calendarApi: process.env.NEXT_PUBLIC_CALENDAR_API ?? "https://cal.zhilly.life",
  /** Cloudflare Turnstile site key (public). For local dev, Cloudflare's always-pass test key is 1x00000000000000000000AA. */
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAAGHr6R1pq7hA5ONB",
} as const;

export const nav = [
  { key: "stay", href: "/stay/", label: "Stay" },
  { key: "cafe", href: "/cafe/", label: "Café" },
  { key: "around", href: "/around-kalimpong/", label: "Around Kalimpong" },
  { key: "plan", href: "/plan-your-stay/", label: "Plan your stay" },
  { key: "find", href: "/find-us/", label: "Find us" },
] as const;

export type NavKey = (typeof nav)[number]["key"];

export function mailUrl(subject: string, body: string): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Pre-filled WhatsApp chats used by the buttons across the site. */
export const wa = {
  checkDates: whatsappUrl("Hi Zhilly! I'd like to check dates…"),
  roadQuestion: whatsappUrl("Hi Zhilly! I'm travelling up tomorrow. How's the road?"),
};

/** Pre-filled emails used by the buttons across the site. */
export const mail = {
  checkDates: mailUrl("Checking dates", "Hi Zhilly! I'd like to check dates…"),
  roadQuestion: mailUrl("How's the road?", "Hi Zhilly! I'm travelling up tomorrow. How's the road?"),
};
