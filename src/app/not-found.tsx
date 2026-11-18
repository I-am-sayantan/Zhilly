import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { mail } from "@/lib/site";
import "./not-found.css";

export const metadata: Metadata = {
  title: "Off the map · Zhilly",
  description: "This page doesn't exist. Head back to the Zhilly homepage, the beds, or directions, or email us.",
};

export default function NotFound() {
  return (
    <PageShell page="404">
      <section className="lost" aria-labelledby="h1">
        <svg className="contours" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#topoB" /></svg>
        <div className="wrap in">
          <div className="copy">
            <p className="mono">Error 404 · Off the map</p>
            <h1 id="h1">This path doesn't go anywhere.</h1>
            <p className="lead">
              The page you were after isn't here. It may have moved, or the link had a typo in it. These ones do lead somewhere:
            </p>
            <ol className="ways">
              <li><Link href="/"><b>Home</b><span>Back to the start of the trail</span></Link></li>
              <li><Link href="/stay/"><b>Stay</b><span>Eight beds and a private room</span></Link></li>
              <li><Link href="/find-us/"><b>Find us</b><span>The road up from NJP</span></Link></li>
            </ol>
            <a className="btn" href={mail.checkDates}>Or just email us</a>
          </div>
        </div>
        <div className="mapfrag" aria-hidden="true">
          <div className="unsurveyed"><span>Not yet surveyed</span></div>
          <svg viewBox="0 0 1440 900" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fadeout" gradientUnits="userSpaceOnUse" x1="1080" y1="0" x2="1330" y2="0">
                <stop offset="0" stopColor="#C2412D" />
                <stop offset="1" stopColor="#C2412D" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="ghost" d="M-20 830C120 870 260 790 400 815S640 880 780 830S930 700 980 600S1040 430 1130 400" />
            <path className="live" d="M-20 830C120 870 260 790 400 815S640 880 780 830S930 700 980 600S1040 430 1130 400S1290 360 1460 250" />
          </svg>
          <p className="here">You are here.<br />Here is nowhere.</p>
          <div className="pin">
            <svg viewBox="0 0 30 40">
              <path d="M15 39C15 39 2 23 2 14a13 13 0 0 1 26 0c0 9-13 25-13 25z" fill="#C2412D" />
              <circle cx="15" cy="14" r="5.5" fill="#F7F3E6" />
            </svg>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
