import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import CloseBand from "@/components/CloseBand";
import PageShell from "@/components/PageShell";
import { mail, site, wa } from "@/lib/site";

export const metadata: Metadata = pageMeta("/", "Zhilly · hostel and café in Kalimpong, Darjeeling hills", "Zhilly is a small social hostel and café in Kalimpong, West Bengal: eight dorm beds and a private room in a cottage under tall trees. Dorm bed ₹800 a night.", "Check out Zhilly · hostel and café in Kalimpong");

export default function HomePage() {
  return (
    <PageShell page="home" home>
      <section className="hero" aria-labelledby="h1">
        <p className="wm on-page" aria-hidden="true">Zhilly</p>
        <div className="photo">
          <img src="/photos/canopy-sky.jpg" srcSet="/photos/canopy-sky-sm.jpg 720w, /photos/canopy-sky.jpg 1200w" sizes="100vw" width="1200" height="1600" fetchPriority="high" alt="Looking straight up from the lawn at Zhilly: the dark crowns of very tall trees ring a wide patch of clear blue sky." />
          {" "}
          <svg className="bunting" data-flags="30" viewBox="0 0 1600 120" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-10 14 Q800 96 1610 22" fill="none" stroke="#E9E4D6" strokeWidth="1.5" />
            <g className="flagset" />
          </svg>
          <p className="wm on-photo" aria-hidden="true">Zhilly</p>
        </div>
        <div className="text">
          <p className="mono meta">Kalimpong, West Bengal · alt. about 1,250 m</p>
          <h1 id="h1">Eight beds, a private room, a café, and a lot of very tall trees.</h1>
        </div>
        <figure className="postcard">
          <img src="/photos/cottage-front.jpg" srcSet="/photos/cottage-front-sm.jpg 720w, /photos/cottage-front.jpg 1200w" sizes="(max-width:900px) 86vw, 27vw" width="1200" height="1600" alt="The Zhilly cottage head-on: green tin roof, white lace trim along the eaves, a lattice gable and a wooden verandah rail, with tall trees behind." />
          <figcaption><span className="hand">The cottage, from the lawn.</span></figcaption>
          <div className="pstamp" aria-hidden="true">
            <svg viewBox="0 0 72 90">
              <rect x="1" y="1" width="70" height="88" fill="#F8F2E4" />
              <g fill="none" stroke="#B83A26" strokeWidth="2">
                <path d="M8 60 L36 22 L64 60" strokeDasharray="5 3" />
                <path d="M22 41 L29 47 L36 40 L43 47 L50 41" />
                <path d="M8 66 H64" />
              </g>
              <text x="36" y="80" textAnchor="middle" fontSize="8" fontWeight="600" fill="#B83A26" letterSpacing="1" style={{ fontFamily: "var(--mono)" }}>
                KALIMPONG
              </text>
            </svg>
          </div>
          <svg className="postmark" viewBox="0 0 160 110" aria-hidden="true">
            <defs><path id="pmring" d="M55 55 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" /></defs>
            <circle cx="55" cy="55" r="48" fill="none" stroke="currentColor" strokeWidth="2.4" />
            <circle cx="55" cy="55" r="31" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <text fontSize="10.5" fontWeight="600" fill="currentColor" letterSpacing="1.2" style={{ fontFamily: "var(--mono)" }}>
              <textPath href="#pmring" startOffset="2%">KALIMPONG · C. 1,250 M · W.B. ·</textPath>
            </text>
            <text x="55" y="59" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor" style={{ fontFamily: "var(--mono)" }}>
              ZHILLY
            </text>
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M104 38 q7 -5 14 0 t14 0 t14 0 t12 0" />
              <path d="M104 50 q7 -5 14 0 t14 0 t14 0 t12 0" />
              <path d="M104 62 q7 -5 14 0 t14 0 t14 0 t12 0" />
              <path d="M104 74 q7 -5 14 0 t14 0 t14 0 t12 0" />
            </g>
          </svg>
        </figure>
      </section>
      <div className="trail">
        <section className="wp arrive" id="arrive" aria-labelledby="wp1">
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
            <p className="mono">Waypoint 01 · What Zhilly is</p>
            <h2 id="wp1">Arrive<small>Who it's for, and what to expect.</small></h2>
            <div className="cols">
              <div>
                <p className="lead">
                  A small social hostel and a café: eight dorm beds and a private room, in a cottage among tall trees and bamboo in Kalimpong. Social, yes. A party hostel, maybe.
                </p>
                <dl className="field">
                  <dt>Good for</dt>
                  <dd>Backpackers and solo travellers</dd>
                  <dd>People working remotely (internet: 40–50 Mbps)</dd>
                  <dd>Groups up for a hill weekend</dd>
                  <dt>Evenings</dt>
                  <dd>For talking. No set quiet hours yet.</dd>
                </dl>
              </div>
              <figure className="plate">
                <div className="frame">
                  <img src="/photos/cottage-clearing-sm.jpg" srcSet="/photos/cottage-clearing-sm.jpg 688w, /photos/cottage-clearing.jpg 1146w" sizes="(max-width:980px) 92vw, 40vw" width="1146" height="1600" loading="lazy" alt="The cottage seen small across a wide sunlit clearing, with a mown lawn in front and a tall forest of trees and bamboo rising behind it." />
                </div>
                <figcaption className="cap">Plate 1 · The cottage in its clearing.</figcaption>
              </figure>
            </div>
          </div>
        </section>
        <section className="wp bed" id="stay" aria-labelledby="wp2">
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
            <p className="mono">Waypoint 02 · Stay</p>
            <h2 id="wp2">
              Your bed
              <small>Eight dorm beds on four bunks, and one private room with a queen bed. Breakfast comes with every dorm bed.</small>
            </h2>
            <div className="cols">
              <div>
                <table>
                  <thead>
                    <tr><th scope="col">Room</th><th scope="col">Beds</th><th scope="col">₹ per night</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mixed dorm</td>
                      <td data-k="Beds">8, on four bunks</td>
                      <td data-k="Per night">₹800 a bed, with breakfast</td>
                    </tr>
                    <tr>
                      <td>Private room</td>
                      <td data-k="Beds">1 queen bed, own bathroom</td>
                      <td data-k="Per night">₹1,500 the room (₹1,700 with breakfast)</td>
                    </tr>
                  </tbody>
                </table>
                <p className="after">
                  Breakfast with dorm beds · Facilities: internet 40–50 Mbps, hot water, bed linen, blanket and towel · Check-in 11 am · Check-out 10 am
                </p>
              </div>
              <div className="nophoto">
                <svg className="stamp" viewBox="0 0 200 200" aria-hidden="true"><use href="#stamp-build" /></svg>
                <h3>Room photos after fit-out.</h3>
                <p>
                  We'd rather show you a blank than someone else's dorm. Ask us for a progress picture on{" "}
                  <a href={wa.checkDates}>WhatsApp ({site.phoneDisplay})</a> or by <a href={mail.checkDates}>email</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="wp cafe" id="cafe" aria-labelledby="wp3">
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
            <p className="mono">Waypoint 03</p>
            <div className="panel">
              <figure className="photo">
                <img src="/photos/dining-shed.jpg" srcSet="/photos/dining-shed-sm.jpg 720w, /photos/dining-shed.jpg 1200w" sizes="(max-width:980px) 92vw, 46vw" width="1200" height="1600" loading="lazy" alt="Inside the bamboo dining shed: a woven bamboo ceiling on pole rafters, bamboo-slat walls, chairs at a covered table and a turquoise-painted post in front." />
                <figcaption className="cap">The dining shed, morning</figcaption>
              </figure>
              <svg className="culm" viewBox="0 0 56 900" preserveAspectRatio="xMidYMin slice" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d="M22 0 V900 M34 0 V900" />
                <path d="M26 0 V900 M30 0 V900" strokeWidth=".5" />
                <g strokeWidth="1.6">
                  <path d="M18 150 q10 -5 20 0 M18 154 q10 -4 20 0" />
                  <path d="M18 330 q10 -5 20 0 M18 334 q10 -4 20 0" />
                  <path d="M18 510 q10 -5 20 0 M18 514 q10 -4 20 0" />
                  <path d="M18 690 q10 -5 20 0 M18 694 q10 -4 20 0" />
                </g>
                <path d="M34 330 q10 -18 18 -40 M52 290 q-14 6 -18 26 q14 -4 18 -26 Z M34 510 q-10 -16 -24 -30 M10 480 q2 16 18 26 q-2 -16 -18 -26 Z" />
              </svg>
              <div className="text">
                <p className="mono">Café</p>
                <h2 id="wp3">The café, under the trees.</h2>
                <p className="lead">Woven bamboo ceiling, turquoise posts, one long table.</p>
                <dl>
                  <dt>Hours</dt>
                  <dd>Every day, 12 pm to 11 pm</dd>
                </dl>
              </div>
            </div>
          </div>
        </section>
        <section className="wp ground" id="grounds" aria-labelledby="wp4">
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
            <p className="mono">Waypoint 04</p>
            <h2 id="wp4">The grounds<small>Our own photos of the lawn, the bamboo deck and the trees.</small></h2>
            <div className="gallery">
              <figure className="feat">
                <div className="frame">
                  <img src="/photos/grounds-wide.jpg" srcSet="/photos/grounds-wide-sm.jpg 800w, /photos/grounds-wide.jpg 1600w" sizes="(max-width:980px) 92vw, 58vw" width="1600" height="934" loading="lazy" alt="The lawn in sunshine, the bamboo deck behind a woven fence on the left and the green-roofed cottage on the right, under very tall trees." />
                </div>
                <figcaption className="cap">Plate 3 · The lawn. Deck on the left, cottage on the right.</figcaption>
              </figure>
              <figure>
                <div className="frame">
                  <img src="/photos/deck-wide-sm.jpg" srcSet="/photos/deck-wide-sm.jpg 800w, /photos/deck-wide.jpg 1600w" sizes="(max-width:980px) 46vw, 28vw" width="1600" height="1200" loading="lazy" alt="The bamboo-pole deck with its lattice frame, two tyre rings on posts and hostas in painted-tyre planters, under tall trunks." />
                </div>
                <figcaption className="cap">The bamboo deck.</figcaption>
              </figure>
              <figure>
                <div className="frame">
                  <img src="/photos/verandah-up-sm.jpg" srcSet="/photos/verandah-up-sm.jpg 800w, /photos/verandah-up.jpg 1600w" sizes="(max-width:980px) 46vw, 28vw" width="1600" height="1200" loading="lazy" alt="Looking up at the verandah: the white lace trim along the eaves, the lattice gable and treetops above." />
                </div>
                <figcaption className="cap">The lace trim on the eaves.</figcaption>
              </figure>
            </div>
            <details className="more">
              <summary>
                <span className="closed-txt">View all photos</span>
                <span className="open-txt">Hide photos</span>
                {" "}
                <span className="cap">(6 more)</span>
              </summary>
              <div className="all">
                <figure>
                  <img src="/photos/cottage-angle-sm.jpg" width="720" height="960" loading="lazy" decoding="async" alt="The cottage from an angle: green tin roof, white scalloped trim and the verandah rail." />
                  <figcaption className="cap">The cottage, from the corner of the lawn</figcaption>
                </figure>
                <figure>
                  <img src="/photos/forest-path-sm.jpg" width="720" height="960" loading="lazy" decoding="async" alt="An earthen path between a bank of bushes and a tall stand of bamboo." />
                  <figcaption className="cap">A path through the bamboo</figcaption>
                </figure>
                <figure>
                  <img src="/photos/side-path-sm.jpg" width="800" height="600" loading="lazy" decoding="async" alt="A gravel path along the side of the cottage with a bamboo railing and forest beyond." />
                  <figcaption className="cap">Along the side of the cottage</figcaption>
                </figure>
                <figure>
                  <img src="/photos/flower-path-sm.jpg" width="634" height="960" loading="lazy" decoding="async" alt="A red flower in the foreground with a forest path rising into hazy light." />
                  <figcaption className="cap">Red flowers by the path</figcaption>
                </figure>
                <figure>
                  <img src="/photos/forest-slope-sm.jpg" width="800" height="600" loading="lazy" decoding="async" alt="Forest falling away down a slope: tall thin trunks, bamboo and ferns." />
                  <figcaption className="cap">Where the forest drops away</figcaption>
                </figure>
                <figure>
                  <img src="/photos/treeline-sm.jpg" width="800" height="600" loading="lazy" decoding="async" alt="A hedge and very tall trees against a bright sky." />
                  <figcaption className="cap">The treeline at the edge of the lawn</figcaption>
                </figure>
              </div>
            </details>
          </div>
        </section>
        <section className="wp town" id="around" aria-labelledby="wp5">
          <svg className="contours" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#topoB" /></svg>
          <div className="mark" aria-hidden="true">
            <div className="pt">
              <svg viewBox="0 0 34 30">
                <path d="M17 2l15 26H2z" fill="#C2412D" />
                <circle cx="17" cy="19" r="3" fill="#EFEAD8" />
              </svg>
              <span className="num">05</span>
            </div>
          </div>
          <div className="body">
            <p className="mono">Waypoint 05 · Around Kalimpong</p>
            <h2 id="wp5">Kalimpong<small>Where we'd send a friend. Ask us how to get to any of them.</small></h2>
            <figure className="alt">
              <svg className="house" viewBox="0 0 400 200" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                <defs>
                  <pattern id="scal" width="12" height="9" patternUnits="userSpaceOnUse">
                    <path d="M0 0a6 6 0 0 0 12 0" strokeWidth="1.3" fill="none" style={{ stroke: "#1F2A24" }} />
                    <circle cx="6" cy="3.2" r="1.1" stroke="none" style={{ fill: "#1F2A24" }} />
                  </pattern>
                  <pattern id="tin" width="7" height="10" patternUnits="userSpaceOnUse">
                    <path d="M3.5 0v10" strokeWidth=".9" style={{ stroke: "#2F4A3A" }} />
                  </pattern>
                  <pattern id="lat" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <path d="M0 0h10M0 0v10" strokeWidth=".9" style={{ stroke: "#1F2A24" }} />
                  </pattern>
                </defs>
                <path d="M18 112 L92 56 H308 L382 112 Z" fill="url(#tin)" />
                <path d="M18 112 L92 56 H308 L382 112 Z" />
                <path d="M160 108 L200 30 L240 108 Z" fill="#F6F1E7" />
                <path d="M172 102 L200 48 L228 102 Z" fill="url(#lat)" />
                <path d="M160 108 L200 30 L240 108 Z" />
                <rect x="18" y="112" width="364" height="9" fill="url(#scal)" stroke="none" />
                <path d="M18 112 H382" />
                <path d="M46 121 V186 M354 121 V186" />
                <path d="M66 126 H334 V186 H66 Z" strokeWidth="1.2" />
                <path d="M110 126 V186 M156 126 V186 M244 126 V186 M290 126 V186 M66 156 H178 M222 156 H334" strokeWidth=".9" />
                <path d="M184 136 H216 V186 H184 Z" />
                <path d="M46 160 H178 M222 160 H354 M46 168 H178 M222 168 H354" strokeWidth="1.2" />
                <path d="M56 160 V186 M68 160 V186 M80 160 V186 M92 160 V186 M104 160 V186 M116 160 V186 M128 160 V186 M140 160 V186 M152 160 V186 M164 160 V186 M236 160 V186 M248 160 V186 M260 160 V186 M272 160 V186 M284 160 V186 M296 160 V186 M308 160 V186 M320 160 V186 M332 160 V186 M344 160 V186" strokeWidth=".9" />
                <path d="M30 186 H370 V196 H30 Z" strokeWidth="1.3" />
              </svg>
              {" "}
              <span className="num">1,250<span>m</span></span>
              <figcaption className="cap">
                Field note: Kalimpong town sits at about 1,250 m. Approximate, and not a survey of our gate.
              </figcaption>
            </figure>
            <div className="gaz">
              <div>
                <h3>In and around town</h3>
                <ul className="two">
                  <li><b>Deolo Hill</b><span>The highest point. Kanchenjunga, on clear days.</span></li>
                  <li><b>Durpin Gompa</b></li>
                  <li><b>Thongsa Gompa</b><span>Founded 1678.</span></li>
                  <li><b>Tharpa Choling</b></li>
                  <li><b>Dr Graham's Homes</b></li>
                  <li><b>Morgan House</b></li>
                  <li><b>Pine View Nursery</b><span>Cacti.</span></li>
                  <li><b>The haat bazaar</b></li>
                </ul>
              </div>
              <div>
                <h3>Day trips</h3>
                <ul className="two">
                  <li><b>Lava</b></li>
                  <li><b>Lolegaon</b></li>
                  <li><b>Rishyap</b></li>
                  <li><b>Pedong</b></li>
                  <li><b>Sillery Gaon</b></li>
                  <li><b>Ichhey Gaon</b></li>
                </ul>
                <div className="note">
                  <h3>Try in town</h3>
                  <p>The local cheese, a Kalimpong lollipop, and momos.</p>
                </div>
                <div className="note">
                  <h3>When to come</h3>
                  <p>
                    Every season has its own reason: rhododendrons in spring, the greenest hills in the monsoon, flower shows in October. Day-trip distances are on{" "}
                    <Link href="/around-kalimpong/">Around Kalimpong</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="wp here" id="here" aria-labelledby="wp6">
          <div className="mark" aria-hidden="true">
            <div className="pt">
              <svg viewBox="0 0 34 30">
                <path d="M17 2l15 26H2z" fill="#C2412D" />
                <circle cx="17" cy="19" r="3" fill="#EFEAD8" />
              </svg>
              <span className="num">06</span>
            </div>
          </div>
          <div className="body">
            <p className="mono">Waypoint 06 · Find us</p>
            <h2 id="wp6">Getting here<small>Up from the plains, along the river.</small></h2>
            <article className="ticket" aria-label="Route card: NJP to Kalimpong by road">
              <div className="main">
                <div className="toprow">
                  <span className="mono">Route card · by road</span>
                  <span className="mono">Single · one way</span>
                </div>
                <div className="ends">
                  <div className="end from">
                    <span className="mono">From</span>
                    <b>NJP</b>
                    <span className="cap">station · or Bagdogra airport</span>
                  </div>
                  <svg className="line" viewBox="0 0 600 110" aria-hidden="true">
                    <path className="river" d="M0 88 C60 78 110 96 170 86 S280 70 340 80 S460 96 520 82 S580 70 600 74" fill="none" stroke="#2F6E8E" strokeWidth="3" strokeLinecap="round" opacity=".7" />
                    <text x="250" y="104" fontSize="11" letterSpacing="2" fill="#2F6E8E" style={{ fontFamily: "var(--mono)" }}>
                      TEESTA
                    </text>
                    <path className="ghostroad" d="M14 58 C120 54 200 62 290 52 C360 44 400 52 430 40 C470 24 520 30 586 18" fill="none" stroke="#9A6B3F" strokeWidth="2" strokeDasharray=".1 9" strokeLinecap="round" opacity=".5" />
                    <path id="roadpath" className="road" d="M14 58 C120 54 200 62 290 52 C360 44 400 52 430 40 C470 24 520 30 586 18" fill="none" stroke="#C2412D" strokeWidth="3.6" strokeDasharray=".1 9" strokeLinecap="round" />
                    <circle cx="14" cy="58" r="6" fill="#1D2320" />
                    <circle cx="290" cy="52" r="7" fill="#F7F3E6" stroke="#1D2320" strokeWidth="2.6" />
                    <text x="290" y="32" textAnchor="middle" fontWeight="700" fontSize="14" fill="#1D2320" style={{ fontFamily: "var(--sans)" }}>
                      Teesta Bazaar
                    </text>
                    <text x="290" y="16" textAnchor="middle" fontSize="10" fill="#4A4F48" style={{ fontFamily: "var(--mono)" }}>
                      turn off here
                    </text>
                    <text x="150" y="46" textAnchor="middle" fontSize="11" letterSpacing="1.5" fill="#A3331F" style={{ fontFamily: "var(--mono)" }}>
                      NH10
                    </text>
                    <path d="M586 4 l11 18 h-22 z" fill="#C2412D" />
                    <g className="jeep" transform="translate(580 12)">
                      <rect x="-13" y="-9" width="26" height="12" rx="2" fill="#2F4A3A" />
                      <rect x="-9" y="-15" width="14" height="7" rx="1.5" fill="#2F4A3A" />
                      <rect x="-7" y="-13" width="5" height="4" fill="#DCE6DD" />
                      <circle cx="-7" cy="4" r="3.4" fill="#1D2320" />
                      <circle cx="7" cy="4" r="3.4" fill="#1D2320" />
                    </g>
                  </svg>
                  <div className="end to">
                    <span className="mono">To</span>
                    <b>Kalimpong</b>
                    <span className="cap">alt. about 1,250 m</span>
                  </div>
                </div>
                <dl className="facts">
                  <div><dt>Distance</dt><dd>About 73 km</dd></div>
                  <div><dt>Time</dt><dd>About 2.5 h</dd></div>
                  <div><dt>Road</dt><dd>NH10, along the Teesta</dd></div>
                  <div><dt>Turn off</dt><dd>Teesta Bazaar</dd></div>
                </dl>
              </div>
              <div className="stub">
                <div><span className="mono">Flying in</span><b>Bagdogra</b><span>About 78 km to Kalimpong.</span></div>
                <div>
                  <span className="mono">Last stretch</span>
                  <b>To our gate</b>
                  <span>Lower Bong Basti, Kalimpong.</span>
                </div>
              </div>
              <p className="roadstamp">NH10 can close in the monsoon<br />Check road status before you travel</p>
            </article>
            <p className="cap ticketnote">Distances and times are approximate and change with traffic and weather.</p>
          </div>
        </section>
        <section className="wp finish" id="how-to-book" aria-labelledby="wp7">
          <div className="mark" aria-hidden="true">
            <div className="pt">
              <svg className="x" viewBox="0 0 30 30">
                <path d="M4 4l22 22M26 4L4 26" stroke="#C2412D" strokeWidth="5" strokeLinecap="round" />
              </svg>
              <span className="num">End</span>
            </div>
          </div>
          <div className="body">
            <p className="mono">Trail's end · Plan your stay</p>
            <h2 id="wp7">Book a bed<small>A booking enquiry, then four short legs.</small></h2>
            <ol className="legs">
              <li><h3>Send us your dates</h3><p>Send a booking enquiry on this site, or message us on WhatsApp or by email, with how many of you are coming.</p></li>
              <li><h3>We reply with a quote</h3><p>What's free and what it costs.</p></li>
              <li>
                <h3>Pay an advance by UPI</h3>
                <p>
                  That holds the beds. Pay half the total, or all of it. Cancel 7 or more days ahead for a full refund.
                </p>
              </li>
              <li><h3>You're confirmed</h3><p>By email or WhatsApp.</p></li>
            </ol>
            <p className="upi">
              <strong>Never pay anyone who isn't us.</strong>
              {" "}If anyone asks you to pay somewhere else, check with us on WhatsApp or by email first.
            </p>
          </div>
        </section>
      </div>
      <CloseBand />
    </PageShell>
  );
}
