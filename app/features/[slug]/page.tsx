import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight, MapPin, Phone, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { ModuleMockup } from "@/components/illustrations/ModuleMockup";
import { modules, getModule, getRelatedModules } from "@/lib/modules-data";
import { CTA, contact, pageMetadata, siteStatus, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) return {};
  return pageMetadata(`${mod.name} School ERP`, mod.summary, `/features/${mod.slug}`);
}

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const related = getRelatedModules(slug, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Shiksha Tantra", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "School ERP Modules", item: `${siteUrl}/features` },
            { "@type": "ListItem", position: 3, name: mod.name, item: `${siteUrl}/features/${mod.slug}` },
          ],
        }).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <section aria-labelledby="module-title" className="relative overflow-hidden pb-16 pt-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-dot-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
          />
          <Container>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-muted">
                <li>
                  <Link href="/" className="rounded px-1 py-1 font-semibold hover:text-ink hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li>
                  <Link href="/features" className="rounded px-1 py-1 font-semibold hover:text-ink hover:underline">
                    Modules
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li>
                  <span aria-current="page" className="px-1 font-semibold text-ink">
                    {mod.name}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] xl:gap-20">
              <div>
                <Badge>{mod.group}</Badge>
                <h1
                  id="module-title"
                  className="mt-6 text-balance font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl xl:text-5xl"
                >
                  {mod.name}
                </h1>
                <p className="mt-4 text-balance text-xl font-semibold text-amber-700">{mod.tagline}</p>
                <p className="mt-4 max-w-xl text-balance text-lg leading-relaxed text-ink-muted">{mod.summary}</p>
                <p className="mt-4 flex max-w-xl items-start gap-2 text-ink-muted">
                  <Users className="mt-1 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                  <span>
                    <span className="font-semibold text-ink">Used by:</span> {mod.audience}
                  </span>
                </p>
                {mod.currentState ? (
                  <p className="mt-4 max-w-xl rounded-2xl border border-teal-700/20 bg-teal-50 px-4 py-3 text-sm text-teal-700">
                    {mod.currentState}
                  </p>
                ) : null}
                <p className="mt-4 max-w-xl text-sm text-ink-muted">
                  <span className="mr-2 inline-flex rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.06em] text-amber-700">
                    {siteStatus.label}
                  </span>
                  {siteStatus.text}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <LinkButton href={CTA.primaryHref} size="lg" className="group">
                    {CTA.primary}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                    />
                  </LinkButton>
                  <LinkButton href={CTA.secondaryHref} variant="outline" size="lg">
                    {CTA.secondary}
                  </LinkButton>
                </div>
              </div>
              <ModuleMockup slug={mod.slug} kind={mod.mockup} accent={mod.accent} />
            </div>
          </Container>
        </section>

        <section aria-labelledby="how-title" className="py-16">
          <Container>
            <h2 id="how-title" className="text-center font-display text-2xl font-bold text-ink sm:text-3xl">
              How it is designed to work
            </h2>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {mod.steps.map((s, i) => (
                <li key={s.title} className="rounded-2xl border border-line-soft bg-white p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.08em] text-amber-700">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.desc}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section aria-labelledby="covers-title" className="pb-16">
          <Container>
            <div className={`rounded-[2.5rem] bg-gradient-to-br p-6 sm:p-12 ${mod.accent}`}>
              <h2 id="covers-title" className="font-display text-2xl font-bold text-ink sm:text-3xl">
                What the module covers
              </h2>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {mod.capabilities.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center gap-3 rounded-2xl bg-white/85 px-4 py-3.5 text-sm font-semibold text-ink"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700">
                      <c.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    {c.label}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section aria-labelledby="india-title" className="pb-16">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-amber-700">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> In Indian schools
                </p>
                <h2 id="india-title" className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                  Details your team will ask about
                </h2>
                <p className="mt-3 text-ink-muted">
                  How {mod.name} is scoped for CBSE, CISCE and state-board schools. Items marked planned are on the
                  roadmap; the rest describe the design we will confirm with your school.
                </p>
              </div>
              <ul className="space-y-3">
                {mod.indiaDetails.map((d) => (
                  <li key={d} className="flex gap-3 rounded-2xl border border-line-soft bg-white px-4 py-3.5 leading-relaxed text-ink">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section aria-labelledby="related-title" className="pb-20">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 id="related-title" className="font-display text-xl font-bold text-ink sm:text-2xl">
                Related modules
              </h2>
              <Link
                href={CTA.secondaryHref}
                className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-800 hover:underline"
              >
                {CTA.secondary} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-7 grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/features/${r.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line-soft bg-white p-5 transition-shadow hover:shadow-[var(--shadow-soft)]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <r.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <h3 className="mt-3 font-display text-base font-bold text-ink">{r.name}</h3>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.06em] text-amber-700">{r.group}</p>
                    <p className="mt-2 text-sm leading-snug text-ink-muted">{r.tagline}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section aria-labelledby="cta-title" className="pb-24">
          <Container>
            <div className="flex flex-col items-center gap-5 rounded-[2.5rem] bg-brand-950 px-6 py-14 text-center text-white sm:px-16">
              <h2 id="cta-title" className="max-w-xl text-balance font-display text-2xl font-bold sm:text-3xl">
                Walk through how {mod.name} is designed for your school
              </h2>
              <p className="max-w-xl text-balance text-white/85">
                Tell us your board, classes and current process. We will show the design, what exists today and what
                we would set up with you as a founding school.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <LinkButton href={CTA.primaryHref} variant="amber" size="lg">
                  {CTA.primary}
                </LinkButton>
                <a
                  href={contact.phoneHref}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 font-semibold text-white hover:text-amber-300 hover:underline"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call {contact.phoneDisplay}
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
