/** A titled block of prose for content pages (W1-B). Headings are h2; pass `id` for in-page links. */
import { type ReactNode } from "react";
import { NarrowContainer } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  id: string;
  title: string;
  eyebrow?: string;
  intro?: ReactNode;
  children?: ReactNode;
  tone?: "paper" | "raised";
}

export function ContentSection({ id, title, eyebrow, intro, children, tone = "paper" }: ContentSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-24 py-12 sm:py-16", tone === "raised" ? "bg-paper-raised" : "bg-paper")}
    >
      <NarrowContainer>
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-amber-700">{eyebrow}</p>
        ) : null}
        <h2
          id={`${id}-title`}
          className={cn(
            "max-w-3xl text-balance font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl",
            eyebrow && "mt-3"
          )}
        >
          {title}
        </h2>
        {intro ? <div className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">{intro}</div> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </NarrowContainer>
    </section>
  );
}
