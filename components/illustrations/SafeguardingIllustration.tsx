"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Fingerprint, Eye } from "lucide-react";

export function SafeguardingIllustration() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-md select-none items-center justify-center">
      <div className="absolute h-72 w-72 animate-blob bg-gradient-to-br from-teal-500/20 to-brand-600/20 blur-3xl" />

      {/* Orbit rings */}
      <div className="absolute h-[22rem] w-[22rem] rounded-full border border-dashed border-brand-950/10" />
      <div className="absolute h-64 w-64 rounded-full border border-brand-950/10" />

      {/* Orbiting chips */}
      {[
        { Icon: Lock, pos: "top-2 left-1/2 -translate-x-1/2", delay: 0 },
        { Icon: Fingerprint, pos: "bottom-6 left-6", delay: 0.2 },
        { Icon: Eye, pos: "bottom-6 right-6", delay: 0.4 },
      ].map(({ Icon, pos, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + delay, duration: 0.5 }}
          className={`absolute ${pos} flex h-12 w-12 animate-float items-center justify-center rounded-2xl border border-white/60 bg-white/95 text-brand-700 shadow-[var(--shadow-soft)]`}
          style={{ animationDelay: `${delay * 2}s` }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      ))}

      {/* Central shield */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex h-40 w-40 items-center justify-center rounded-[2.25rem] bg-gradient-to-br from-brand-900 to-brand-950 shadow-[var(--shadow-lift)]"
      >
        <ShieldCheck className="h-16 w-16 text-amber-400" strokeWidth={1.6} />
        <span className="absolute -bottom-3 rounded-full bg-teal-500 px-3 py-1 text-[10px] font-bold text-white shadow-md">
          Segregated access
        </span>
      </motion.div>
    </div>
  );
}
