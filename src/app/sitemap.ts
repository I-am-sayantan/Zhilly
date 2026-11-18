import type { MetadataRoute } from "next";
import { nav, site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(); // shortcut: build date for every page; switch to per-page dates if pages start changing at different times
  const paths = ["/", ...nav.map((n) => n.href), "/policies/", "/privacy/"];
  return paths.map((p) => ({ url: `${site.domain}${p}`, lastModified, priority: p === "/" ? 1 : 0.7 }));
}
