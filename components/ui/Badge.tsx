/**
 * Badge (W0 foundation contract): small pill label, 12px semibold uppercase, brand-700 on a
 * light translucent fill (7:1 on paper). Override colours via className on dark sections.
 */
import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-brand-950/10 bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-brand-700 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}
