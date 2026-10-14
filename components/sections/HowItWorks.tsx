/**
 * Onboarding stages (W1-B). Used on /how-it-works; safe to reuse elsewhere (no required props).
 * Content is visible without JS; Reveal only fades in blocks below the fold after hydration.
 */
import { Search, Boxes, Rocket, TrendingUp, LifeBuoy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/landing/motion-primitives";

export const onboardingSteps = [
  {
    icon: Search,
    title: "Discovery and calendar mapping",
    desc: "We learn how your school runs today and plan the rollout around your academic calendar, away from admissions season, exams and term starts.",
  },
  {
    icon: Boxes,
    title: "Data and setup",
    desc: "We move your records from Excel or your existing system, set up classes, staff and roles, and your team verifies the data before anything goes live.",
  },
  {
    icon: Rocket,
    title: "Pilot with one class or campus",
    desc: "One class, section or campus uses it first, so problems show up while they are small and your staff can tell us what to change.",
  },
  {
    icon: TrendingUp,
    title: "Module-by-module rollout",
    desc: "Modules go live one at a time. Each is checked with your team before the next begins, instead of one big switch-over.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing support",
    desc: "Training for your staff, help when something is unclear, and support terms agreed in your plan. Founding schools also shape what we build next.",
  },
];

interface HowItWorksProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function HowItWorks({
  id = "how-it-works",
  eyebrow = "How it works",
  title = "A steady rollout, not a big-bang switch",
  description = "Five stages, each checked with your team before the next begins.",
}: HowItWorksProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-14 sm:py-20">
      <Container>
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} description={description} />

        <div className="relative mt-12 xl:mx-auto xl:max-w-5xl">
          <div
            aria-hidden="true"
            className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-brand-950/15 via-brand-950/10 to-transparent lg:left-1/2 lg:block"
          />

          <ol className="flex flex-col gap-10 lg:gap-14">
            {onboardingSteps.map((s, i) => (
              <li
                key={s.title}
                className={`relative lg:w-1/2 ${i % 2 === 0 ? "lg:self-start lg:pr-12 lg:text-right" : "lg:ml-auto lg:pl-12"}`}
              >
                <Reveal delay={i * 0.05} className="flex flex-col gap-4">
                  <div className={`flex items-center gap-4 ${i % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                    <span
                      aria-hidden="true"
                      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-950 text-amber-400 shadow-[var(--shadow-soft)]"
                    >
                      <s.icon className="h-5 w-5" />
                      <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-brand-950">
                        {i + 1}
                      </span>
                    </span>
                    <h3 className="font-display text-lg font-bold text-ink">
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                  </div>
                  <p className={`max-w-md text-base leading-relaxed text-ink-muted ${i % 2 === 0 ? "lg:ml-auto" : ""}`}>
                    {s.desc}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
