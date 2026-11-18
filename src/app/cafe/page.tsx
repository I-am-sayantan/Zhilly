import type { CSSProperties } from "react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageMeta, breadcrumbLd, cafeLd } from "@/lib/seo";
import Link from "next/link";
import CloseBand from "@/components/CloseBand";
import StripButtons from "@/components/StripButtons";
import PageShell from "@/components/PageShell";
import "./page.css";

export const metadata: Metadata = pageMeta("/cafe/", "Café in Kalimpong, open 12 pm to 11 pm · Zhilly", "The café at Zhilly hostel in Kalimpong, West Bengal: food, tea and coffee under a woven bamboo ceiling. Open every day, 12 pm to 11 pm. Day visitors welcome.");

export default function CafePage() {
  return (
    <PageShell page="cafe" nav="cafe">
      <JsonLd data={breadcrumbLd("/cafe/", "Café")} />
      <JsonLd data={cafeLd} />
      <section className="phero" aria-labelledby="h1" style={{ "--pos": "50% 30%" } as CSSProperties}>
        <img src="/photos/dining-shed.jpg" srcSet="/photos/dining-shed-sm.jpg 720w, /photos/dining-shed.jpg 1200w" sizes="100vw" width="1200" height="1600" fetchPriority="high" alt="Inside the bamboo dining shed: a woven bamboo ceiling on pole rafters, bamboo-slat walls, chairs at a covered table and a turquoise-painted post in front." />
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Zhilly</Link>
            <span aria-hidden="true">/</span>
            <span>Café</span>
          </nav>
          <h1 id="h1">Pull up a chair.</h1>
          <p className="lead">
            Food, tea and coffee, and a place to sit and talk.
          </p>
          <p className="credit">The bamboo dining shed: woven ceiling, turquoise post.</p>
        </div>
        <span className="eave" aria-hidden="true" />
      </section>
      <div className="trail">
        <section className="wp c-for" aria-labelledby="w1">
          <svg className="contours" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#topoA" /></svg>
          <div className="mark" aria-hidden="true">
            <div className="pt">
              <svg viewBox="0 0 34 30">
                <path d="M17 2l15 26H2z" fill="#C2412D" />
                <circle cx="17" cy="19" r="3" fill="#EFEAD8" />
              </svg>
              <span className="num">01</span>
            </div>
          </div>
          <div className="body">
            <p className="mono">Waypoint 01 · What it's for</p>
            <h2 id="w1">The café<small>It has three jobs.</small></h2>
            <ol className="c-jobs">
              <li>Something to eat.</li>
              <li>Tea, or coffee.</li>
              <li>A chair, and someone to talk to.</li>
            </ol>
            <p>Most good hostel conversations start over something hot to drink. We'd like them to start here.</p>
          </div>
        </section>
        <section className="wp c-when" aria-labelledby="w2">
          <div className="mark" aria-hidden="true">
            <div className="pt">
              <svg viewBox="0 0 34 30">
                <path d="M17 2l15 26H2z" fill="#C2412D" />
                <circle cx="17" cy="19" r="3" fill="#EFEAD8" />
              </svg>
              <span className="num">02</span>
            </div>
          </div>
          <div className="body">
            <p className="mono">Waypoint 02 · Hours</p>
            <div className="c-panel">
              <div className="seam w" aria-hidden="true">
                <svg className="weave" preserveAspectRatio="none">
                  <defs>
                    <pattern id="c-weave" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <rect width="36" height="36" fill="#5E4526" />
                      <g fill="#D9C49A">
                        <rect x="1" y="1" width="16" height="7.5" />
                        <rect x="1" y="9.5" width="16" height="7.5" />
                        <rect x="19" y="19" width="16" height="7.5" />
                        <rect x="19" y="27.5" width="16" height="7.5" />
                      </g>
                      <g fill="#C8AE7C">
                        <rect x="19" y="1" width="7.5" height="16" />
                        <rect x="27.5" y="1" width="7.5" height="16" />
                        <rect x="1" y="19" width="7.5" height="16" />
                        <rect x="9.5" y="19" width="7.5" height="16" />
                      </g>
                      <g stroke="#9C7F50" strokeWidth=".7">
                        <path d="M2 4.5h14M2 13h14M20 23h14M20 31.5h14" />
                        <path d="M22.5 2v14M31 2v14M4.5 20v14M13 20v14" />
                      </g>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#c-weave)" />
                </svg>
              </div>
              <div className="seam c" aria-hidden="true">
                <svg className="culm" viewBox="0 0 56 900" preserveAspectRatio="xMidYMin slice" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                  <path d="M22 0 V900 M34 0 V900" />
                  <path d="M26 0 V900 M30 0 V900" strokeWidth=".5" />
                  <g strokeWidth="1.6">
                    <path d="M18 120 q10 -5 20 0 M18 124 q10 -4 20 0" />
                    <path d="M18 300 q10 -5 20 0 M18 304 q10 -4 20 0" />
                    <path d="M18 480 q10 -5 20 0 M18 484 q10 -4 20 0" />
                    <path d="M18 660 q10 -5 20 0 M18 664 q10 -4 20 0" />
                  </g>
                  <path d="M34 300 q10 -18 18 -40 M52 260 q-14 6 -18 26 q14 -4 18 -26 Z M22 480 q-10 -16 -18 -30 M4 450 q2 16 18 26 q-2 -16 -18 -26 Z" />
                </svg>
              </div>
              <img className="grove" src="/art/bamboo-grove.svg" alt="" aria-hidden="true" width="300" height="800" />
              <div className="text">
                <p className="mono">When and who</p>
                <h2 id="w2">The kettle's on when we're open.</h2>
                <dl>
                  <dt>When</dt>
                  <dd>Every day, 12 pm to 11 pm<br />Breakfast around 10–10:30 am</dd>
                  <dt>Who</dt>
                  <dd>Guests, and day visitors are welcome.</dd>
                </dl>
                <p className="note">The strip on the left is drawn from the woven bamboo ceiling of the dining shed.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="wp c-food" aria-labelledby="w3">
          <svg className="contours" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ transform: "scaleX(-1)" }}>
            <use href="#topoB" />
          </svg>
          <div className="mark" aria-hidden="true">
            <div className="pt">
              <svg viewBox="0 0 34 30">
                <path d="M17 2l15 26H2z" fill="#C2412D" />
                <circle cx="17" cy="19" r="3" fill="#EFEAD8" />
              </svg>
              <span className="num">03</span>
            </div>
          </div>
          <div className="body">
            <p className="mono">Waypoint 03 · Eating here</p>
            <h2 id="w3">
              Before you order
              <small>A few things worth knowing.</small>
            </h2>
            <div className="c-menu">
              <aside className="c-side" aria-label="Notes beside the menu">
                <h3>Not on our menu</h3>
                <ul className="town"><li>Kalimpong's local cheese</li><li>A Kalimpong lollipop</li><li>Momos</li></ul>
                <p>Try them in town. Ask us where.</p>
                <h3>Eating preferences</h3>
                <p>We can do veg and vegan. The kitchen is very small, so we can't rule out cross-contamination: if you have an allergy, tell us before you order.</p>
                <h3>Paying</h3>
                <p>Café bills are paid at the time, not added to your room bill.</p>
              </aside>
            </div>
          </div>
        </section>
        <section className="wp c-around" aria-labelledby="w4">
          <div className="mark" aria-hidden="true">
            <div className="pt">
              <svg viewBox="0 0 34 30">
                <path d="M17 2l15 26H2z" fill="#C2412D" />
                <circle cx="17" cy="19" r="3" fill="#EFEAD8" />
              </svg>
              <span className="num">04</span>
            </div>
          </div>
          <div className="body">
            <p className="mono">Waypoint 04 · Around the table</p>
            <h2 id="w4">The grounds<small>Our own photos of what's outside. Scroll sideways.</small></h2>
            <div className="c-striphead">
              <p className="cap">Seven plates · drag, swipe or use the arrows</p>
              <StripButtons />
            </div>
            <div className="c-strip" tabIndex={0} role="region" aria-label="Photos of the grounds, scrolls sideways">
              <figure className="plate detail">
                <div className="frame">
                  <div className="crop">
                    <img src="/photos/dining-shed-sm.jpg" width="720" height="960" loading="lazy" alt="Close up: the woven bamboo mats of the dining-shed ceiling, held up on pale bamboo rafters." />
                  </div>
                </div>
                <figcaption className="cap">Detail · The woven ceiling in the bamboo dining shed.</figcaption>
              </figure>
              <figure className="plate">
                <div className="frame">
                  <img src="/photos/deck-wide-sm.jpg" srcSet="/photos/deck-wide-sm.jpg 800w, /photos/deck-wide.jpg 1600w" sizes="(max-width:640px) 380px, 680px" width="1600" height="1200" loading="lazy" alt="The bamboo-pole deck with its lattice frame, two tyre rings on posts and hostas in painted-tyre planters, under tall trunks." />
                </div>
                <figcaption className="cap">The bamboo deck, under tall trunks.</figcaption>
              </figure>
              <figure className="plate">
                <div className="frame">
                  <img src="/photos/cottage-front-sm.jpg" srcSet="/photos/cottage-front-sm.jpg 720w, /photos/cottage-front.jpg 1200w" sizes="(max-width:640px) 220px, 380px" width="1200" height="1600" loading="lazy" alt="The cottage head-on: green tin roof, white lace trim along the eaves, a lattice gable and a wooden verandah rail, a stone path across the lawn." />
                </div>
                <figcaption className="cap">The cottage, from the lawn.</figcaption>
              </figure>
              <figure className="plate">
                <div className="frame">
                  <img src="/photos/side-path-sm.jpg" srcSet="/photos/side-path-sm.jpg 800w, /photos/side-path.jpg 1600w" sizes="(max-width:640px) 380px, 680px" width="1600" height="1200" loading="lazy" alt="A gravel path along the side of the cottage with a bamboo railing and forest beyond." />
                </div>
                <figcaption className="cap">The path along the side of the cottage.</figcaption>
              </figure>
              <figure className="plate">
                <div className="frame">
                  <img src="/photos/flower-path-sm.jpg" srcSet="/photos/flower-path-sm.jpg 634w, /photos/flower-path.jpg 1056w" sizes="(max-width:640px) 190px, 340px" width="1056" height="1600" loading="lazy" alt="A red flower in the foreground with a forest path rising into hazy light." />
                </div>
                <figcaption className="cap">Red flowers by the forest path.</figcaption>
              </figure>
              <figure className="plate">
                <div className="frame">
                  <img src="/photos/forest-path-sm.jpg" srcSet="/photos/forest-path-sm.jpg 720w, /photos/forest-path.jpg 1200w" sizes="(max-width:640px) 220px, 380px" width="1200" height="1600" loading="lazy" alt="An earthen path between a bank of bushes and a tall stand of bamboo." />
                </div>
                <figcaption className="cap">A path through the bamboo.</figcaption>
              </figure>
              <figure className="plate">
                <div className="frame">
                  <img src="/photos/treeline-sm.jpg" srcSet="/photos/treeline-sm.jpg 800w, /photos/treeline.jpg 1600w" sizes="(max-width:640px) 380px, 680px" width="1600" height="1200" loading="lazy" alt="A hedge and very tall trees against a bright sky." />
                </div>
                <figcaption className="cap">The treeline at the edge of the lawn.</figcaption>
              </figure>
            </div>
          </div>
        </section>
      </div>
      <CloseBand />
    </PageShell>
  );
}
