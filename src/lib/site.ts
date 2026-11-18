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

  /** No phone number is published: every contact link goes to this inbox (Cloudflare Email Routing forwards it). */
  email: "hello@zhilly.life" as string | null,
  instagram: "@zhilly.life" as string | null,
  instagramUrl: "https://www.instagram.com/zhilly.life/",
  facebookUrl: "https://www.facebook.com/zhilly.life",
  /** Google Form for the first guests, the fallback while the enquiry form below is off. */
  firstGuestForm: "https://forms.gle/9Ka9GCFxQeLKeHir5",
  address: "Lower Bong Basti" as string | null,
  pin: "734301",
  town: "Kalimpong, West Bengal",
  /** The gate: 27°03'28.9"N 88°28'25.3"E */
  mapUrl: "https://www.google.com/maps?q=27.058037,88.473698",

  /**
   * The calendar Worker (calendar/ folder): availability JSON and booking enquiries. Local dev: set NEXT_PUBLIC_CALENDAR_API.
   * null = Worker not deployed yet: no booked nights are fetched and the enquiry form is replaced by email + the first-guest form.
   * Set to "https://cal.zhilly.life" once the Worker, Turnstile and Resend are set up (DEPLOY-CLOUDFLARE.md).
   */
  calendarApi: (process.env.NEXT_PUBLIC_CALENDAR_API ?? null) as string | null,
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

export function mailUrl(subject: string, body: string): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Pre-filled emails used by the buttons across the site. */
export const mail = {
  checkDates: mailUrl("Checking dates", "Hi Zhilly! I'd like to check dates…"),
  roadQuestion: mailUrl("How's the road?", "Hi Zhilly! I'm travelling up tomorrow. How's the road?"),
};
