"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Shared scroll-reveal wrapper. Kept deliberately brief and subtle: NN/g
 * guidance is that scroll animation should not delay reading, so only
 * containers animate and never the body copy itself.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Thin reading-progress bar driven by native scroll position. */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, originX: 0 }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-gradient-to-r from-[#c9a44c] via-[#e6c46f] to-[#4d7d63]"
    />
  );
}

/** Nudges the visitor that there is more below the canvas hero. */
export function ScrollCue({ label = "Scroll to explore" }: { label?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#7d8a80]">
      {label}
      <motion.span
        aria-hidden="true"
        className="flex h-5 w-5 items-center justify-center rounded-full border border-[#7d8a80]/40"
        animate={reduced ? undefined : { y: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 fill-none stroke-current stroke-[1.6]">
          <path d="M5 1.5v7M2 5.8l3 2.7 3-2.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.span>
    </span>
  );
}
