import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageIntro } from "@/components/sections/PageIntro";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { NarrowContainer } from "@/components/ui/Container";
import { CTA, contact, pageMetadata, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Privacy Notice",
  "What the Shiksha Tantra website collects when you request a demo, why, who processes it, and your rights under India's DPDP Act 2023.",
  "/privacy"
);

const lastUpdated = "14 October 2026";
const siteHost = new URL(siteUrl).host;

const linkClass = "font-semibold text-ink underline underline-offset-4 hover:text-brand-700";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-line-soft py-10 first:border-t-0">
      <h2 id={`${id}-title`} className="font-display text-2xl font-bold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-ink-muted [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-6">
        {children}
      </div>
    </section>
  );
}

function ContactLine() {
  return (
    <>
      call{" "}
      <a href={contact.phoneHref} className={linkClass}>
        {contact.phoneDisplay}
      </a>
      {contact.emailHref && contact.email ? (
        <>
          {" "}or email{" "}
          <a href={contact.emailHref} className={linkClass}>
            {contact.email}
          </a>
        </>
      ) : null}
    </>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 bg-paper">
        <PageIntro
          eyebrow="Privacy notice"
          title="Privacy notice for this website"
          lede={
            <p>
              What {siteHost} collects when you visit it or request a demo, why, who handles it, and how to exercise
              your rights. <span className="text-ink">Last updated: {lastUpdated}.</span>
            </p>
          }
        />

        <NarrowContainer className="py-6 sm:py-10">
          <div className="max-w-3xl">
            <Section id="scope" title="Who we are and what this covers">
              <p>
                {siteName} is based in {contact.city}. This notice covers this website only. When a school uses{" "}
                {siteName}, the school&apos;s own data (students, parents, staff) is handled under a separate agreement
                with that school; see{" "}
                <Link href="/security" className={linkClass}>
                  Security &amp; privacy
                </Link>
                .
              </p>
            </Section>

            <Section id="collect" title="What we collect">
              <p>
                <strong>When you request a demo</strong>, the form asks for:
              </p>
              <ul>
                <li>about your school: school name, city, number of students, boards, number of campuses;</li>
                <li>about you: your name, your role, email address, phone number and how you prefer to be contacted;</li>
                <li>
                  about your needs: the areas you are interested in, the system you use today (and the name of your
                  current ERP or software, if you give it), when you would like to start, and an optional message;
                </li>
                <li>which website or campaign link brought you to this site, if your browser noted one (see below);</li>
                <li>your confirmation that we may contact you about the request, and the time you gave it.</li>
              </ul>
              <p>
                <strong>Technical data.</strong> When the form is submitted, your IP address is held in the website
                server&apos;s memory to limit repeated submissions (we count requests from one address over 10 minutes).
                It is not emailed or saved with your request, and it is cleared when the server restarts. Our hosting provider keeps
                standard request logs (such as IP address, browser type and pages requested) to run and protect the
                service. If spam protection is switched on for the form, Cloudflare Turnstile checks that a person, not
                a bot, is submitting it: Cloudflare processes technical data from your browser, and our server sends
                Cloudflare your IP address with the check. When this protection is not switched on, nothing is sent to
                Cloudflare.
              </p>
              <p>
                <strong>Learning library.</strong> Your reading progress in the{" "}
                <Link href={CTA.libraryHref} className={linkClass}>
                  learning library
                </Link>{" "}
                is stored only in your own browser (local storage). It is not sent to us. You can remove it by clearing
                this site&apos;s data in your browser.
              </p>
              <p>
                <strong>Visit statistics.</strong> We use Vercel Web Analytics to count visits: which pages are viewed,
                the referring website, and your country, browser and device type. It does not use cookies and does not
                follow you across other websites. Visitors are told apart only by a hash of the request that is
                discarded after 24 hours, so it cannot be used to identify you. We see totals, not individual visitors.
              </p>
              <p>
                <strong>How you found us.</strong> When you arrive, your browser notes (in session storage, cleared
                when you close the tab) the website or campaign link that brought you and the first page you opened.
                It is sent to us only if you submit the demo form, as part of your request.
              </p>
              <p>
                <strong>No advertising trackers.</strong> This website does not use advertising or cross-site tracking
                scripts, and does not set cookies for analytics.
              </p>
            </Section>

            <Section id="purpose" title="Why we use it">
              <p>
                We use the details you send only to respond to your request: to contact you, arrange and prepare a demo,
                and send you an email confirming we received it. That confirmation repeats your name, school, boards and
                chosen areas, but not your message. We use visit statistics and how you found us only to understand
                which pages and outreach channels are useful. We do not sell your information or use it for advertising.
              </p>
            </Section>

            <Section id="processors" title="Who handles it for us">
              <ul>
                <li>
                  <strong>Email delivery:</strong> your request is sent to our team, and a confirmation to you, through
                  the email (SMTP) provider configured for this website.
                </li>
                <li>
                  <strong>Database:</strong> if a database is configured, a copy of your request is also stored in a MongoDB
                  Atlas database, so that we can keep track of enquiries.
                </li>
                <li>
                  <strong>Hosting and visit statistics:</strong> the website runs on Vercel, which also provides the
                  visit statistics described above.
                </li>
              </ul>
              <p>
                These providers may store or process data in India or in other countries, under their own security
                and contractual safeguards, as permitted by the DPDP Act.
              </p>
            </Section>

            <Section id="retention" title="How long we keep it">
              <p>
                <strong>Enquiries.</strong> We keep the details you send while we discuss your request and, if your
                school becomes a customer, for as long as the agreement with your school requires. You can ask us to
                delete them at any time.
              </p>
              <p>
                <strong>Student records (school product, not this website).</strong> When a school uses {siteName},
                records about a child are kept for 10 years from the date that child&apos;s class passes out of the
                school, and are then deleted, unless the agreement with the school or the law requires them to be kept longer (for example, admission
                registers and transfer certificate records).
              </p>
            </Section>

            <Section id="rights" title="Your rights">
              <p>
                Under India&apos;s Digital Personal Data Protection Act, 2023 you can ask us for a summary of the
                personal data we hold about you, ask us to correct, complete, update or erase it, withdraw your consent,
                raise a grievance, and nominate someone to exercise these rights for you.
              </p>
              <p>
                To make a request or raise a grievance, <ContactLine />. If you are not satisfied with our response, you
                can complain to the Data Protection Board of India.
              </p>
            </Section>

            <Section id="children" title="Children">
              <p>
                This website is meant for school leaders and staff. It does not knowingly collect personal data from
                children. If you believe a child has sent us their details, <ContactLine /> and we will delete them.
              </p>
            </Section>

            <Section id="changes" title="Changes to this notice">
              <p>
                When this notice changes, we update this page and the &ldquo;last updated&rdquo; date at the top.
              </p>
            </Section>
          </div>
        </NarrowContainer>

        <ClosingCTA
          title="Questions about your data?"
          description="Talk to us before you share anything. We will explain what we collect and why, for this website and for your school."
          secondary={{ href: "/security", label: "Security & privacy" }}
        />
      </main>
      <Footer />
    </>
  );
}
