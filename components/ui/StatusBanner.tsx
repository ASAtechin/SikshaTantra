/**
 * StatusBanner (W0 foundation contract, server-safe): slim full-width bar showing the
 * early-access line from lib/site.ts `siteStatus`. Intended for the top of the Navbar (W1-B).
 * Narrow screens show `siteStatus.short`; sm and up show the full sentence.
 * tone "dark" = forest bar with gold label (default); "light" = paper bar with ochre label.
 */
import { cn } from "@/lib/utils";
import { siteStatus } from "@/lib/site";

interface StatusBannerProps {
  tone?: "dark" | "light";
  className?: string;
}

export function StatusBanner({ tone = "dark", className }: StatusBannerProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "w-full px-4 py-2 text-center text-sm leading-snug",
        dark ? "bg-brand-950 text-white/90" : "border-b border-line-soft bg-paper text-ink-muted",
        className
      )}
    >
      <p className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.08em]",
            dark ? "bg-white/10 text-amber-300" : "bg-amber-500/15 text-amber-700"
          )}
        >
          {siteStatus.label}
        </span>
        <span className="sm:hidden">{siteStatus.short}</span>
        <span className="hidden sm:inline">{siteStatus.text}</span>
      </p>
    </div>
  );
}
