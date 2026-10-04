"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Bell, ShieldCheck, TrendingUp, Users } from "lucide-react";

export function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full select-none">
      {/* Ambient blobs */}
      <div className="absolute -left-10 top-6 h-56 w-56 animate-blob bg-gradient-to-br from-amber-400/40 to-teal-500/30 blur-2xl" />
      <div className="absolute -right-6 bottom-10 h-64 w-64 animate-blob bg-gradient-to-tr from-brand-600/30 to-amber-400/20 blur-2xl [animation-delay:3s]" />

      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/60 bg-white/90 p-5 shadow-[var(--shadow-lift)] backdrop-blur"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-600" />
          </div>
          <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-700">
            LIVE
          </span>
        </div>

        <div className="mt-4 flex items-end gap-2">
          {[40, 65, 50, 85, 60, 95, 70].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.15 * i, duration: 0.6, ease: "easeOut" }}
              style={{ height: `${h * 0.55}px` }}
              className={`w-full rounded-md ${
                i === 5 ? "bg-amber-500" : "bg-brand-900/15"
              }`}
            />
          ))}
        </div>
        <p className="mt-3 text-xs font-semibold text-brand-950/50">Weekly attendance — Class 8B</p>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-brand-950 p-3 text-white">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/90">
            <TrendingUp className="h-[18px] w-[18px]" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">Fee collection on track</p>
            <p className="text-xs text-white/60">₹12.4L collected this term — 96%</p>
          </div>
        </div>
      </motion.div>

      {/* Floating chip: Notification */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute -left-2 top-4 flex animate-float items-center gap-2.5 rounded-2xl border border-white/60 bg-white/95 px-3 py-2 shadow-[var(--shadow-soft)] sm:-left-8 sm:top-6 sm:px-3.5 sm:py-2.5"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/15 text-amber-600">
          <Bell className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-brand-950">Notice sent</p>
          <p className="text-[11px] text-brand-950/50">842 guardians reached</p>
        </div>
      </motion.div>

      {/* Floating chip: Safeguarding */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="absolute -right-1 top-16 flex animate-float-slow items-center gap-2.5 rounded-2xl border border-white/60 bg-white/95 px-3 py-2 shadow-[var(--shadow-soft)] sm:-right-8 sm:top-20 sm:px-3.5 sm:py-2.5"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/15 text-teal-600">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-brand-950">Guardian verified</p>
          <p className="text-[11px] text-brand-950/50">Pickup authority active</p>
        </div>
      </motion.div>

      {/* Floating chip: schedule */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute -bottom-2 left-1 flex animate-float items-center gap-2.5 rounded-2xl border border-white/60 bg-white/95 px-3 py-2 shadow-[var(--shadow-soft)] [animation-delay:1.5s] sm:left-6 sm:px-3.5 sm:py-2.5"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600/10 text-brand-700">
          <CalendarCheck className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-brand-950">Timetable synced</p>
          <p className="text-[11px] text-brand-950/50">All 24 displays</p>
        </div>
      </motion.div>

      {/* Floating avatars */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute -bottom-6 right-1 flex animate-float-slow items-center gap-2 rounded-full border border-white/60 bg-white/95 py-1.5 pl-1.5 pr-3 shadow-[var(--shadow-soft)] [animation-delay:0.8s] sm:right-6 sm:pr-3.5"
      >
        <div className="flex -space-x-2">
          {["bg-amber-400", "bg-teal-500", "bg-brand-600"].map((c, i) => (
            <span key={i} className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white ${c}`}>
              <Users className="h-3 w-3" />
            </span>
          ))}
        </div>
        <span className="text-[11px] font-bold text-brand-950/70">+1,204 online</span>
      </motion.div>
    </div>
  );
}
