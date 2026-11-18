import type { Metadata } from "next";
import Link from "next/link";
import CloseBand from "@/components/CloseBand";
import PageShell from "@/components/PageShell";
import SocialLinks from "@/components/SocialLinks";
import { mail, site, wa } from "@/lib/site";
import "./page.css";

export const metadata: Metadata = {
  title: "Find us · Zhilly",
  description: "How to get to Zhilly in Kalimpong: about 73 km from NJP station and about 78 km from Bagdogra airport by NH10 along the Teesta, plus how to reach us.",
};

export default function FindUsPage() {
  return (
    <PageShell page="find-us" nav="find">
      <section className="phero" aria-labelledby="h1">
        <img src="/photos/side-path.jpg" srcSet="/photos/side-path-sm.jpg 960w, /photos/side-path.jpg 2000w" sizes="100vw" width="2000" height="1500" fetchPriority="high" alt="A gravel path running along the side of the Zhilly cottage, with a bamboo railing on the left, tall trees and bamboo beyond, and the white lace trim of the eaves on the right." />
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Zhilly</Link>
            <span aria-hidden="true">/</span>
            <span>Find us</span>
          </nav>
          <h1 id="h1">The way up.</h1>
          <p className="lead">
            From the plains, along the Teesta, to a cottage under very tall trees. Here's how, and how to reach us.
          </p>
          <p className="credit">The path along the side of the cottage. Nearly there.</p>
        </div>
        <span className="eave" aria-hidden="true" />
      </section>
      <div className="trail">
        <section className="wp" id="road" aria-labelledby="wp1">
          <svg className="contours" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#topoB" /></svg>
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
            <p className="mono">Waypoint 01 · The whole way</p>
            <h2 id="wp1">The road<small>Up from the plains, along the river, to about 1,250 m.</small></h2>
            <figure className="fu-map">
              {/* wide sketch (desktop) */}
              <svg className="sk sk-h" viewBox="0 0 1200 440" role="img" aria-label="Route sketch, not to scale: from NJP station or Bagdogra airport to Siliguri and Sevoke, then NH10 along the Teesta to Teesta Bazaar, where you turn off and climb to Kalimpong.">
                <g fill="none" stroke="#9A6B3F" strokeWidth="1.2" opacity=".55">
                  <path d="M880 118C900 52 1010 30 1090 44S1200 110 1176 160S1060 214 980 200S862 170 880 118Z" />
                  <path d="M926 120C936 80 1010 66 1068 76S1146 118 1130 150S1056 182 1000 172S918 152 926 120Z" />
                  <path d="M968 118C976 96 1022 90 1054 96S1094 122 1084 138S1040 152 1010 146S962 136 968 118Z" />
                </g>
                <g fontSize="13" letterSpacing="3" fill="#7A5230" opacity=".8" style={{ fontFamily: "var(--mono)" }}>
                  <text x="70" y="432">THE PLAINS</text>
                  <text x="1000" y="432">THE HILLS</text>
                </g>
                <path d="M300 316C410 322 480 282 575 296S730 344 850 322S1010 350 1200 338" fill="none" stroke="#2F6E8E" strokeWidth="3.2" strokeLinecap="round" opacity=".75" />
                <text x="640" y="362" fontSize="13" letterSpacing="4" fill="#2F6E8E" style={{ fontFamily: "var(--mono)" }}>
                  TEESTA
                </text>
                <g fill="none" stroke="#C2412D" strokeWidth="4" strokeLinecap="round" strokeDasharray=".1 11">
                  <path d="M80 120C190 120 240 215 340 230" />
                  <path d="M80 330C190 330 250 245 340 230" />
                  <path d="M340 230C430 250 480 205 570 222S720 272 830 250" />
                  <path d="M830 250C870 240 860 205 900 196C945 186 905 160 950 148C990 138 975 112 1040 100" />
                </g>
                <path d="M1040 100C1080 104 1100 140 1128 166" fill="none" stroke="#1D2320" strokeWidth="2" strokeDasharray="6 6" />
                <circle cx="1132" cy="170" r="13" fill="#F7F3E6" stroke="#9A6B3F" strokeWidth="1.6" strokeDasharray="4 3" />
                <text x="455" y="208" fontSize="13" fontWeight="600" letterSpacing="2" fill="#A3331F" style={{ fontFamily: "var(--mono)" }}>
                  NH10
                </text>
                <circle cx="80" cy="120" r="8" fill="#1D2320" />
                <text x="62" y="66" fontSize="12" letterSpacing="2" fill="#7A5230" style={{ fontFamily: "var(--mono)" }}>
                  STATION
                </text>
                <text x="60" y="100" fontWeight="800" fontSize="34" fill="#1D2320" style={{ fontFamily: "var(--sans)" }}>
                  NJP
                </text>
                <circle cx="80" cy="330" r="8" fill="#F7F3E6" stroke="#1D2320" strokeWidth="3" />
                <text x="60" y="378" fontWeight="800" fontSize="30" fill="#1D2320" style={{ fontFamily: "var(--sans)" }}>
                  Bagdogra
                </text>
                <text x="62" y="400" fontSize="12" letterSpacing="2" fill="#7A5230" style={{ fontFamily: "var(--mono)" }}>
                  AIRPORT
                </text>
                <circle cx="340" cy="230" r="8" fill="#F7F3E6" stroke="#1D2320" strokeWidth="2.6" />
                <text x="340" y="266" textAnchor="middle" fontWeight="700" fontSize="17" fill="#1D2320" style={{ fontFamily: "var(--sans)" }}>
                  Siliguri · Sevoke
                </text>
                <text x="340" y="284" textAnchor="middle" fontSize="11" fill="#4A4F48" style={{ fontFamily: "var(--mono)" }}>
                  NH10 picks up the river
                </text>
                <circle cx="830" cy="250" r="8" fill="#F7F3E6" stroke="#1D2320" strokeWidth="2.6" />
                <text x="814" y="200" textAnchor="end" fontSize="11" fill="#4A4F48" style={{ fontFamily: "var(--mono)" }}>
                  TURN OFF HERE
                </text>
                <text x="814" y="222" textAnchor="end" fontWeight="700" fontSize="19" fill="#1D2320" style={{ fontFamily: "var(--sans)" }}>
                  Teesta Bazaar
                </text>
                <path d="M1040 84l14 24h-28z" fill="#C2412D" />
                <circle cx="1040" cy="99" r="3" fill="#EFEAD8" />
                <text x="1010" y="30" textAnchor="middle" fontSize="12" letterSpacing="2" fill="#7A5230" style={{ fontFamily: "var(--mono)" }}>
                  ABOUT 1,250 M
                </text>
                <text x="1010" y="66" textAnchor="middle" fontWeight="800" fontSize="34" fill="#1D2320" style={{ fontFamily: "var(--sans)" }}>
                  Kalimpong
                </text>
              </svg>
              {/* tall sketch (phone) */}
              <svg className="sk sk-v" viewBox="0 0 360 860" role="img" aria-label="Route sketch, not to scale: from NJP station or Bagdogra airport to Siliguri and Sevoke, then NH10 along the Teesta to Teesta Bazaar, where you turn off and climb to Kalimpong.">
                <g fill="none" stroke="#9A6B3F" strokeWidth="1.2" opacity=".55">
                  <path d="M60 760C50 700 120 660 190 668S300 720 290 780S200 846 140 836S68 810 60 760Z" />
                  <path d="M96 762C92 724 140 700 186 706S256 740 250 778S194 818 152 812S100 796 96 762Z" />
                </g>
                <path d="M230 180C260 270 200 330 222 400S280 480 240 560S300 700 286 860" fill="none" stroke="#2F6E8E" strokeWidth="3" strokeLinecap="round" opacity=".75" />
                <text x="0" y="0" transform="translate(262 330) rotate(90)" fontSize="12" letterSpacing="4" fill="#2F6E8E" style={{ fontFamily: "var(--mono)" }}>
                  TEESTA
                </text>
                <g fill="none" stroke="#C2412D" strokeWidth="4" strokeLinecap="round" strokeDasharray=".1 10">
                  <path d="M60 92C60 150 120 190 180 205" />
                  <path d="M300 92C300 150 240 190 180 205" />
                  <path d="M180 205C210 280 150 330 175 400S230 480 190 560" />
                  <path d="M190 560C140 585 215 610 160 640C110 668 200 690 150 718C120 736 150 752 150 760" />
                </g>
                <path d="M150 768C210 774 250 790 286 806" fill="none" stroke="#1D2320" strokeWidth="2" strokeDasharray="6 6" />
                <circle cx="296" cy="812" r="12" fill="#F7F3E6" stroke="#9A6B3F" strokeWidth="1.6" strokeDasharray="4 3" />
                <text x="128" y="318" textAnchor="end" fontSize="12" fontWeight="600" letterSpacing="2" fill="#A3331F" style={{ fontFamily: "var(--mono)" }}>
                  NH10
                </text>
                <circle cx="60" cy="92" r="8" fill="#1D2320" />
                <text x="40" y="32" fontSize="12" letterSpacing="2" fill="#7A5230" style={{ fontFamily: "var(--mono)" }}>
                  STATION
                </text>
                <text x="38" y="66" fontWeight="800" fontSize="32" fill="#1D2320" style={{ fontFamily: "var(--sans)" }}>
                  NJP
                </text>
                <circle cx="300" cy="92" r="8" fill="#F7F3E6" stroke="#1D2320" strokeWidth="3" />
                <text x="326" y="32" textAnchor="end" fontSize="12" letterSpacing="2" fill="#7A5230" style={{ fontFamily: "var(--mono)" }}>
                  AIRPORT
                </text>
                <text x="328" y="66" textAnchor="end" fontWeight="800" fontSize="27" fill="#1D2320" style={{ fontFamily: "var(--sans)" }}>
                  Bagdogra
                </text>
                <circle cx="180" cy="205" r="8" fill="#F7F3E6" stroke="#1D2320" strokeWidth="2.6" />
                <text x="162" y="236" textAnchor="end" fontWeight="700" fontSize="16" fill="#1D2320" style={{ fontFamily: "var(--sans)" }}>
                  Siliguri · Sevoke
                </text>
                <text x="162" y="254" textAnchor="end" fontSize="11" fill="#4A4F48" style={{ fontFamily: "var(--mono)" }}>
                  NH10 picks up
                </text>
                <text x="162" y="268" textAnchor="end" fontSize="11" fill="#4A4F48" style={{ fontFamily: "var(--mono)" }}>
                  the river
                </text>
                <circle cx="190" cy="560" r="8" fill="#F7F3E6" stroke="#1D2320" strokeWidth="2.6" />
                <text x="170" y="540" textAnchor="end" fontWeight="700" fontSize="17" fill="#1D2320" style={{ fontFamily: "var(--sans)" }}>
                  Teesta Bazaar
                </text>
                <text x="170" y="522" textAnchor="end" fontSize="11" fill="#4A4F48" style={{ fontFamily: "var(--mono)" }}>
                  TURN OFF HERE
                </text>
                <path d="M150 752l13 22h-26z" fill="#C2412D" />
                <circle cx="150" cy="766" r="2.8" fill="#EFEAD8" />
                <text x="150" y="812" textAnchor="middle" fontWeight="800" fontSize="30" fill="#1D2320" style={{ fontFamily: "var(--sans)" }}>
                  Kalimpong
                </text>
                <text x="150" y="836" textAnchor="middle" fontSize="12" letterSpacing="2" fill="#7A5230" style={{ fontFamily: "var(--mono)" }}>
                  ABOUT 1,250 M
                </text>
              </svg>
              <p className="ov ov-h"><b>Zhilly</b></p>
              <p className="ov ov-v"><b>Zhilly</b></p>
              <p className="fu-stamp">
                <strong>NH10 can close in the monsoon</strong>
                Check road status before you travel
              </p>
            </figure>
            <div className="fu-under">
              <div>
                <p className="big">
                  About 73 km and about 2.5 hours from NJP. About 78 km from Bagdogra. The road turns off the river at Teesta Bazaar and climbs.
                </p>
                <p className="cap">
                  Route sketch, not to scale. Distances and times are approximate and change with traffic and weather.
                </p>
              </div>
              <div>
                <p>
                  When NH10 has shut before, traffic went the long way round via Lava and Gorubathan (NH717A). That road can slip too.
                </p>
                <a className="fu-day" href={wa.roadQuestion}>
                  WhatsApp us the day before you travel
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="wp" id="ways-in" aria-labelledby="wp2">
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
            <p className="mono">Waypoint 02 · Rail or air</p>
            <h2 id="wp2">Two ways in<small>Most people come up from the station or the airport.</small></h2>
            <div className="fu-tk">
              <div className="stack">
                <article className="ticket" aria-label="Route card 1: NJP station to Kalimpong">
                  <span className="punch" aria-hidden="true" />
                  <div className="main">
                    <div className="toprow">
                      <span className="mono">Route card 1 · by rail</span>
                      <span className="mono">One way</span>
                    </div>
                    <div className="ends">
                      <div className="end from">
                        <span className="mono">From</span>
                        <b>NJP</b>
                        <span className="cap">New Jalpaiguri station</span>
                      </div>
                      <svg className="line" viewBox="0 0 400 96" aria-hidden="true">
                        <path d="M0 84C60 76 110 92 170 82S270 70 320 80S380 88 400 84" fill="none" stroke="#2F6E8E" strokeWidth="3" strokeLinecap="round" opacity=".7" />
                        <path d="M12 62C90 60 150 66 220 56C270 50 300 54 324 40C346 28 360 22 388 16" fill="none" stroke="#9A6B3F" strokeWidth="2" strokeDasharray=".1 9" strokeLinecap="round" opacity=".5" />
                        <path id="roadpath" className="road" d="M12 62C90 60 150 66 220 56C270 50 300 54 324 40C346 28 360 22 388 16" fill="none" stroke="#C2412D" strokeWidth="3.6" strokeDasharray=".1 9" strokeLinecap="round" />
                        <circle cx="12" cy="62" r="6" fill="#1D2320" />
                        <path d="M388 2l10 17h-20z" fill="#C2412D" />
                        <g className="jeep" transform="translate(382 10)">
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
                      <div><dt>Rides</dt><dd>Shared jeep, bus or prepaid taxi</dd></div>
                    </dl>
                  </div>
                </article>
                <article className="ticket go" aria-label="Route card 2: Bagdogra airport to Kalimpong">
                  <span className="punch" aria-hidden="true" />
                  <div className="main">
                    <div className="toprow">
                      <span className="mono">Route card 2 · by air</span>
                      <span className="mono">One way</span>
                    </div>
                    <div className="ends">
                      <div className="end from">
                        <span className="mono">From</span>
                        <b>Bagdogra</b>
                        <span className="cap">airport</span>
                      </div>
                      <svg className="line" viewBox="0 0 400 70" aria-hidden="true">
                        <path className="road" d="M12 48C100 50 170 40 240 42C300 44 340 30 388 14" fill="none" stroke="#C2412D" strokeWidth="3.6" strokeDasharray=".1 9" strokeLinecap="round" />
                        <circle cx="12" cy="48" r="6" fill="#F7F3E6" stroke="#1D2320" strokeWidth="2.6" />
                        <path d="M388 0l10 17h-20z" fill="#C2412D" />
                      </svg>
                      <div className="end to"><span className="mono">To</span><b>Kalimpong</b></div>
                    </div>
                    <dl className="facts">
                      <div><dt>Distance</dt><dd>About 78 km</dd></div>
                      <div><dt>Rides</dt><dd>Prepaid taxi counter at the airport</dd></div>
                    </dl>
                  </div>
                </article>
              </div>
              <div className="fu-ride">
                <h3>Getting a ride</h3>
                <dl>
                  <div>
                    <dt>Shared jeep</dt>
                    <dd>From NJP and Siliguri.</dd>
                  </div>
                  <div>
                    <dt>Bus</dt>
                    <dd>Also from NJP and Siliguri.</dd>
                  </div>
                  <div><dt>Prepaid taxi</dt><dd>Government-regulated counters at NJP and Bagdogra.</dd></div>
                  <div>
                    <dt>From Darjeeling</dt>
                    <dd>About 52 km.</dd>
                  </div>
                </dl>
                <p className="cap">We don't print fares. They change, and an old fare is worse than none.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="wp" id="last-stretch" aria-labelledby="wp3">
          <svg className="contours" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ transform: "scaleX(-1)" }}>
            <use href="#topoA" />
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
            <p className="mono">Waypoint 03 · From town to our gate</p>
            <h2 id="wp3">
              The last stretch
              <small>The pin is in. Open it in Google Maps for the last bit.</small>
            </h2>
            <figure className="fu-sheet" aria-label="A survey sheet for the area around Zhilly, with the pin at 27.0580° N, 88.4737° E.">
              <svg viewBox="0 0 900 560" aria-hidden="true">
                <defs>
                  <clipPath id="fu-clip"><rect x="18" y="18" width="864" height="524" /></clipPath>
                  <pattern id="fu-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <path d="M0 0v9" stroke="#9A6B3F" strokeWidth="2" opacity=".45" />
                  </pattern>
                </defs>
                <rect x="1" y="1" width="898" height="558" fill="#F7F3E6" stroke="#1D2320" strokeWidth="2" />
                <rect x="18" y="18" width="864" height="524" fill="none" stroke="#1D2320" strokeWidth="1" />
                <g clipPath="url(#fu-clip)">
                  <g stroke="#1D2320" strokeWidth="1" opacity=".12">
                    <path d="M198 18V542M378 18V542M558 18V542M738 18V542M18 148H882M18 278H882M18 408H882" />
                  </g>
                  <g fill="none" stroke="#9A6B3F" strokeWidth="1.3" opacity=".5">
                    <use href="#topoA" x="-80" y="-40" width="1080" height="660" />
                  </g>
                  <path d="M18 446C120 434 190 468 282 420S420 336 498 318" fill="none" stroke="#C2412D" strokeWidth="4" strokeLinecap="round" strokeDasharray=".1 11" />
                  <circle cx="545" cy="300" r="64" fill="url(#fu-hatch)" stroke="#9A6B3F" strokeWidth="2" strokeDasharray="7 5" />
                  <path d="M545 222V378M467 300H623" stroke="#1D2320" strokeWidth="1.2" strokeDasharray="3 4" />
                  <g fill="#F7F3E6" stroke="#1D2320" strokeWidth="2" strokeLinejoin="round">
                    <path d="M523 304l22-20 22 20v18h-44z" />
                  </g>
                  <path d="M538 322v-10h14v10" fill="none" stroke="#1D2320" strokeWidth="1.6" />
                </g>
                <g stroke="#1D2320" strokeWidth="1">
                  <path d="M108 18v10M198 18v14M288 18v10M378 18v14M468 18v10M558 18v14M648 18v10M738 18v14M828 18v10M18 83h10M18 148h14M18 213h10M18 278h14M18 343h10M18 408h14M18 473h10" />
                </g>
                <g transform="translate(822 96)">
                  <path d="M0 -42L12 6 0 -4-12 6Z" fill="#1D2320" />
                  <path d="M0 -42L12 6 0 -4Z" fill="#F7F3E6" stroke="#1D2320" strokeWidth="1.4" />
                  <text x="0" y="30" textAnchor="middle" fontWeight="800" fontSize="22" fill="#1D2320" style={{ fontFamily: "var(--sans)" }}>
                    N
                  </text>
                </g>
                <g transform="translate(676 506)">
                  <rect width="40" height="10" fill="#1D2320" />
                  <rect x="40" width="40" height="10" fill="#F7F3E6" stroke="#1D2320" />
                  <rect x="80" width="40" height="10" fill="#1D2320" />
                  <rect x="120" width="40" height="10" fill="#F7F3E6" stroke="#1D2320" />
                </g>
              </svg>
              <p className="ov ov-pin"><b>Zhilly</b><span className="ll">27.0580° N, 88.4737° E</span></p>
            </figure>
            <dl className="fu-tb">
              <div><dt>Sheet</dt><dd>Zhilly and around</dd></div>
              <div><dt>Area</dt><dd>Lower Bong Basti</dd></div>
              <div><dt>Grid ref</dt><dd>27°03′28.9″N 88°28′25.3″E</dd></div>
            </dl>
            <div className="fu-last">
              <div>
                <h3>Nearly there</h3>
                <p>Look for a green tin roof with white lace trim along the eaves.</p>
                <dl className="fu-facts">
                  <div>
                    <dt>Address</dt>
                    <dd>
                      Lower Bong Basti, Kalimpong, West Bengal 734301
                    </dd>
                  </div>
                  <div>
                    <dt>Map</dt>
                    <dd><a href={site.mapUrl}>Open the pin in Google Maps</a></dd>
                  </div>
                </dl>
              </div>
              <figure className="plate">
                <div className="frame">
                  <img src="/photos/cottage-angle-sm.jpg" srcSet="/photos/cottage-angle-sm.jpg 720w, /photos/cottage-angle.jpg 1500w" sizes="(max-width:980px) 86vw, 30vw" width="1500" height="2000" loading="lazy" alt="The Zhilly cottage from an angle: green corrugated tin roof, white scalloped lace trim along the eaves and the wooden verandah rail." />
                </div>
                <figcaption className="cap">
                  Plate · What you're looking for.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
        <section className="wp fu-contact" id="contact" aria-labelledby="wp4">
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
            <p className="mono">Waypoint 04 · Contact</p>
            <h2 id="wp4">Write to us<small>WhatsApp or email is quickest. Instagram and Facebook work too.</small></h2>
            <div className="fu-letter">
              <svg className="fu-pm" viewBox="0 0 160 110" aria-hidden="true">
                <defs><path id="fupm" d="M55 55 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" /></defs>
                <circle cx="55" cy="55" r="48" fill="none" stroke="currentColor" strokeWidth="2.4" />
                <circle cx="55" cy="55" r="31" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <text fontSize="10.5" fontWeight="600" fill="currentColor" letterSpacing="1.2" style={{ fontFamily: "var(--mono)" }}>
                  <textPath href="#fupm" startOffset="2%">KALIMPONG · WEST BENGAL ·</textPath>
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
              <dl className="fu-ledger">
                <div className="wa">
                  <dt>WhatsApp</dt>
                  <dd>{site.phoneDisplay} <a href={wa.checkDates}>Open a chat</a></dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={mail.checkDates}>{site.email}</a>
                    <small>Dates, questions, what the road is doing.</small>
                  </dd>
                </div>
                <div><dt>Instagram</dt><dd><a href={site.instagramUrl}>{site.instagram}</a></dd></div>
                <div><dt>Facebook</dt><dd><a href={site.facebookUrl}>Zhilly on Facebook</a></dd></div>
                <div>
                  <dt>Post</dt>
                  <dd>
                    Lower Bong Basti
                    <small>Kalimpong, West Bengal 734301</small>
                  </dd>
                </div>
              </dl>
            </div>
            <SocialLinks />
            <p className="upi">
              <strong>Before you pay anything, check the payment details with us.</strong>
              {" "}If anyone asks you to pay somewhere else, message us on WhatsApp or email first.
            </p>
          </div>
        </section>
      </div>
      <CloseBand />
    </PageShell>
  );
}
