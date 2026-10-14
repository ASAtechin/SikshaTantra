import { Clock, MessageCircle, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { RequestDemoForm } from "@/components/sections/RequestDemoForm";
import { CTA, contact, pageMetadata, siteStatus } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Book a School ERP & DigiBoard Demo",
  `Book a walkthrough of Shiksha Tantra school ERP and DigiBoard signage, shaped around your boards, school size and current system. Or call ${contact.phoneDisplay}.`,
  "/request-demo"
);

const reassurances = [
  { icon: Clock, text: "We respond within one business day" },
  { icon: MessageCircle, text: "A walkthrough shaped around your boards, size and current system" },
  { icon: ShieldCheck, text: "No obligation" },
];

const whatHappensNext = [
  "We read your request: your boards, school size, current system and the areas you chose.",
  "We contact you within one business day, the way you prefer, to agree a time.",
  "We take you through those areas live and are clear about what is available today and what is still being built.",
  "If it's a fit, we agree an onboarding plan around your term dates.",
];

export default function RequestDemoPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 py-16 outline-none sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Badge>{CTA.primary}</Badge>
              <h1 className="mt-6 text-balance font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Let&apos;s bring Shiksha Tantra to your school
              </h1>
              <p className="mt-5 max-w-md text-balance text-base leading-relaxed text-ink-muted">
                Tell us a little about your school and what&apos;s slowing you down today. We&apos;ll prepare a
                walkthrough shaped around your boards, your campus size and the system you use now.
              </p>
              <p className="mt-4 max-w-md rounded-2xl border border-line-soft bg-paper-raised px-4 py-3 text-sm leading-relaxed text-ink-muted">
                <span className="mr-2 inline-flex rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-amber-700">
                  {siteStatus.label}
                </span>
                {siteStatus.text}
              </p>

              <ul className="mt-8 flex flex-col gap-4">
                {reassurances.map((r) => (
                  <li key={r.text} className="flex items-center gap-3 text-sm font-semibold text-ink">
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600"
                    >
                      <r.icon className="h-[18px] w-[18px]" />
                    </span>
                    {r.text}
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-3xl border border-line-soft bg-white/60 p-6">
                <h2 className="font-display text-base font-bold text-ink">What happens next?</h2>
                <ol className="mt-4 flex flex-col gap-3">
                  {whatHappensNext.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm leading-snug text-ink-muted">
                      <span
                        aria-hidden
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-950 text-xs font-bold text-amber-400"
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 text-sm text-ink-muted">
                <p className="font-semibold text-ink">Prefer to talk first?</p>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <a className="font-semibold text-ink underline underline-offset-2" href={contact.phoneHref}>
                    Call {contact.phoneDisplay}
                  </a>
                  {contact.whatsappHref && (
                    <a
                      className="font-semibold text-ink underline underline-offset-2"
                      href={contact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                  {contact.emailHref && (
                    <a className="font-semibold text-ink underline underline-offset-2" href={contact.emailHref}>
                      Email {contact.email}
                    </a>
                  )}
                  {contact.bookingHref && (
                    <a
                      className="font-semibold text-ink underline underline-offset-2"
                      href={contact.bookingHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Pick a time<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </p>
              </div>
            </div>

            <section
              aria-labelledby="request-form-title"
              className="rounded-[2rem] border border-line-soft bg-white/70 p-5 shadow-[var(--shadow-soft)] sm:p-10"
            >
              <h2 id="request-form-title" className="sr-only">
                Demo request form
              </h2>
              <RequestDemoForm />
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
