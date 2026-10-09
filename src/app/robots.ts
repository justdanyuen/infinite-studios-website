import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Served at /robots.txt
export default function robots(): MetadataRoute.Robots {
  // Keep preview/staging deployments out of search results.
  // On Vercel, VERCEL_ENV is "production" only for the live domain.
  const isProduction =
    process.env.VERCEL_ENV === "production" ||
    (!process.env.VERCEL_ENV && process.env.NODE_ENV === "production");

  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      // Everyone, including AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
      // Google-Extended, etc.), may crawl public pages.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
