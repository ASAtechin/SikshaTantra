import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/", label: "Interactive Home" },
      { href: "/features", label: "All ERP Modules" },
      { href: "/digiboard", label: "DigiBoard Signage" },
      { href: "/request-demo", label: "Request a Demo" },
    ],
  },
  {
    title: "Modules",
    links: [
      { href: "/features/admissions-enrollment", label: "Admissions & Enrollment" },
      { href: "/features/attendance", label: "Attendance" },
      { href: "/features/fees-finance", label: "Fees & Finance" },
      { href: "/features/assessment-report-cards", label: "Exams & Report Cards" },
      { href: "/features/child-safeguarding", label: "Child Safeguarding" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-brand-950 text-white">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

      <Container className="relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-brand-950">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold">
                Siksha <span className="text-amber-400">Tantra</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              One secure system of record for every school function — plus DigiBoard, our
              real-time digital signage network — built on a zero-trust, audit-proof
              architecture so nothing is ever guessed, faked, or silently lost.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 text-sm text-white/70">
              <a href="mailto:hello@shikshatantra.in" className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-amber-400" /> hello@shikshatantra.in
              </a>
              <a href="tel:+919407174355" className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-amber-400" /> +91 94071 74355
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-400" /> Pune, Maharashtra, India
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Siksha Tantra. All rights reserved.</p>
          <p>Designed and engineered for schools that refuse to guess.</p>
        </div>
      </Container>
    </footer>
  );
}
