"use client";

import { motion } from "framer-motion";
import {
  Compass,
  ShieldHalf,
  Palette,
  Code2,
  FlaskConical,
  DatabaseZap,
  HeartHandshake,
  Megaphone,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const disciplines = [
  { icon: Compass, role: "Solution Architects", blurb: "One architecture, so your data never contradicts itself." },
  { icon: ShieldHalf, role: "Security Engineers", blurb: "Deny by default. Authorization is proven, never assumed." },
  { icon: Palette, role: "UI/UX Designers", blurb: "Built for the people who use it daily, not for a demo." },
  { icon: Code2, role: "Full-Stack Engineers", blurb: "Every module, one production-grade bar. No shortcuts." },
  { icon: FlaskConical, role: "QA & Testers", blurb: "We try to break it before your students get the chance." },
  { icon: DatabaseZap, role: "Data & Migration", blurb: "Rehearsed, reconciled, zero-surprise data migrations." },
  { icon: HeartHandshake, role: "Safeguarding Advisors", blurb: "Child-protection controls that are real, not decorative." },
  { icon: Megaphone, role: "Rollout & Success", blurb: "With your team through go-live — never left to figure it out." },
];

export function TeamExpertise() {
  return (
    <section id="team" className="scroll-mt-20 py-20">
      <Container>
        <SectionHeading
          eyebrow="The team behind it"
          title="A full product team, not a side project"
          description="Every discipline below is accountable for a specific promise we make to your school."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {disciplines.map((d, i) => (
            <motion.div
              key={d.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              className="group rounded-2xl border border-brand-950/8 bg-white/60 p-6 transition-all hover:-translate-y-1 hover:border-brand-950/20 hover:shadow-[var(--shadow-soft)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-950/5 text-brand-700 transition-colors group-hover:bg-amber-500 group-hover:text-brand-950">
                <d.icon className="h-[22px] w-[22px]" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-brand-950">{d.role}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-950/55">{d.blurb}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
