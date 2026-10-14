"use client";

import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BusFront,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  MessageCircle,
  ReceiptText,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { DialogCloseButton } from "@/components/ui/Dialog";
import { Button, LinkButton } from "@/components/ui/Button";
import { CTA } from "@/lib/site";
import { cn } from "@/lib/utils";

type ModuleId = "fees" | "attendance" | "marks" | "transport" | "substitution";
type RollStatus = "present" | "late" | "absent";
type CoGrade = "A" | "B" | "C";

interface FeeLine {
  label: string;
  note?: string;
  /** Rupees; negative for concessions. null = not applied (shown, not counted). */
  amount: number | null;
}

type FeeAccount =
  | { kind: "regular"; instalment: string; due: string; overdue: boolean; lines: FeeLine[]; lateFeeRule: string }
  | { kind: "rte"; lines: FeeLine[] };

interface DemoStudent {
  id: string;
  name: string;
  admissionNo: string;
  classNumeral: string;
  section: string;
  classSize: number;
  /** Other learners absent in the same class at roll call. */
  othersAbsent: number;
  fees: FeeAccount;
  marks: { subject: string; internal: number; exam: number }[];
  coScholastic: { area: string; grade: CoGrade }[];
}

const lateFeeRule = "Late fee rule: ₹50 a day after the due date, capped at ₹500.";

const students: DemoStudent[] = [
  {
    id: "aarav",
    name: "Aarav Mehta",
    admissionNo: "ST-2024-0816",
    classNumeral: "VIII",
    section: "A",
    classSize: 36,
    othersAbsent: 1,
    fees: {
      kind: "regular",
      instalment: "Instalment 2 of 3",
      due: "Due 15 Oct",
      overdue: false,
      lateFeeRule,
      lines: [
        { label: "Tuition fee · instalment 2 of 3", amount: 18000 },
        { label: "Transport · Oct–Dec", amount: 7200 },
        { label: "Sibling concession · 10% of tuition", note: "Approved by the Principal", amount: -1800 },
        { label: "Late fee", note: "None while the due date has not passed", amount: 0 },
      ],
    },
    marks: [
      { subject: "English", internal: 19, exam: 74 },
      { subject: "Hindi", internal: 18, exam: 66 },
      { subject: "Mathematics", internal: 17, exam: 71 },
      { subject: "Science", internal: 16, exam: 62 },
      { subject: "Social Science", internal: 15, exam: 53 },
    ],
    coScholastic: [
      { area: "Work Education", grade: "A" },
      { area: "Art Education", grade: "B" },
      { area: "Health & Physical Education", grade: "A" },
    ],
  },
  {
    id: "ananya",
    name: "Ananya Rao",
    admissionNo: "ST-2023-0421",
    classNumeral: "IX",
    section: "B",
    classSize: 38,
    othersAbsent: 2,
    fees: {
      kind: "regular",
      instalment: "Instalment 2 of 3",
      due: "Was due 10 Oct",
      overdue: true,
      lateFeeRule,
      lines: [
        { label: "Tuition fee · instalment 2 of 3", amount: 21000 },
        { label: "Science lab fee", amount: 1500 },
        { label: "Late fee · 4 days × ₹50", amount: 200 },
        { label: "Sibling concession requested", note: "Awaiting Principal approval, so not applied yet", amount: null },
      ],
    },
    marks: [
      { subject: "English", internal: 16, exam: 58 },
      { subject: "Hindi", internal: 13, exam: 35 },
      { subject: "Mathematics", internal: 18, exam: 76 },
      { subject: "Science", internal: 17, exam: 70 },
      { subject: "Social Science", internal: 14, exam: 46 },
    ],
    coScholastic: [
      { area: "Work Education", grade: "A" },
      { area: "Art Education", grade: "A" },
      { area: "Health & Physical Education", grade: "B" },
    ],
  },
  {
    id: "kabir",
    name: "Kabir Shah",
    admissionNo: "ST-2025-0198",
    classNumeral: "VII",
    section: "C",
    classSize: 34,
    othersAbsent: 0,
    fees: {
      kind: "rte",
      lines: [
        {
          label: "Tuition fee · RTE Section 12(1)(c) seat",
          note: "Waived for the learner. Reimbursement claimed from the state.",
          amount: 0,
        },
      ],
    },
    marks: [
      { subject: "English", internal: 17, exam: 60 },
      { subject: "Hindi", internal: 16, exam: 55 },
      { subject: "Mathematics", internal: 14, exam: 38 },
      { subject: "Science", internal: 15, exam: 49 },
      { subject: "Social Science", internal: 12, exam: 27 },
    ],
    coScholastic: [
      { area: "Work Education", grade: "B" },
      { area: "Art Education", grade: "A" },
      { area: "Health & Physical Education", grade: "A" },
    ],
  },
];

const modules: { id: ModuleId; label: string; icon: LucideIcon }[] = [
  { id: "fees", label: "Fees & ledger", icon: CircleDollarSign },
  { id: "attendance", label: "Roll call", icon: UsersRound },
  { id: "marks", label: "Term marks", icon: ReceiptText },
  { id: "transport", label: "Transport", icon: BusFront },
  { id: "substitution", label: "Substitution", icon: CalendarClock },
];

const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

/** CBSE 8-point scholastic scale. */
function cbseGrade(total: number) {
  if (total >= 91) return "A1";
  if (total >= 81) return "A2";
  if (total >= 71) return "B1";
  if (total >= 61) return "B2";
  if (total >= 51) return "C1";
  if (total >= 41) return "C2";
  if (total >= 33) return "D";
  return "E";
}

const classLabel = (s: DemoStudent) => `Class ${s.classNumeral}-${s.section}`;

const pill =
  "inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-950 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-raised";
const pillOn = "border-forest bg-forest text-white";
const pillOff = "border-line-soft bg-white text-ink hover:border-line";

export function SchoolOperationsSimulator({ titleId, onClose }: { titleId: string; onClose: () => void }) {
  const [activeModule, setActiveModule] = useState<ModuleId>("fees");
  const [studentId, setStudentId] = useState(students[0].id);
  const [receipts, setReceipts] = useState<Record<string, string>>({});
  const [roll, setRoll] = useState<Record<string, RollStatus>>({});
  const [routeStop, setRouteStop] = useState(1);
  const [substituteAssigned, setSubstituteAssigned] = useState(false);

  const student = students.find((s) => s.id === studentId) ?? students[0];
  const active = modules.find((m) => m.id === activeModule) ?? modules[0];

  return (
    <div className="flex flex-col">
      <header className="flex items-start justify-between gap-4 border-b border-line-soft px-5 pb-4 pt-5 sm:px-7 sm:pt-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-ochre">Demo data · nothing is saved or sent</p>
          <h2 id={titleId} className="mt-1 font-display text-2xl font-bold leading-tight text-ink">
            School operations demo
          </h2>
        </div>
        <DialogCloseButton onClick={onClose} aria-label="Close demo" />
      </header>

      <div className="flex flex-col gap-4 border-b border-line-soft px-5 py-4 sm:px-7">
        <div role="group" aria-labelledby="sim-student-label" className="flex flex-wrap items-center gap-2">
          <span id="sim-student-label" className="mr-1 text-sm font-semibold text-ink-muted">
            Student
          </span>
          {students.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === student.id}
              onClick={() => setStudentId(s.id)}
              className={cn(pill, s.id === student.id ? pillOn : pillOff)}
            >
              {s.name} · {s.classNumeral}-{s.section}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Demo area" className="flex flex-wrap gap-2">
          {modules.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={activeModule === id}
              onClick={() => setActiveModule(id)}
              className={cn(pill, activeModule === id ? pillOn : pillOff)}
            >
              <Icon aria-hidden="true" className={cn("h-4 w-4", activeModule === id ? "text-gold" : "text-sage")} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <section aria-label={active.label} className="px-5 py-5 sm:px-7">
        {activeModule === "fees" && (
          <FeesDesk
            student={student}
            receipt={receipts[student.id]}
            onPay={() =>
              setReceipts((r) => ({ ...r, [student.id]: `DEMO-RCPT-${1040 + Object.keys(r).length + 1}` }))
            }
          />
        )}
        {activeModule === "attendance" && (
          <AttendanceDesk
            student={student}
            status={roll[student.id] ?? "absent"}
            onChange={(status) => setRoll((r) => ({ ...r, [student.id]: status }))}
          />
        )}
        {activeModule === "marks" && <MarksDesk student={student} />}
        {activeModule === "transport" && (
          <TransportDesk routeStop={routeStop} onNextStop={() => setRouteStop((n) => (n + 1) % 4)} />
        )}
        {activeModule === "substitution" && (
          <SubstitutionDesk assigned={substituteAssigned} onAssign={() => setSubstituteAssigned(true)} />
        )}
      </section>

      <footer className="flex flex-col gap-4 border-t border-line-soft bg-cream-100/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="flex items-start gap-2 text-sm leading-relaxed text-ink-muted">
          <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
          Names, amounts, marks, alerts and routes are fictional. This shows how the system is designed to work, not
          live school data.
        </p>
        <LinkButton href={CTA.primaryHref} size="sm" className="shrink-0">
          {CTA.primary}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </LinkButton>
      </footer>
    </div>
  );
}

function CardHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 bg-forest px-4 py-3 text-white">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/85">{eyebrow}</p>
        <p className="mt-0.5 text-sm font-bold">{title}</p>
      </div>
      {children}
    </div>
  );
}

function FeesDesk({ student, receipt, onPay }: { student: DemoStudent; receipt?: string; onPay: () => void }) {
  const { fees } = student;
  const charged = fees.lines.reduce((sum, line) => sum + (line.amount ?? 0), 0);
  const paid = receipt ? charged : 0;
  const balance = charged - paid;

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_15rem]">
      <div className="overflow-hidden rounded-2xl border border-line-soft bg-white">
        <CardHead eyebrow={`Fee ledger · ${student.admissionNo}`} title={`${student.name} · ${classLabel(student)}`}>
          {fees.kind === "rte" ? (
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-gold">RTE seat</span>
          ) : null}
        </CardHead>
        <ul>
          {fees.lines.map((line) => (
            <li key={line.label} className="flex items-start justify-between gap-4 border-b border-line-soft px-4 py-3 text-sm">
              <span>
                <span className="block text-ink">{line.label}</span>
                {line.note ? <span className="mt-0.5 block text-xs text-ink-muted">{line.note}</span> : null}
              </span>
              <span className={cn("shrink-0 font-bold tabular-nums", line.amount !== null && line.amount < 0 ? "text-sage" : "text-ink")}>
                {line.amount === null ? "Not applied" : `${line.amount < 0 ? "−" : ""}${rupees.format(Math.abs(line.amount))}`}
              </span>
            </li>
          ))}
          {receipt ? (
            <li className="flex items-start justify-between gap-4 border-b border-line-soft px-4 py-3 text-sm">
              <span>
                <span className="block text-ink">Paid via UPI</span>
                <span className="mt-0.5 block text-xs text-ink-muted">Receipt {receipt}</span>
              </span>
              <span className="shrink-0 font-bold tabular-nums text-sage">−{rupees.format(paid)}</span>
            </li>
          ) : null}
        </ul>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-bold text-ink">Balance due</span>
          <span className="font-display text-xl font-extrabold tabular-nums text-ink">{rupees.format(balance)}</span>
        </div>
        {fees.kind === "regular" ? (
          <p className="border-t border-line-soft bg-paper px-4 py-2.5 text-xs leading-relaxed text-ink-muted">
            {fees.lateFeeRule} Concessions count only after approval.
          </p>
        ) : null}
      </div>

      <div aria-live="polite" className="flex flex-col justify-between gap-4 rounded-2xl border border-line-soft bg-teal-50 p-4">
        {fees.kind === "rte" ? (
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-sage">RTE 12(1)(c)</p>
            <p className="mt-2 font-display text-2xl font-extrabold text-ink">No fee due</p>
            <p className="mt-1 text-sm leading-snug text-ink-muted">
              Tuition is waived for this seat, which runs up to Class 8. The school claims reimbursement from the state.
            </p>
          </div>
        ) : receipt ? (
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-sage">{fees.instalment}</p>
            <p className="mt-2 flex items-center gap-2 font-display text-2xl font-extrabold text-ink">
              <CheckCircle2 aria-hidden="true" className="h-6 w-6 text-sage" /> Paid
            </p>
            <p className="mt-1 text-sm leading-snug text-ink-muted">UPI payment recorded. Receipt {receipt} is ready.</p>
          </div>
        ) : (
          <>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-sage">{fees.instalment}</p>
              <p className={cn("mt-2 font-display text-2xl font-extrabold", fees.overdue ? "text-amber-700" : "text-ink")}>
                {fees.overdue ? "Overdue" : "Pending"}
              </p>
              <p className="mt-1 text-sm leading-snug text-ink-muted">
                {fees.due} · {rupees.format(balance)}
              </p>
            </div>
            <Button size="sm" onClick={onPay}>
              Pay via UPI (demo)
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function AttendanceDesk({
  student,
  status,
  onChange,
}: {
  student: DemoStudent;
  status: RollStatus;
  onChange: (status: RollStatus) => void;
}) {
  const absent = student.othersAbsent + (status === "absent" ? 1 : 0);
  const present = student.classSize - absent;
  const rate = ((present / student.classSize) * 100).toFixed(1);
  const options: { id: RollStatus; label: string }[] = [
    { id: "present", label: "Present" },
    { id: "late", label: "Late" },
    { id: "absent", label: "Absent" },
  ];

  const message =
    status === "absent"
      ? `Namaste, ${student.name} was marked absent in ${classLabel(student)} at the 09:10 roll call today. If you were not expecting this, please contact the class teacher.`
      : status === "late"
        ? `Namaste, ${student.name} was marked late in ${classLabel(student)} at the 09:10 roll call today.`
        : null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl bg-forest p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/85">
          {classLabel(student)} · 09:10 roll call
        </p>
        <p className="mt-3 font-display text-4xl font-extrabold tabular-nums">
          {present} <span className="text-lg font-semibold text-white/75">/ {student.classSize} present</span>
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
          <div className="h-full rounded-full bg-gold transition-[width] duration-300" style={{ width: `${rate}%` }} />
        </div>
        <p className="mt-2 text-sm text-white/85">{rate}% present</p>
        <div role="group" aria-label={`Mark ${student.name}`} className="mt-4 flex flex-wrap gap-2">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={status === o.id}
              onClick={() => onChange(o.id)}
              className={cn(
                "min-h-10 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                status === o.id ? "border-gold bg-gold text-ink" : "border-white/40 text-white hover:bg-white/10"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-line-soft bg-teal-50 p-5">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-sage">
          <MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp alert preview
        </p>
        <div aria-live="polite" className="mt-4 rounded-2xl rounded-tl-sm bg-white p-3.5 text-sm leading-relaxed text-ink shadow-[var(--shadow-soft)]">
          {message ?? <span className="text-ink-muted">No alert. Guardians are messaged for absence or late arrival only.</span>}
          {message ? <span className="mt-1.5 block text-right text-xs text-ink-muted">Demo message · not sent</span> : null}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Alerts go only to guardians who have opted in. Real messages need an approved WhatsApp Business provider and
          approved message templates.
        </p>
      </div>
    </div>
  );
}

function MarksDesk({ student }: { student: DemoStudent }) {
  const rows = student.marks.map((m) => ({ ...m, total: m.internal + m.exam }));
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl border border-line-soft bg-white">
        <CardHead
          eyebrow={`Class ${student.classNumeral} · Term 1 (school-based, CBSE-style)`}
          title={`${student.name} · ${classLabel(student)}`}
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <caption className="sr-only">Scholastic areas, Term 1</caption>
            <thead>
              <tr className="border-b border-line-soft text-xs font-bold uppercase tracking-[0.06em] text-ink-muted">
                <th scope="col" className="px-4 py-2.5">Subject</th>
                <th scope="col" className="px-3 py-2.5 text-right">Internal / 20</th>
                <th scope="col" className="px-3 py-2.5 text-right">Term exam / 80</th>
                <th scope="col" className="px-3 py-2.5 text-right">Total / 100</th>
                <th scope="col" className="px-4 py-2.5">Grade</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.subject} className="border-b border-line-soft last:border-b-0">
                  <th scope="row" className="px-4 py-2.5 font-semibold text-ink">{row.subject}</th>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink">{row.internal}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-ink">{row.exam}</td>
                  <td className="px-3 py-2.5 text-right font-bold tabular-nums text-ink">{row.total}</td>
                  <td className="px-4 py-2.5">
                    <span className="inline-block rounded-lg bg-teal-100 px-2 py-0.5 font-bold text-teal-700">{cbseGrade(row.total)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-line-soft bg-paper px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-ink-muted">Co-scholastic areas (A–C)</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {student.coScholastic.map((c) => (
              <li key={c.area} className="rounded-full border border-line-soft bg-white px-3 py-1 text-sm text-ink">
                {c.area}: <span className="font-bold">{c.grade}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-ink-muted">
        Grades use CBSE&apos;s 8-point scale: A1 91–100, A2 81–90, B1 71–80, B2 61–70, C1 51–60, C2 41–50, D 33–40,
        E 32 and below. This is an illustrative school-based layout, not an official CBSE format.
      </p>
    </div>
  );
}

function TransportDesk({ routeStop, onNextStop }: { routeStop: number; onNextStop: () => void }) {
  const stops = ["School gate", "Market Circle", "Lake Road", "Green Park"];
  const points: [number, number][] = [
    [28, 148],
    [105, 92],
    [200, 103],
    [315, 36],
  ];
  const [bx, by] = points[routeStop];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="relative min-h-[190px] overflow-hidden rounded-2xl bg-teal-50 p-4">
        <svg viewBox="0 0 360 190" className="absolute inset-0 h-full w-full" role="img" aria-label={`Illustrative bus route. Bus at ${stops[routeStop]}.`}>
          <path d="M28 148 C84 142 87 56 153 67 S226 155 315 36" fill="none" className="stroke-teal-300" strokeWidth="5" strokeLinecap="round" />
          <path d="M28 148 C84 142 87 56 153 67 S226 155 315 36" fill="none" className="stroke-sage" strokeWidth="2" strokeDasharray="4 7" strokeLinecap="round" />
          {points.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === routeStop ? 9 : 6} className={cn("stroke-sage", i === routeStop ? "fill-amber-500" : "fill-paper-raised")} strokeWidth="3" />
          ))}
          <g transform={`translate(${bx - 10} ${by - 28})`} className="fill-forest">
            <rect width="23" height="14" rx="5" />
            <circle cx="5" cy="15" r="2.5" />
            <circle cx="18" cy="15" r="2.5" />
          </g>
        </svg>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-ink">Route 04 · demo</span>
      </div>
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-line-soft bg-white p-4">
        <div>
          <p className="text-sm font-bold text-ink">Green Line · Bus 08</p>
          <ol aria-live="polite" className="mt-3 space-y-2">
            {stops.map((stop, i) => (
              <li key={stop} className="flex items-center gap-2 text-sm">
                <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", i <= routeStop ? "bg-sage" : "bg-line-soft")} />
                <span className={i === routeStop ? "font-bold text-ink" : "text-ink-muted"}>{stop}</span>
                <span className="ml-auto text-ink-muted">
                  {i < routeStop ? "Passed" : i === routeStop ? "Now" : `${(i - routeStop) * 4 + 3} min`}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <Button size="sm" onClick={onNextStop}>
          Simulate next stop
        </Button>
      </div>
    </div>
  );
}

function SubstitutionDesk({ assigned, onAssign }: { assigned: boolean; onAssign: () => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-amber-700">Teacher on leave</p>
        <p className="mt-2 font-display text-lg font-bold text-ink">Ms. Kavita Sharma</p>
        <p className="mt-1 text-sm text-ink-muted">Mathematics · Class VIII-A · Period 4</p>
      </div>
      <div className="flex justify-center text-ink-muted">
        <ArrowRight aria-hidden="true" className="h-5 w-5 rotate-90 sm:rotate-0" />
      </div>
      <div className="rounded-2xl border border-line-soft bg-teal-50 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-sage">
          {assigned ? "Substitute assigned" : "Suggested substitute"}
        </p>
        <p className="mt-2 font-display text-lg font-bold text-ink">Mr. Rohan Desai</p>
        <p className="mt-1 text-sm text-ink-muted">Free in period 4 · no timetable clash</p>
      </div>
      <div aria-live="polite" className="sm:col-span-3">
        {assigned ? (
          <p className="flex items-center gap-2 rounded-xl bg-teal-50 px-4 py-3 text-sm font-semibold text-ink">
            <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-sage" />
            Assigned. The class timetable and the DigiBoard preview now show the change (demo).
          </p>
        ) : (
          <Button size="sm" className="w-full" onClick={onAssign}>
            Assign substitute (demo)
          </Button>
        )}
      </div>
    </div>
  );
}
