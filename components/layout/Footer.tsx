/** Site-wide Footer (W1-B). Contact details come only from lib/site.ts `contact`. */
import Link from "next/link";
import { GraduationCap, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getModule } from "@/lib/modules-data";
import { CTA, contact, siteStatus } from "@/lib/site";

const footerModuleSlugs = [
  "admissions-enrollment",
  "attendance",
  "fees-finance",
  "assessment-report-cards",
  "child-safeguarding",
  "transport",
];

const columns = [
  {
    title: "Product",
    links: [
      { href: CTA.secondaryHref, label: "Modules" },
      { href: "/digiboard", label: "DigiBoard" },
      { href: CTA.libraryHref, label: "Learning library" },
      { href: "/pricing", label: "Pricing" },
      { href: "/how-it-works", label: "How it works" },
      { href: CTA.primaryHref, label: CTA.primary },
    ],
  },
  {
    title: "Modules",
    links: footerModuleSlugs.flatMap((slug) => {
      const m = getModule(slug);
      return m ? [{ href: `/features/${m.slug}`, label: m.name }] : [];
    }),
  },
  {
    title: "Trust",
    links: [
      { href: "/security", label: "Security & privacy" },
      { href: "/faq", label: "FAQ" },
      { href: "/privacy", label: "Privacy notice" },
    ],
  },
];

const linkClass =
  "rounded text-sm text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-amber-300";

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Shiksha Tantra home" className="inline-flex items-center gap-2.5 rounded-xl focus-visible:outline-amber-300">
              <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-brand-950">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold">
                Shiksha <span className="text-amber-400">Tantra</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85">
              School ERP for Indian schools, with DigiBoard campus screens and a learning library. Admissions,
              attendance, fees, safeguarding and more share one set of school records.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/85">
              <span className="mr-2 inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-amber-300">
                {siteStatus.label}
              </span>
              {siteStatus.short}
            </p>

            <ul className="mt-6 flex flex-col gap-3 text-sm text-white/85">
              <li>
                <a href={contact.phoneHref} className={`inline-flex items-center gap-2 ${linkClass}`}>
                  <Phone aria-hidden="true" className="h-4 w-4 text-amber-300" /> {contact.phoneDisplay}
                </a>
              </li>
              {contact.emailHref && contact.email ? (
                <li>
                  <a href={contact.emailHref} className={`inline-flex items-center gap-2 ${linkClass}`}>
                    <Mail aria-hidden="true" className="h-4 w-4 text-amber-300" /> {contact.email}
                  </a>
                </li>
              ) : null}
              {contact.whatsappHref ? (
                <li>
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${linkClass}`}
                  >
                    <MessageCircle aria-hidden="true" className="h-4 w-4 text-amber-300" /> WhatsApp us
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ) : null}
              <li className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="h-4 w-4 text-amber-300" /> {contact.city}
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-labelledby={`footer-${col.title.toLowerCase()}`}>
              <h2
                id={`footer-${col.title.toLowerCase()}`}
                className="text-xs font-bold uppercase tracking-[0.08em] text-amber-300"
              >
                {col.title}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-sm text-white/85">
          <p>© {new Date().getFullYear()} Shiksha Tantra</p>
        </div>
      </Container>
    </footer>
  );
}
