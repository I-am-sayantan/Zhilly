import type { ReactNode } from "react";
import type { NavKey } from "@/lib/site";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import SiteEffects from "./SiteEffects";

/**
 * Header, <main> and footer around a page. `data-page` scopes that page's own stylesheet
 * (every rule in app/<page>/page.css starts with :where([data-page="..."])), so styles from a
 * page visited earlier in the session never leak into the next one.
 */
export default function PageShell({ page, nav, home, children }: {
  page: string;
  nav?: NavKey;
  home?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={home ? "shell" : "shell inner"} data-page={page}>
      <SiteHeader current={nav} home={home} />
      <main id="main">{children}</main>
      <SiteFooter />
      <SiteEffects />
    </div>
  );
}
