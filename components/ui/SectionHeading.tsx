/**
 * SectionHeading (W0 foundation contract): optional eyebrow pill (12px, tracking 0.08em),
 * an h2 title (or `as` another heading level) and optional description in ink-muted.
 * `light` switches colours for dark (forest) sections; all text pairs are >= 4.5:1.
 */
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
  /** Heading element; defaults to h2. */
  as?: "h1" | "h2" | "h3";
  /** id for the heading, e.g. to label a section with aria-labelledby. */
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
  as: Heading = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em]",
            light ? "bg-white/10 text-amber-300" : "bg-amber-500/15 text-amber-700"
          )}
        >
          <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", light ? "bg-amber-300" : "bg-amber-500")} />
          {eyebrow}
        </span>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-balance text-lg leading-relaxed",
            light ? "text-white/85" : "text-ink-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
