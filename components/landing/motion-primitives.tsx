"use client";

/**
 * Shared motion primitives (W0 foundation contract).
 * - Reveal: server-renders fully visible. After hydration it hides only blocks that are still
 *   below the fold and fades them in on scroll, so content never depends on JS to be seen.
 *   Skipped entirely under prefers-reduced-motion (CSS in globals.css also forces visibility).
 * - ScrollProgress: thin reading bar; hidden under reduced motion.
 * - ScrollCue: "scroll for more" hint; its bob animation is CSS and stops under reduced motion.
 */
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at hydration: leave it alone rather than flash it out and back in.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "armed";
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        if (delay) el.style.transitionDelay = `${delay}s`;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      delete el.dataset.reveal;
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Thin reading-progress bar driven by native scroll position. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, originX: 0 }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-gradient-to-r from-amber-500 via-gold to-teal-500 motion-reduce:hidden"
    />
  );
}

/** Nudges the visitor that there is more below the canvas hero. */
export function ScrollCue({ label = "Scroll to explore", className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-ink-muted",
        className
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className="flex h-5 w-5 items-center justify-center rounded-full border border-ink-muted/50 motion-safe:animate-cue"
      >
        <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 fill-none stroke-current stroke-[1.6]">
          <path d="M5 1.5v7M2 5.8l3 2.7 3-2.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  );
}
