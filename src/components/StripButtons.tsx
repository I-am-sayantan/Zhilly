"use client";

/** Arrow buttons that nudge the café photo strip along by most of its width. */
export default function StripButtons() {
  function nudge(dir: number) {
    const strip = document.querySelector<HTMLElement>(".c-strip");
    if (!strip) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollBy({ left: dir * strip.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  }
  return (
    <div className="c-btns" aria-hidden="true">
      <button type="button" tabIndex={-1} onClick={() => nudge(-1)}>←</button>
      <button type="button" tabIndex={-1} onClick={() => nudge(1)}>→</button>
    </div>
  );
}
