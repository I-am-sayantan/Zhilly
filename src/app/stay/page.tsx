import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CloseBand from "@/components/CloseBand";
import PageShell from "@/components/PageShell";
import { wa } from "@/lib/site";
import "./page.css";

export const metadata: Metadata = {
  title: "Stay · Zhilly, Kalimpong",
  description: "Dorm beds at Zhilly, a small social hostel with a café in Kalimpong (eight dorm beds and a private room): who it suits, the beds and prices, the shared spaces, and check-in. Concept draft.",
};

export default function StayPage() {
  return (
    <PageShell page="stay" nav="stay">
      <section className="phero" aria-labelledby="h1" style={{ "--pos": "50% 34%" } as CSSProperties}>
        <img src="/photos/cottage-angle.jpg" srcSet="/photos/cottage-angle-sm.jpg 720w, /photos/cottage-angle.jpg 1500w" sizes="100vw" width="1500" height="2000" fetchPriority="high" alt="The Zhilly cottage seen from the corner of the lawn: green tin roof, white lace trim along the eaves, a lattice gable and a wooden verandah rail, with tall trees behind." />
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Zhilly</Link>
            <span aria-hidden="true">/</span>
            <span>Stay</span>
          </nav>
          <h1 id="h1">Eight beds. One private room. Tall trees.</h1>
          <p className="lead">
            Eight dorm beds and one private room in a small social hostel in Kalimpong. A few details are still to confirm, so parts of this page are honest blanks.
          </p>
          <p className="credit">
            The cottage from the corner of the lawn: lace trim on the eaves, lattice in the gable.
          </p>
        </div>
        <span className="eave" aria-hidden="true" />
      </section>
      <div className="trail">
        <section className="wp s-who" aria-labelledby="w1">
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
            <p className="mono">Waypoint 01 · Who it's for</p>
            <h2 id="w1">Who sleeps here<small>People who like a chat, and a decent night's sleep after it.</small></h2>
            <p className="s-say"><span>Social, yes.</span> <span className="maybe">A party hostel, maybe.</span></p>
            <div className="s-two">
              <dl className="field">
                <dt>Good for</dt>
                <dd>
                  Backpackers and solo travellers
                  <span className="cap">Easy to meet people. Just as easy to read on the verandah.</span>
                </dd>
                <dd>
                  People working remotely
                  <span className="cap">Wi-Fi 40–50 Mbps</span>
                </dd>
                <dd>
                  Groups up for a hill weekend
                  <span className="cap">Beds together <span className="ph">[group booking to confirm]</span></span>
                </dd>
              </dl>
              <dl className="field">
                <dt>Not really for</dt>
                <dd>
                  Loud late nights
                  <span className="cap">
                    Evenings are for talking. No set quiet hours yet.
                  </span>
                </dd>
                <dt>Ages</dt>
                <dd>16 and over. Not for families.</dd>
              </dl>
            </div>
          </div>
        </section>
        <section className="wp s-bed" aria-labelledby="w2">
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
            <p className="mono">Waypoint 02 · Beds and prices</p>
            <h2 id="w2">
              The beds
              <small>Per night, in rupees: dorm beds by the bed, the private room by the room.</small>
            </h2>
            <table className="s-ledger">
              <thead>
                <tr>
                  <th scope="col">Room</th>
                  <th scope="col">Beds</th>
                  <th scope="col">Bed type</th>
                  <th scope="col">Per night</th>
                  <th scope="col">Bathroom</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mixed dorm</td>
                  <td data-k="Beds">8</td>
                  <td data-k="Type">4 bunk beds</td>
                  <td className="rate" data-k="Per night">₹800/night</td>
                  <td data-k="Bathroom">One, inside the dorm</td>
                </tr>
                <tr>
                  <td>Private room</td>
                  <td data-k="Beds">1</td>
                  <td data-k="Type">Queen bed</td>
                  <td className="rate" data-k="Per night">₹1,500/night</td>
                  <td data-k="Bathroom">Its own</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">All rooms</th>
                  <td>9 beds</td>
                  <td colSpan={3} className="cap">Breakfast comes with dorm beds. The private room is ₹1,700 a night with breakfast for two.</td>
                </tr>
              </tfoot>
            </table>
            <div className="s-beds">
              <div>
                <h3>Comes with the bed</h3>
                <ul className="s-incl">
                  <li><span>Breakfast</span><i /><span>Included, 10–10:30 am</span></li>
                  <li><span>Bed linen and a pillow</span><i /><span>Included</span></li>
                  <li><span>Blanket or quilt</span><i /><span>Included</span></li>
                  <li><span>A locker</span><i /><span className="ph">[to confirm]</span></li>
                  <li><span>Towel</span><i /><span>Included</span></li>
                  <li><span>Plug point</span><i /><span>Yes</span></li>
                  <li><span>Hot water</span><i /><span>Geyser in the bathroom</span></li>
                  <li><span>Wi-Fi</span><i /><span>40–50 Mbps</span></li>
                </ul>
              </div>
              <figure className="s-plan">
                <svg viewBox="0 0 420 160" role="img" aria-labelledby="planc" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                  <title id="planc">Line drawing from above: the dorm with four bunk beds (beds 01 to 08) and a bathroom, and the private room with a queen bed and its own bathroom.</title>
                  <defs>
                    <g id="s-bedplan">
                      <rect x="0" y="0" width="46" height="88" fill="#F7F3E6" />
                      <rect x="7" y="6" width="32" height="15" rx="3" />
                      <path d="M0 34 H46 M0 34 L46 52" strokeWidth="1.1" />
                    </g>
                  </defs>
                  <g>
                    <g transform="translate(14 34)">
                      <rect x="5" y="-5" width="46" height="88" fill="#F7F3E6" />
                      <use href="#s-bedplan" />
                    </g>
                    <g transform="translate(66 34)">
                      <rect x="5" y="-5" width="46" height="88" fill="#F7F3E6" />
                      <use href="#s-bedplan" />
                    </g>
                    <g transform="translate(118 34)">
                      <rect x="5" y="-5" width="46" height="88" fill="#F7F3E6" />
                      <use href="#s-bedplan" />
                    </g>
                    <g transform="translate(170 34)">
                      <rect x="5" y="-5" width="46" height="88" fill="#F7F3E6" />
                      <use href="#s-bedplan" />
                    </g>
                    <rect x="233" y="30" width="32" height="92" strokeDasharray="4 3" />
                    <circle cx="249" cy="46" r="7" />
                    <ellipse cx="249" cy="102" rx="8" ry="10" />
                    <rect x="1" y="1" width="276" height="158" />
                    <rect x="289" y="1" width="130" height="158" />
                    <rect x="297" y="30" width="66" height="92" fill="#F7F3E6" />
                    <rect x="302" y="36" width="25" height="15" rx="3" />
                    <rect x="333" y="36" width="25" height="15" rx="3" />
                    <path d="M297 62 H363 M297 62 L363 80" strokeWidth="1.1" />
                    <rect x="375" y="30" width="32" height="92" strokeDasharray="4 3" />
                    <circle cx="391" cy="46" r="7" />
                    <ellipse cx="391" cy="102" rx="8" ry="10" />
                  </g>
                  <g fontSize="11" fontWeight="600" fill="#A3331F" stroke="none" style={{ fontFamily: "var(--mono)" }}>
                    <text x="12" y="19">DORM</text>
                    <text x="299" y="19">PRIVATE ROOM</text>
                  </g>
                  <g fontSize="11" fontWeight="600" fill="#A3331F" stroke="none" textAnchor="middle" style={{ fontFamily: "var(--mono)" }}>
                    <text x="37" y="146">01·02</text>
                    <text x="89" y="146">03·04</text>
                    <text x="141" y="146">05·06</text>
                    <text x="193" y="146">07·08</text>
                    <text x="249" y="146">BATH</text>
                    <text x="330" y="146">QUEEN</text>
                    <text x="391" y="146">BATH</text>
                  </g>
                </svg>
                <figcaption className="cap">
                  Fig. 1 · Each room from above: four bunks (beds 01–08) and a bathroom in the dorm; a queen bed and its own bathroom in the private room. Not to scale. Layout{" "}
                  <span className="ph">[to confirm]</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
        <section className="wp s-rooms" aria-labelledby="w3">
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
            <p className="mono">Waypoint 03 · The rooms</p>
            <h2 id="w3">
              No photos yet
              <small>The rooms are being fitted out. We'd rather show you a drawing than someone else's dorm.</small>
            </h2>
            <figure className="s-blank">
              <svg className="stamp" viewBox="0 0 200 200" aria-hidden="true"><use href="#stamp-build" /></svg>
              <div className="frame">
                <svg className="s-house" viewBox="0 0 440 244" role="img" aria-labelledby="housec" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                  <title id="housec">
                    Line drawing of the cottage front, with five numbered parts: the tin roof, the lattice gable, the lace trim on the eaves, the verandah rail, and the rooms behind the walls.
                  </title>
                  <defs>
                    <pattern id="s-scal" width="12" height="9" patternUnits="userSpaceOnUse">
                      <path d="M0 0a6 6 0 0 0 12 0" strokeWidth="1.3" fill="none" style={{ stroke: "#1D2320" }} />
                      <circle cx="6" cy="3.2" r="1.1" stroke="none" style={{ fill: "#1D2320" }} />
                    </pattern>
                    <pattern id="s-tin" width="7" height="10" patternUnits="userSpaceOnUse">
                      <path d="M3.5 0v10" strokeWidth=".9" style={{ stroke: "#2F4A3A" }} />
                    </pattern>
                    <pattern id="s-lat" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <path d="M0 0h10M0 0v10" strokeWidth=".9" style={{ stroke: "#1D2320" }} />
                    </pattern>
                  </defs>
                  <g transform="translate(20 12)">
                    <path d="M18 112 L92 56 H308 L382 112 Z" fill="url(#s-tin)" />
                    <path d="M18 112 L92 56 H308 L382 112 Z" />
                    <path d="M160 108 L200 30 L240 108 Z" fill="#F7F3E6" />
                    <path d="M172 102 L200 48 L228 102 Z" fill="url(#s-lat)" />
                    <path d="M160 108 L200 30 L240 108 Z" />
                    <rect x="18" y="112" width="364" height="9" fill="url(#s-scal)" stroke="none" />
                    <path d="M18 112 H382" />
                    <path d="M46 121 V186 M354 121 V186" />
                    <path d="M66 126 H334 V186 H66 Z" strokeWidth="1.2" />
                    <path d="M110 126 V186 M156 126 V186 M244 126 V186 M290 126 V186 M66 156 H178 M222 156 H334" strokeWidth=".9" />
                    <path d="M184 136 H216 V186 H184 Z" />
                    <path d="M46 160 H178 M222 160 H354 M46 168 H178 M222 168 H354" strokeWidth="1.2" />
                    <path d="M56 160 V186 M68 160 V186 M80 160 V186 M92 160 V186 M104 160 V186 M116 160 V186 M128 160 V186 M140 160 V186 M152 160 V186 M164 160 V186 M236 160 V186 M248 160 V186 M260 160 V186 M272 160 V186 M284 160 V186 M296 160 V186 M308 160 V186 M320 160 V186 M332 160 V186 M344 160 V186" strokeWidth=".9" />
                    <path d="M30 186 H370 V196 H30 Z" strokeWidth="1.3" />
                  </g>
                  {/* callouts */}
                  <g stroke="#C2412D" strokeWidth="1.3">
                    <path d="M84 94 L50 34" />
                    <path d="M236 92 L292 24" />
                    <path d="M396 128 L424 104" />
                    <path d="M118 176 L96 226" />
                    <path d="M310 150 L342 226" />
                  </g>
                  <g fill="#C2412D" stroke="none">
                    <circle cx="84" cy="94" r="3.2" />
                    <circle cx="236" cy="92" r="3.2" />
                    <circle cx="396" cy="128" r="3.2" />
                    <circle cx="118" cy="176" r="3.2" />
                    <circle cx="310" cy="150" r="3.2" />
                  </g>
                  <g fontSize="17" fontWeight="600" fill="#A3331F" stroke="none" textAnchor="middle" style={{ fontFamily: "var(--mono)" }}>
                    <text x="46" y="28">1</text>
                    <text x="298" y="20">2</text>
                    <text x="429" y="100">3</text>
                    <text x="93" y="241">4</text>
                    <text x="346" y="241">5</text>
                  </g>
                </svg>
                <div>
                  <ol className="s-key">
                    <li><span>Green tin roof. Loud in the rain, in a good way.</span></li>
                    <li><span>The lattice in the gable.</span></li>
                    <li><span>Lace trim along the eaves.</span></li>
                    <li><span>The verandah and its wooden rail.</span></li>
                    <li><span>The rooms, behind these walls. Layout <span className="ph">[to confirm]</span></span></li>
                  </ol>
                  <dl className="s-log">
                    <dt>Beds</dt>
                    <dd>8 bunk beds, 1 queen</dd>
                    <dt>Bathrooms</dt>
                    <dd>Two: one in the dorm, one in the private room</dd>
                    <dt>Room photos</dt>
                    <dd>After fit-out.</dd>
                  </dl>
                </div>
              </div>
              <figcaption>
                <span className="cap">
                  Plate 2 · Where the dorm photo will go. For now, a drawing from our own photos of the front.
                </span>
                {" "}
                <a href={wa.checkDates}>Ask for a progress picture on WhatsApp</a>
              </figcaption>
            </figure>
          </div>
        </section>
        <section className="wp s-shared" aria-labelledby="w4">
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
            <p className="mono">Waypoint 04 · Shared spaces</p>
            <h2 id="w4">
              Out of the dorm
              <small>The dorm is for sleeping. The rest of the day happens out here.</small>
            </h2>
            <div className="s-yard">
              <figure className="plate a">
                <div className="frame">
                  <img src="/photos/deck-close-sm.jpg" srcSet="/photos/deck-close-sm.jpg 960w, /photos/deck-close.jpg 2000w" sizes="(max-width:980px) 88vw, 52vw" width="2000" height="1500" loading="lazy" alt="The bamboo-pole deck: a lattice frame with two tyre rings on posts, a low bench, and hostas in painted-tyre planters, under tall trunks." />
                </div>
                <figcaption className="cap">
                  Plate 3 · The bamboo deck. Lattice frame, tyre planters, hostas.
                </figcaption>
              </figure>
              <figure className="plate b">
                <div className="frame">
                  <img src="/photos/cottage-lawn-2-sm.jpg" srcSet="/photos/cottage-lawn-2-sm.jpg 720w, /photos/cottage-lawn-2.jpg 1500w" sizes="(max-width:640px) 88vw, (max-width:980px) 44vw, 26vw" width="1500" height="2000" loading="lazy" alt="The cottage across the mown lawn, tall trees and bamboo standing behind it." />
                </div>
                <figcaption className="cap">Plate 4 · The lawn, in front of the cottage.</figcaption>
              </figure>
              <figure className="plate c">
                <div className="frame">
                  <img src="/photos/verandah-up-sm.jpg" srcSet="/photos/verandah-up-sm.jpg 960w, /photos/verandah-up.jpg 2000w" sizes="(max-width:640px) 88vw, (max-width:980px) 44vw, 32vw" width="2000" height="1500" loading="lazy" alt="Looking up at the verandah: the white lace trim along the eaves, the lattice gable and the treetops above." />
                </div>
                <figcaption className="cap">Plate 5 · The verandah, looking up.</figcaption>
              </figure>
              <div className="n">
                <p>Verandah, lawn, bamboo deck. Bring a book.</p>
                <dl className="field">
                  <dt>Quiet hours</dt>
                  <dd>None set yet</dd>
                  <dt>Guest kitchen</dt>
                  <dd><span className="ph">[to confirm]</span></dd>
                  <dt>Food</dt>
                  <dd>See <Link href="/cafe/">the café</Link>.</dd>
                </dl>
              </div>
            </div>
          </div>
        </section>
        <section className="wp s-come" aria-labelledby="w5">
          <svg className="contours" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#topoA" /></svg>
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
            <p className="mono">Waypoint 05 · Check-in and house rules</p>
            <h2 id="w5">Coming and going<small>Times, and the few house rules we'll ask you to keep.</small></h2>
            <div className="s-go">
              <div>
                <dl className="s-times">
                  <div>
                    <dt><span className="big" aria-hidden="true">In</span>Check-in, from</dt>
                    <dd className="t">11 am</dd>
                  </div>
                  <div>
                    <dt><span className="big" aria-hidden="true">Out</span>Check-out, by</dt>
                    <dd className="t">10 am</dd>
                  </div>
                </dl>
                <div className="s-next">
                  <p className="mono">Next on the trail</p>
                  <Link className="go" href="/plan-your-stay/">Plan your stay <span aria-hidden="true">→</span></Link>
                  <p>How booking works: send us a booking enquiry with your dates, we confirm by email or phone, a UPI advance holds the beds.</p>
                  <a className="btn" href="#book">Send a booking enquiry</a>
                </div>
              </div>
              <aside className="s-notice" aria-labelledby="notes-h">
                <h3 id="notes-h">House notes</h3>
                <ul>
                  <li><b>Quiet hours</b> None set yet</li>
                  <li><b>ID at check-in</b> Aadhaar, PAN card or passport</li>
                  <li><b>Visitors</b> Day visitors welcome, dorm included</li>
                  <li><b>Smoking and alcohol</b> Alcohol yes; smoking outside the dorm only</li>
                  <li><b>Cancellations</b> Full refund 7+ days ahead</li>
                </ul>
                <p className="upi"><strong>We only take payment to the UPI ID listed on zhilly.life.</strong></p>
                <Link className="more-link" href="/policies/">Read the full policies</Link>
              </aside>
            </div>
          </div>
        </section>
      </div>
      <CloseBand />
    </PageShell>
  );
}
