import type { MetadataRoute } from "next";
import { modules } from "@/lib/modules-data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/features`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/digiboard`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/request-demo`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const moduleRoutes: MetadataRoute.Sitemap = modules.map((module) => ({
    url: `${siteUrl}/features/${module.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...moduleRoutes];
}
