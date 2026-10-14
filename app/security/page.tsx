import type { Metadata } from "next";
import Link from "next/link";
import { FileClock, KeyRound, MonitorCheck, ShieldCheck, Server, Scale } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/sections/PageIntro";
import { ContentSection } from "@/components/sections/ContentSection";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { contact, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Security & Privacy",
  "How Shiksha Tantra is designed to protect school records, what the DPDP Act 2023 asks of schools and of us, and how hosting is agreed with each school.",
  "/security"
);

const designGoals = [
  {
    icon: KeyRound,
    title: "Role-based access",
    text: "Each person sees only what their role needs. A class teacher works with their own sections; accounts staff work with fees; leadership sees school-wide summaries.",
  },
  {
    icon: FileClock,
    title: "Audit history",
    text: "Changes to sensitive records, such as marks, fee entries and attendance corrections, are designed to keep a history of who changed what, and when.",
  },
  {
    icon: MonitorCheck,
    title: "Per-device screen enrolment",
    text: "DigiBoard screens are enrolled one device at a time, so only screens your school has approved can show its notices.",
  },
  {
    icon: ShieldCheck,
    title: "Data minimisation",
    text: "Each workflow asks only for the data it needs. Screens in corridors and receptions are meant for notices and timetables, not students' personal details.",
  },
];

const lawPoints = [
  {
    title: "Verifiable parental consent",
    text: "Processing a child's personal data needs verifiable consent from a parent or lawful guardian. The Act also rules out tracking, behavioural monitoring and targeted advertising directed at children.",
  },
  {
    title: "Notice",
    text: "When consent is sought, parents, students and staff must be told what personal data is collected and why, and how to exercise their rights.",
  },
  {
    title: "Rights of data principals",
    text: "People whose data is held (data principals) can ask for a summary of it, have it corrected, completed or erased, raise a grievance, and nominate someone to act for them.",
  },
  {
    title: "Breach reporting",
    text: "A personal data breach must be reported to the Data Protection Board of India and to each affected person.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 bg-paper">
        <PageIntro
          eyebrow="Trust"
          title="Security & privacy"
          lede={
            <p>
              Schools hold some of the most sensitive data there is: children&apos;s records. This page separates how
              Shiksha Tantra is designed from what the law asks of your school and of us. It does not claim any
              certification or external audit.
            </p>
          }
        >
          <nav aria-label="On this page" className="mt-8">
            <ul className="flex flex-wrap gap-2 text-sm font-semibold">
              {[
                ["#design", "How it is designed"],
                ["#law", "Your data and the law"],
                ["#hosting", "Hosting"],
                ["#website", "This website"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="inline-flex min-h-10 items-center rounded-full border border-line-soft bg-white px-4 text-ink hover:border-line"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PageIntro>

        <ContentSection
          id="design"
          eyebrow="Design goals during early access"
          title="How it is designed"
          intro={
            <p>
              Shiksha Tantra is in early access. The points below are the design goals each module is built to; we will
              confirm with your school which of them are in place for the modules you use.
            </p>
          }
        >
          <ul className="grid gap-4 sm:grid-cols-2">
            {designGoals.map((g) => (
              <li key={g.title} className="rounded-2xl border border-line-soft bg-white p-6">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-950 text-amber-400"
                >
                  <g.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{g.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-muted">{g.text}</p>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection
          id="law"
          tone="raised"
          eyebrow="DPDP Act 2023"
          title="Your data and the law"
          intro={
            <>
              <p>
                India&apos;s Digital Personal Data Protection Act, 2023 applies to the personal data a school holds about
                its students, parents and staff. Under the Act, <strong className="font-semibold text-ink">your school
                remains the data fiduciary</strong>: it decides why and how that data is used. Shiksha Tantra processes
                the data on your school&apos;s behalf, as set out in the agreement with your school.
              </p>
              <p className="mt-4">The Act&apos;s main asks, in brief:</p>
            </>
          }
        >
          <ul className="grid gap-4 sm:grid-cols-2">
            {lawPoints.map((p) => (
              <li key={p.title} className="rounded-2xl border border-line-soft bg-white p-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                  <Scale aria-hidden="true" className="h-5 w-5 shrink-0 text-teal-600" />
                  {p.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-muted">{p.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted">
            This is a plain summary, not legal advice. During onboarding we work through consent, notices and
            requests from parents with your school, and the agreement records who does what.
          </p>
        </ContentSection>

        <ContentSection
          id="hosting"
          title="Hosting"
          intro={
            <div className="flex items-start gap-4">
              <Server aria-hidden="true" className="mt-1 hidden h-6 w-6 shrink-0 text-teal-600 sm:block" />
              <div>
                <p>
                  Where your school&apos;s data is hosted (including the region) and how it is backed up are agreed with
                  each school and documented in the agreement. Ask us for these details during your demo, and we will put
                  them in writing.
                </p>
                <p className="mt-4">
                  Records about a child are kept for 10 years from the date that child&apos;s class passes out of the
                  school, and are then deleted, unless the agreement with the school or the law requires them to be kept longer (for example, admission
                  registers and transfer certificate records).
                </p>
              </div>
            </div>
          }
        />

        <ContentSection
          id="website"
          tone="raised"
          title="This website"
          intro={
            <p>
              What this website collects when you request a demo, and why, is set out in our{" "}
              <Link href="/privacy" className="font-semibold text-ink underline underline-offset-4 hover:text-brand-700">
                privacy notice
              </Link>
              . To raise a security or privacy concern, call{" "}
              <a href={contact.phoneHref} className="font-semibold text-ink underline underline-offset-4 hover:text-brand-700">
                {contact.phoneDisplay}
              </a>
              {contact.emailHref && contact.email ? (
                <>
                  {" "}or email{" "}
                  <a
                    href={contact.emailHref}
                    className="font-semibold text-ink underline underline-offset-4 hover:text-brand-700"
                  >
                    {contact.email}
                  </a>
                </>
              ) : null}
              .
            </p>
          }
        />

        <ClosingCTA
          title="Ask us the hard questions"
          description="Bring your IT coordinator to the demo. We will go through access roles, audit history, hosting and how DPDP duties are shared."
          secondary={{ href: "/faq", label: "Read the FAQ" }}
        />
      </main>
      <Footer />
    </>
  );
}
