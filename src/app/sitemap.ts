import type { MetadataRoute } from "next";
import { SITE_URL, PUBLIC_ROUTES } from "@/lib/site";

// Served at /sitemap.xml
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Later: if individual songs or credits get their own pages (e.g. /music/[slug]),
  // pull them from your data source here and append them, e.g.:
  //
  // const songs = await getSongs();
  // const songEntries = songs.map((song) => ({
  //   url: `${SITE_URL}/music/${song.slug}`,
  //   lastModified: song.updatedAt,
  //   changeFrequency: "monthly" as const,
  //   priority: 0.5,
  // }));
  // return [...staticEntries, ...songEntries];

  return staticEntries;
}
