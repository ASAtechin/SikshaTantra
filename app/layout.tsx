/**
 * Root layout (W0 foundation): fonts, global metadata, JSON-LD, skip link and the root
 * ReducedMotionProvider (MotionConfig reducedMotion="user").
 * Contract: every page renders exactly one <main id="main" tabIndex={-1}> so the skip link works.
 */
import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari, Noto_Serif, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ReducedMotionProvider } from "@/components/landing/ReducedMotionProvider";
import { AttributionCapture } from "@/components/layout/AttributionCapture";
import { contact, pageMetadata, siteName, siteUrl } from "@/lib/site";

// "Forest and Paper" type (Shiksha Tantra design language, November 2026, section 3):
// Noto Serif for headings, titles and figures (600; 400 italic for the hero's second line), Inter for the rest.
const heading = Noto_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

// Devanagari companions. Not preloaded: the browser fetches them only when Hindi text is on the page.
const headingDevanagari = Noto_Serif_Devanagari({
  variable: "--font-heading-devanagari",
  weight: ["400", "600"],
  preload: false,
});

const bodyDevanagari = Noto_Sans_Devanagari({
  variable: "--font-body-devanagari",
  preload: false,
});

export const metadata: Metadata = {
  ...pageMetadata(
    "School ERP, Learning & Campus Signage",
    "Explore Shiksha Tantra school ERP workflows, interactive learning samples and DigiBoard campus signage. Request a walkthrough for your school in India.",
    "/"
  ),
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shiksha Tantra | School ERP & DigiBoard Campus Signage",
    template: "%s · Shiksha Tantra",
  },
  applicationName: "Shiksha Tantra",
  alternates: { canonical: "/" },
  keywords: [
    "school management system",
    "school ERP",
    "DigiBoard",
    "digital signage for schools",
    "Shiksha Tantra",
    "education technology India",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || (
      ["https://siksha-tantra.vercel.app", "https://www.shikshatantra.shop"].includes(siteUrl)
        ? "BGrRfD5OpIGK8cNQ_3RkBsqgd7nA0rH0Y8BBUPt2lJo"
        : undefined
    ),
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION || "B4EF2757D61EEFF0233E9A656CF50ECE",
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      ...(contact.email ? { email: contact.email } : {}),
      telephone: contact.phoneE164,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contact.phoneE164,
        ...(contact.email ? { email: contact.email } : {}),
        contactType: "sales",
        areaServed: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      inLanguage: "en-IN",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${heading.variable} ${headingDevanagari.variable} ${body.variable} ${bodyDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper font-sans text-ink">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <ReducedMotionProvider>{children}</ReducedMotionProvider>
        <AttributionCapture />
        <Analytics />
      </body>
    </html>
  );
}
