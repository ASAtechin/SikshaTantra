/** Page header for content pages (W1-B): eyebrow, the page's single h1, lede and optional extras. */
import { type ReactNode } from "react";
import { NarrowContainer } from "@/components/ui/Container";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  lede: ReactNode;
  children?: ReactNode;
}

export function PageIntro({ eyebrow, title, lede, children }: PageIntroProps) {
  return (
    <section className="border-b border-line-soft bg-paper-raised py-14 sm:py-20">
      <NarrowContainer>
        <p className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-amber-700">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <div className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{lede}</div>
        {children}
      </NarrowContainer>
    </section>
  );
}
