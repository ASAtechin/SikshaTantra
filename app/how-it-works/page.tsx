import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/sections/PageIntro";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ContentSection } from "@/components/sections/ContentSection";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "How Onboarding Works",
  "How a school moves to Shiksha Tantra: discovery and calendar mapping, data migration and setup, a pilot with one class or campus, then module-by-module rollout.",
  "/how-it-works"
);

const fromYourSchool = [
  {
    title: "A coordinator on your side",
    text: "One person, such as an administrator or IT coordinator, who can answer questions and take decisions for the school.",
  },
  {
    title: "Your academic calendar",
    text: "Term dates, exam weeks and admissions season, so the rollout avoids your busiest weeks.",
  },
  {
    title: "Your current records",
    text: "Student and guardian lists, classes and sections, staff, and fee structures, as spreadsheets or exports from your current system.",
  },
  {
    title: "Board and report-card rules",
    text: "Your boards, grading scales and report-card formats, so assessments are set up the way your school already works.",
  },
  {
    title: "Staff time",
    text: "Time for training sessions and for checking migrated data before each module goes live.",
  },
  {
    title: "Consent and notices",
    text: "Your school decides how parents are informed and how their consent is recorded for children's data under the DPDP Act 2023. We work through it with you.",
  },
  {
    title: "For DigiBoard",
    text: "Access for a site survey of the screens, power points and network you plan to use.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 bg-paper">
        <PageIntro
          eyebrow="Onboarding"
          title="How onboarding works"
          lede={
            <p>
              Moving a school to a new system is a big change for staff and parents. We take it in stages, start small,
              and check each step with your team before moving on. How long it takes depends on the modules, your data
              and your campuses; we agree a plan with dates during discovery.
            </p>
          }
        />

        <HowItWorks
          id="stages"
          eyebrow="The stages"
          title="Five stages, each checked before the next"
          description="From the first conversation to everyday use."
        />

        <ContentSection
          id="what-we-need"
          tone="raised"
          title="What we need from your school"
          intro={<p>Onboarding goes faster when these are ready. We help you gather them during discovery.</p>}
        >
          <ul className="grid gap-4 sm:grid-cols-2">
            {fromYourSchool.map((item) => (
              <li key={item.title} className="flex items-start gap-3 rounded-2xl border border-line-soft bg-white p-5">
                <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-teal-600" />
                <div>
                  <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-ink-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ClosingCTA
          title="Start with a conversation"
          description="Book a demo. We will look at how your school works today and suggest where a pilot could start."
          secondary={{ href: "/pricing", label: "How pricing works" }}
        />
      </main>
      <Footer />
    </>
  );
}
