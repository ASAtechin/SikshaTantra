"use client";

import { MotionConfig } from "framer-motion";

/**
 * Lets Motion honour the OS "reduce motion" setting internally, so components
 * never branch their markup on it and server/client HTML stay identical.
 */
export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
