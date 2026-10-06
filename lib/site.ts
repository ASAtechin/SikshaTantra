/**
 * Canonical public origin for the deployed site. Override per environment with
 * NEXT_PUBLIC_SITE_URL (no trailing slash needed). Used for metadata, canonical
 * URLs, robots, and the sitemap.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "https://siksha-tantra.vercel.app";

export const siteName = "Siksha Tantra";
