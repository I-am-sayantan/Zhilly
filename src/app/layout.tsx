import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo, Bricolage_Grotesque, Caveat, Fraunces, IBM_Plex_Mono } from "next/font/google";
import SvgDefs from "@/components/SvgDefs";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { ogImage, siteGraph } from "@/lib/seo";
import "./globals.css";

// Self-hosted at build time, so visitors' browsers never call Google Fonts.
const archivo = Archivo({ subsets: ["latin", "latin-ext"], axes: ["wdth"], variable: "--font-archivo" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--font-plex-mono", preload: false });
// the wordmark only
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz", "wdth"], variable: "--font-bricolage", preload: false });
const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], axes: ["opsz", "SOFT"], variable: "--font-fraunces", preload: false });
// the postcard caption only
const caveat = Caveat({ subsets: ["latin"], weight: "500", variable: "--font-caveat", preload: false });

// set at build time from the GTM_ID secret; unset (local dev) means no GTM at all
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: "Zhilly · hostel and café in Kalimpong",
  description: "Zhilly is a small social hostel and café in Kalimpong, West Bengal: eight dorm beds and a private room in a cottage under very tall trees.",
  robots: site.launched ? undefined : { index: false, follow: false },
  // fallback link preview (the 404); every page sets its own through pageMeta()
  openGraph: { type: "website", siteName: "Zhilly", locale: "en_IN", title: "Check out Zhilly · hostel and café in Kalimpong", images: [ogImage] },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#EFEAD8" };

export default function RootLayout({ children }: { children: ReactNode }) {
  const fonts = [archivo, plexMono, bricolage, fraunces, caveat].map((f) => f.variable).join(" ");
  return (
    <html lang="en-IN" className={fonts} suppressHydrationWarning>
      <head>
        {/* lets the CSS hold back scroll-drawn parts until the script is there to draw them */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* Google Tag Manager: GA4 and other tags are set up in the GTM container, not here. Plain inline script so it sits in <head> of every static page; @next/third-parties would be a new dependency for the same thing */}
        {GTM_ID && (
          <>
            {/* eslint-disable-next-line @next/next/next-script-for-ga */}
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');` }} />
          </>
        )}
        <JsonLd data={siteGraph} />
      </head>
      {/* browser extensions (e.g. Grammarly) add attributes to <body>; don't flag those as hydration errors */}
      <body suppressHydrationWarning>
        {GTM_ID && (
          <noscript>
            <iframe title="Google Tag Manager" src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
          </noscript>
        )}
        <a className="skip" href="#main">Skip to content</a>
        <SvgDefs />
        {children}
      </body>
    </html>
  );
}
