"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { ModuleMockup } from "@/components/illustrations/ModuleMockup";
import { modules } from "@/lib/modules-data";
import { cn } from "@/lib/utils";

export function FeatureGrid() {
  const [active, setActive] = useState(0);
  const mod = modules[active];

  return (
    <section id="features" className="scroll-mt-20 py-20">
      <Container>
        <SectionHeading
          eyebrow="Inside Shikshatantra"
          title="Twelve modules. One system. Zero guesswork."
          description="One governed, audit-proof foundation under every module — growth never means re-platforming."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr_380px]">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
            {modules.map((m, i) => (
              <button
                key={m.slug}
                onClick={() => setActive(i)}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all",
                  active === i
                    ? "border-brand-950 bg-brand-950 text-white shadow-[var(--shadow-soft)]"
                    : "border-brand-950/8 bg-white/60 text-brand-950 hover:border-brand-950/20"
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                    active === i ? "bg-amber-500 text-brand-950" : "bg-brand-950/5 text-brand-700"
                  )}
                >
                  <m.icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold">{m.name}</span>
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mod.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className={cn(
                "relative overflow-hidden rounded-3xl border border-brand-950/8 bg-gradient-to-br p-7 sm:p-8",
                mod.accent
              )}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-950 text-amber-400 shadow-[var(--shadow-soft)]">
                  <mod.icon className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-brand-950/60">
                  Module · {mod.tag}
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl font-bold text-brand-950 sm:text-3xl">
                {mod.name}
              </h3>
              <p className="mt-2 max-w-xl text-balance font-semibold text-brand-950/60">
                {mod.tagline}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {mod.capabilities.map((h) => (
                  <div
                    key={h.label}
                    className="flex items-center gap-2 rounded-xl bg-white/70 p-3 text-xs font-bold leading-snug text-brand-950/75"
                  >
                    <h.icon className="h-4 w-4 shrink-0 text-amber-600" />
                    {h.label}
                  </div>
                ))}
              </div>

              <LinkButton href={`/features/${mod.slug}`} variant="primary" size="sm" className="mt-7 group">
                See how it works
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </LinkButton>
            </motion.div>
          </AnimatePresence>

          <div className="hidden xl:flex xl:flex-col xl:justify-center">
            <ModuleMockup kind={mod.mockup} accent={mod.accent} />
          </div>
        </div>

        <div className="mt-6 flex justify-center xl:hidden">
          <div className="w-full max-w-sm">
            <ModuleMockup kind={mod.mockup} accent={mod.accent} />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <LinkButton href="/features" variant="outline" size="md" className="group">
            Browse every module in detail
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
