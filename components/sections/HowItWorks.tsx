"use client";

import { motion } from "framer-motion";
import { Search, Boxes, Rocket, TrendingUp, LifeBuoy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: Search,
    title: "Discovery & Calendar Mapping",
    desc: "We map a rollout around your busiest weeks, not through them.",
  },
  {
    icon: Boxes,
    title: "Foundation Setup",
    desc: "Accounts, records, and historic data migrated and verified.",
  },
  {
    icon: Rocket,
    title: "Pilot With One Cohort",
    desc: "One class or campus first, until the numbers agree perfectly.",
  },
  {
    icon: TrendingUp,
    title: "Full Rollout, Module by Module",
    desc: "Each module proven before the next begins. No big-bang risk.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing Support & Growth",
    desc: "A named owner, real SLAs, a product that keeps evolving.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="A calm, proven rollout — not a big-bang switch"
          description="Deliberate stages, each verified before the next begins."
        />

        <div className="relative mt-14 xl:mx-auto xl:max-w-5xl">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-brand-950/15 via-brand-950/10 to-transparent lg:left-1/2 lg:block" />

          <div className="flex flex-col gap-10 lg:gap-14">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative flex flex-col gap-5 lg:w-1/2 ${
                  i % 2 === 0 ? "lg:self-start lg:pr-12 lg:text-right" : "lg:self-end lg:pl-12"
                }`}
              >
                <div
                  className={`flex items-center gap-4 ${
                    i % 2 === 0 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-950 text-amber-400 shadow-[var(--shadow-soft)]">
                    <s.icon className="h-5 w-5" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-brand-950">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="font-display text-lg font-bold text-brand-950">{s.title}</h3>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-brand-950/60 lg:max-w-sm">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
