import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Shikshatantra — The Operating System for Modern Schools",
  description:
    "Shikshatantra is a complete school management ERP with built-in DigiBoard digital signage — admissions to alumni, attendance to analytics, one secure system your whole school actually enjoys using.",
  keywords: [
    "school management system",
    "school ERP",
    "DigiBoard",
    "digital signage for schools",
    "Shikshatantra",
    "education technology India",
  ],
  openGraph: {
    title: "Shikshatantra — The Operating System for Modern Schools",
    description:
      "One secure platform for admissions, attendance, fees, exams, communication, safeguarding, and real-time digital signage.",
    type: "website",
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
