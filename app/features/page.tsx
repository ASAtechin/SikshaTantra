import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Monitor } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { getModulesByGroup, plannedModules } from "@/lib/modules-data";
import { CTA, pageMetadata, siteStatus } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "School ERP Modules: Admissions, Attendance & Fees",
  "Explore how Shiksha Tantra's school ERP modules are designed for Indian schools: admissions, attendance, timetable, report cards, fees, transport, safeguarding and more.",
  "/features"
);

function slugify(text: string) {
  return text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function FeaturesIndexPage() {
  const groups = getModulesByGroup();

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <Badge>School ERP modules</Badge>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              School ERP modules designed for Indian K-12 schools
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-lg leading-relaxed text-ink-muted">
              Twelve modules shaped around how CBSE, CISCE and state-board schools run admissions, attendance,
              fees, safety and reporting. Scope and integrations are agreed with each school.
            </p>
            <p className="mx-auto mt-5 inline-flex max-w-2xl flex-wrap items-center justify-center gap-2 rounded-full bg-amber-500/15 px-4 py-1.5 text-sm text-amber-800">
              <span className="font-bold">{siteStatus.label}:</span> {siteStatus.text}
            </p>
          </div>

          <nav aria-label="Module groups" className="mt-10">
            <ul className="flex flex-wrap justify-center gap-2">
              {groups.map((g) => (
                <li key={g.name}>
                  <a
                    href={`#${slugify(g.name)}`}
                    className="inline-flex min-h-10 items-center rounded-full border border-line-soft bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-brand-600 hover:bg-brand-50"
                  >
                    {g.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#planned"
                  className="inline-flex min-h-10 items-center rounded-full border border-line-soft bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-brand-600 hover:bg-brand-50"
                >
                  Also in scope
                </a>
              </li>
            </ul>
          </nav>

          <div className="mt-14 space-y-14">
            {groups.map((g) => (
              <section key={g.name} id={slugify(g.name)} aria-labelledby={`${slugify(g.name)}-title`} className="scroll-mt-28">
                <div className="flex flex-col gap-1 border-b border-line-soft pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                  <h2 id={`${slugify(g.name)}-title`} className="font-display text-2xl font-bold text-ink">
                    {g.name}
                  </h2>
                  <p className="max-w-xl text-ink-muted sm:text-right">{g.description}</p>
                </div>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {g.modules.map((m) => (
                    <li key={m.slug}>
                      <Link
                        href={`/features/${m.slug}`}
                        className="group flex h-full flex-col rounded-3xl border border-line-soft bg-white p-6 transition-shadow hover:shadow-[var(--shadow-lift)]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-950 text-amber-400">
                            <m.icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-5 w-5 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink motion-reduce:transform-none"
                          />
                        </div>
                        <h3 className="mt-5 font-display text-lg font-bold text-ink">{m.name}</h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.06em] text-amber-700">{m.group}</p>
                        <p className="mt-3 leading-snug text-ink-muted">{m.tagline}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section aria-labelledby="digiboard-title" className="mt-16">
            <Link
              href="/digiboard"
              className="group flex flex-col gap-4 rounded-3xl bg-brand-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <span className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-400">
                  <Monitor className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span id="digiboard-title" className="block font-display text-lg font-bold">
                    DigiBoard campus screens
                  </span>
                  <span className="mt-1 block text-white/85">
                    Timetables, substitutions and emergency notices on the displays around your campus. Its
                    scheduling and display foundation works today.
                  </span>
                </span>
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-amber-400">
                About DigiBoard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
              </span>
            </Link>
          </section>

          <section id="planned" aria-labelledby="planned-title" className="mt-16 scroll-mt-28">
            <div className="max-w-3xl">
              <h2 id="planned-title" className="font-display text-2xl font-bold text-ink sm:text-3xl">
                Also in scope (planned)
              </h2>
              <p className="mt-3 text-ink-muted">
                These are part of the product specification and are planned. We will confirm timing with founding
                schools rather than publish dates here.
              </p>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {plannedModules.map((p) => (
                <li key={p.name} className="flex gap-4 rounded-2xl border border-dashed border-line bg-paper-raised p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <p.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">
                      {p.name} <span className="ml-1 align-middle text-xs font-semibold text-amber-700">Planned</span>
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="features-cta-title" className="mt-16">
            <div className="flex flex-col items-center gap-5 rounded-[2.5rem] bg-brand-950 px-6 py-14 text-center text-white sm:px-16">
              <h2 id="features-cta-title" className="max-w-xl text-balance font-display text-2xl font-bold sm:text-3xl">
                Walk through the modules your school needs first
              </h2>
              <p className="max-w-xl text-balance text-white/85">
                We will go through how each module is designed, what exists today, and what we would set up for your
                school.
              </p>
              <LinkButton href={CTA.primaryHref} variant="amber" size="lg">
                {CTA.primary}
              </LinkButton>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
