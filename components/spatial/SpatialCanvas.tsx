"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Monitor,
  PlayCircle,
  School,
  type LucideIcon,
} from "lucide-react";
import { Dialog, DialogCloseButton } from "@/components/ui/Dialog";
import { Button, LinkButton } from "@/components/ui/Button";
import { ScrollCue } from "@/components/landing/motion-primitives";
import { SchoolOperationsSimulator } from "@/components/spatial/SchoolOperationsSimulator";
import { getModule } from "@/lib/modules-data";
import { CTA, siteName, siteStatus } from "@/lib/site";
import { cn } from "@/lib/utils";

type PanelId = "erp" | "learning";
type Overlay = PanelId | "simulator" | null;
type Tone = "ochre" | "sage" | "forest" | "cream";

interface Portal {
  id: string;
  title: string;
  caption: string;
  icon: LucideIcon;
  tone: Tone;
  /** Grid placement around the hero on large screens. */
  placement: string;
  href?: string;
  panel?: PanelId;
}

const portals: Portal[] = [
  {
    id: "library",
    title: "Learning library",
    caption: "Sample chapters for classes 1–12",
    icon: BookOpen,
    tone: "ochre",
    href: "/library",
    placement: "lg:col-start-1 lg:row-start-1 lg:self-end lg:justify-self-start lg:translate-x-4",
  },
  {
    id: "erp",
    title: "School ERP",
    caption: "Admissions to report cards, in one system",
    icon: School,
    tone: "sage",
    panel: "erp",
    placement: "lg:col-start-3 lg:row-start-1 lg:self-end lg:justify-self-end lg:-translate-x-4",
  },
  {
    id: "learning",
    title: "How learning works",
    caption: "Short reads, models and practice",
    icon: Lightbulb,
    tone: "forest",
    panel: "learning",
    placement: "lg:col-start-1 lg:row-start-2 lg:self-start lg:justify-self-start",
  },
  {
    id: "digiboard",
    title: "DigiBoard screens",
    caption: "Timetables and notices on campus screens",
    icon: Monitor,
    tone: "cream",
    href: "/digiboard",
    placement: "lg:col-start-3 lg:row-start-2 lg:self-start lg:justify-self-end",
  },
];

const toneClasses: Record<Tone, string> = {
  ochre: "bg-amber-100 text-amber-700",
  sage: "bg-teal-100 text-teal-700",
  forest: "bg-brand-100 text-brand-800",
  cream: "bg-cream-100 text-ochre",
};

const erpAreas = [
  { slug: "admissions-enrollment", fallback: "Admissions & Enrollment", desc: "Enquiries, applications, documents and seat allocation." },
  { slug: "attendance", fallback: "Attendance", desc: "Daily and period-wise roll call, with guardian alerts." },
  { slug: "communication", fallback: "Communication", desc: "Notices and alerts that reach the right guardians." },
  { slug: "fees-finance", fallback: "Fees & Finance", desc: "Instalments, concessions, receipts and reconciliation." },
];

const learningSteps = ["Short concept reads", "Interactive models", "Reflection prompts", "Low-stakes practice"];

const portalCard =
  "group flex min-h-20 w-full items-center gap-4 rounded-[20px] border border-line-soft bg-paper-raised/90 p-4 text-left shadow-[var(--shadow-soft)] backdrop-blur transition-[translate,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-950 focus-visible:ring-offset-2 focus-visible:ring-offset-paper motion-reduce:hover:translate-y-0 lg:min-w-[15rem]";

/** Homepage hero: buyer-first message on the paper canvas, with four plain-named entry points. */
export function SpatialCanvas() {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const close = () => setOverlay(null);

  return (
    <section aria-labelledby="hero-title" className="spatial-shell relative overflow-hidden">
      <div aria-hidden="true" className="spatial-ambient pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="spatial-grain pointer-events-none absolute inset-0" />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full text-brand-400 lg:block"
        viewBox="0 0 1000 620"
        preserveAspectRatio="none"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 8" strokeOpacity=".45">
          <path d="M500 300 C385 210 280 200 180 190" />
          <path d="M500 300 C640 200 735 190 820 190" />
          <path d="M500 320 C370 420 285 460 205 470" />
          <path d="M500 320 C620 430 740 450 795 468" />
        </g>
        <g fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity=".2">
          <ellipse cx="500" cy="310" rx="365" ry="206" transform="rotate(-9 500 310)" />
          <ellipse cx="500" cy="310" rx="265" ry="150" transform="rotate(13 500 310)" />
        </g>
      </svg>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pt-12 lg:grid lg:min-h-[max(40rem,calc(100svh-6rem))] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)_minmax(0,1fr)] lg:grid-rows-2 lg:gap-x-6 lg:gap-y-10 lg:px-8 lg:py-16">
        <div className="max-w-2xl lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-auto lg:self-center lg:text-center">
          <p className="inline-flex items-center gap-2.5 font-display text-base font-bold text-ink">
            <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-forest text-gold shadow-[var(--shadow-soft)]">
              <GraduationCap aria-hidden="true" className="h-5 w-5" />
            </span>
            {siteName}
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-balance font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]"
          >
            School ERP and campus screens <span className="font-semibold italic text-ochre">for Indian schools</span>
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-ink/80 sm:text-lg">
            A school ERP being built with founding schools for admissions, attendance, fees and report cards, with
            DigiBoard screens that show the day&apos;s timetable and notices around campus. Plus a sample learning library for classes 1–12.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-center">
            <LinkButton href={CTA.primaryHref} size="lg">
              {CTA.primary}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </LinkButton>
            <LinkButton href={CTA.secondaryHref} size="lg" variant="outline" className="bg-paper-raised/70">
              {CTA.secondary}
            </LinkButton>
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-sm text-ink/80 lg:justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-amber-700">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              {siteStatus.label}
            </span>
            {siteStatus.short}
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:contents">
          <h2 className="text-xs font-bold uppercase tracking-[0.08em] text-ink/80 sm:col-span-2 lg:sr-only">
            Where to start
          </h2>
          {portals.map((portal) => (
            <div key={portal.id} className={cn("lg:w-full lg:max-w-[18rem]", portal.placement)}>
              {portal.href ? (
                <Link href={portal.href} className={portalCard}>
                  <PortalBody portal={portal} isLink />
                </Link>
              ) : (
                <button
                  type="button"
                  className={portalCard}
                  aria-haspopup="dialog"
                  onClick={() => setOverlay(portal.panel ?? null)}
                >
                  <PortalBody portal={portal} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:block">
          <ScrollCue label="More below" />
        </div>
      </div>

      <Dialog open={overlay === "erp"} onClose={close} labelledBy="erp-panel-title" size="lg" panelClassName="bg-paper-raised">
        <PanelHeader icon={School} titleId="erp-panel-title" title="School ERP" onClose={close} />
        <p className="mt-3 text-base leading-relaxed text-ink-muted">
          One record for each student, from the admission form to the report card. Pick an area to see how it is
          designed to work.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {erpAreas.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/features/${area.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line-soft bg-white p-4 transition-colors hover:border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-950"
              >
                <span className="flex items-center justify-between gap-2 font-display text-base font-bold text-ink">
                  {getModule(area.slug)?.name ?? area.fallback}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1 text-sm leading-snug text-ink-muted">{area.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => setOverlay("simulator")} aria-haspopup="dialog">
            <PlayCircle aria-hidden="true" className="h-5 w-5" />
            Try the operations demo
          </Button>
          <LinkButton href={CTA.secondaryHref} variant="outline">
            {CTA.secondary}
          </LinkButton>
        </div>
      </Dialog>

      <Dialog open={overlay === "learning"} onClose={close} labelledBy="learning-panel-title" size="md" panelClassName="bg-paper-raised">
        <PanelHeader icon={Lightbulb} titleId="learning-panel-title" title="How learning works" onClose={close} />
        <p className="mt-3 text-base leading-relaxed text-ink-muted">
          Read a little. Move an idea. Notice what changed. Practise without pressure.
        </p>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2">
          {learningSteps.map((step, index) => (
            <li key={step} className="rounded-2xl border border-line-soft bg-white p-4">
              <span className="text-xs font-bold text-ochre">Step {index + 1}</span>
              <p className="mt-1 text-sm font-bold leading-snug text-ink">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm leading-relaxed text-ink-muted">
          The library holds sample chapters. They are not yet aligned to a specific board.
        </p>
        <div className="mt-6">
          <LinkButton href={CTA.libraryHref}>
            {CTA.library}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </LinkButton>
        </div>
      </Dialog>

      <Dialog
        open={overlay === "simulator"}
        onClose={close}
        labelledBy="simulator-title"
        size="xl"
        panelClassName="bg-paper-raised p-0 sm:p-0"
      >
        <SchoolOperationsSimulator titleId="simulator-title" onClose={close} />
      </Dialog>
    </section>
  );
}

function PortalBody({ portal, isLink = false }: { portal: Portal; isLink?: boolean }) {
  const Icon = portal.icon;
  const Arrow = isLink ? ArrowUpRight : ArrowRight;
  return (
    <>
      <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", toneClasses[portal.tone])}>
        <Icon aria-hidden="true" className="h-[22px] w-[22px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-base font-bold leading-tight text-ink">{portal.title}</span>
        <span className="mt-1 block text-sm leading-snug text-ink-muted">{portal.caption}</span>
      </span>
      <Arrow
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5"
      />
    </>
  );
}

function PanelHeader({
  icon: Icon,
  titleId,
  title,
  onClose,
}: {
  icon: LucideIcon;
  titleId: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest text-gold">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <h2 id={titleId} className="font-display text-2xl font-bold leading-tight text-ink">
          {title}
        </h2>
      </div>
      <DialogCloseButton onClick={onClose} />
    </div>
  );
}
