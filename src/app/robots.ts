import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Googlebot",
          "Bingbot",
          "Applebot-Extended",
          "Meta-ExternalAgent",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/"],
      },
    ],
    host: base,
    sitemap: `${base}/sitemap.xml`,
  };
}
