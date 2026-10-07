import { Clock, MessageCircle, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { RequestDemoForm } from "@/components/sections/RequestDemoForm";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Request a School ERP & DigiBoard Demo",
  "Discuss Siksha Tantra school ERP and DigiBoard signage for your school. Share your campus size and requirements, or call +91 94071 74355.",
  "/request-demo"
);

const reassurances = [
  { icon: Clock, text: "We respond within one business day" },
  { icon: MessageCircle, text: "A real walkthrough on your school's own data structure" },
  { icon: ShieldCheck, text: "No obligation, no pressure, no spam" },
];

const whatHappensNext = [
  "A rollout specialist reviews your school's size, boards, and current challenges.",
  "We schedule a 30-minute walkthrough — live, on your calendar, not a canned video.",
  "If it's a fit, we map a calm, wave-by-wave activation plan built around your term dates.",
];

export default function RequestDemoPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-16 sm:py-20">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge>Request Implementation</Badge>
              <h1 className="mt-6 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
                Let&apos;s bring Siksha Tantra to your school
              </h1>
              <p className="mt-5 max-w-md text-balance leading-relaxed text-brand-950/60">
                Tell us a little about your school and what&apos;s slowing you down today. Our
                rollout team will prepare a walkthrough tailored to your boards, your campus
                size, and your actual calendar — not a generic script.
              </p>

              <ul className="mt-8 flex flex-col gap-4">
                {reassurances.map((r) => (
                  <li key={r.text} className="flex items-center gap-3 text-sm font-semibold text-brand-950/70">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                      <r.icon className="h-[18px] w-[18px]" />
                    </span>
                    {r.text}
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-3xl border border-brand-950/8 bg-white/60 p-6">
                <h3 className="font-display text-sm font-bold text-brand-950">What happens next?</h3>
                <ol className="mt-4 flex flex-col gap-3">
                  {whatHappensNext.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm leading-snug text-brand-950/60">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-950 text-[11px] font-bold text-amber-400">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="rounded-[2rem] border border-brand-950/8 bg-white/70 p-6 shadow-[var(--shadow-soft)] sm:p-10">
              <RequestDemoForm />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
