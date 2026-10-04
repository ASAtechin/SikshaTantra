"use client";

import { motion } from "framer-motion";
import { School, GraduationCap, UserRound, Users2 } from "lucide-react";

const nodes = [
  { Icon: School, label: "School", pos: "left-1/2 top-2 -translate-x-1/2", color: "bg-brand-950 text-white" },
  { Icon: UserRound, label: "Teacher", pos: "left-2 top-1/2 -translate-y-1/2", color: "bg-teal-500 text-white" },
  { Icon: Users2, label: "Guardian", pos: "right-2 top-1/2 -translate-y-1/2", color: "bg-amber-500 text-brand-950" },
  { Icon: GraduationCap, label: "Student", pos: "left-1/2 bottom-2 -translate-x-1/2", color: "bg-white text-brand-950 border border-brand-950/10" },
];

export function ConnectIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm select-none">
      <div className="absolute inset-0 m-auto h-56 w-56 animate-blob bg-gradient-to-br from-amber-400/20 to-teal-500/20 blur-3xl" />

      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" fill="none">
        <motion.path
          d="M100 24 L24 100 L100 176 L176 100 Z"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeDasharray="4 6"
          className="text-brand-950/20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </svg>

      {/* Center hub */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white shadow-[var(--shadow-lift)]"
      >
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-brand-950">Live</span>
      </motion.div>

      {nodes.map(({ Icon, label, pos, color }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 * i + 0.2, duration: 0.45 }}
          className={`absolute ${pos} flex animate-float flex-col items-center gap-1.5`}
          style={{ animationDelay: `${i * 0.6}s` }}
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-[var(--shadow-soft)] ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold text-brand-950/70 shadow-sm">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
