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
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ochre">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-semibold tracking-title text-ink sm:text-5xl">
          {title}
        </h1>
        <span aria-hidden="true" className="gold-rule mt-5" />
        <div className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{lede}</div>
        {children}
      </NarrowContainer>
    </section>
  );
}
