"use client";

import { useEffect } from "react";
import { TRAIL_ORDER, TRAIL_SYMBOLS } from "@/lib/trailSymbols";

const SVG_NS = "http://www.w3.org/2000/svg";
const BUNTING = ["#2F5DA8", "#F6F1E7", "#C2412D", "#2F6B4F", "#E9A23B"];
const WALKER =
  '<div class="lean"><div class="bob"><svg viewBox="0 0 30 40"><path d="M15 39C15 39 2 23 2 14a13 13 0 0 1 26 0c0 9-13 25-13 25z" fill="#C2412D"/><circle cx="15" cy="14" r="5.5" fill="#F7F3E6"/></svg></div></div><span class="foot"></span>';

/** Bunting: plain cloth in five colours, hung along the string. */
function hangBunting(root: ParentNode): () => void {
  const added: Element[] = [];
  root.querySelectorAll<SVGSVGElement>("svg.bunting").forEach((svg) => {
    const path = svg.querySelector("path");
    const set = svg.querySelector(".flagset");
    if (!path || !set) return;
    const n = Number(svg.dataset.flags) || 28;
    const L = path.getTotalLength();
    for (let i = 0; i < n; i++) {
      const pt = path.getPointAtLength((L * (i + 0.5)) / n);
      const r = document.createElementNS(SVG_NS, "rect");
      r.setAttribute("x", (pt.x - 13).toFixed(1));
      r.setAttribute("y", (pt.y + 1).toFixed(1));
      r.setAttribute("width", "26");
      r.setAttribute("height", "30");
      r.setAttribute("fill", BUNTING[i % 5]);
      r.setAttribute("class", "f");
      r.style.setProperty("--i", String(i));
      set.appendChild(r);
      added.push(r);
    }
  });
  return () => added.forEach((r) => r.remove());
}

/** The rail-local x of the trail at height y: the same wiggle the dotted path is drawn with. */
function trailX(y: number, cx: number, A: number) {
  return cx + A * Math.sin(y / 190) + A * 0.35 * Math.sin(y / 67 + 1.3);
}

/**
 * The trail: drawn as you scroll, with a walker at its head (Figma: Components › Trail motion spec).
 * The walker eases toward the scroll position on a spring, leans with the path, kicks up dust,
 * and stamps the map symbols and waypoints as it reaches them.
 */
function drawTrail(trail: HTMLElement, reduce: boolean): () => void {
  const svg = document.createElementNS(SVG_NS, "svg");
  const ghost = document.createElementNS(SVG_NS, "path");
  const live = document.createElementNS(SVG_NS, "path");
  const syms = document.createElementNS(SVG_NS, "g");
  const clip = document.createElementNS(SVG_NS, "clipPath");
  const clipR = document.createElementNS(SVG_NS, "rect");
  const walker = document.createElement("div");
  const wps = Array.from(trail.querySelectorAll<HTMLElement>(".wp"));
  let H = 0, cx = 0, A = 0, off = 0;
  let cur = 0, target = 0, lean = 0, travelled = 0, lastPuff = 0, frame = 0;
  let placed: { y: number; el: SVGGElement }[] = [];

  svg.setAttribute("class", "trailsvg");
  svg.setAttribute("aria-hidden", "true");
  clip.setAttribute("id", "trailclip");
  clip.appendChild(clipR);
  ghost.setAttribute("class", "ghost");
  live.setAttribute("class", "live");
  live.setAttribute("clip-path", "url(#trailclip)");
  syms.setAttribute("class", "syms");
  svg.append(clip, ghost, syms, live);
  trail.prepend(svg);
  walker.className = "walker";
  walker.setAttribute("aria-hidden", "true");
  walker.innerHTML = WALKER;
  trail.appendChild(walker);
  const leanEl = walker.querySelector<HTMLElement>(".lean")!;

  const headY = () => Math.max(0, Math.min(H, innerHeight * 0.55 - trail.getBoundingClientRect().top));

  function puff(x: number, y: number) {
    const p = document.createElement("span");
    p.className = "puff";
    p.style.setProperty("--x", `${(x + (Math.round(travelled / 70) % 2 ? 5 : -5)).toFixed(1)}px`);
    p.style.setProperty("--y", `${y.toFixed(1)}px`);
    p.addEventListener("animationend", () => p.remove());
    trail.appendChild(p);
  }

  function render(dy: number) {
    const x = trailX(cur, cx, A);
    clipR.setAttribute("height", String(cur));
    // lean with the slope of the path, in the direction of travel, more when moving faster
    const slope = (trailX(cur + 5, cx, A) - trailX(cur - 5, cx, A)) / 10;
    const tilt = ((Math.atan(slope) * 180) / Math.PI) * Math.sign(dy) * Math.min(1, Math.abs(dy) / 3);
    lean += (Math.max(-10, Math.min(10, tilt)) - lean) * 0.2;
    leanEl.style.transform = `rotate(${lean.toFixed(2)}deg)`;
    walker.style.transform = `translate(${(off + x).toFixed(1)}px,${cur.toFixed(1)}px)`;
    walker.style.opacity = reduce || cur <= 1 || cur >= H - 2 ? "0" : "1";
    wps.forEach((wp) => wp.classList.toggle("lit", cur >= wp.offsetTop + 40));
    placed.forEach((s) => s.el.classList.toggle("on", cur >= s.y - 12));
    if (!reduce && cur > 1 && cur < H - 2) {
      travelled += Math.abs(dy);
      if (travelled - lastPuff >= 70) {
        lastPuff = travelled;
        puff(off + x, cur);
      }
    }
  }

  // the spring: each frame the walker closes 16% of the gap to where the scroll says it should be
  function tick() {
    const d = target - cur;
    const step = Math.abs(d) < 0.4 ? d : d * 0.16;
    cur += step;
    render(step);
    if (Math.abs(target - cur) < 0.01 && Math.abs(lean) < 0.2) {
      frame = 0;
      walker.classList.add("still");
      return;
    }
    walker.classList.remove("still");
    frame = requestAnimationFrame(tick);
  }

  function follow() {
    target = reduce ? H : headY();
    if (reduce) {
      cur = target;
      render(0);
    } else if (!frame) {
      frame = requestAnimationFrame(tick);
    }
  }

  function placeSymbols(w: number) {
    syms.replaceChildren();
    const size = w >= 120 ? 28 : w >= 80 ? 22 : 16, sc = size / 24;
    const gap = w >= 80 ? size / 2 + 10 : size / 2 + 6, step = w >= 80 ? 320 : 380;
    // keep clear of the waypoint markers, where they sit before they start to stick
    const marks = wps.map((wp) => wp.offsetTop + (wp.querySelector<HTMLElement>(".mark")?.offsetTop ?? 0));
    const out: typeof placed = [];
    let i = 0;
    for (let y = 220; y < H - 120; y += step) {
      if (marks.some((m) => y > m - 44 && y < m + 116)) continue;
      const name = TRAIL_ORDER[i % TRAIL_ORDER.length], sym = TRAIL_SYMBOLS[name];
      const rot = name === "stream" ? 0 : ((i * 37) % 11) - 5;
      i++;
      // on the side away from the path's swing; the stream crosses under it
      const px = trailX(y, cx, A);
      const x = name === "stream" ? px : cx - (px - cx > 0 ? 1 : -1) * (A + gap);
      const at = document.createElementNS(SVG_NS, "g");
      at.setAttribute("transform", `translate(${x.toFixed(1)} ${y}) rotate(${rot}) scale(${sc})`);
      const g = document.createElementNS(SVG_NS, "g");
      g.setAttribute("class", "sym");
      const art = document.createElementNS(SVG_NS, "g");
      art.setAttribute("transform", `translate(${-sym.w / 2} ${-sym.h / 2})`);
      art.innerHTML = sym.svg;
      g.appendChild(art);
      at.appendChild(g);
      syms.appendChild(at);
      out.push({ y, el: g });
    }
    placed = out;
  }

  function build() {
    const w = trail.querySelector<HTMLElement>(".mark")?.offsetWidth ?? 0;
    let d = "";
    cx = w / 2;
    A = Math.min(26, w * 0.22);
    H = trail.offsetHeight;
    svg.setAttribute("viewBox", `0 0 ${w} ${H}`);
    svg.setAttribute("width", String(w));
    svg.setAttribute("height", String(H));
    for (let y = 0; y <= H; y += 10) d += (y ? "L" : "M") + trailX(y, cx, A).toFixed(1) + " " + y;
    ghost.setAttribute("d", d);
    live.setAttribute("d", d);
    clipR.setAttribute("x", "-50");
    clipR.setAttribute("width", String(w + 100));
    clipR.setAttribute("y", "0");
    off = svg.getBoundingClientRect().left - trail.getBoundingClientRect().left;
    placeSymbols(w);
    // start where the reader already is, rather than walking down from the top
    cur = target = reduce ? H : headY();
    render(0);
    walker.classList.add("still");
  }

  addEventListener("scroll", follow, { passive: true });
  addEventListener("resize", build);
  addEventListener("load", build);
  // web fonts can change the page height after the first layout
  document.fonts?.ready.then(build);
  build();

  return () => {
    removeEventListener("scroll", follow);
    removeEventListener("resize", build);
    removeEventListener("load", build);
    cancelAnimationFrame(frame);
    svg.remove();
    walker.remove();
    trail.querySelectorAll(".puff").forEach((p) => p.remove());
  };
}

/** The route ticket: the road draws in and the jeep drives it, once, when the card comes into view. */
function driveTicket(tk: HTMLElement, reduce: boolean): () => void {
  const road = tk.querySelector<SVGPathElement>("#roadpath");
  const jeep = tk.querySelector(".jeep");
  if (!("IntersectionObserver" in window) || reduce || !road || !jeep) {
    tk.classList.add("go");
    return () => {};
  }
  const RL = road.getTotalLength();
  let frame = 0;
  const place = (t: number) => {
    const a = road.getPointAtLength(t * RL), b = road.getPointAtLength(Math.min(RL, t * RL + 2));
    const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    jeep.setAttribute("transform", `translate(${a.x.toFixed(1)} ${(a.y - 6).toFixed(1)}) rotate(${ang.toFixed(1)})`);
  };
  place(0);
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    tk.classList.add("go");
    io.disconnect();
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / 2600);
      place(t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
  }, { rootMargin: "0px 0px -30% 0px" });
  io.observe(tk);
  return () => { io.disconnect(); cancelAnimationFrame(frame); };
}

/** Progressive enhancements shared by every page: bunting, the scroll-drawn trail and the route ticket. */
export default function SiteEffects() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [hangBunting(document)];
    const trail = document.querySelector<HTMLElement>(".trail");
    if (trail) cleanups.push(drawTrail(trail, reduce));
    const tk = document.querySelector<HTMLElement>(".ticket");
    if (tk) cleanups.push(driveTicket(tk, reduce));
    return () => cleanups.forEach((c) => c());
  }, []);
  return null;
}
