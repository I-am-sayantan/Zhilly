import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CloseBand from "@/components/CloseBand";
import PageShell from "@/components/PageShell";
import "./page.css";

export const metadata: Metadata = {
  title: "Around Kalimpong · Zhilly",
  description: "What's around Zhilly in Kalimpong: Deolo Hill, the gompas, the nurseries, the haat bazaar, and day trips to Lava, Lolegaon, Rishyap, Pedong, Sillery Gaon and Ichhey Gaon.",
};

export default function AroundPage() {
  return (
    <PageShell page="around-kalimpong" nav="around">
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <defs>
          <symbol id="k-hill" viewBox="0 0 24 24">
            <path d="M12 2.5 22.5 21h-21z" fill="#C2412D" />
            <circle cx="12" cy="14.6" r="2.6" fill="#F7F3E6" />
          </symbol>
          <symbol id="k-gompa" viewBox="0 0 24 24">
            <g fill="none" stroke="#A3331F" strokeWidth="1.7" strokeLinejoin="round">
              <path d="M4.5 21.5h15v-3h-15z" />
              <path d="M6.5 18.5h11l-1.6-3H8.1z" />
              <path d="M8.3 15.5a3.7 3.7 0 0 1 7.4 0" />
              <path d="M12 11.8V4.6" />
              <path d="M10 6.4h4M10.5 8.6h3" />
            </g>
            <circle cx="12" cy="3" r="1.3" fill="#A3331F" />
          </symbol>
          <symbol id="k-bldg" viewBox="0 0 24 24">
            <g fill="none" stroke="#1D2320" strokeWidth="1.7" strokeLinejoin="round">
              <path d="M2.5 11.5 12 3.5l9.5 8" />
              <path d="M5 10v11.5h14V10" />
              <path d="M10 21.5v-5.5h4v5.5" />
            </g>
            <path d="M9.5 9.2 12 7l2.5 2.2z" fill="#1D2320" />
          </symbol>
          <symbol id="k-nursery" viewBox="0 0 24 24">
            <g fill="none" stroke="#2F4A3A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 21V5.8a2 2 0 0 1 4 0V21" />
              <path d="M10 14.5H7.6A1.6 1.6 0 0 1 6 12.9V9.5" />
              <path d="M14 12.2h2.4a1.6 1.6 0 0 0 1.6-1.6V7.4" />
              <path d="M4 21.5h16" />
            </g>
          </symbol>
          <symbol id="k-market" viewBox="0 0 24 24">
            <g fill="none" stroke="#7A5230" strokeWidth="1.7" strokeLinejoin="round">
              <path d="M2.5 9 5 3.5h14L21.5 9z" />
              <path d="M2.5 9q1.6 2.4 3.2 0 1.6 2.4 3.2 0 1.6 2.4 3.2 0 1.6 2.4 3.2 0 1.6 2.4 3.2 0 1.6 2.4 3.2 0" />
              <path d="M5 11v10.5M19 11v10.5M5 16h14" />
            </g>
          </symbol>
        </defs>
      </svg>
      <section className="phero" aria-labelledby="h1">
        <img src="/photos/forest-slope.jpg" srcSet="/photos/forest-slope-sm.jpg 960w, /photos/forest-slope.jpg 2000w" sizes="100vw" width="2000" height="1500" fetchPriority="high" alt="Forest falling away down a slope at Zhilly: tall thin trunks, bamboo and ferns, with sunlight on the grass in front." />
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Zhilly</Link>
            <span aria-hidden="true">/</span>
            <span>Around Kalimpong</span>
          </nav>
          <h1 id="h1">Out past the trees.</h1>
          <p className="lead">Gompas, nurseries, a market and one high hill. The short list of what's around you.</p>
          <p className="credit">The slope below our lawn. We have no photos of town yet; we'll take our own.</p>
        </div>
        <span className="eave" aria-hidden="true" />
      </section>
      <div className="trail">
        <section className="wp" id="town" aria-labelledby="wp1">
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
            <p className="mono">Waypoint 01 · In town</p>
            <h2 id="wp1">The town<small>What's in Kalimpong, sorted the way a map key would sort it.</small></h2>
            <div className="ak-key">
              <aside className="ak-legend" aria-label="Map key">
                <p className="mono"><span>Key</span><span>Kalimpong</span></p>
                <ul>
                  <li><svg className="sym" aria-hidden="true"><use href="#k-hill" /></svg>High ground</li>
                  <li><svg className="sym" aria-hidden="true"><use href="#k-gompa" /></svg>Gompa</li>
                  <li><svg className="sym" aria-hidden="true"><use href="#k-bldg" /></svg>Landmark</li>
                  <li><svg className="sym" aria-hidden="true"><use href="#k-nursery" /></svg>Nursery</li>
                  <li><svg className="sym" aria-hidden="true"><use href="#k-market" /></svg>Market</li>
                </ul>
                <p className="ak-spot">
                  <span className="fig">1,250 <small>m</small></span>
                  <span className="cap">Spot height: the town, about. Not a survey of our gate.</span>
                </p>
              </aside>
              <div className="ak-groups">
                <div className="ak-grp">
                  <h3><svg className="sym" aria-hidden="true"><use href="#k-hill" /></svg>High ground</h3>
                  <ul>
                    <li><b>Deolo Hill</b><span>The highest point in town. Kanchenjunga, on clear days.</span></li>
                  </ul>
                </div>
                <div className="ak-grp">
                  <h3><svg className="sym" aria-hidden="true"><use href="#k-gompa" /></svg>Gompas</h3>
                  <ul>
                    <li><b>Thongsa Gompa</b><span>Founded 1678.</span></li>
                    <li><b>Tharpa Choling</b></li>
                    <li><b>Durpin Gompa</b></li>
                  </ul>
                </div>
                <div className="ak-grp">
                  <h3><svg className="sym" aria-hidden="true"><use href="#k-bldg" /></svg>Landmarks</h3>
                  <ul>
                    <li>
                      <b>Dr Graham's Homes</b>
                      <span>Holds a May Fair.</span>
                    </li>
                    <li><b>Morgan House</b></li>
                  </ul>
                  <p className="also">Also on the district's list: the Army Golf Course and the Forest Museum.</p>
                </div>
                <div className="ak-grp">
                  <h3><svg className="sym" aria-hidden="true"><use href="#k-nursery" /></svg>Nurseries</h3>
                  <ul>
                    <li><b>Pine View Nursery</b><span>Cacti.</span></li>
                    <li><b>The others</b><span>Many hold flower exhibitions in October.</span></li>
                  </ul>
                </div>
                <div className="ak-grp">
                  <h3><svg className="sym" aria-hidden="true"><use href="#k-market" /></svg>Market</h3>
                  <ul>
                    <li>
                      <b>The haat bazaar</b>
                      <span>Try the local cheese, a Kalimpong lollipop and momos while you're in town.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="wp" id="a-day" aria-labelledby="wp2">
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
            <p className="mono">Waypoint 02 · Planning a day</p>
            <h2 id="wp2">A day out<small>Pick a thread for half a day. Two make a whole one.</small></h2>
            <div className="ak-split">
              <div className="half">
                <h3>Half a day.</h3>
                <ol className="ak-threads">
                  <li>
                    <span className="k">A</span>
                    <div>
                      <b>The high ground</b>
                      <p>Deolo Hill, the top of town. Kanchenjunga, if the day is clear.</p>
                    </div>
                  </li>
                  <li>
                    <span className="k">B</span>
                    <div><b>The gompas</b><p>Thongsa (founded 1678), Tharpa Choling and Durpin.</p></div>
                  </li>
                  <li>
                    <span className="k">C</span>
                    <div>
                      <b>The market</b>
                      <p>The haat bazaar, then cheese, a lollipop and momos somewhere in town.</p>
                    </div>
                  </li>
                  <li>
                    <span className="k">D</span>
                    <div>
                      <b>Green things</b>
                      <p>Pine View's cacti and the other nurseries. Flower exhibitions in October.</p>
                    </div>
                  </li>
                  <li>
                    <span className="k">E</span>
                    <div><b>Landmarks</b><p>Dr Graham's Homes and Morgan House.</p></div>
                  </li>
                </ol>
              </div>
              <span className="ak-vrule" aria-hidden="true" />
              <div className="whole">
                <h3>The whole day.</h3>
                <p className="big">Any two threads, back to back. Or leave town for one of the villages further out.</p>
                <p>Back under the tall trees by evening.</p>
                <p className="ak-hand">
                  We'll add our own notes (timings, the best order, where to eat) once we've walked these with guests.
                </p>
                <figure className="plate">
                  <div className="frame">
                    <img src="/photos/flower-path-sm.jpg" srcSet="/photos/flower-path-sm.jpg 634w, /photos/flower-path.jpg 1320w" sizes="(max-width:640px) 80vw, 340px" width="1320" height="2000" loading="lazy" alt="A red flower in the foreground with a forest path on the Zhilly grounds rising into hazy light." />
                  </div>
                  <figcaption className="cap">Plate · A path on our own grounds, not in town.</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>
        <section className="wp" id="further" aria-labelledby="wp3">
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
            <p className="mono">Waypoint 03 · Day trips</p>
            <h2 id="wp3">
              Further out
              <small>Six villages and a hilltop for a day out of town, nearest first. Road distances from Kalimpong town, from the district site and travel guides; where they disagree, we give the range.</small>
            </h2>
            <ul className="ak-road">
              <li className="stone" style={{ "--r": "-1.5deg" } as CSSProperties}>
                <b>Deolo</b>
                <span className="km">5–10 km</span>
              </li>
              <li className="stone" style={{ "--r": "1deg" } as CSSProperties}>
                <b>Ichhey Gaon</b>
                <span className="km">17 km</span>
              </li>
              <li className="stone" style={{ "--r": "-.6deg" } as CSSProperties}>
                <b>Pedong</b>
                <span className="km">20–22 km</span>
              </li>
              <li className="stone" style={{ "--r": "1.6deg" } as CSSProperties}>
                <b>Sillery Gaon</b>
                <span className="km">23–33 km</span>
              </li>
              <li className="stone" style={{ "--r": "-1.2deg" } as CSSProperties}>
                <b>Rishyap</b>
                <span className="km">28–35 km</span>
              </li>
              <li className="stone" style={{ "--r": ".8deg" } as CSSProperties}>
                <b>Lava</b>
                <span className="km">30–34 km</span>
              </li>
              <li className="stone" style={{ "--r": "-1deg" } as CSSProperties}>
                <b>Lolegaon</b>
                <span className="km">30–55 km</span>
              </li>
            </ul>
            <div className="ak-trips">
              <div>
                <h3>Getting there</h3>
                <p>Ask us the evening before and we'll help you sort it.</p>
              </div>
              <div>
                <h3>In the rains</h3>
                <p>
                  The road via Lava was blocked by a landslide in July 2025. In the monsoon, check before you set off.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="wp" id="notes" aria-labelledby="wp4">
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
            <p className="mono">Waypoint 04 · Field notes</p>
            <h2 id="wp4">
              Before you go
              <small>The year as the district describes it, and a few things worth knowing.</small>
            </h2>
            <div className="ak-year" role="list" aria-label="Kalimpong's seasons through the year">
              <span className="m" aria-hidden="true" style={{ "--s": "1", "--e": "3" } as CSSProperties}>Jan</span>
              <span className="m" aria-hidden="true" style={{ "--s": "3", "--e": "5" } as CSSProperties}>Feb</span>
              <span className="m" aria-hidden="true" style={{ "--s": "5", "--e": "7" } as CSSProperties}>Mar</span>
              <span className="m" aria-hidden="true" style={{ "--s": "7", "--e": "9" } as CSSProperties}>Apr</span>
              <span className="m" aria-hidden="true" style={{ "--s": "9", "--e": "11" } as CSSProperties}>May</span>
              <span className="m" aria-hidden="true" style={{ "--s": "11", "--e": "13" } as CSSProperties}>Jun</span>
              <span className="m" aria-hidden="true" style={{ "--s": "13", "--e": "15" } as CSSProperties}>Jul</span>
              <span className="m" aria-hidden="true" style={{ "--s": "15", "--e": "17" } as CSSProperties}>Aug</span>
              <span className="m" aria-hidden="true" style={{ "--s": "17", "--e": "19" } as CSSProperties}>Sep</span>
              <span className="m" aria-hidden="true" style={{ "--s": "19", "--e": "21" } as CSSProperties}>Oct</span>
              <span className="m" aria-hidden="true" style={{ "--s": "21", "--e": "23" } as CSSProperties}>Nov</span>
              <span className="m" aria-hidden="true" style={{ "--s": "23", "--e": "25" } as CSSProperties}>Dec</span>
              <div className="s win" role="listitem" style={{ "--s": "1", "--e": "5" } as CSSProperties}>
                <b>Winter</b>
                <span>Dec to Feb. Cold and dry, about 5 to 17&nbsp;°C.</span>
              </div>
              <div className="s spr" role="listitem" style={{ "--s": "5", "--e": "9" } as CSSProperties}>
                <b>Spring</b>
                <span>Mar and Apr. Rhododendrons flower up in Neora Valley.</span>
              </div>
              <div className="s sum" role="listitem" style={{ "--s": "9", "--e": "12" } as CSSProperties}>
                <b>Summer</b>
                <span>May to mid-June. Warm, about 16 to 27&nbsp;°C.</span>
              </div>
              <div className="s mon" role="listitem" style={{ "--s": "12", "--e": "19" } as CSSProperties}>
                <b>Monsoon</b>
                <span>Mid-June to September. Long rains, and the hills at their greenest. If NH10 closes, traffic goes the long way, via Gorubathan and Lava: allow hours more.</span>
              </div>
              <div className="s aut" role="listitem" style={{ "--s": "19", "--e": "23" } as CSSProperties}>
                <b>Autumn</b>
                <span>Oct and Nov. The nurseries hold their flower shows in October.</span>
              </div>
              <div className="s win cont" role="listitem" style={{ "--s": "23", "--e": "25" } as CSSProperties}>
                <b>Winter</b>
              </div>
            </div>
            <p className="cap ak-src">
              Seasons and temperatures from the Kalimpong district administration. Approximate.
            </p>
            <dl className="ak-notes">
              <div>
                <dt>Clear days</dt>
                <dd>Kanchenjunga shows from Deolo on clear days. If you wake up to one, change your plans for it.</dd>
              </div>
              <div>
                <dt>The road</dt>
                <dd>
                  NH10 can close in the monsoon. Check road status before you travel.{" "}
                  <Link href="/find-us/">How to get here</Link>
                </dd>
              </div>
              <div>
                <dt>Sikkim next?</dt>
                <dd>
                  Foreign nationals need a Restricted Area Permit for Sikkim. Check the current process before you go.
                </dd>
              </div>
              <div><dt>Ask us</dt><dd>How to get to any of these. Message us before you head out.</dd></div>
            </dl>
          </div>
        </section>
      </div>
      <CloseBand />
    </PageShell>
  );
}
