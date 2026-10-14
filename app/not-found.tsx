/**
 * Branded 404 (W0). Handles notFound() and every unmatched URL; renders inside the root layout
 * with the shared Navbar and Footer.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { CTA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const destinations = [
  { href: "/", label: "Home", text: "Start from the overview." },
  { href: "/features", label: "All modules", text: "Every school ERP module in one place." },
  { href: "/digiboard", label: "DigiBoard", text: "Campus screens and notices." },
  { href: "/library", label: "Learning library", text: "Sample chapters by board, grade and subject." },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 bg-paper py-20 sm:py-28">
        <Container className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-amber-700">Error 404</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            We could not find that page
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            The link may be old or mistyped. These pages are a good place to pick up from, or book a demo and we
            will walk you through Shiksha Tantra.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={CTA.primaryHref} size="lg">
              {CTA.primary}
            </LinkButton>
            <LinkButton href={CTA.secondaryHref} variant="outline" size="lg">
              {CTA.secondary}
            </LinkButton>
          </div>

          <nav aria-label="Popular pages" className="mt-14">
            <ul className="grid gap-3 sm:grid-cols-2">
              {destinations.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-line-soft bg-white p-5 transition-colors hover:border-line"
                  >
                    <span>
                      <span className="block font-display text-lg font-bold text-ink">{item.label}</span>
                      <span className="mt-1 block text-sm text-ink-muted">{item.text}</span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 shrink-0 text-amber-700 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </main>
      <Footer />
    </>
  );
}
