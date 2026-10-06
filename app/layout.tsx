import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Siksha Tantra — A Living Learning World",
    template: "%s · Siksha Tantra",
  },
  description:
    "Explore a spatial learning universe, interactive sample lessons, the Siksha Tantra school system, and DigiBoard campus experiences.",
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
  openGraph: {
    title: "Siksha Tantra — A Living Learning World",
    description:
      "A spatial canvas for school life and exploratory learning, with clearly marked sample content and connected DigiBoard experiences.",
    url: "/",
    siteName: "Siksha Tantra",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siksha Tantra — A Living Learning World",
    description:
      "A spatial canvas for school life and exploratory learning, connected to DigiBoard campus signage.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-cream-50 font-sans text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
