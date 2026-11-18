import type { Metadata } from "next";
import Link from "next/link";
import CloseBand from "@/components/CloseBand";
import PageShell from "@/components/PageShell";
import "./page.css";

export const metadata: Metadata = {
  title: "Plan your stay · Zhilly",
  description: "How booking a bed at Zhilly works (a booking enquiry, a quote, a UPI advance), what it costs, when to come to Kalimpong and what to pack. Concept draft.",
};

export default function PlanPage() {
  return (
    <PageShell page="plan-your-stay" nav="plan">
      <section className="phero" aria-labelledby="h1">
        <img src="/photos/verandah-up.jpg" srcSet="/photos/verandah-up-sm.jpg 960w, /photos/verandah-up.jpg 2000w" sizes="100vw" width="2000" height="1500" fetchPriority="high" alt="Looking up from the verandah steps: the white lace fretwork along the eaves, the lattice gable, and very tall trees and bamboo against the sky." />
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Zhilly</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Plan your stay</span>
          </nav>
          <h1 id="h1">Plan your stay</h1>
          <p className="lead">
            Booking starts with a short enquiry: pick your dates at the bottom of this page and we confirm by email or phone (WhatsApp works too). Here's how it goes, what to ask, when to come and what to pack.
          </p>
          <p className="credit">The eaves, from the verandah steps.</p>
        </div>
        <div className="eave" aria-hidden="true" />
      </section>
      <div className="trail">
        <section className="wp" id="booking" aria-labelledby="wp1">
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
            <p className="mono">Waypoint 01 · How booking works</p>
            <h2 id="wp1">
              Four legs
              <small>Dates, a quote, an advance, done. A person at the other end, by email, phone or WhatsApp.</small>
            </h2>
            <ol className="route">
              <li>
                <div className="leg">
                  <span className="mono">Send us your dates</span>
                  <h3>Tell us when, and how many</h3>
                  <p>
                    Arrival date, how many nights, how many of you, and what kind of bed you'd like. If you're not sure of the dates yet, send a rough window. We'll work with it.
                  </p>
                </div>
                <figure className="slip">
                  <figcaption className="mono">A sample message · change it to suit</figcaption>
                  <pre>{"Hi Zhilly! I'd like to check dates…\n"}<b>{"Arrive"}</b>{"  12 Dec 2026\n"}<b>{"Leave"}</b>{"   15 Dec 2026 (3 nights)\n"}<b>{"Guests"}</b>{"  2\n"}<b>{"Beds"}</b>{"    mixed dorm\n"}<b>{"Name"}</b>{"    yours"}</pre>
                </figure>
              </li>
              <li>
                <div className="leg">
                  <span className="mono">We reply with a quote</span>
                  <h3>What's free, and what it costs</h3>
                  <p>
                    We check every date by hand, so this part is a person, not a bot. We reply{" "}
                    <span className="ph">[reply hours to confirm]</span>
                    .
                  </p>
                </div>
                <dl className="field">
                  <dt>The quote tells you</dt>
                  <dd>Which beds are free for your dates</dd>
                  <dd>Price per night, times your nights: ₹800 a dorm bed with breakfast, or ₹1,500 for the private room (₹1,700 with breakfast for two)</dd>
                  <dd>What's included: breakfast with dorm beds</dd>
                  <dd>Taxes: GST included</dd>
                  <dd>The advance that holds your beds: half the total, or all of it</dd>
                  <dd>The cancellation terms, in one line</dd>
                </dl>
              </li>
              <li>
                <div className="leg">
                  <span className="mono">Pay an advance by UPI</span>
                  <h3>That holds the beds</h3>
                  <p>
                    We hold the beds for{" "}
                    <span className="ph">[how long: to confirm]</span>
                    {" "}while you pay. The rest of your stay is paid at check-out; café bills as you go. Other ways to pay:{" "}
                    <span className="ph">[to confirm]</span>
                    .
                  </p>
                </div>
                <div className="payonly">
                  <p className="big">We only take payment to the UPI ID listed on zhilly.life.</p>
                  <p>
                    If anyone asks you to pay somewhere else (another number, a forwarded link or QR code), message us before you do. We won't mind the double-check.
                  </p>
                  <p className="idline">
                    <span className="mono">Our UPI ID</span>
                    <span className="ph">[to be listed here at launch]</span>
                  </p>
                </div>
              </li>
              <li>
                <div className="leg">
                  <span className="mono">You're confirmed</span>
                  <h3>In the same chat</h3>
                  <p>Once the advance lands, we confirm it in writing. Keep the chat. It's your booking.</p>
                </div>
                <dl className="field">
                  <dt>What we send you</dt>
                  <dd>Your dates, your beds, what's paid and what's left</dd>
                  <dd>Check-in from 11 am</dd>
                  <dd>Directions to the gate <span className="ph">[to confirm]</span></dd>
                  <dt>What we'd like back</dt>
                  <dd>Roughly when you'll arrive, so someone's at the gate</dd>
                </dl>
              </li>
            </ol>
            <p className="after-legs">
              The full terms (advance, cancellation, check-in, ID) are on the{" "}
              <Link href="/policies/">Policies</Link>
              {" "}page. It's still a draft until we open.
            </p>
          </div>
        </section>
        <section className="wp" id="prices" aria-labelledby="wp2">
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
            <p className="mono">Waypoint 02 · Prices</p>
            <h2 id="wp2">
              What it costs
              <small>
                Per night, in rupees. The same numbers here, in your quote and at the gate.
              </small>
            </h2>
            <div className="tariff">
              <figure className="bigfig">
                <span className="n">₹800</span>
                <figcaption className="cap">Field note: one bed, one night, breakfast included.</figcaption>
              </figure>
              <div>
                <p className="mono tcap">Tariff · draft</p>
                <table className="ledger">
                  <thead>
                    <tr><th scope="col">Item</th><th scope="col" className="amt">₹</th><th scope="col">Note</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Bed, mixed dorm</td>
                      <td className="amt" data-k="Price">₹800</td>
                      <td data-k="Note">per bed, per night, breakfast included</td>
                    </tr>
                    <tr>
                      <td>Private room, queen bed</td>
                      <td className="amt" data-k="Price">₹1,500</td>
                      <td data-k="Note">the room, per night, up to two; its own bathroom. ₹1,700 with breakfast for two</td>
                    </tr>
                    <tr className="sub">
                      <td>Taxes</td>
                      <td className="amt" data-k="Price">Incl.</td>
                      <td data-k="Note">GST is included in every price</td>
                    </tr>
                    <tr className="sub">
                      <td>Advance to hold</td>
                      <td className="amt" data-k="Price">Half or all</td>
                      <td data-k="Note">by UPI, only to the ID on zhilly.life</td>
                    </tr>
                    <tr className="sub">
                      <td>Café</td>
                      <td className="amt" data-k="Price"><span className="ph">[—]</span></td>
                      <td data-k="Note">Breakfast comes with dorm beds</td>
                    </tr>
                  </tbody>
                </table>
                <p className="after">
                  Seasonal rates{" "}
                  <span className="ph">[if any: to confirm]</span>
                  {" "}· Group or whole-dorm bookings{" "}
                  <span className="ph">[to confirm]</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="wp season" id="when" aria-labelledby="wp3">
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
            <p className="mono">Waypoint 03 · When to come</p>
            <h2 id="wp3">
              The year, roughly
              <small>Kalimpong is worth a trip in most months. Here's what changes.</small>
            </h2>
            <div className="year" aria-hidden="true">
              <div className="m">
                <span>J</span>
                <span>F</span>
                <span>M</span>
                <span>A</span>
                <span>M</span>
                <span>J</span>
                <span>J</span>
                <span>A</span>
                <span>S</span>
                <span>O</span>
                <span>N</span>
                <span>D</span>
              </div>
              <div className="b">
                <span className="sw-w" style={{ gridColumn: "1/3" }}>Winter</span>
                {" "}
                <span className="sw-s" style={{ gridColumn: "3/5" }}>Spring</span>
                {" "}
                <span className="sw-u" style={{ gridColumn: "5/6" }}>Summer</span>
                {" "}
                <span className="sw-m" style={{ gridColumn: "6/10" }}>Monsoon</span>
                {" "}
                <span className="sw-a" style={{ gridColumn: "10/12" }}>Autumn</span>
                {" "}
                <span className="sw-w" style={{ gridColumn: "12/13" }} />
              </div>
            </div>
            <dl className="seasons">
              <div>
                <dt><i className="sw-w" />December to February <small>Winter</small></dt>
                <dd>
                  Cold and dry, about 5 to 17&nbsp;°C, and colder at night. Pack proper warm layers. Heating and winter bedding{" "}
                  <span className="ph">[to confirm]</span>
                  .
                </dd>
              </div>
              <div>
                <dt><i className="sw-s" />March and April <small>Spring</small></dt>
                <dd>Milder days, and rhododendrons flowering up in Neora Valley. <span className="ph">[A host's note on spring at Zhilly: to come]</span></dd>
              </div>
              <div>
                <dt><i className="sw-u" />May to mid-June <small>Summer</small></dt>
                <dd>Warm, about 16 to 27&nbsp;°C: a break from the heat of the plains.</dd>
              </div>
              <div>
                <dt><i className="sw-m" />Mid-June to September <small>Monsoon</small></dt>
                <dd>
                  Long rains, and the hills at their greenest. NH10 can close after landslides; traffic then goes the long way, via Gorubathan and Lava, which can add hours. Check the road before you set off, and message us if you're stuck. Date changes for road closures{" "}
                  <span className="ph">[to confirm]</span>
                  .
                </dd>
              </div>
              <div>
                <dt><i className="sw-a" />October and November <small>Autumn</small></dt>
                <dd>After the rains. The nurseries hold their flower shows in October. Send your dates early if you can.</dd>
              </div>
            </dl>
            <p className="roadstamp">NH10 can close in the monsoon<br />Check road status before you travel</p>
          </div>
        </section>
        <section className="wp" id="bring" aria-labelledby="wp4">
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
            <p className="mono">Waypoint 04 · What to bring</p>
            <h2 id="wp4">In your bag<small>Nothing special. It's the hills, and the paths are paths.</small></h2>
            <div className="bring">
              <figure className="plate">
                <div className="frame">
                  <img src="/photos/side-path-sm.jpg" srcSet="/photos/side-path-sm.jpg 960w, /photos/side-path.jpg 2000w" sizes="(max-width:980px) 92vw, 40vw" width="2000" height="1500" loading="lazy" alt="A gravel path running along the side of the cottage, with a bamboo railing on one side and tall trees and bamboo falling away beyond it." />
                </div>
                <figcaption className="cap">
                  The path along the side of the cottage. Gravel, roots and a bamboo rail.
                </figcaption>
              </figure>
              <div>
                <ul className="kit">
                  <li><b>A warm layer</b><span>Evenings in the hills get cool, even outside winter.</span></li>
                  <li><b>A rain jacket or umbrella</b><span>Most of all from June to September.</span></li>
                  <li>
                    <b>Shoes with some grip</b>
                    <span>For the paths through the trees, and the walk into town.</span>
                  </li>
                  <li>
                    <b>Your ID</b>
                    <span>
                      The one you'll show at check-in: Aadhaar card, PAN card or passport.
                    </span>
                  </li>
                  <li>
                    <b>A small padlock</b>
                    <span>If there are lockers. <span className="ph">[lockers to confirm]</span></span>
                  </li>
                  <li><b>A towel</b><span>We provide one.</span></li>
                  <li><b>Some cash</b><span>Small shops and taxis in town may prefer it.</span></li>
                  <li>
                    <b>Whatever helps on winding roads</b>
                    <span>The drive up from the plains has a lot of bends.</span>
                  </li>
                </ul>
                <p className="after">
                  Forgot something? Kalimpong town has shops. Tell us in the chat and we'll say where.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="wp" id="questions" aria-labelledby="wp5">
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
            <p className="mono">Waypoint 05 · Questions</p>
            <h2 id="wp5">
              Asked already
              <small>
                Asked before anyone has stayed, so most of the answers are still blanks. Ask us anything that isn't here.
              </small>
            </h2>
            <div className="qgroup">
              <h3>Booking and paying</h3>
              <div className="faq">
                <details>
                  <summary>How quickly do you reply?</summary>
                  <div className="a">
                    <p>
                      We check every date by hand, so it's a person replying, not a bot. Reply hours:{" "}
                      <span className="ph">[to confirm]</span>
                      .
                    </p>
                  </div>
                </details>
                <details>
                  <summary>Can I book without WhatsApp?</summary>
                  <div className="a"><p>Yes. Pick your dates in the calendar at the <a href="#book">bottom of this page</a> and send the booking enquiry form. We confirm by email or phone.</p></div>
                </details>
                <details>
                  <summary>How much is the advance, and when do I pay the rest?</summary>
                  <div className="a">
                    <p>
                      Half the total, or all of it, by UPI. The rest is paid at check-out.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>Someone sent me a different UPI ID or payment link. Is it you?</summary>
                  <div className="a">
                    <p>
                      We only take payment to the UPI ID listed on zhilly.life. If it's anything else, don't pay. Message us on the number on this site and we'll sort it out.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>What if I need to cancel or change my dates?</summary>
                  <div className="a">
                    <p>
                      7 or more days before arrival: full refund. 3 to 6 days: half back. Less than 3 days, or a no-show: not refunded. You can move your dates once, free, if you tell us 7 or more days ahead. The full version is on{" "}
                      <Link href="/policies/">Policies</Link>
                      .
                    </p>
                  </div>
                </details>
              </div>
            </div>
            <div className="qgroup">
              <h3>Getting here and arriving</h3>
              <div className="faq">
                <details>
                  <summary>How do I get there from NJP or Bagdogra?</summary>
                  <div className="a">
                    <p>
                      Kalimpong is about 73 km from NJP station, roughly 2.5 hours by road on NH10 along the Teesta. Bagdogra airport is about 78 km. The last stretch to our gate:{" "}
                      <span className="ph">[to confirm]</span>
                      . More on{" "}
                      <Link href="/find-us/">Find us</Link>
                      .
                    </p>
                  </div>
                </details>
                <details>
                  <summary>What if NH10 is closed on my travel day?</summary>
                  <div className="a">
                    <p>
                      It happens in the monsoon. Check road status before you set off and message us. What happens to your booking: you can move your dates free, or get a full refund.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>What time can I check in? I'm arriving late.</summary>
                  <div className="a">
                    <p>
                      Check-in from 11 am, check-out by 10 am. Early check-in depends on occupancy: if your bed is free, it's yours early, at no extra charge. Arriving late{" "}
                      <span className="ph">[to confirm]</span>
                      . Either way, tell us your arrival time in the chat.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>What ID do I need?</summary>
                  <div className="a">
                    <p>
                      Indian guests: Aadhaar card, PAN card or passport. Guests from outside India{" "}
                      <span className="ph">[passport and visa requirements: to confirm]</span>
                      .
                    </p>
                  </div>
                </details>
                <details>
                  <summary>Is there parking?</summary>
                  <div className="a"><p><span className="ph">[Cars and bikes: to confirm]</span></p></div>
                </details>
              </div>
            </div>
            <div className="qgroup">
              <h3>Staying</h3>
              <div className="faq">
                <details>
                  <summary>Is there a female-only dorm?</summary>
                  <div className="a"><p>Not at the moment. There's one mixed dorm with four bunk beds, and one private room with a queen bed and its own bathroom.</p></div>
                </details>
                <details>
                  <summary>Can I work from there? How's the Wi-Fi?</summary>
                  <div className="a">
                    <p>
                      Wi-Fi runs at 40–50 Mbps. Power backup covers basic lighting and the Wi-Fi.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>Is there hot water? Is it cold at night?</summary>
                  <div className="a">
                    <p>
                      Yes: there's a geyser in the bathroom, and hot drinking water whenever you ask. Winter nights are cold in the hills; every bed has a blanket. Heating{" "}
                      <span className="ph">[to confirm]</span>
                      .
                    </p>
                  </div>
                </details>
                <details>
                  <summary>Is it a party hostel?</summary>
                  <div className="a">
                    <p>
                      Maybe. It's social: people talk in the evenings, over the long table in the café. No set quiet hours for now.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>Can I eat at the café if I'm not staying?</summary>
                  <div className="a">
                    <p>The café is open every day, 12 pm to 11 pm. Non-guests: <span className="ph">[to confirm]</span>.</p>
                  </div>
                </details>
                <details>
                  <summary>Is there an age limit? Can I bring my dog?</summary>
                  <div className="a">
                    <p>Guests need to be 16 or over, and we don't take families. Pets: <span className="ph">[to confirm]</span>.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>
        <section className="wp" id="small-print" aria-labelledby="wp6">
          <div className="mark" aria-hidden="true">
            <div className="pt">
              <svg className="x" viewBox="0 0 30 30">
                <path d="M4 4l22 22M26 4L4 26" stroke="#C2412D" strokeWidth="5" strokeLinecap="round" />
              </svg>
              <span className="num">End</span>
            </div>
          </div>
          <div className="body">
            <p className="mono">Trail's end · Before you go</p>
            <h2 id="wp6">Onward<small>Two more pages worth a look before you pay anything.</small></h2>
            <ul className="onward">
              <li>
                <Link href="/policies/">
                  <b>Policies</b>
                  <span>Advance, cancellation, check-in, ID and house rules. A draft until we open.</span>
                  <svg viewBox="0 0 46 30" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 15h38M28 4l12 11-12 11" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="/find-us/">
                  <b>Find us</b>
                  <span>The road from NJP and Bagdogra, and the last stretch to our gate.</span>
                  <svg viewBox="0 0 46 30" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 15h38M28 4l12 11-12 11" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <CloseBand />
    </PageShell>
  );
}
