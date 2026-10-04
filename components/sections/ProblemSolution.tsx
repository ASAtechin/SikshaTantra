"use client";

import { motion } from "framer-motion";
import { X, Check, FileText, Receipt, PhoneCall, FileWarning, EyeOff, KeyRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const before = [
  { icon: FileText, text: "Paper registers, re-typed by hand" },
  { icon: Receipt, text: "Fee receipts reconciled once a month" },
  { icon: PhoneCall, text: "Parents calling for every update" },
  { icon: FileWarning, text: "Report cards built in Word" },
  { icon: EyeOff, text: "No record of who changed what" },
  { icon: KeyRound, text: "A different login for every task" },
];

const after = [
  { icon: FileText, text: "Attendance live the moment it's taken" },
  { icon: Receipt, text: "Every rupee traced, automatically" },
  { icon: PhoneCall, text: "Guardians see it the moment it happens" },
  { icon: FileWarning, text: "Report cards locked in seconds" },
  { icon: EyeOff, text: "Every change logged, forever" },
  { icon: KeyRound, text: "One login for everything" },
];

export function ProblemSolution() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Before & After"
          title="Running a school shouldn't feel like firefighting"
          description="One coherent system instead of a patchwork of registers and spreadsheets."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-red-200/60 bg-red-50/50 p-7 sm:p-8"
          >
            <h3 className="font-display text-lg font-bold text-red-900/80">Without Shikshatantra</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              {before.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-2xl bg-white/50 p-3.5 text-sm font-semibold leading-snug text-red-950/70"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-200/70 text-red-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                  <X className="ml-auto h-3.5 w-3.5 shrink-0 text-red-400" strokeWidth={3} />
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-teal-200/60 bg-teal-50/50 p-7 sm:p-8"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-400/10 blur-2xl" />
            <h3 className="font-display text-lg font-bold text-teal-900">With Shikshatantra</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              {after.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-2xl bg-white/60 p-3.5 text-sm font-semibold leading-snug text-brand-950/75"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                  <Check className="ml-auto h-3.5 w-3.5 shrink-0 text-teal-600" strokeWidth={3} />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
