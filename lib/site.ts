/**
 * Canonical public origin for the deployed site. Override per environment with
 * NEXT_PUBLIC_SITE_URL (no trailing slash needed). Used for metadata, canonical
 * URLs, robots, and the sitemap.
 */
import type { Metadata } from "next";

const primaryOrigin = "https://www.shikshatantra.shop";
const configuredOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || primaryOrigin).origin;

export const siteUrl = ["https://siksha-tantra.vercel.app", "https://shikshatantra.shop"].includes(configuredOrigin)
  ? primaryOrigin
  : configuredOrigin;

export const siteName = "Siksha Tantra";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: path,
      siteName,
      locale: "en_IN",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Siksha Tantra school ERP and DigiBoard campus signage" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: ["/opengraph-image"],
    },
  };
}
