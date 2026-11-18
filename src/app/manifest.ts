import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zhilly · hostel and café in Kalimpong",
    short_name: "Zhilly",
    description: "A small social hostel and café in Kalimpong, West Bengal.",
    start_url: "/",
    display: "browser",
    background_color: "#EFEAD8",
    theme_color: "#EFEAD8",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
