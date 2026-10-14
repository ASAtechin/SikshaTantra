/**
 * Site-wide constants shared by every page (W0 foundation contract).
 * - siteUrl / siteName / pageMetadata: canonical origin and per-page metadata helper.
 * - contact: the only source of phone, email, WhatsApp and booking links. Email and WhatsApp have
 *   defaults that NEXT_PUBLIC_* env vars can override. Booking is the site's own demo form, so
 *   bookingHref stays null unless an external scheduler is configured.
 * - CTA: shared call-to-action labels and targets. siteStatus: the early-access line.
 * Never hard-code phone/email/CTA text in components; import from here.
 */
import type { Metadata } from "next";

const primaryOrigin = "https://www.shikshatantra.shop";
const configuredOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || primaryOrigin).origin;

export const siteUrl = ["https://siksha-tantra.vercel.app", "https://shikshatantra.shop"].includes(configuredOrigin)
  ? primaryOrigin
  : configuredOrigin;

export const siteName = "Shiksha Tantra";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "listen@shikshatantra.shop";
const rawWhatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9407174355").replace(/\D/g, "");
// wa.me needs the country code; a bare 10-digit Indian mobile gets +91.
const whatsappDigits = rawWhatsapp.length === 10 ? `91${rawWhatsapp}` : rawWhatsapp;
const whatsappGreeting = `Hello, I would like to know more about ${siteName} for our school.`;

export const contact: {
  phoneDisplay: string;
  phoneHref: string;
  /** E.164 number for structured data. */
  phoneE164: string;
  email: string | null;
  emailHref: string | null;
  whatsappHref: string | null;
  bookingHref: string | null;
  city: string;
} = {
  phoneDisplay: "+91 94071 74355",
  phoneHref: "tel:+919407174355",
  phoneE164: "+919407174355",
  email: contactEmail,
  emailHref: contactEmail ? `mailto:${contactEmail}` : null,
  whatsappHref: whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(whatsappGreeting)}`
    : null,
  bookingHref: process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || null,
  city: "Bengaluru, Karnataka, India",
};

export const CTA = {
  primary: "Book a demo",
  primaryHref: "/request-demo",
  secondary: "See all modules",
  secondaryHref: "/features",
  library: "Open the learning library",
  libraryHref: "/library",
} as const;

export const siteStatus = {
  label: "Early access",
  text: "Shiksha Tantra is in early access. We are onboarding founding schools and shaping each module with them.",
  /** Shorter form for narrow screens. */
  short: "Onboarding founding schools.",
} as const;

const defaultOgImage = "/opengraph-image";
const defaultOgAlt = "Shiksha Tantra school ERP, campus screens and learning library";

export interface PageMetadataOptions {
  /** Absolute path or URL of a 1200x630 image. Defaults to the root opengraph-image. */
  image?: string;
  imageAlt?: string;
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  options: PageMetadataOptions = {}
): Metadata {
  const image = options.image || defaultOgImage;
  const imageAlt = options.imageAlt || defaultOgAlt;
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
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [image],
    },
  };
}
