"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";

const stats = [
  { value: "36", label: "Governed control points" },
  { value: "100%", label: "Audit-traceable actions" },
  { value: "0", label: "Fabricated fallback data" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-14 sm:pt-20">
      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />

      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-10 xl:grid-cols-[1fr_1.2fr] xl:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge>
            <Sparkles className="h-3.5 w-3.5" /> Shikshatantra + DigiBoard
          </Badge>

          <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-950 sm:text-5xl xl:text-[3.6rem]">
            Schools that{" "}
            <span className="relative inline-block text-amber-600">
              refuse to guess
              <svg
                viewBox="0 0 200 10"
                className="absolute -bottom-2 left-0 w-full text-amber-400"
                preserveAspectRatio="none"
              >
                <path d="M2 8 Q 100 -2 198 8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            , powered by one screen
          </h1>

          <p className="mt-5 max-w-lg text-balance text-lg leading-relaxed text-brand-950/60">
            One secure ERP for every school function — plus <strong className="text-brand-950">DigiBoard</strong>,
            live digital signage. No spreadsheets. No guessing. Nothing faked.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <LinkButton href="/request-demo" size="lg" className="group">
              Request Implementation
              <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
            </LinkButton>
            <LinkButton href="/digiboard" variant="outline" size="lg">
              <PlayCircle className="h-[18px] w-[18px]" /> See DigiBoard
            </LinkButton>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-brand-950/10 pt-6 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-extrabold text-brand-950 sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs font-medium leading-snug text-brand-950/50">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none"
        >
          <HeroIllustration />
        </motion.div>
      </Container>
    </section>
  );
}
