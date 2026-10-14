import type { Metadata } from "next";
import Link from "next/link";
import { Check, LayoutGrid, MessageSquareText, MonitorSmartphone, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/sections/PageIntro";
import { ContentSection } from "@/components/sections/ContentSection";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "How Pricing Works",
  "Shiksha Tantra is priced per school, based on the communication volume and scale of use your school chooses. DigiBoard hardware is quoted separately. Ask for a quote.",
  "/pricing"
);

const factors = [
  {
    icon: Users,
    title: "How much you use the system",
    text: "Pricing follows your volume of use: the number of students, staff and campuses on the system. We ask for a range when you request a demo.",
  },
  {
    icon: LayoutGrid,
    title: "Modules you choose",
    text: "You can start with the modules you need most and add others later. The quote lists exactly which modules are covered.",
  },
  {
    icon: MessageSquareText,
    title: "Communication with parents",
    text: "How much you plan to message families (WhatsApp, SMS and app notifications) and how often is part of the price, because message volume carries real cost.",
  },
  {
    icon: MonitorSmartphone,
    title: "DigiBoard screens",
    text: "Where you need display hardware or player devices for DigiBoard, they are quoted separately from the software.",
  },
];

const quoteIncludes = [
  "The modules and the scope of each one, in plain words",
  "What is counted: students, campuses and expected message volume",
  "An onboarding plan: data migration, setup and training",
  "How support works and how to reach us",
  "Any DigiBoard hardware, listed separately",
  "Where your school's data is hosted, how it is backed up, and how it is returned if you leave",
];

const questions = [
  {
    q: "Can we start with only a few modules?",
    a: "Yes. Rollout happens module by module, and the quote reflects the modules you choose. You can add modules later.",
  },
  {
    q: "Do we need new screens for DigiBoard?",
    a: "Not always. Existing TVs or displays can usually be used, with a player device for each screen. We confirm what you need during a site survey, and any hardware is priced separately.",
  },
  {
    q: "How do we get a quote?",
    a: "Book a demo. We ask about your student count, campuses, boards and the modules you are interested in, then send a written quote.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 bg-paper">
        <PageIntro
          eyebrow="Pricing"
          title="How pricing works"
          lede={
            <p>
              Shiksha Tantra is priced per school, based on how much your school communicates through it and the volume
              of use it is willing to commit to. There is no fixed rate card: each quote is prepared after we understand your
              school&apos;s size, communication needs and modules.
            </p>
          }
        />

        <ContentSection
          id="what-sets-the-price"
          title="What sets the price"
          intro={<p>Four things decide what your school pays. Everything you pay for is listed in the written quote.</p>}
        >
          <ul className="grid gap-4 sm:grid-cols-2">
            {factors.map((f) => (
              <li key={f.title} className="rounded-2xl border border-line-soft bg-white p-6">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-950 text-amber-400"
                >
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection
          id="early-access"
          tone="raised"
          eyebrow="Early access"
          title="Founding schools"
          intro={
            <>
              <p>
                We are onboarding a small group of founding schools. They work closely with us on how each module fits
                their routines, and their feedback shapes what we build next.
              </p>
              <p className="mt-4">
                Terms for founding schools are discussed with each school and written into the quote. This page does
                not promise any discount or fixed price.
              </p>
            </>
          }
        />

        <ContentSection id="your-quote" title="What you get in a quote">
          <ul className="grid gap-3 sm:grid-cols-2">
            {quoteIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-ink">
                <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-teal-600" />
                {item}
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection id="pricing-questions" tone="raised" title="Common pricing questions">
          <dl className="flex flex-col gap-6">
            {questions.map((item) => (
              <div key={item.q} className="rounded-2xl border border-line-soft bg-white p-6">
                <dt className="font-display text-lg font-bold text-ink">{item.q}</dt>
                <dd className="mt-2 text-base leading-relaxed text-ink-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-base text-ink-muted">
            More answers on the{" "}
            <Link href="/faq" className="font-semibold text-ink underline underline-offset-4 hover:text-brand-700">
              FAQ page
            </Link>
            .
          </p>
        </ContentSection>

        <ClosingCTA
          title="Get a quote for your school"
          description="Tell us your size, how much you message parents and the modules you need. We will walk you through the product and send a written quote."
          secondary={{ href: "/how-it-works", label: "How onboarding works" }}
        />
      </main>
      <Footer />
    </>
  );
}
