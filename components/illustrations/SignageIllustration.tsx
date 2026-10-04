"use client";

import { motion } from "framer-motion";
import { Wifi, AlertTriangle, Clock3 } from "lucide-react";

export function SignageIllustration() {
  return (
    <div className="relative mx-auto aspect-[4/3.1] w-full max-w-xl select-none">
      <div className="absolute -right-10 -top-8 h-56 w-56 animate-blob bg-gradient-to-br from-teal-500/25 to-brand-600/25 blur-2xl" />
      <div className="absolute -left-8 bottom-0 h-48 w-48 animate-blob bg-gradient-to-tr from-amber-400/25 to-teal-500/15 blur-2xl [animation-delay:2.4s]" />

      {/* Mount arm */}
      <div className="absolute left-1/2 top-[88%] h-10 w-3 -translate-x-1/2 rounded-b-md bg-brand-950/20" />

      {/* Screen bezel */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 bottom-[10%] rounded-[1.75rem] bg-brand-950 p-3 shadow-[var(--shadow-lift)]"
      >
        <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#14163a] to-[#0b0c22] p-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-white/60">
              <span className="h-2 w-2 rounded-full bg-teal-400" /> DIGIBOARD · LOBBY-01
            </div>
            <Wifi className="h-4 w-4 text-teal-400" />
          </div>

          {/* Emergency banner */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 flex items-center gap-2 rounded-xl bg-amber-500/90 px-3 py-2 text-brand-950"
          >
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p className="text-[11px] font-bold leading-tight">
              Fire drill in progress — Assembly point: Main Ground
            </p>
          </motion.div>

          {/* Timetable rows */}
          <div className="mt-4 flex flex-1 flex-col gap-2">
            {[
              { period: "P4", subj: "Mathematics", room: "204", active: true },
              { period: "P5", subj: "Physics Lab", room: "Lab-2", active: false },
              { period: "P6", subj: "English", room: "118", active: false },
            ].map((row, i) => (
              <motion.div
                key={row.period}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.12, duration: 0.45 }}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
                  row.active ? "bg-teal-500/15 text-teal-200" : "bg-white/5 text-white/70"
                }`}
              >
                <span className="flex items-center gap-2 font-semibold">
                  <Clock3 className="h-3.5 w-3.5" /> {row.period} · {row.subj}
                </span>
                <span className="font-mono text-[11px] text-white/50">Room {row.room}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] text-white/40">
            <span>Updated automatically by the scheduling engine</span>
            <span className="font-mono">14:08</span>
          </div>
        </div>
      </motion.div>

      {/* Signal ping */}
      <div className="absolute right-[18%] top-[6%]">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-teal-400" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-teal-500" />
        </span>
      </div>
    </div>
  );
}
