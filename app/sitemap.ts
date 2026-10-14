import type { MetadataRoute } from "next";
import { allBookParams, prerenderedChapterParams } from "@/lib/library/catalog";
import { modules } from "@/lib/modules-data";
import { siteUrl } from "@/lib/site";

type Entry = [path: string, changeFrequency: "weekly" | "monthly" | "yearly", priority: number];

const staticPages: Entry[] = [
  ["/", "weekly", 1],
  ["/features", "monthly", 0.8],
  ["/digiboard", "monthly", 0.8],
  ["/library", "monthly", 0.8],
  ["/request-demo", "monthly", 0.7],
  ["/pricing", "monthly", 0.7],
  ["/how-it-works", "monthly", 0.6],
  ["/security", "monthly", 0.6],
  ["/faq", "monthly", 0.6],
  ["/privacy", "yearly", 0.3],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = staticPages.map(([path, changeFrequency, priority]) => ({
    url: `${siteUrl}${path}`,
    changeFrequency,
    priority,
  }));

  const moduleRoutes: MetadataRoute.Sitemap = modules.map((module) => ({
    url: `${siteUrl}/features/${module.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Library books and chapters: only the canonical CBSE URLs (other boards share the same chapters and
  // point their canonical link at the CBSE page).
  const bookRoutes: MetadataRoute.Sitemap = allBookParams()
    .filter((book) => book.board === "cbse")
    .map(({ board, grade, subject }) => ({
      url: `${siteUrl}/library/${board}/${grade}/${subject}`,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  const chapterRoutes: MetadataRoute.Sitemap = prerenderedChapterParams().map(({ board, grade, subject, chapter }) => ({
    url: `${siteUrl}/library/${board}/${grade}/${subject}/${chapter}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...moduleRoutes, ...bookRoutes, ...chapterRoutes];
}
