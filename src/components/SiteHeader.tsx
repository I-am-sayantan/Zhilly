import Link from "next/link";
import { nav, type NavKey } from "@/lib/site";
import MobileMenu from "./MobileMenu";

function NavList({ current }: { current?: NavKey }) {
  return (
    <ul>
      {nav.map((item) => (
        <li key={item.key}>
          <Link href={item.href} aria-current={item.key === current ? "page" : undefined}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SiteHeader({ current, home }: { current?: NavKey; home?: boolean }) {
  return (
    <header className="top">
      <div className="wrap row">
        {home ? (
          <a className="home" href="#top" id="top" aria-label="Zhilly, back to top">Zhilly</a>
        ) : (
          <Link className="home" href="/" aria-label="Zhilly, home">Zhilly</Link>
        )}
        <nav className="mainnav" aria-label="Main">
          <NavList current={current} />
        </nav>
        {/* every page with a nav key (and home) ends in the booking band (CloseBand, #book); policies/privacy don't */}
        <a className="btn" href={current || home ? "#book" : "/plan-your-stay/#book"}>Check dates</a>
        <MobileMenu>
          <nav aria-label="Main">
            <NavList current={current} />
          </nav>
        </MobileMenu>
      </div>
    </header>
  );
}
