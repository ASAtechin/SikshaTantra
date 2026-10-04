"use client";

import { motion } from "framer-motion";
import { CheckCheck, ShieldCheck } from "lucide-react";
import type { MockupKind } from "@/lib/modules-data";
import { cn } from "@/lib/utils";

interface ModuleMockupProps {
  kind: MockupKind;
  accent: string;
}

function ChartMockup() {
  const bars = [35, 60, 45, 80, 55, 92, 68];
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="h-2.5 w-20 rounded-full bg-brand-950/10" />
        <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-700">LIVE</span>
      </div>
      <div className="flex items-end gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            style={{ height: `${h * 0.7}px` }}
            className={cn("w-full rounded-md", i === 5 ? "bg-amber-500" : "bg-brand-900/15")}
          />
        ))}
      </div>
      <div className="h-2 w-2/3 rounded-full bg-brand-950/10" />
    </div>
  );
}

function CalendarMockup() {
  const cells = Array.from({ length: 21 }, (_, i) => i);
  const highlight = [3, 9, 14, 17];
  return (
    <div className="grid h-full grid-cols-7 gap-1.5">
      {cells.map((c) => (
        <motion.div
          key={c}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: c * 0.02 }}
          className={cn(
            "rounded-md",
            highlight.includes(c) ? "bg-amber-500" : "bg-brand-950/8"
          )}
        />
      ))}
    </div>
  );
}

function LedgerMockup() {
  const rows = [
    { label: "Tuition — Term 2", amt: "₹18,500", ok: true },
    { label: "Transport fee", amt: "₹2,200", ok: true },
    { label: "Lab deposit", amt: "₹1,000", ok: false },
    { label: "Library fine", amt: "₹50", ok: true },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      {rows.map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center justify-between rounded-xl bg-white/70 px-3.5 py-2.5"
        >
          <span className="text-xs font-semibold text-brand-950/70">{r.label}</span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-brand-950">
            {r.amt}
            <CheckCheck className={cn("h-3.5 w-3.5", r.ok ? "text-teal-600" : "text-amber-500")} />
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function ShieldMockup() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-950"
      >
        <ShieldCheck className="h-8 w-8 text-amber-400" />
      </motion.div>
      <span className="rounded-full bg-teal-500/15 px-3 py-1 text-[11px] font-bold text-teal-700">
        Segregated &amp; audited
      </span>
    </div>
  );
}

function ChatMockup() {
  const bubbles = [
    { text: "Notice: PTM rescheduled to Friday", mine: false },
    { text: "Got it, thank you!", mine: true },
    { text: "Fee receipt #4821 generated", mine: false },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={cn("flex", b.mine ? "justify-end" : "justify-start")}
        >
          <span
            className={cn(
              "max-w-[75%] rounded-2xl px-3.5 py-2 text-xs font-medium",
              b.mine ? "bg-brand-950 text-white" : "bg-white/80 text-brand-950/80"
            )}
          >
            {b.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function CardsMockup() {
  const items = ["Application #203 verified", "Seat allocated — Grade 4B", "Transfer certificate ready"];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      {items.map((t, i) => (
        <motion.div
          key={t}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 rounded-xl bg-white/80 px-3.5 py-3"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white">
            <CheckCheck className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs font-semibold text-brand-950/75">{t}</span>
        </motion.div>
      ))}
    </div>
  );
}

const renderers: Record<MockupKind, () => React.ReactElement> = {
  chart: ChartMockup,
  calendar: CalendarMockup,
  ledger: LedgerMockup,
  shield: ShieldMockup,
  chat: ChatMockup,
  cards: CardsMockup,
};

export function ModuleMockup({ kind, accent }: ModuleMockupProps) {
  const Renderer = renderers[kind];
  return (
    <div className="relative aspect-[4/3] w-full select-none">
      <div className={cn("absolute -inset-6 -z-10 animate-blob bg-gradient-to-br blur-3xl", accent)} />
      <div className="h-full w-full rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[var(--shadow-lift)] backdrop-blur">
        <Renderer />
      </div>
    </div>
  );
}
