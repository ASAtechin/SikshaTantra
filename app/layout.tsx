import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { pageMetadata, siteName, siteUrl } from "@/lib/site";

const heading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  ...pageMetadata(
    "School ERP, Learning & Campus Signage",
    "Explore Siksha Tantra school ERP workflows, interactive learning samples and DigiBoard campus signage. Request a walkthrough for your school in India.",
    "/"
  ),
  metadataBase: new URL(siteUrl),
  title: {
    default: "Siksha Tantra | School ERP & DigiBoard Campus Signage",
    template: "%s · Siksha Tantra",
  },
  applicationName: "Siksha Tantra",
  alternates: { canonical: "/" },
  keywords: [
    "school management system",
    "school ERP",
    "DigiBoard",
    "digital signage for schools",
    "Siksha Tantra",
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
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
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
      email: "hello@shikshatantra.in",
      telephone: "+919407174355",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+919407174355",
        email: "hello@shikshatantra.in",
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
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-cream-50 font-sans text-[var(--foreground)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
