import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { site, wa } from "@/lib/site";
import "./page.css";

export const metadata: Metadata = pageMeta("/privacy/", "Privacy notice · Zhilly hostel, Kalimpong", "What Zhilly hostel in Kalimpong (run by Canopy Ventures) keeps when you send a booking enquiry, message us or check in: why we keep it, who sees it, how long.");

export default function PrivacyPage() {
  return (
    <PageShell page="privacy">
      <JsonLd data={breadcrumbLd("/privacy/", "Privacy")} />
      <section className="phero flat" aria-labelledby="h1">
        <svg className="contours" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ transform: "scaleX(-1)" }}>
          <use href="#topoB" />
        </svg>
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Zhilly</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Privacy</span>
          </nav>
          <h1 id="h1">Privacy</h1>
          <p className="lead">
            What we know about you, why, and who sees it. Short, because we mean to keep very little.
          </p>
        </div>
        <div className="eave" aria-hidden="true" />
      </section>
      <div className="doc wrap">
        <aside className="toc" aria-label="On this page">
          <div className="in">
            <p className="mono">On this page</p>
            <ol>
              <li><a href="#who"><span>01</span>Who we are</a></li>
              <li><a href="#site"><span>02</span>This website</a></li>
              <li><a href="#keep"><span>03</span>What we keep</a></li>
              <li><a href="#why"><span>04</span>Why we use it</a></li>
              <li><a href="#sees"><span>05</span>Who sees it</a></li>
              <li><a href="#long"><span>06</span>How long we keep it</a></li>
              <li><a href="#rights"><span>07</span>Your rights</a></li>
              <li><a href="#contact"><span>08</span>Contact</a></li>
              <li><a href="#changes"><span>09</span>Changes to this notice</a></li>
            </ol>
            <dl className="docmeta">
              <dt>Responsible for your data</dt>
              <dd>Canopy Ventures</dd>
            </dl>
          </div>
        </aside>
        <article className="prose policy">
          <section id="who" aria-labelledby="p1">
            <h2 id="p1"><span className="no">01</span>Who we are</h2>
            <p className="intro">
              Zhilly is a small hostel and café in Kalimpong, operated by Canopy Ventures. When this page says "we", that's who it means.
            </p>
            <dl className="short">
              <dt>Operator</dt>
              <dd>Canopy Ventures, a partnership firm</dd>
              <dt>Address</dt>
              <dd>Lower Bong Basti, Kalimpong, West Bengal 734301</dd>
              <dt>Website</dt>
              <dd>zhilly.life</dd>
            </dl>
          </section>
          <section id="site" aria-labelledby="p2">
            <h2 id="p2"><span className="no">02</span>This website</h2>
            <p>
              zhilly.life is hosted on Cloudflare Pages. There are no accounts and nothing to log in to. The one thing the site asks you for is the booking enquiry form.
            </p>
            <p>
              When you send the form, Cloudflare Turnstile first checks that you're a person and not a spam bot. Your enquiry then goes to our booking service at cal.zhilly.life, which runs on Cloudflare and stores it in a Cloudflare D1 database. Resend sends two emails: one to us, and a copy to you (without your message).
            </p>
            <p>
              If you email us, that goes to Gmail (Google). If you message us on WhatsApp, that chat is run by Meta. Their own privacy policies apply as well as this one.
            </p>
          </section>
          <section id="keep" aria-labelledby="p3">
            <h2 id="p3"><span className="no">03</span>What we keep</h2>
            <p>Only what it takes to answer you, hold your beds and check you in.</p>
            <table className="keep">
              <thead>
                <tr><th scope="col">What</th><th scope="col">When we get it</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Your name, phone number and email</td>
                  <td data-k="When">Enquiry form, message or email</td>
                </tr>
                <tr>
                  <td>Your dates, number of guests and your message</td>
                  <td data-k="When">Enquiry form, message or email</td>
                </tr>
                <tr>
                  <td>The IP address you sent the form from</td>
                  <td data-k="When">You send the enquiry form</td>
                </tr>
                <tr>
                  <td>A reference for your UPI advance</td>
                  <td data-k="When">You pay the advance</td>
                </tr>
                <tr>
                  <td>Your ID details</td>
                  <td data-k="When">At check-in</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section id="why" aria-labelledby="p4">
            <h2 id="p4"><span className="no">04</span>Why we use it</h2>
            <ul>
              <li>To reply to your enquiry, send a quote and hold your beds.</li>
              <li>To keep spam and misuse off the enquiry form.</li>
              <li>To match your advance to your booking.</li>
              <li>To check you in, and to keep the guest records the law asks of us.</li>
            </ul>
          </section>
          <section id="sees" aria-labelledby="p5">
            <h2 id="p5"><span className="no">05</span>Who sees it</h2>
            <ul>
              <li>Us.</li>
              <li>Cloudflare, which hosts the site, runs the enquiry form's service and database, and runs the Turnstile spam check.</li>
              <li>Resend, which sends the enquiry emails.</li>
              <li>Google, for our Gmail inbox.</li>
              <li>WhatsApp (Meta), which carries our chats.</li>
              <li>Your UPI app and bank, for the advance.</li>
              <li>Government authorities, where the law requires it.</li>
            </ul>
          </section>
          <section id="long" aria-labelledby="p6">
            <h2 id="p6"><span className="no">06</span>How long we keep it</h2>
            <p>As long as we need it, and as long as the law says we must. Then we delete it.</p>
            <p>
              You can ask us to delete your enquiry at any time: write to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </section>
          <section id="rights" aria-labelledby="p7">
            <h2 id="p7"><span className="no">07</span>Your rights</h2>
            <p>
              You can ask us what we hold about you, ask us to correct it, and ask us to delete it where we're allowed to. If you agreed to something, you can change your mind. Write to us by email or on WhatsApp.
            </p>
          </section>
          <section id="contact" aria-labelledby="p8">
            <h2 id="p8"><span className="no">08</span>Contact</h2>
            <dl className="short">
              <dt>Email</dt>
              <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
              <dt>WhatsApp</dt>
              <dd>{site.phoneDisplay} <a href={wa.checkDates}>Open a chat</a></dd>
            </dl>
          </section>
          <section id="changes" aria-labelledby="p9">
            <h2 id="p9"><span className="no">09</span>Changes to this notice</h2>
            <p>If we change what we collect, this page changes first.</p>
            <p>Booking terms are on the <Link href="/policies/">Policies</Link> page.</p>
          </section>
        </article>
      </div>
    </PageShell>
  );
}
