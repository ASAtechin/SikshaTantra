import type { MetadataRoute } from "next";
import { modules } from "@/lib/modules-data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/features`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/digiboard`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/request-demo`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const moduleRoutes: MetadataRoute.Sitemap = modules.map((module) => ({
    url: `${siteUrl}/features/${module.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...moduleRoutes];
}
