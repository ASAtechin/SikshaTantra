import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ConnectIllustration } from "@/components/illustrations/ConnectIllustration";

export function CTASection() {
  return (
    <section className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 px-8 py-16 sm:px-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                See it running on your own school&apos;s timetable
              </h2>
              <p className="mt-5 max-w-lg text-balance leading-relaxed text-white/65">
                A live walkthrough on your own boards, calendar, and data — not a generic script.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <LinkButton href="/request-demo" variant="amber" size="lg" className="group">
                  Request Implementation
                  <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
                </LinkButton>
                <LinkButton href="/digiboard" variant="white" size="lg">
                  Explore DigiBoard
                </LinkButton>
              </div>
            </div>
            <div className="hidden lg:block">
              <ConnectIllustration />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
