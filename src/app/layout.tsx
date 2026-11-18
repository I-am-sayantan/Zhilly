import type { Metadata, Viewport } from "next";
import { Archivo, Bricolage_Grotesque, Caveat, Fraunces, IBM_Plex_Mono } from "next/font/google";
import SvgDefs from "@/components/SvgDefs";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time, so visitors' browsers never call Google Fonts.
const archivo = Archivo({ subsets: ["latin", "latin-ext"], axes: ["wdth"], variable: "--font-archivo" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--font-plex-mono" });
// the wordmark only
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz", "wdth"], variable: "--font-bricolage", preload: false });
const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], axes: ["opsz", "SOFT"], variable: "--font-fraunces", preload: false });
// the postcard caption only
const caveat = Caveat({ subsets: ["latin"], weight: "500", variable: "--font-caveat", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: "Zhilly · hostel and café in Kalimpong",
  robots: site.launched ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  const fonts = [archivo, plexMono, bricolage, fraunces, caveat].map((f) => f.variable).join(" ");
  return (
    <html lang="en-IN" className={fonts} suppressHydrationWarning>
      <head>
        {/* lets the CSS hold back scroll-drawn parts until the script is there to draw them */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      {/* browser extensions (e.g. Grammarly) add attributes to <body>; don't flag those as hydration errors */}
      <body suppressHydrationWarning>
        <a className="skip" href="#main">Skip to content</a>
        <SvgDefs />
        {children}
      </body>
    </html>
  );
}
