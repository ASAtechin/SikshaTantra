import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/sections/PageIntro";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { NarrowContainer } from "@/components/ui/Container";
import { CTA, pageMetadata, siteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Frequently Asked Questions",
  "Answers for school leaders: what is live today, boards supported, data migration, pricing, multi-campus, WhatsApp and SMS, DigiBoard hardware and how to start.",
  "/faq"
);

interface FaqItem {
  q: string;
  a: string;
  link?: { href: string; label: string };
}

const faqs: FaqItem[] = [
  {
    q: "Is Shiksha Tantra live today?",
    a: "Shiksha Tantra is in early access. DigiBoard scheduling, substitution notices and emergency broadcast work today as a working foundation. The ERP modules are being built with our founding schools, so in a demo we tell you plainly what is ready for your school and what is planned.",
  },
  {
    q: "Which boards do you support?",
    a: "CBSE, CISCE (ICSE and ISC) and state boards. Terms, grading scales and report-card formats are configured for each school during onboarding.",
  },
  {
    q: "Is there a parent app?",
    a: "A parent app is planned. It is not available yet.",
  },
  {
    q: "Can you move our data from Excel or our current ERP?",
    a: "Yes. Data migration is part of onboarding. We import your records from spreadsheets or exports from your current system, and your team checks them before anything goes live.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing is set per school, based on how much your school communicates through the system (WhatsApp, SMS and app messages) and the volume of use it is willing to commit to: students, campuses and modules. DigiBoard hardware, where needed, is quoted separately.",
    link: { href: "/pricing", label: "How pricing works" },
  },
  {
    q: "Which languages does it support?",
    a: "The product is in English today. Regional-language support is planned. Tell us which languages your staff and parents need so we can plan for them.",
  },
  {
    q: "We have more than one campus. Will it work for us?",
    a: "Multi-campus support is in scope and planned. Tell us about your campuses during the demo so that setup and the quote reflect them.",
  },
  {
    q: "What training and support do we get?",
    a: "We train the staff who will use each module before it goes live. How you reach us for help, and how quickly we respond, are agreed in your plan.",
    link: { href: "/how-it-works", label: "How onboarding works" },
  },
  {
    q: "Who owns our data? Can we export it?",
    a: "Your school owns its data and remains responsible for it as the data fiduciary under the DPDP Act 2023. You can ask for an export of your records, and how data is returned or deleted at the end of the agreement is written into the agreement.",
    link: { href: "/security", label: "Security & privacy" },
  },
  {
    q: "Can it send WhatsApp or SMS messages to parents?",
    a: "Messages to parents go through an approved messaging provider. WhatsApp needs a provider on the WhatsApp Business Platform and guardians who have opted in; SMS in India needs DLT-registered sender IDs and templates. We plan this with your school during onboarding.",
  },
  {
    q: "What hardware does DigiBoard need?",
    a: "Usually your existing TVs or displays plus a player device for each screen. We confirm what you need during a site survey, and any hardware is quoted separately.",
    link: { href: "/digiboard", label: "About DigiBoard" },
  },
  {
    q: "How do we get started?",
    a: "Book a demo. We look at how your school works today, show what is ready, and suggest a pilot with one class or campus.",
    link: { href: CTA.primaryHref, label: CTA.primary },
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${siteUrl}/faq`,
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 bg-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />
        <PageIntro
          eyebrow="FAQ"
          title="Questions schools ask us"
          lede={
            <p>
              Straight answers about what works today, what is planned, and how a school gets started. If your question
              is not here, ask us in a demo.
            </p>
          }
        />

        <section aria-label="Questions and answers" className="py-12 sm:py-16">
          <NarrowContainer>
            <ul className="flex flex-col gap-3">
              {faqs.map((item) => (
                <li key={item.q}>
                  <details className="group rounded-2xl border border-line-soft bg-white open:border-line">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-display text-lg font-bold text-ink sm:px-6 [&::-webkit-details-marker]:hidden">
                      <span>{item.q}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 text-ink-muted transition-transform group-open:rotate-180 motion-reduce:transition-none"
                      />
                    </summary>
                    <div className="px-5 pb-5 sm:px-6">
                      <p className="max-w-3xl text-base leading-relaxed text-ink-muted">{item.a}</p>
                      {item.link ? (
                        <p className="mt-3">
                          <Link
                            href={item.link.href}
                            className="text-base font-semibold text-ink underline underline-offset-4 hover:text-brand-700"
                          >
                            {item.link.label}
                          </Link>
                        </p>
                      ) : null}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </NarrowContainer>
        </section>

        <ClosingCTA
          title="Still have a question?"
          description="Book a demo and ask it directly. We will answer for your school's boards, size and routines."
          secondary={{ href: "/security", label: "Security & privacy" }}
        />
      </main>
      <Footer />
    </>
  );
}
