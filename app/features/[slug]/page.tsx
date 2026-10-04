import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { ModuleMockup } from "@/components/illustrations/ModuleMockup";
import { modules, getModule, getAdjacentModules } from "@/lib/modules-data";

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
  return {
    title: `${mod.name} — Shikshatantra`,
    description: mod.summary,
  };
}

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const related = getAdjacentModules(slug, 3);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden pb-16 pt-12">
          <div className="absolute inset-0 -z-10 bg-dot-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
          <Container>
            <Link
              href="/features"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-950/50 transition-colors hover:text-brand-950"
            >
              <ArrowLeft className="h-4 w-4" /> All modules
            </Link>

            <div className="mt-6 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] xl:gap-20">
              <div>
                <Badge>Module · {mod.tag}</Badge>
                <h1 className="mt-6 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl xl:text-5xl">
                  {mod.name}
                </h1>
                <p className="mt-4 text-balance text-xl font-semibold text-amber-600">{mod.tagline}</p>
                <p className="mt-4 max-w-md text-balance leading-relaxed text-brand-950/60">{mod.summary}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <LinkButton href="/request-demo" size="lg" className="group">
                    Request Implementation
                    <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
                  </LinkButton>
                  <LinkButton href="/features" variant="outline" size="lg">
                    Compare other modules
                  </LinkButton>
                </div>
              </div>
              <ModuleMockup kind={mod.mockup} accent={mod.accent} />
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <h2 className="text-center font-display text-2xl font-bold text-brand-950 sm:text-3xl">
              How it actually works
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {mod.steps.map((s, i) => (
                <div
                  key={s.title}
                  className="relative rounded-2xl border border-brand-950/8 bg-white/60 p-6"
                >
                  <span className="absolute right-5 top-5 font-display text-3xl font-extrabold text-brand-950/10">
                    0{i + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-950/5 text-brand-700">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-brand-950">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-snug text-brand-950/55">{s.desc}</p>
                  {i < mod.steps.length - 1 && (
                    <ArrowRight className="absolute -right-6 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-brand-950/15 lg:block" />
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="pb-16">
          <Container>
            <div className={`rounded-[2.5rem] bg-gradient-to-br p-8 sm:p-12 ${mod.accent}`}>
              <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">
                Everything this module covers
              </h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {mod.capabilities.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3.5 text-sm font-bold text-brand-950/75"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600">
                      <c.icon className="h-4.5 w-4.5" />
                    </span>
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-20">
          <Container>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-brand-950 sm:text-2xl">Explore related modules</h2>
              <Link href="/features" className="flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/features/${r.slug}`}
                  className="group rounded-2xl border border-brand-950/8 bg-white/60 p-5 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-950/5 text-brand-700">
                    <r.icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="mt-3 font-display text-sm font-bold text-brand-950">{r.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-brand-950/45">
                    See how it works
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section className="pb-24">
          <Container>
            <div className="flex flex-col items-center gap-5 rounded-[2.5rem] bg-brand-950 px-8 py-14 text-center text-white sm:px-16">
              <CheckCircle2 className="h-10 w-10 text-amber-400" />
              <h2 className="max-w-lg text-balance font-display text-2xl font-bold sm:text-3xl">
                See {mod.name} running on your school&apos;s own data
              </h2>
              <LinkButton href="/request-demo" variant="amber" size="lg">
                Request Implementation
              </LinkButton>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
