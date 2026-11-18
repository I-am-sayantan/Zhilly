import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// Everyone may crawl, AI answer engines named explicitly (the owner wants Zhilly in AI answers too).
const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot", "Applebot-Extended", "Bingbot", "CCBot", "meta-externalagent"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, { userAgent: aiBots, allow: "/" }],
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
