import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  CloudSun,
  Cpu,
  LayoutGrid,
  Lock,
  Monitor,
  PartyPopper,
  Shuffle,
  ShieldAlert,
  Siren,
  Tv,
  Type,
  Users,
  Wifi,
  WifiOff,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { SignageIllustration } from "@/components/illustrations/SignageIllustration";
import { CTA, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "DigiBoard Campus Screens for Schools",
  "DigiBoard shows timetables, substitutions, notices and emergency alerts on your school's existing TVs and displays. See what works today and what is being built.",
  "/digiboard"
);

interface Item {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const workingToday: Item[] = [
  {
    icon: Monitor,
    title: "Current and next lecture",
    desc: "Each display shows the period in progress and what comes next.",
  },
  {
    icon: CalendarDays,
    title: "Today's and weekly schedules",
    desc: "Day and week views of classes, rooms and teachers.",
  },
  {
    icon: Users,
    title: "Teacher information",
    desc: "Who is teaching which class, and where.",
  },
  {
    icon: Shuffle,
    title: "Quick substitutions and room changes",
    desc: "Made by the administrator and reflected on the displays.",
  },
  {
    icon: Siren,
    title: "Emergency broadcast to displays",
    desc: "An alert message pushed to the screens on campus.",
  },
  {
    icon: CloudSun,
    title: "Weather",
    desc: "Local weather alongside the schedule.",
  },
  {
    icon: Type,
    title: "Font scaling",
    desc: "Text size adjusted so a screen can be read from across a corridor.",
  },
  {
    icon: Wrench,
    title: "Schedule administration",
    desc: "Conflict detection, workload views, and CSV import of teachers and lectures.",
  },
];

const beingBuilt: Item[] = [
  {
    icon: Lock,
    title: "Per-device enrolment and revocation",
    desc: "Each screen registered to a campus and location, and removable if it is lost or replaced, so an unregistered device receives no private schedule data.",
  },
  {
    icon: ShieldAlert,
    title: "Durable, versioned alerts with an explicit all-clear",
    desc: "Emergency alerts that survive restarts, carry a severity and expiry, and end with a clear all-clear rather than simply disappearing.",
  },
  {
    icon: WifiOff,
    title: "Offline: last approved state",
    desc: "If a screen loses its connection, it keeps the last approved schedule and shows when it was last updated.",
  },
  {
    icon: LayoutGrid,
    title: "Content classified by room",
    desc: "Reception screens show public information only; staff-room screens can show internal notices.",
  },
  {
    icon: PartyPopper,
    title: "Consent-checked celebrations",
    desc: "Birthdays and achievements shown only for students whose guardians agreed to display.",
  },
];

const useCases = [
  { title: "Reception and lobby", desc: "Today's events and notices suitable for visitors." },
  { title: "Corridors and classroom doors", desc: "The current period, subject and teacher for each room." },
  { title: "Staff room", desc: "The day's substitutions, room changes and internal notices." },
  { title: "Gates and assembly points", desc: "Emergency messages during drills and incidents." },
];

const requirements: Item[] = [
  {
    icon: Tv,
    title: "Your existing TVs or displays",
    desc: "Screens you already have, at the locations you choose.",
  },
  {
    icon: Cpu,
    title: "A player device per screen",
    desc: "A small device connected to each display that runs DigiBoard. We recommend the option for your screens.",
  },
  {
    icon: Wifi,
    title: "A network connection",
    desc: "Wi-Fi or a wired connection where each screen is mounted.",
  },
  {
    icon: ClipboardCheck,
    title: "A site survey first",
    desc: "Screens, devices, placement and network are confirmed with you before anything is bought.",
  },
];

export default function DigiBoardPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <section aria-labelledby="digiboard-title" className="relative overflow-hidden bg-brand-950 pb-24 pt-16 text-white sm:pt-24">
          <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

          <Container className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <Badge className="border-white/15 bg-white/5 text-amber-300">
                <Monitor className="h-3.5 w-3.5" aria-hidden="true" /> DigiBoard campus screens
              </Badge>
              <h1
                id="digiboard-title"
                className="mt-6 text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
              >
                Campus screens that show the right schedule, notice or alert
              </h1>
              <p className="mt-6 max-w-lg text-balance text-lg leading-relaxed text-white/85">
                DigiBoard puts the day&apos;s timetable, substitutions, notices and emergency alerts on the TVs and
                displays around your campus: corridors, the staff room, reception and the gates.
              </p>
              <p className="mt-4 max-w-lg text-white/85">
                <span className="font-semibold text-white">DigiBoard campus screens</span> are display screens, not a
                classroom smartboard or interactive panel. The scheduling and display foundation works today; features
                for school-wide rollout are being built.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <LinkButton href={CTA.primaryHref} variant="amber" size="lg" className="group">
                  {CTA.primary}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                  />
                </LinkButton>
                <LinkButton href={CTA.secondaryHref} variant="white" size="lg">
                  {CTA.secondary}
                </LinkButton>
              </div>
            </div>
            <SignageIllustration />
          </Container>
        </section>

        <section aria-labelledby="today-title" className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              id="today-title"
              eyebrow="Available today"
              title="Working today in the DigiBoard foundation"
              description="The scheduling and display foundation that already exists. It is what Shiksha Tantra's timetable module builds on."
            />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {workingToday.map((c) => (
                <li key={c.title} className="rounded-2xl border border-line-soft bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <c.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.desc}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section aria-labelledby="building-title" className="pb-20 sm:pb-24">
          <Container>
            <div className="rounded-[2.5rem] border border-dashed border-line bg-paper-raised p-6 sm:p-12">
              <SectionHeading
                id="building-title"
                align="left"
                eyebrow="In development"
                title="Being built for school-wide rollout"
                description="What a campus with many screens needs before it relies on them for safety messages. These are designed and in development, and are not available yet."
              />
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {beingBuilt.map((c) => (
                  <li key={c.title} className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)]">
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                        <c.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                        Being built
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section aria-labelledby="where-title" className="pb-20 sm:pb-24">
          <Container>
            <SectionHeading id="where-title" align="left" eyebrow="Where it is used" title="Screens around the campus" />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((u) => (
                <li key={u.title} className="rounded-2xl border border-line-soft bg-white p-6">
                  <h3 className="font-display text-base font-bold text-ink">{u.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{u.desc}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section aria-labelledby="need-title" className="pb-20 sm:pb-24">
          <Container>
            <div className="rounded-[2.5rem] bg-brand-50 p-6 sm:p-12">
              <SectionHeading
                id="need-title"
                align="left"
                eyebrow="What you need"
                title="Usually, screens you already have"
                description="DigiBoard is designed to use ordinary TVs and displays. Devices and placement are confirmed in a site survey for your campus."
              />
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {requirements.map((r) => (
                  <li key={r.title} className="flex flex-col rounded-2xl bg-white p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-950 text-amber-400">
                      <r.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-ink">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{r.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section aria-labelledby="digiboard-cta-title" className="pb-24">
          <Container>
            <div className="flex flex-col items-center gap-5 rounded-[2.5rem] bg-brand-950 px-6 py-14 text-center text-white sm:px-16">
              <CheckCircle2 className="h-10 w-10 text-amber-400" aria-hidden="true" />
              <h2 id="digiboard-cta-title" className="max-w-xl text-balance font-display text-2xl font-bold sm:text-3xl">
                Plan DigiBoard for your campus
              </h2>
              <p className="max-w-xl text-balance text-white/85">
                See the scheduling and display foundation, and plan which screens to start with.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <LinkButton href={CTA.primaryHref} variant="amber" size="lg">
                  {CTA.primary}
                </LinkButton>
                <LinkButton href={CTA.secondaryHref} variant="white" size="lg">
                  {CTA.secondary}
                </LinkButton>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
