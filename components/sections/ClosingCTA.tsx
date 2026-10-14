/** Closing call-to-action band for content pages (W1-B). Labels and contact come from lib/site.ts. */
import { ArrowRight, Phone } from "lucide-react";
import { NarrowContainer } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { CTA, contact } from "@/lib/site";

interface ClosingCTAProps {
  title: string;
  description: string;
  secondary?: { href: string; label: string };
}

export function ClosingCTA({ title, description, secondary }: ClosingCTAProps) {
  return (
    <section aria-labelledby="closing-cta-title" className="py-14 sm:py-20">
      <NarrowContainer>
        <div className="rounded-[2rem] bg-brand-950 px-6 py-10 text-white sm:px-12 sm:py-14">
          <h2
            id="closing-cta-title"
            className="max-w-2xl text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <LinkButton href={CTA.primaryHref} variant="amber" size="lg" className="group">
              {CTA.primary}
              <ArrowRight
                aria-hidden="true"
                className="h-5 w-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </LinkButton>
            {secondary ? (
              <LinkButton href={secondary.href} variant="white" size="lg">
                {secondary.label}
              </LinkButton>
            ) : null}
            <a
              href={contact.phoneHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-full px-2 text-base font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline focus-visible:outline-amber-300"
            >
              <Phone aria-hidden="true" className="h-4 w-4 text-amber-300" /> or call {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </NarrowContainer>
    </section>
  );
}
