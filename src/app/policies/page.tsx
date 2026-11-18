import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { site, wa } from "@/lib/site";
import "./page.css";

export const metadata: Metadata = pageMeta("/policies/", "House policies · Zhilly hostel, Kalimpong", "Zhilly hostel's house policies in Kalimpong: booking and the UPI advance, cancellation and refunds, check-in from 11 am, check-out by 10 am, ID and house rules.");

export default function PoliciesPage() {
  return (
    <PageShell page="policies">
      <JsonLd data={breadcrumbLd("/policies/", "Policies")} />
      <section className="phero flat" aria-labelledby="h1">
        <svg className="contours" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#topoA" /></svg>
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Zhilly</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Policies</span>
          </nav>
          <h1 id="h1">House policies</h1>
          <p className="lead">
            The terms for staying at Zhilly, in plain words.
          </p>
        </div>
        <div className="eave" aria-hidden="true" />
      </section>
      <div className="doc wrap">
        <aside className="toc" aria-label="On this page">
          <div className="in">
            <p className="mono">On this page</p>
            <ol>
              <li><a href="#short"><span>00</span>The short version</a></li>
              <li><a href="#booking"><span>01</span>Booking and the advance</a></li>
              <li><a href="#cancel"><span>02</span>Cancellation and refunds</a></li>
              <li><a href="#checkin"><span>03</span>Check-in and check-out</a></li>
              <li><a href="#id"><span>04</span>ID at check-in</a></li>
              <li><a href="#house"><span>05</span>House rules</a></li>
              <li><a href="#cafe"><span>06</span>The café</a></li>
              <li><a href="#damage"><span>07</span>Damage and lost property</a></li>
              <li><a href="#who"><span>08</span>Who runs Zhilly</a></li>
              <li><a href="#changes"><span>09</span>Changes to these policies</a></li>
            </ol>
            <dl className="docmeta">
              <dt>Operated by</dt>
              <dd>Canopy Ventures</dd>
            </dl>
          </div>
        </aside>
        <article className="prose policy">
          <section id="short" aria-labelledby="p0">
            <h2 id="p0"><span className="no">00</span>The short version</h2>
            <p className="intro">
              Send an enquiry, hold your beds with an advance, bring your ID, keep the evenings friendly and not loud.
            </p>
            <dl className="short">
              <dt>Advance</dt>
              <dd>Half the total or all of it, by UPI, to hold your beds</dd>
              <dt>Cancellation</dt>
              <dd>Full refund 7+ days before arrival; half at 3–6 days; nothing after that</dd>
              <dt>Check-in</dt>
              <dd>From 11 am</dd>
              <dt>Check-out</dt>
              <dd>By 10 am</dd>
              <dt>ID</dt>
              <dd>Aadhaar card, PAN card or passport</dd>
              <dt>Quiet hours</dt>
              <dd>None for now. We may set them from midnight.</dd>
            </dl>
          </section>
          <section id="booking" aria-labelledby="p1">
            <h2 id="p1"><span className="no">01</span>Booking and the advance</h2>
            <p>
              Send us your dates and how many of you are coming, through the booking enquiry form on this site, on WhatsApp or by email. We reply with a quote; you pay an advance by UPI to hold the beds; we confirm by email or WhatsApp. A booking is confirmed only when we've said so in writing.
            </p>
            <h3>The advance</h3>
            <p>
              The advance is half the total, or the full amount if you'd rather pay it all at once. If the advance hasn't reached us in the time we give you, the beds go back on offer.
            </p>
            <h3>The balance</h3>
            <p>The rest of your stay is paid at check-out. Café bills are paid when you order.</p>
            <h3>Prices and taxes</h3>
            <p>
              The price in your quote is per night: per bed in the dorm, per room for the private room. GST is included.
            </p>
            <p className="pay">
              Before you pay, check the payment details with us on WhatsApp or by email. If anyone asks you to pay anywhere else, message us before you do.
            </p>
          </section>
          <section id="cancel" aria-labelledby="p2">
            <h2 id="p2"><span className="no">02</span>Cancellation and refunds</h2>
            <p>
              Plans change. Tell us by email or WhatsApp the moment you know. The date you message us is the date we go by.
            </p>
            <table className="terms">
              <thead><tr><th scope="col">If you cancel</th><th scope="col">What you get back</th></tr></thead>
              <tbody>
                <tr>
                  <td>7 days or more before arrival</td>
                  <td data-k="Refund">Full refund of what you paid</td>
                </tr>
                <tr>
                  <td>3 to 6 days before arrival</td>
                  <td data-k="Refund">Half of what you paid</td>
                </tr>
                <tr><td>Less than 3 days before, or you don't turn up</td><td data-k="Refund">Not refunded</td></tr>
              </tbody>
            </table>
            <h3>Changing your dates</h3>
            <p>You can move your dates once, free, if you tell us at least 7 days before arrival.</p>
            <h3>If the road is closed</h3>
            <p>
              NH10 can close in the monsoon. If it's closed on your travel day, you can move your dates free, or get a full refund.
            </p>
            <h3>If we have to cancel</h3>
            <p>You get back everything you paid.</p>
            <h3>How refunds are paid</h3>
            <p>By UPI, within 7 days.</p>
          </section>
          <section id="checkin" aria-labelledby="p3">
            <h2 id="p3"><span className="no">03</span>Check-in and check-out</h2>
            <p>
              Check-in from 11 am. Check-out by 10 am.
            </p>
            <p>
              Arriving late, or early? Tell us roughly when, by email or WhatsApp. Early check-in depends on occupancy: if your bed is free, you can have it early, at no charge.
            </p>
          </section>
          <section id="id" aria-labelledby="p4">
            <h2 id="p4"><span className="no">04</span>ID at check-in</h2>
            <p>Every guest shows ID at check-in: an Aadhaar card, PAN card or passport.</p>
            <h3>Age</h3>
            <p>Guests must be 16 or over. Zhilly isn't set up for families, so we don't take family bookings.</p>
            <p>How we handle your ID details is on the <Link href="/privacy/">Privacy</Link> page.</p>
          </section>
          <section id="house" aria-labelledby="p5">
            <h2 id="p5"><span className="no">05</span>House rules</h2>
            <p>
              Zhilly is social. A party hostel? Maybe. Up to eight people share the dorm, so the rules still come down to letting everyone sleep.
            </p>
            <dl className="short">
              <dt>Quiet hours</dt>
              <dd>None for now. We may set them from midnight.</dd>
              <dt>Visitors</dt>
              <dd>Day visitors are welcome, including in the dorm</dd>
              <dt>Smoking</dt>
              <dd>Not in the dorm. Fine everywhere else on the grounds, including the lawn and the workspace</dd>
              <dt>Alcohol</dt>
              <dd>Allowed</dd>
            </dl>
          </section>
          <section id="cafe" aria-labelledby="p6">
            <h2 id="p6"><span className="no">06</span>The café</h2>
            <p>
              Café bills are paid when you order. More about the café is on the <Link href="/cafe/">Café</Link> page.
            </p>
          </section>
          <section id="damage" aria-labelledby="p7">
            <h2 id="p7"><span className="no">07</span>Damage and lost property</h2>
            <p>If something gets broken, tell us. Accidents happen.</p>
            <p>Left something behind? Message us.</p>
          </section>
          <section id="who" aria-labelledby="p8">
            <h2 id="p8"><span className="no">08</span>Who runs Zhilly</h2>
            <p>Zhilly is operated by Canopy Ventures, a partnership firm.</p>
            <dl className="short">
              <dt>Address</dt>
              <dd>Lower Bong Basti, Kalimpong, West Bengal 734301</dd>
              <dt>Email</dt>
              <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
              <dt>WhatsApp</dt>
              <dd>{site.phoneDisplay} <a href={wa.checkDates}>Open a chat</a></dd>
            </dl>
          </section>
          <section id="changes" aria-labelledby="p9">
            <h2 id="p9"><span className="no">09</span>Changes to these policies</h2>
            <p>We'll update this page as we learn.</p>
          </section>
        </article>
      </div>
    </PageShell>
  );
}
