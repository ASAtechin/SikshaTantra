/**
 * SectionHeading (W0 foundation contract, classic finish): optional eyebrow (12px semibold uppercase
 * sans in ochre, no pill), a serif h2 title (or `as` another heading level), a 40 x 2px gold rule and
 * an optional description in ink-muted. `light` switches colours for dark (forest) sections; all
 * text pairs are >= 4.5:1.
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
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className={cn("text-xs font-semibold uppercase tracking-[0.08em]", light ? "text-amber-300" : "text-ochre")}>
          {eyebrow}
        </span>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "text-balance font-display text-3xl font-semibold tracking-title sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </Heading>
      <span aria-hidden="true" className="gold-rule" />
      {description ? (
        <p
          className={cn(
            "mt-1 max-w-2xl text-balance text-lg leading-relaxed",
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
