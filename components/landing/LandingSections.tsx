import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  FileCheck2,
  Globe2,
  History,
  Landmark,
  Lock,
  MessageCircle,
  Monitor,
  Phone,
  ShieldCheck,
  UsersRound,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton, buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/landing/motion-primitives";
import { getModule, modules, type ModuleDetail } from "@/lib/modules-data";
import { contact, CTA, siteStatus } from "@/lib/site";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-950 focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const moduleName = (slug: string, fallback: string) => getModule(slug)?.name ?? fallback;

/* ------------------------------------------------------------------ */

const benefits: { icon: LucideIcon; label: string }[] = [
  { icon: FileCheck2, label: "Designed for one record per student, from admission to report card" },
  { icon: Wallet, label: "Planned: instalments, concessions and receipts in one ledger" },
  { icon: MessageCircle, label: "Planned: absence and notice alerts for guardians who opt in" },
  { icon: Lock, label: "Designed so staff see only what their role needs" },
  { icon: History, label: "Designed so corrections keep the original on record" },
  { icon: Globe2, label: "Designed for CBSE, ICSE and state boards" },
];

/** What the system is designed to give a school, in plain words. A static row: nothing moves, nothing to pause. */
export function TrustStrip() {
  return (
    <section aria-label="What it is designed to give your school" className="border-y border-line-soft bg-white/60 py-8">
      <Container>
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item) => (
            <li key={item.label} className="flex items-start gap-3 text-sm font-semibold leading-snug text-ink">
              <item.icon aria-hidden="true" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-ochre" />
              {item.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const audiences: {
  icon: LucideIcon;
  title: string;
  desc: string;
  links: { href: string; label: string }[];
}[] = [
  {
    icon: BarChart3,
    title: "Principal",
    desc: "Attendance, results and timetable cover for the whole school in one view.",
    links: [{ href: "/features/governance-analytics", label: moduleName("governance-analytics", "Governance & Analytics") }],
  },
  {
    icon: Landmark,
    title: "Management & trustees",
    desc: "Fee collection, concessions and approvals that can be traced to a person and a date.",
    links: [{ href: "/features/fees-finance", label: moduleName("fees-finance", "Fees & Finance") }],
  },
  {
    icon: FileCheck2,
    title: "Office & accounts",
    desc: "Admissions, student records and the fee counter without re-typing the same details.",
    links: [
      { href: "/features/admissions-enrollment", label: moduleName("admissions-enrollment", "Admissions & Enrollment") },
    ],
  },
  {
    icon: UsersRound,
    title: "Teachers & parents",
    desc: "Quick roll call and marks entry, guardian alerts, and sample chapters to read at home.",
    links: [
      { href: "/features/attendance", label: moduleName("attendance", "Attendance") },
      { href: CTA.libraryHref, label: "Learning library" },
    ],
  },
];

/** Who it's for: each role deep-links to the module that answers its first question. */
export function AudienceStrip() {
  return (
    <section aria-labelledby="audience-title" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading id="audience-title" eyebrow="Who it's for" title="Built for the people who run the school day" />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, index) => (
            <li key={a.title}>
              <Reveal delay={index * 0.04} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-line-soft bg-white/80 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest text-gold">
                    <a.icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{a.desc}</p>
                  <ul className="mt-4 flex flex-col gap-1">
                    {a.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`inline-flex min-h-10 items-center gap-1.5 rounded-full text-sm font-bold text-brand-700 underline-offset-4 hover:underline ${focusRing}`}
                        >
                          {link.label}
                          <ArrowRight aria-hidden="true" className="h-4 w-4" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const moduleGroups: { title: string; slugs: string[] }[] = [
  { title: "Admissions & records", slugs: ["admissions-enrollment", "identity-access"] },
  { title: "Academics", slugs: ["attendance", "timetable-substitution", "assessment-report-cards"] },
  { title: "Fees & finance", slugs: ["fees-finance"] },
  { title: "Safety", slugs: ["child-safeguarding", "transport"] },
  { title: "Staff & operations", slugs: ["hr-staff", "communication", "library-inventory"] },
  { title: "Leadership", slugs: ["governance-analytics"] },
];

function groupedModules() {
  const used = new Set<string>();
  const groups = moduleGroups.map((group) => ({
    title: group.title,
    items: group.slugs
      .map((slug) => modules.find((m) => m.slug === slug))
      .filter((m): m is ModuleDetail => {
        if (m) used.add(m.slug);
        return Boolean(m);
      }),
  }));
  const rest = modules.filter((m) => !used.has(m.slug));
  if (rest.length) groups.push({ title: "More modules", items: rest });
  return groups.filter((g) => g.items.length > 0);
}

/** All modules, grouped by the work they support. */
export function ModuleShowcase() {
  const groups = groupedModules();
  return (
    <section id="modules" aria-labelledby="modules-title" className="scroll-mt-24 bg-white/50 py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            id="modules-title"
            eyebrow="School ERP"
            title="Every module, grouped by the work it supports"
            description="Modules share the same student and staff records, so a detail entered once is designed to appear everywhere it is needed."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal key={group.title} delay={Math.min(index * 0.04, 0.2)} className="h-full">
              <div className="h-full rounded-3xl border border-line-soft bg-paper-raised p-5 sm:p-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-ochre">{group.title}</h3>
                <ul className="mt-3 flex flex-col gap-1">
                  {group.items.map((module) => (
                    <li key={module.slug}>
                      <Link
                        href={`/features/${module.slug}`}
                        className={`group -mx-2 flex items-start gap-3 rounded-2xl p-2 transition-colors hover:bg-white ${focusRing}`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest text-gold">
                          <module.icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5 font-display text-base font-bold text-ink">
                            {module.name}
                            <ArrowUpRight
                              aria-hidden="true"
                              className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          </span>
                          <span className="mt-0.5 block text-sm leading-snug text-ink-muted">{module.tagline}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <LinkButton href={CTA.secondaryHref} size="lg">
            {CTA.secondary}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const safeguardingPoints = [
  "Pickup checked against each child's authorised list and any custody order on file.",
  "Consent for trips, medical care and photos recorded separately, so one yes is not read as all.",
  "Concerns recorded and escalated straight away, with case records limited to your child-protection committee, and never holding back a report to the police or SJPU under POCSO.",
];

/** Child-safety band. */
export function SafeguardingBand() {
  const href = "/features/child-safeguarding";
  return (
    <section aria-labelledby="safeguarding-title" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="grid items-center gap-10 rounded-[32px] border border-teal-200 bg-teal-50 px-6 py-12 sm:px-12 lg:grid-cols-[auto_1fr] lg:gap-14 lg:px-16">
            <span className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-forest text-gold shadow-[var(--shadow-soft)] lg:h-28 lg:w-28">
              <ShieldCheck aria-hidden="true" className="h-10 w-10 lg:h-14 lg:w-14" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-sage">Child safety</p>
              <h2 id="safeguarding-title" className="mt-2 text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                Know who may collect every child
              </h2>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">
                The safeguarding module is designed around the questions a school has to answer at the gate and in a crisis.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {safeguardingPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-base leading-relaxed text-ink">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-sage" strokeWidth={3} />
                    {point}
                  </li>
                ))}
              </ul>
              <LinkButton href={href} className="mt-8">
                See {moduleName("child-safeguarding", "Child Safeguarding").toLowerCase()}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const before = [
  "Paper registers, re-typed by hand",
  "Fee receipts reconciled once a month",
  "Parents calling for every update",
  "Report cards built in Word",
  "No record of who changed what",
  "A different login for every task",
];

const after = [
  "Attendance that updates everywhere once it is taken",
  "Each payment matched to a receipt and a ledger entry",
  "Guardians alerted when it matters, if they have opted in",
  "Report cards built from marks already entered",
  "Each change recorded with who made it and when",
  "One login for every module a person needs",
];

/** Before / after contrast. */
export function BeforeAfter() {
  return (
    <section aria-labelledby="before-after-title" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            id="before-after-title"
            eyebrow="Before & after"
            title="Running a school shouldn't feel like firefighting"
            description="One connected system instead of a patchwork of registers, spreadsheets and phone calls."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2 xl:gap-8">
          <Reveal className="h-full">
            <div className="h-full rounded-3xl border border-red-200 bg-red-50/60 p-7 sm:p-8">
              <h3 className="font-display text-lg font-bold text-ink">Without a connected system</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {before.map((text) => (
                  <li key={text} className="flex items-center gap-3 rounded-2xl bg-white/70 p-3.5 text-sm font-semibold leading-snug text-ink">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700">
                      <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <div className="h-full rounded-3xl border border-teal-200 bg-teal-50/70 p-7 sm:p-8">
              <h3 className="font-display text-lg font-bold text-ink">What Shiksha Tantra is designed to do</h3>
              <ul className="mt-6 flex flex-col gap-3">
                {after.map((text) => (
                  <li key={text} className="flex items-center gap-3 rounded-2xl bg-white/80 p-3.5 text-sm font-semibold leading-snug text-ink">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
                      <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-ink-muted">
          Scope, integrations and timelines are agreed with each school. These describe how the system is designed,
          not a claim that every module is already running on your campus.
        </p>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const digiboardPoints = [
  { title: "Timetable changes", desc: "Designed to show substitutions and changes soon after the office saves them." },
  { title: "No stale schedules", desc: "Designed to flag a screen that has lost its connection instead of passing old data off as current." },
  { title: "Screen by screen", desc: "Each screen is designed to be enrolled and managed on its own." },
  { title: "Fits the room", desc: "Designed to show what suits the place a screen is mounted." },
];

/** DigiBoard band. */
export function DigiBoardBand() {
  return (
    <section aria-labelledby="digiboard-title" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-brand-950 px-6 py-14 text-white sm:px-12 lg:px-16">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-amber-300">
                  <Monitor aria-hidden="true" className="h-3.5 w-3.5" /> DigiBoard
                </p>
                <h2 id="digiboard-title" className="mt-5 text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">
                  Campus screens fed by the same records
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
                  Timetable changes, substitutions and announcements come from the records the office already keeps,
                  so screens are designed not to show a schedule that has since changed.
                </p>
                <LinkButton href="/digiboard" variant="amber" className="mt-7">
                  See how DigiBoard works
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </LinkButton>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {digiboardPoints.map((item) => (
                  <li key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="font-display text-base font-bold text-amber-300">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/85">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const onboardingSteps = [
  { title: "Discovery and calendar mapping", desc: "We plan the rollout around your busiest weeks, not through them." },
  { title: "Set-up and records", desc: "Accounts and existing records are set up and checked with your office." },
  { title: "Pilot with one class or campus", desc: "Start small and compare against the registers you keep today." },
  { title: "Module by module", desc: "Each module is checked with your staff before the next one starts." },
];

/** Short onboarding teaser that leads to /how-it-works. */
export function OnboardingTeaser() {
  return (
    <section aria-labelledby="onboarding-title" className="bg-white/50 py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            id="onboarding-title"
            eyebrow="Getting started"
            title="A calm, staged rollout"
            description="No big-bang switch. Each stage is checked before the next begins."
          />
        </Reveal>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {onboardingSteps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.04} className="h-full">
                <div className="h-full rounded-3xl border border-line-soft bg-paper-raised p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/20 font-display text-sm font-bold text-amber-700">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <LinkButton href="/how-it-works" variant="outline">
            How onboarding works
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const faqs = [
  { q: "Is Shiksha Tantra available today?", a: siteStatus.text },
  {
    q: "How much does it cost?",
    a: "There is no fixed rate card: each school is quoted on its communication volume and scale of use. The pricing page explains how.",
  },
  {
    q: "Which boards does it work with?",
    a: "Report cards are designed for CBSE, ICSE and state-board grading rules. The learning library holds sample chapters that are not yet aligned to a specific board.",
  },
  {
    q: "Will parents get WhatsApp messages?",
    a: "Guardian alerts by WhatsApp or SMS need an approved messaging provider and each guardian's opt-in. We set this up with each school.",
  },
];

/** Short FAQ teaser that leads to /faq. Native <details>: works without JavaScript. */
export function FaqTeaser() {
  return (
    <section aria-labelledby="faq-title" className="py-20 sm:py-24">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeading id="faq-title" eyebrow="Questions" title="Common questions" />
        </Reveal>
        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-line-soft bg-white/80 open:bg-white">
              <summary
                className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-display text-base font-bold text-ink [&::-webkit-details-marker]:hidden ${focusRing}`}
              >
                {item.q}
                <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-ink-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-base leading-relaxed text-ink-muted">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/faq" className={`inline-flex min-h-10 items-center gap-1.5 rounded-full text-sm font-bold text-brand-700 underline-offset-4 hover:underline ${focusRing}`}>
            Read all questions <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href="/pricing" className={`inline-flex min-h-10 items-center gap-1.5 rounded-full text-sm font-bold text-brand-700 underline-offset-4 hover:underline ${focusRing}`}>
            How pricing works <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** Closing conversion band. */
export function ClosingCta() {
  const secondary = buttonClasses({ variant: "outline", size: "lg", className: "w-full sm:w-auto" });
  return (
    <section aria-labelledby="closing-title" className="pb-24 pt-4">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-[32px] border border-line-soft bg-white/80 px-6 py-14 text-center sm:px-12">
            <SectionHeading
              id="closing-title"
              eyebrow="Next step"
              title="See it on your school's structure"
              description="Share your boards, campus size and current challenges. We prepare a walkthrough around them rather than a canned script."
            />
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <LinkButton href={CTA.primaryHref} size="lg" className="w-full sm:w-auto">
                {CTA.primary}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </LinkButton>
              {contact.bookingHref ? (
                <a href={contact.bookingHref} target="_blank" rel="noopener noreferrer" className={secondary}>
                  Pick a time
                </a>
              ) : null}
              {contact.whatsappHref ? (
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={secondary}>
                  <MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp us
                </a>
              ) : null}
              <a href={contact.phoneHref} className={secondary}>
                <Phone aria-hidden="true" className="h-4 w-4" /> Call {contact.phoneDisplay}
              </a>
            </div>
            <p className="mt-6 text-sm text-ink-muted">We reply within one business day.</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
