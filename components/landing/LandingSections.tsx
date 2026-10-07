"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Eye,
  FileCheck2,
  Globe2,
  Lock,
  Monitor,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { modules } from "@/lib/modules-data";
import { Reveal } from "@/components/landing/motion-primitives";

const trustSignals = [
  { icon: ShieldCheck, label: "Zero-trust authorisation" },
  { icon: Lock, label: "Role-segregated sensitive data" },
  { icon: FileCheck2, label: "Corrections preserve history" },
  { icon: Globe2, label: "CBSE · ICSE · State boards" },
  { icon: Workflow, label: "Fail-safe offline fallbacks" },
  { icon: Eye, label: "Full audit transparency" },
];

const before = [
  "Paper registers, re-typed by hand",
  "Fee receipts reconciled once a month",
  "Parents calling for every update",
  "Report cards built in Word",
  "No record of who changed what",
  "A different login for every task",
];

const after = [
  "Attendance live the moment it is taken",
  "Every rupee traced automatically",
  "Guardians notified as it happens",
  "Report cards locked in seconds",
  "Every change logged, permanently",
  "One login across every module",
];

/** Scrolling capability strip. Pauses on hover; CSS halts it under reduced motion. */
export function TrustStrip() {
  const row = [...trustSignals, ...trustSignals];

  return (
    <section className="border-y border-brand-950/5 bg-white/60 py-7">
      <div className="mask-fade-x w-full overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:[animation:none]">
          {row.map((item, index) => (
            <div key={`${item.label}-${index}`} className="flex shrink-0 items-center gap-2.5 text-brand-950/55">
              <item.icon className="h-[18px] w-[18px] text-amber-600" />
              <span className="whitespace-nowrap text-sm font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The upfront feature glimpse: all twelve modules visible at a glance. */
export function ModuleShowcase() {
  return (
    <section id="modules" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Everything in one system"
            title="Twelve modules. One source of truth."
            description="Admissions to analytics, each module shares the same governed data — so a change in one place is never re-typed somewhere else."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((module, index) => (
            <Reveal key={module.slug} delay={Math.min(index * 0.03, 0.24)}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="h-full"
              >
                <Link
                  href={`/features/${module.slug}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-950/8 bg-gradient-to-br p-6 transition-shadow hover:shadow-[var(--shadow-lift)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${module.accent}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-950 text-amber-400">
                      <module.icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-brand-950/25 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-950" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-brand-950">{module.name}</h3>
                  <p className="mt-2 text-sm font-semibold leading-snug text-brand-950/55">{module.tagline}</p>
                  <span className="mt-4 inline-block w-fit rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-bold text-brand-950/50">
                    {module.tag}
                  </span>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/features"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-950 px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              Explore every module
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Before / after contrast — the fastest way to communicate the value. */
export function BeforeAfter() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Before & after"
            title="Running a school shouldn't feel like firefighting"
            description="One coherent system instead of a patchwork of registers, spreadsheets and phone calls."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2 xl:gap-8">
          <Reveal>
            <div className="h-full rounded-3xl border border-red-200/60 bg-red-50/50 p-7 sm:p-8">
              <h3 className="font-display text-lg font-bold text-red-900/80">Without a connected system</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {before.map((text) => (
                  <li
                    key={text}
                    className="flex items-center gap-3 rounded-2xl bg-white/60 p-3.5 text-sm font-semibold leading-snug text-red-950/70"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-200/70 text-red-700">
                      <X className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl border border-teal-200/70 bg-teal-50/50 p-7 sm:p-8">
              <h3 className="font-display text-lg font-bold text-teal-900">With Siksha Tantra</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {after.map((text) => (
                  <li
                    key={text}
                    className="flex items-center gap-3 rounded-2xl bg-white/70 p-3.5 text-sm font-semibold leading-snug text-teal-950/75"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-brand-950/45">
            Implementation scope, integrations and timelines are agreed with each school. These describe the
            system design, not a claim that every module is already live on your campus.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/** DigiBoard cross-sell band. */
export function DigiBoardBand() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-brand-950 px-7 py-14 text-white sm:px-12 lg:px-16">
            <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-amber-300">
                  <Monitor className="h-3.5 w-3.5" /> DigiBoard
                </span>
                <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">
                  Your campus screens, fed by the same data
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-white/70">
                  Timetable changes, substitutions and announcements reach every display from the same governed
                  records — so a screen never shows a schedule the office has already changed.
                </p>
                <Link
                  href="/digiboard"
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 text-sm font-bold text-brand-950 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  See how DigiBoard works
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { title: "Always live", desc: "Changes appear within seconds." },
                  { title: "Fails safe", desc: "Never shows stale data as current." },
                  { title: "Per-device identity", desc: "Each screen enrols separately." },
                  { title: "Room-aware", desc: "Content fits where it is shown." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-display text-sm font-bold text-amber-300">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Closing conversion band. */
export function ClosingCta() {
  return (
    <section className="pb-24 pt-4">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-[32px] border border-brand-950/8 bg-white/70 px-7 py-14 text-center sm:px-12">
            <SectionHeading
              eyebrow="Next step"
              title="See it running on your school's structure"
              description="Share your boards, campus size and current challenges. We prepare a walkthrough around them rather than a canned script."
            />
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/request-demo"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-950 px-7 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:w-auto"
              >
                Request a walkthrough
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+919407174355"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-950/15 px-7 py-4 text-sm font-bold text-brand-950 transition-colors hover:bg-brand-950/5 sm:w-auto"
              >
                Call +91 94071 74355
              </a>
            </div>
            <p className="mt-6 text-xs text-brand-950/45">We respond within one business day.</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
