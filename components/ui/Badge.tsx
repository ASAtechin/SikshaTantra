/**
 * Badge (W0 foundation contract, classic finish): the small label above a page title, set as an
 * eyebrow: 12px semibold uppercase sans with +0.08em tracking in ochre (5.8:1 on paper, 6.3:1 on white).
 * On dark sections override the colour via className (for example text-amber-300).
 */
import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-ochre",
        className
      )}
      {...props}
    />
  );
}
