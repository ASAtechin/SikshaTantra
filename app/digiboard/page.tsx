import {
  Monitor,
  Zap,
  ShieldAlert,
  Wifi,
  LayoutGrid,
  BellRing,
  Lock,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { SignageIllustration } from "@/components/illustrations/SignageIllustration";

export const metadata: Metadata = {
  title: "DigiBoard Campus Signage",
  description:
    "DigiBoard turns live school data into real-time campus displays — timetable changes, announcements, and drill-tested emergency alerts that fail safe.",
  alternates: { canonical: "/digiboard" },
};

const capabilities = [
  {
    icon: Zap,
    title: "Always Live, Never Stale",
    desc: "Timetable changes, substitutions, and room swaps appear on every screen within seconds — fed directly from the same governed data as attendance and scheduling.",
  },
  {
    icon: ShieldAlert,
    title: "Drill-Tested Emergency Alerts",
    desc: "Durable, versioned incident broadcasts with an explicit all-clear. A display going quiet is never mistaken for 'all clear' — it clearly shows 'information unavailable' instead.",
  },
  {
    icon: Wifi,
    title: "Offline-Safe By Design",
    desc: "If a display loses connection, it shows the last verified safe state and expires gracefully — it never fabricates a schedule or silently shows outdated content as current.",
  },
  {
    icon: Lock,
    title: "Per-Device Security",
    desc: "Every screen enrolls with its own revocable identity and location claim. A stolen or cloned device is denied automatically — public displays never leak restricted data.",
  },
  {
    icon: LayoutGrid,
    title: "Content That Fits the Room",
    desc: "Lobby displays show public-safe information only; staff-room and classroom displays can show more — content classification is enforced automatically, not left to chance.",
  },
  {
    icon: BellRing,
    title: "Notices & Celebrations",
    desc: "Birthdays, achievements, event countdowns, and school announcements — moderated and consent-checked before anything with a child's photo goes on a public screen.",
  },
];

const useCases = [
  { title: "Reception & Lobby", desc: "Visitor-safe announcements, today's events, and a warm first impression." },
  { title: "Corridors & Classroom Doors", desc: "Live period, subject, and teacher — updated automatically, never a printed sheet." },
  { title: "Staff Rooms", desc: "Substitution assignments, duty rosters, and internal notices in one glance." },
  { title: "Gates & Assembly Points", desc: "Emergency protocol screens and drill-tested incident broadcasts." },
];

export default function DigiBoardPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-brand-950 pb-24 pt-16 text-white sm:pt-24">
          <div className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

          <Container className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <Badge className="border-white/15 bg-white/5 text-amber-300">
                <Monitor className="h-3.5 w-3.5" /> DigiBoard Digital Signage
              </Badge>
              <h1 className="mt-6 text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                Every screen on campus, always telling the truth
              </h1>
              <p className="mt-6 max-w-lg text-balance text-lg leading-relaxed text-white/65">
                DigiBoard is Siksha Tantra&apos;s real-time digital signage network — included
                with every plan, not an expensive add-on. It turns hallway TVs, gate displays,
                and staff-room screens into a live reflection of what&apos;s actually happening,
                never a guess.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <LinkButton href="/request-demo" variant="amber" size="lg" className="group">
                  Request a Demo
                  <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
                </LinkButton>
                <LinkButton href="/#features" variant="white" size="lg">
                  See the Full ERP
                </LinkButton>
              </div>
            </div>
            <SignageIllustration />
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <SectionHeading
              eyebrow="How DigiBoard works"
              title="Built for safety-critical, always-on display"
              description="Every capability below exists because a school screen failing silently, or showing stale data as current, is unacceptable — not a minor bug."
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-brand-950/8 bg-white/60 p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-950/5 text-brand-700">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-brand-950">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-950/55">{c.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="pb-24">
          <Container>
            <div className="rounded-[2.5rem] bg-brand-950/[0.03] p-8 sm:p-12">
              <SectionHeading
                align="left"
                eyebrow="Where it's used"
                title="One network, every kind of screen"
              />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {useCases.map((u, i) => (
                  <div key={u.title} className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)]">
                    <span className="font-display text-2xl font-extrabold text-amber-500">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 font-display text-base font-bold text-brand-950">{u.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-950/55">{u.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
