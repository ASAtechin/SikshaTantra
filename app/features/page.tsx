import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { modules } from "@/lib/modules-data";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "School ERP Modules: Admissions, Attendance & Fees",
  "Explore Siksha Tantra school ERP workflows for admissions, attendance, fees, timetable, report cards and transport. Discuss an implementation for your school.",
  "/features"
);

export default function FeaturesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <Badge>All Modules</Badge>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
              School ERP modules for your campus.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-balance text-brand-950/60">
              Explore admissions, attendance, fees, timetable and report-card workflows. Implementation scope and integrations are agreed with each school.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modules.map((m) => (
              <Link
                key={m.slug}
                href={`/features/${m.slug}`}
                className={`group relative overflow-hidden rounded-3xl border border-brand-950/8 bg-gradient-to-br p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${m.accent}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-950 text-amber-400">
                    <m.icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-brand-950/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-950" />
                </div>
                <h2 className="mt-5 font-display text-lg font-bold text-brand-950">{m.name}</h2>
                <p className="mt-2 text-sm font-semibold leading-snug text-brand-950/55">{m.tagline}</p>
                <span className="mt-4 inline-block rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-bold text-brand-950/50">
                  {m.tag}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
