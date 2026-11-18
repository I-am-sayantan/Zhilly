import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

// This computer's Wi-Fi/LAN addresses, read fresh each time the dev server starts (they change between networks and laptops).
const lanAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((a) => a && a.family === "IPv4" && !a.internal)
  .map((a) => a!.address);

const nextConfig: NextConfig = {
  // A plain static site: `npm run build` writes HTML/CSS/JS to out/, ready to upload to any host.
  output: "export",
  // /stay -> /stay/index.html, which shared hosting (Apache on Hostinger) serves without rewrites
  trailingSlash: true,
  images: { unoptimized: true },
  // dev only: let phones on the same Wi-Fi load the dev scripts (otherwise they get a 403 and nothing is interactive)
  allowedDevOrigins: lanAddresses,
};

export default nextConfig;
