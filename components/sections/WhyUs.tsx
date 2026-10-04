"use client";

import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Cell = "yes" | "partial" | "no";

const rows: { label: string; shikshatantra: Cell; legacy: Cell; manual: Cell }[] = [
  { label: "Real-time digital signage", shikshatantra: "yes", legacy: "no", manual: "no" },
  { label: "Zero-trust authorization on every action", shikshatantra: "yes", legacy: "partial", manual: "no" },
  { label: "Child safeguarding & custody-aware access", shikshatantra: "yes", legacy: "no", manual: "no" },
  { label: "Corrections preserve full history", shikshatantra: "yes", legacy: "partial", manual: "no" },
  { label: "Fails safe — never shows fake data", shikshatantra: "yes", legacy: "no", manual: "no" },
  { label: "One login, every module & display", shikshatantra: "yes", legacy: "partial", manual: "no" },
  { label: "Modern, mobile-first interface", shikshatantra: "yes", legacy: "partial", manual: "no" },
  { label: "Transparent, wave-by-wave rollout", shikshatantra: "yes", legacy: "no", manual: "no" },
];

function CellIcon({ value }: { value: Cell }) {
  if (value === "yes")
    return (
      <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-teal-500 text-white">
        <Check className="h-4 w-4" strokeWidth={3} />
      </span>
    );
  if (value === "partial")
    return (
      <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-amber-200 text-amber-700">
        <Minus className="h-4 w-4" strokeWidth={3} />
      </span>
    );
  return (
    <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-500">
      <X className="h-4 w-4" strokeWidth={3} />
    </span>
  );
}

export function WhyUs() {
  return (
    <section id="why-us" className="scroll-mt-20 py-20">
      <Container>
        <SectionHeading
          eyebrow="Why schools choose us"
          title="Built on proof, not promises"
          description="Every claim maps to a documented, reviewed control — not marketing language."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-14 overflow-x-auto rounded-3xl border border-brand-950/8 bg-white/70 shadow-[var(--shadow-soft)]"
        >
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-brand-950/8">
                <th className="px-6 py-5 text-left font-semibold text-brand-950/50">Capability</th>
                <th className="px-4 py-5 text-center">
                  <span className="inline-flex rounded-full bg-brand-950 px-4 py-1.5 text-xs font-bold text-amber-400">
                    Shikshatantra
                  </span>
                </th>
                <th className="px-4 py-5 text-center text-xs font-bold text-brand-950/50">
                  Legacy School Software
                </th>
                <th className="px-4 py-5 text-center text-xs font-bold text-brand-950/50">
                  Spreadsheets & Registers
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.label} className={i % 2 === 0 ? "bg-white/40" : ""}>
                  <td className="px-6 py-4 font-medium text-brand-950/75">{r.label}</td>
                  <td className="px-4 py-4 text-center">
                    <CellIcon value={r.shikshatantra} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <CellIcon value={r.legacy} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <CellIcon value={r.manual} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Container>
    </section>
  );
}
