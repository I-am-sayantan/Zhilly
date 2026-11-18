import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import "./page.css";

export const metadata: Metadata = {
  title: "Privacy · Zhilly",
  description: "What Zhilly (operated by Canopy Ventures) keeps when you message us on WhatsApp and check in, why, who sees it and for how long. Draft, to be reviewed.",
};

export default function PrivacyPage() {
  return (
    <PageShell page="privacy">
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
            What we know about you, why, and for how long. Short, because we mean to keep very little. A draft until it has been reviewed.
          </p>
        </div>
        <div className="eave" aria-hidden="true" />
      </section>
      <div className="doc wrap">
        <p className="draftstamp"><b>Draft</b>To be reviewed before launch</p>
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
              <li><a href="#contact"><span>08</span>Contact and complaints</a></li>
              <li><a href="#changes"><span>09</span>Changes to this notice</a></li>
            </ol>
            <dl className="docmeta">
              <dt>Status</dt>
              <dd>Draft, not in force</dd>
              <dt>Last updated</dt>
              <dd><span className="ph">[date to confirm]</span></dd>
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
              zhilly.life is a set of plain pages. There are no forms, no accounts and nothing to log in to, so the site itself doesn't ask you for anything.
            </p>
            <p>
              Visitor statistics:{" "}
              <span className="ph">[none, or the analytics tool and what it records: to confirm]</span>
              . Cookies:{" "}
              <span className="ph">[to confirm]</span>
              . Fonts or other files loaded from outside services:{" "}
              <span className="ph">[to confirm at launch]</span>
              .
            </p>
            <p>
              If you message us on WhatsApp, that chat is run by Meta. What you send there is covered by WhatsApp's own privacy policy as well as this one.
            </p>
          </section>
          <section id="keep" aria-labelledby="p3">
            <h2 id="p3"><span className="no">03</span>What we keep</h2>
            <p>
              Only what it takes to answer you, hold your beds and check you in. Every line of this table still needs the owner's confirmation.
            </p>
            <table className="keep">
              <thead>
                <tr><th scope="col">What</th><th scope="col">When we get it</th><th scope="col">Kept for</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Your name and WhatsApp number</td>
                  <td data-k="When">You message us</td>
                  <td data-k="Kept for"><span className="ph">[to confirm]</span></td>
                </tr>
                <tr>
                  <td>Your dates, group size and bed choice</td>
                  <td data-k="When">You message us</td>
                  <td data-k="Kept for"><span className="ph">[to confirm]</span></td>
                </tr>
                <tr>
                  <td>A reference for your UPI advance</td>
                  <td data-k="When">You pay the advance</td>
                  <td data-k="Kept for"><span className="ph">[to confirm]</span></td>
                </tr>
                <tr>
                  <td>Your ID details <span className="ph">[and a copy? to confirm]</span></td>
                  <td data-k="When">At check-in</td>
                  <td data-k="Kept for"><span className="ph">[to confirm]</span></td>
                </tr>
                <tr>
                  <td>Your address <span className="ph">[to confirm]</span></td>
                  <td data-k="When">At check-in</td>
                  <td data-k="Kept for"><span className="ph">[to confirm]</span></td>
                </tr>
                <tr>
                  <td>
                    Passport and visa details, for guests from outside India{" "}
                    <span className="ph">[to confirm]</span>
                  </td>
                  <td data-k="When">At check-in</td>
                  <td data-k="Kept for"><span className="ph">[to confirm]</span></td>
                </tr>
              </tbody>
            </table>
            <p className="ask">
              <span className="mono">To decide</span>
              <span>
                Where ID copies live (one locked device or a locked drawer, not the WhatsApp chat), who can see them, and when they're deleted.
              </span>
            </p>
          </section>
          <section id="why" aria-labelledby="p4">
            <h2 id="p4"><span className="no">04</span>Why we use it</h2>
            <ul>
              <li>To reply to you, send a quote and hold your beds.</li>
              <li>To match your advance to your booking.</li>
              <li>
                To check you in, and to keep the guest records the law asks of us{" "}
                <span className="ph">[which records: to be reviewed]</span>
                .
              </li>
              <li><span className="ph">[Anything else, such as a message after your stay: to confirm]</span></li>
            </ul>
            <p><span className="ph">[No marketing messages unless you say yes: owner to confirm]</span></p>
          </section>
          <section id="sees" aria-labelledby="p5">
            <h2 id="p5"><span className="no">05</span>Who sees it</h2>
            <ul>
              <li>Us. <span className="ph">[Who at Zhilly has access: to confirm]</span></li>
              <li>WhatsApp (Meta), which carries our chat.</li>
              <li>Your UPI app and bank, for the advance.</li>
              <li>
                Government authorities, where the law requires it.{" "}
                <span className="ph">[Which, and when: to be reviewed]</span>
              </li>
              <li>Booking sites, only if you booked through one. <span className="ph">[to confirm]</span></li>
            </ul>
            <p><span className="ph">[We don't sell your data or share it with anyone else: owner to confirm]</span></p>
          </section>
          <section id="long" aria-labelledby="p6">
            <h2 id="p6"><span className="no">06</span>How long we keep it</h2>
            <p>
              As long as we need it, and as long as the law says we must. Then we delete it. The period for each item goes in the table above{" "}
              <span className="ph">[to confirm]</span>
              .
            </p>
          </section>
          <section id="rights" aria-labelledby="p7">
            <h2 id="p7"><span className="no">07</span>Your rights</h2>
            <p>
              You can ask us what we hold about you, ask us to correct it, and ask us to delete it where we're allowed to. If you agreed to something, you can change your mind. Message us and we'll reply within{" "}
              <span className="ph">[time to confirm]</span>
              .
            </p>
            <p className="ask">
              <span className="mono">For review</span>
              <span>
                Our research notes the Digital Personal Data Protection Rules, 2025 (most duties, including notice and consent, from around May 2027) and, until then, the IT Act's SPDI Rules, 2011, which ask for a privacy policy to be published. All of this is to be reviewed by counsel before the page goes live.
              </span>
            </p>
          </section>
          <section id="contact" aria-labelledby="p8">
            <h2 id="p8"><span className="no">08</span>Contact and complaints</h2>
            <dl className="short">
              <dt>Email</dt>
              <dd><a href="mailto:hello@zhilly.life">hello@zhilly.life</a></dd>
              <dt>Grievance contact</dt>
              <dd><span className="ph">[name, and how fast we respond: to confirm]</span></dd>
            </dl>
          </section>
          <section id="changes" aria-labelledby="p9">
            <h2 id="p9"><span className="no">09</span>Changes to this notice</h2>
            <p>
              If we change what we collect, this page changes first. Last updated{" "}
              <span className="ph">[date to confirm]</span>
              .
            </p>
            <p>Booking terms are on the <Link href="/policies/">Policies</Link> page.</p>
          </section>
        </article>
      </div>
    </PageShell>
  );
}
