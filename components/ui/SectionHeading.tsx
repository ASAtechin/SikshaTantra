import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
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
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em]",
            light ? "bg-white/10 text-amber-300" : "bg-amber-500/10 text-amber-600"
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", light ? "bg-amber-300" : "bg-amber-500")} />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-brand-950"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-balance text-lg leading-relaxed",
            light ? "text-white/70" : "text-brand-950/60",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
