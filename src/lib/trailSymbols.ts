/**
 * Map-legend symbols scattered along the trail (Figma: Components › Trail symbol).
 * Drawn on a 24 px grid (the stream is 72 × 24) and scaled to the rail width.
 */

const BROWN = "#9A6B3F", RED = "#C2412D", RIVER = "#2F6E8E", INK = "#1D2320";

const line = (d: string, colour = BROWN, width = 1.6, extra = "") =>
  `<path d="${d}" fill="none" stroke="${colour}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"${extra}/>`;

export type TrailSymbol = { w: number; h: number; svg: string };

export const TRAIL_SYMBOLS = {
  pines: { w: 24, h: 24, svg: line("M7 3 L12.5 13 H1.5 Z") + line("M7 13 V16.5") + line("M16.5 7.5 L22 18 H11 Z") + line("M16.5 18 V21") },
  tufts: {
    w: 24, h: 24,
    svg: line("M5 20 C5 16 4.2 13.5 2.5 11.5") + line("M9.5 20 C9.5 14.5 9.8 11 11 7") + line("M14 20 C14 16 15 13.5 17.5 11.5") + line("M18.5 20 C18.8 17.5 19.8 16 21.5 15"),
  },
  bamboo: {
    w: 24, h: 24,
    svg: line("M10 22.5 V3") + line("M8.6 10.5 H11.4") + line("M8.6 16.5 H11.4") + line("M16 22.5 V9") + line("M14.6 15 H17.4")
      + line("M10 7 q-3.8 -4.2 -8.4 -3.4 q3.4 4 8.4 3.4") + line("M16 12.5 q3.6 -4 7 -3.6 q-2.8 3.8 -7 3.6"),
  },
  stones: {
    w: 24, h: 24,
    svg: line("M3 19.5 a9 3 0 1 0 18 0 a9 3 0 1 0 -18 0") + line("M6 14.2 a6 2.6 0 1 0 12 0 a6 2.6 0 1 0 -12 0") + line("M8.6 9.4 a3.4 2.1 0 1 0 6.8 0 a3.4 2.1 0 1 0 -6.8 0"),
  },
  flag: { w: 24, h: 24, svg: line("M6.5 21.5 V2.5", INK) + `<path d="M6.5 3 L19 7 L6.5 11 Z" fill="${RED}"/>` + line("M3.5 21.5 H10", INK) },
  stream: {
    w: 72, h: 24,
    svg: line("M1 12 c5 -5 9 5 14 0 s9 -5 14 0 s9 5 14 0 s9 -5 14 0 s9 5 14 0", RIVER)
      + line("M1 17 c5 -5 9 5 14 0 s9 -5 14 0", RIVER, 1.6, ' opacity=".55"') + line("M43 17 c5 -5 9 5 14 0 s9 -5 14 0", RIVER, 1.6, ' opacity=".55"')
      + line("M29 5.5 V18.5 M43 5.5 V18.5", INK) + line("M29 8.5 H43 M29 12 H43 M29 15.5 H43", INK, 1.2),
  },
} satisfies Record<string, TrailSymbol>;

export type TrailSymbolName = keyof typeof TRAIL_SYMBOLS;

/** The order symbols appear in, top to bottom; it repeats on long pages. */
export const TRAIL_ORDER: TrailSymbolName[] = ["pines", "tufts", "bamboo", "stream", "stones", "pines", "flag", "tufts", "bamboo", "stones"];
