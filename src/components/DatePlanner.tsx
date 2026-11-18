"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { wa, whatsappUrl } from "@/lib/site";

/*
 * The "Send us your dates" planner (Figma: Components › Date planner).
 * Pick the day you arrive, then the day you leave, and how many of you; the WhatsApp button
 * then opens a chat with those dates filled in. It is a request, not a booking: availability
 * is still checked by hand, so the calendar never claims a date is free or taken.
 */

// 8 dorm beds + a queen room for two
const MAX_GUESTS = 10;
const MONTHS_AHEAD = 18;
const DOW = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type Day = { y: number; m: number; d: number };
const key = (x: Day) => x.y * 10000 + x.m * 100 + x.d;
const toDate = (x: Day) => new Date(x.y, x.m, x.d);
const fromDate = (t: Date): Day => ({ y: t.getFullYear(), m: t.getMonth(), d: t.getDate() });
const addDays = (x: Day, n: number) => fromDate(new Date(x.y, x.m, x.d + n));
const nightsBetween = (a: Day, b: Day) => Math.round((toDate(b).getTime() - toDate(a).getTime()) / 864e5);
const short = (x: Day) => toDate(x).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
const long = (x: Day) => toDate(x).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const monthTitle = (y: number, m: number) => new Date(y, m, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

type Plan = {
  arrive: Day | null;
  leave: Day | null;
  guests: number;
  setArrive: (d: Day | null) => void;
  setLeave: (d: Day | null) => void;
  setGuests: (n: number) => void;
};
const PlanContext = createContext<Plan | null>(null);
const usePlan = () => {
  const p = useContext(PlanContext);
  if (!p) throw new Error("DatePlanner parts must sit inside <PlannerProvider>");
  return p;
};

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [arrive, setArrive] = useState<Day | null>(null);
  const [leave, setLeave] = useState<Day | null>(null);
  const [guests, setGuests] = useState(1);
  const value = useMemo(() => ({ arrive, leave, guests, setArrive, setLeave, setGuests }), [arrive, leave, guests]);
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

/** The message lines match the sample request on the Plan your stay page. */
function message({ arrive, leave, guests }: Plan) {
  if (!arrive) return null;
  const lines = ["Hi Zhilly! I'd like to check dates…", `Arrive  ${long(arrive)}`];
  if (leave) {
    const n = nightsBetween(arrive, leave);
    lines.push(`Leave   ${long(leave)} (${n} night${n === 1 ? "" : "s"})`);
  }
  lines.push(`Guests  ${guests}`);
  return lines.join("\n");
}

export function SendDatesButton({ children }: { children: ReactNode }) {
  const plan = usePlan();
  const text = message(plan);
  return (
    <a className="btn" href={text ? whatsappUrl(text) : wa.checkDates}>
      {children}
    </a>
  );
}

export function DatePlanner() {
  const { arrive, leave, guests, setArrive, setLeave, setGuests } = usePlan();
  // "today" is only known in the browser; the static HTML ships an empty sheet of the same size
  const [today, setToday] = useState<Day | null>(null);
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const [focus, setFocus] = useState<Day | null>(null);
  const [hover, setHover] = useState<Day | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const moveFocus = useRef(false);

  useEffect(() => {
    // read the clock once, after hydration, so the server-rendered sheet matches
    const t = fromDate(new Date());
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(t);
    setView({ y: t.y, m: t.m });
    setFocus(t);
  }, []);

  useEffect(() => {
    if (!moveFocus.current || !focus) return;
    moveFocus.current = false;
    grid.current?.querySelector<HTMLButtonElement>(`[data-k="${key(focus)}"]`)?.focus();
  }, [focus, view]);

  const minView = today && { y: today.y, m: today.m };
  const maxView = today && fromDate(new Date(today.y, today.m + MONTHS_AHEAD, 1));
  const viewIdx = (v: { y: number; m: number }) => v.y * 12 + v.m;
  const canPrev = !!(view && minView && viewIdx(view) > viewIdx(minView));
  const canNext = !!(view && maxView && viewIdx(view) < viewIdx(maxView));

  function shiftMonth(n: number) {
    if (!view) return;
    const t = new Date(view.y, view.m + n, 1);
    setView({ y: t.getFullYear(), m: t.getMonth() });
  }

  function choose(d: Day) {
    if (!arrive || leave || key(d) <= key(arrive)) {
      setArrive(d);
      setLeave(null);
    } else {
      setLeave(d);
    }
    setFocus(d);
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (!focus || !today || !maxView) return;
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = addDays(focus, step);
    if (key(next) < key(today) || viewIdx({ y: next.y, m: next.m }) > viewIdx(maxView)) return;
    moveFocus.current = true;
    setFocus(next);
    if (view && (next.m !== view.m || next.y !== view.y)) setView({ y: next.y, m: next.m });
  }

  // 6 rows always, so the sheet never changes height between months
  const cells: (Day | null)[] = [];
  if (view) {
    const lead = (new Date(view.y, view.m, 1).getDay() + 6) % 7;
    const len = new Date(view.y, view.m + 1, 0).getDate();
    for (let i = 0; i < 42; i++) {
      const d = i - lead + 1;
      cells.push(d >= 1 && d <= len ? { y: view.y, m: view.m, d } : null);
    }
  } else {
    cells.push(...Array<null>(42).fill(null));
  }

  const runEnd = leave ?? (arrive && hover && key(hover) > key(arrive) ? hover : null);
  const nights = arrive && leave ? nightsBetween(arrive, leave) : null;
  const focusInView = focus && view && focus.m === view.m && focus.y === view.y;

  return (
    <div className="planner">
      <div className="sheet">
        <div className="head">
          <div>
            <p className="cap">Your dates</p>
            <h3 className="month" aria-live="polite">{view ? monthTitle(view.y, view.m) : " "}</h3>
          </div>
          <div className="nav">
            <button type="button" onClick={() => shiftMonth(-1)} disabled={!canPrev} aria-label="Previous month">←</button>
            <button type="button" onClick={() => shiftMonth(1)} disabled={!canNext} aria-label="Next month">→</button>
          </div>
        </div>

        <div className="days" role="grid" aria-label="Choose the day you arrive, then the day you leave" ref={grid} onKeyDown={onKey} onMouseLeave={() => setHover(null)}>
          <div className="wk dow" role="row">
            {DOW.map((d) => <span key={d} role="columnheader" aria-label={d}>{d[0]}</span>)}
          </div>
          {[0, 1, 2, 3, 4, 5].map((w) => (
            <div className="wk" role="row" key={w}>
              {cells.slice(w * 7, w * 7 + 7).map((c, i) => {
                if (!c || !today) return <span key={i} className="d empty" role="gridcell" />;
                const k = key(c);
                const past = k < key(today);
                const pick = (arrive && k === key(arrive)) || (leave && k === key(leave));
                const run = arrive && runEnd && k >= key(arrive) && k <= key(runEnd);
                const tabbable = focusInView ? k === key(focus) : c.d === 1;
                const cls = ["d", past && "past", k === key(today) && "today", pick && "pick", run && (leave ? "run" : "run pre")].filter(Boolean).join(" ");
                return (
                  <span key={i} role="gridcell" aria-selected={!!pick}>
                    <button
                      type="button"
                      className={cls}
                      data-k={k}
                      disabled={past}
                      tabIndex={tabbable ? 0 : -1}
                      aria-label={toDate(c).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) + (k === key(today) ? ", today" : "")}
                      onClick={() => choose(c)}
                      onMouseEnter={() => setHover(c)}
                      onFocus={() => setFocus(c)}
                    >
                      {c.d}
                    </button>
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        <div className="sum" aria-live="polite">
          <div><p className="lab">Arrive</p><p className={arrive ? "val" : "val none"}>{arrive ? short(arrive) : "—"}</p></div>
          <div><p className="lab">Leave</p><p className={leave ? "val" : "val none"}>{leave ? short(leave) : "—"}</p></div>
          <div><p className="lab">Nights</p><p className={nights ? "val" : "val none"}>{nights ?? "—"}</p></div>
          <div>
            <p className="lab" id="guests-l">Guests</p>
            <div className="step" role="group" aria-labelledby="guests-l">
              <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} disabled={guests <= 1} aria-label="One fewer guest">−</button>
              <p className="val" aria-live="polite">{guests}</p>
              <button type="button" onClick={() => setGuests(Math.min(MAX_GUESTS, guests + 1))} disabled={guests >= MAX_GUESTS} aria-label="One more guest">+</button>
            </div>
          </div>
        </div>

        <div className="foot">
          <p>{arrive && !leave ? "Now tap the day you leave." : arrive ? "We check every date by hand and reply on WhatsApp." : "Tap the day you arrive, then the day you leave."}</p>
          {arrive && <button type="button" className="clear" onClick={() => { setArrive(null); setLeave(null); }}>Clear</button>}
        </div>
      </div>
    </div>
  );
}
