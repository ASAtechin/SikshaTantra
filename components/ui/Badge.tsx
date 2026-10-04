import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-brand-950/10 bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}
