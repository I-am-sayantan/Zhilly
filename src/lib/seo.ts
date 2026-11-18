import type { Metadata } from "next";
import { site } from "./site";

export const ogImage = {
  url: `${site.domain}/og.jpg`,
  secureUrl: `${site.domain}/og.jpg`,
  type: "image/jpeg",
  width: 1200,
  height: 630,
  alt: "Two photos of the Zhilly cottage among tall trees, with the words Building Zhilly, a hostel and café in the Kalimpong hills.",
};

/** Per-page title, description, canonical and link preview. Next replaces (not merges) openGraph per page, so it is built whole here. */
export function pageMeta(path: string, title: string, description: string, ogTitle = title): Metadata {
  const url = `${site.domain}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: site.name, locale: "en_IN", url, title: ogTitle, description, images: [ogImage] },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [ogImage.url] },
  };
}

const hostelId = `${site.domain}/#hostel`;

const address = {
  "@type": "PostalAddress",
  streetAddress: site.address,
  addressLocality: "Kalimpong",
  addressRegion: "West Bengal",
  postalCode: site.pin,
  addressCountry: "IN",
};
const geo = { "@type": "GeoCoordinates", latitude: 27.058037, longitude: 88.473698 };

const amenity = (name: string, value: boolean | string = true) => ({ "@type": "LocationFeatureSpecification", name, value });
const offer = (name: string, price: number, description: string) => ({
  "@type": "Offer",
  name,
  description,
  price,
  priceCurrency: "INR",
  priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "INR", unitText: "per night" },
});

/** Site-wide: the hostel and the website. Facts only as stated on the pages. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Hostel",
      "@id": hostelId,
      name: site.name,
      description:
        "A small social hostel with a café in a cottage among very tall trees in Kalimpong, West Bengal: one mixed dorm with eight beds (four bunk beds) and one private room with a queen bed and its own bathroom.",
      url: `${site.domain}/`,
      image: [`${site.domain}/photos/cottage-front.jpg`, `${site.domain}/photos/grounds-wide.jpg`],
      logo: `${site.domain}/icon.png`,
      email: site.email,
      telephone: site.phoneDisplay,
      address,
      geo,
      hasMap: site.mapUrl,
      priceRange: "₹800–₹1,700 a night",
      currenciesAccepted: "INR",
      paymentAccepted: "UPI",
      checkinTime: "11:00:00+05:30",
      checkoutTime: "10:00:00+05:30",
      numberOfRooms: 2,
      amenityFeature: [
        amenity("Internet", "40–50 Mbps"),
        amenity("Hot water"),
        amenity("Breakfast included with dorm beds"),
        amenity("Bed linen, blanket and towel"),
        amenity("Power backup for lighting and internet"),
        amenity("Café"),
      ],
      makesOffer: [
        offer("Dorm bed", 800, "One bed in the mixed dorm, per night, breakfast included."),
        offer("Private room", 1500, "The room, per night, up to two guests, with its own bathroom."),
        offer("Private room with breakfast", 1700, "The room, per night, with breakfast for two."),
      ],
      sameAs: [site.instagramUrl, site.facebookUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${site.domain}/#website`,
      url: `${site.domain}/`,
      name: site.name,
      inLanguage: "en-IN",
      publisher: { "@id": hostelId },
    },
  ],
};

export const cafeLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "@id": `${site.domain}/cafe/#cafe`,
  name: "Zhilly café",
  description: "The café at Zhilly hostel in Kalimpong: food, tea and coffee, and somewhere to sit and talk. Guests and day visitors are welcome.",
  url: `${site.domain}/cafe/`,
  image: `${site.domain}/photos/dining-shed.jpg`,
  email: site.email,
  telephone: site.phoneDisplay,
  address,
  geo,
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "12:00",
    closes: "23:00",
  }],
  containedInPlace: { "@id": hostelId },
};

export function breadcrumbLd(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${site.domain}${path}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.name, item: `${site.domain}/` },
      { "@type": "ListItem", position: 2, name, item: `${site.domain}${path}` },
    ],
  };
}

export function faqLd(path: string, qa: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${site.domain}${path}#faq`,
    mainEntity: qa.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}
