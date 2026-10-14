/**
 * ModuleMockup (W1-C): one labelled, illustrative mini-screen per ERP module, keyed by slug.
 * Static markup (no client JS, nothing hidden before hydration). All data is fictional and the
 * figure says so. Charts use explicit pixel heights so bars never collapse. Minimum text 12px.
 */
import type { ReactNode } from "react";
import { Check, Minus, Clock3, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import type { MockupKind } from "@/lib/modules-data";
import { cn } from "@/lib/utils";

interface ModuleMockupProps {
  /** Module slug; selects that module's own mock screen. */
  slug?: string;
  /** Legacy: used only when `slug` is not given. */
  kind?: MockupKind;
  accent?: string;
  className?: string;
}

type Tone = "ok" | "warn" | "alert" | "neutral" | "dark";

const toneClasses: Record<Tone, string> = {
  ok: "bg-teal-50 text-teal-700 ring-teal-700/15",
  warn: "bg-amber-50 text-amber-700 ring-amber-700/20",
  alert: "bg-red-50 text-red-700 ring-red-700/20",
  neutral: "bg-brand-50 text-brand-800 ring-brand-800/10",
  dark: "bg-brand-950 text-white ring-brand-950",
};

function Chip({ tone = "neutral", children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

function Stat({ value, label, tone }: { value: string; label: string; tone?: Tone }) {
  return (
    <div className={cn("rounded-xl px-2 py-2 text-center", tone ? toneClasses[tone] : "bg-paper")}>
      <p className="font-display text-lg font-bold leading-none">{value}</p>
      <p className={cn("mt-1 text-xs font-medium", tone ? "" : "text-ink-muted")}>{label}</p>
    </div>
  );
}

function Row({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2", className)}>
      {children}
    </div>
  );
}

function Meter({ value, max, label }: { value: number; max: number; label: string }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-semibold text-ink">{label}</span>
        <span className="font-semibold text-ink-muted">
          {value} of {max}
        </span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-brand-100">
        <div className="h-full rounded-full bg-brand-600" style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  );
}

/** Bar chart with explicit pixel heights, value labels and axis labels. Axis starts at 0. */
function BarChart({
  title,
  data,
  max = 100,
  height = 104,
}: {
  title: string;
  data: { label: string; value: number; highlight?: boolean }[];
  max?: number;
  height?: number;
}) {
  const plot = height - 20;
  return (
    <div>
      <p className="text-xs font-semibold text-ink-muted">{title}</p>
      <div className="mt-2 flex items-end gap-2 border-b border-line-soft" style={{ height }}>
        {data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center justify-end gap-1">
            <span className="text-xs font-semibold text-ink">{d.value}</span>
            <div
              className={cn("w-full max-w-10 rounded-t-md", d.highlight ? "bg-amber-600" : "bg-brand-400")}
              style={{ height: Math.max(4, Math.round((d.value / max) * plot)) }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-2">
        {data.map((d) => (
          <span
            key={d.label}
            className={cn("flex-1 text-center text-xs", d.highlight ? "font-bold text-ink" : "text-ink-muted")}
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Yes() {
  return <Check className="mx-auto h-4 w-4 text-teal-700" strokeWidth={2.5} />;
}
function No() {
  return <Minus className="mx-auto h-4 w-4 text-ink-subtle" />;
}

interface Screen {
  title: string;
  subtitle: string;
  /** Plain-language description for screen readers. */
  description: string;
  body: ReactNode;
}

const screens: Record<string, Screen> = {
  "admissions-enrollment": {
    title: "Admissions · next session",
    subtitle: "Application APP-0217 · Class IV",
    description:
      "An admissions screen showing an enquiry-to-offer funnel and one Class IV application with its document checks and interaction slot.",
    body: (
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-1.5">
          <Stat value="142" label="Enquiries" />
          <Stat value="96" label="Applied" />
          <Stat value="71" label="Verified" />
          <Stat value="48" label="Offers" />
        </div>
        <div className="rounded-2xl border border-line-soft p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold text-ink">Ananya R. · Class IV</p>
            <Chip>Sibling in V-B</Chip>
          </div>
          <div className="mt-2 space-y-1.5 text-xs">
            <Row>
              <span className="text-ink">Birth certificate</span>
              <Chip tone="ok">Verified</Chip>
            </Row>
            <Row>
              <span className="text-ink">Report card, Class III</span>
              <Chip tone="ok">Verified</Chip>
            </Row>
            <Row>
              <span className="text-ink">Transfer certificate (previous school)</span>
              <Chip tone="warn">Awaited</Chip>
            </Row>
            <Row>
              <span className="text-ink">Interaction slot</span>
              <Chip tone="dark">Sat · 10:30 am</Chip>
            </Row>
          </div>
        </div>
        <p className="text-xs text-ink-muted">RTE 12(1)(c) seats are tracked as a separate category.</p>
      </div>
    ),
  },

  "identity-access": {
    title: "Guardian access",
    subtitle: "Ishaan M. · Class VI-B · Roll 14",
    description:
      "A permissions table for one student's three guardians, showing who can see report cards and fees, collect the child and receive notices.",
    body: (
      <div className="space-y-3">
        <table className="w-full table-fixed text-xs">
          <thead>
            <tr className="text-ink-muted">
              <th className="w-[34%] pb-2 text-left font-semibold">Guardian</th>
              <th className="pb-2 font-semibold">Reports</th>
              <th className="pb-2 font-semibold">Fees</th>
              <th className="pb-2 font-semibold">Pickup</th>
              <th className="pb-2 font-semibold">Notices</th>
            </tr>
          </thead>
          <tbody className="text-ink">
            {[
              { name: "Priya", rel: "Mother", p: [true, true, true, true] },
              { name: "Rahul", rel: "Father", p: [true, true, true, true] },
              { name: "Kamala", rel: "Grandmother", p: [false, false, true, true] },
            ].map((g) => (
              <tr key={g.name} className="border-t border-line-soft">
                <td className="py-2">
                  <span className="block font-semibold">{g.name}</span>
                  <span className="block text-ink-muted">{g.rel}</span>
                </td>
                {g.p.map((v, i) => (
                  <td key={i} className="py-2 text-center">
                    {v ? <Yes /> : <No />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-wrap gap-1.5">
          <Chip tone="ok">OTP sign-in · registered mobile</Chip>
          <Chip tone="ok">Parental consent recorded</Chip>
          <Chip>Class teacher: VI-B only</Chip>
        </div>
      </div>
    ),
  },

  attendance: {
    title: "Attendance · Class VIII-A",
    subtitle: "Saturday · 42 students",
    description:
      "A class attendance screen: 38 present, 1 late, 2 absent and 1 on leave today, a weekly chart of percentage present, and an absence alert queued for a guardian.",
    body: (
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-1.5">
          <Stat value="38" label="Present" tone="ok" />
          <Stat value="1" label="Late" tone="warn" />
          <Stat value="2" label="Absent" tone="alert" />
          <Stat value="1" label="Leave" />
        </div>
        <BarChart
          title="This week · % present (late counts as present)"
          data={[
            { label: "Mon", value: 95 },
            { label: "Tue", value: 93 },
            { label: "Wed", value: 98 },
            { label: "Thu", value: 90 },
            { label: "Fri", value: 95 },
            { label: "Sat", value: 93, highlight: true },
          ]}
        />
        <Row>
          <span className="text-xs text-ink">Roll 17 absent · alert to guardian</span>
          <Chip tone="warn">WhatsApp · opted in</Chip>
        </Row>
      </div>
    ),
  },

  "timetable-substitution": {
    title: "Timetable · Class VII-C",
    subtitle: "Tuesday · Period 4 needs cover",
    description:
      "A day timetable for Class VII-C where the Period 4 Science teacher is on leave and a free teacher is suggested as substitute, with the change sent to DigiBoard screens.",
    body: (
      <div className="space-y-1.5 text-xs">
        {[
          { p: "P1", t: "8:00", s: "English", who: "Ms. Fernandes" },
          { p: "P2", t: "8:40", s: "Mathematics", who: "Mr. Rao" },
          { p: "P3", t: "9:20", s: "Hindi", who: "Mrs. Sharma" },
        ].map((r) => (
          <Row key={r.p}>
            <span className="flex min-w-0 items-center gap-2 text-ink">
              <span className="w-6 font-bold">{r.p}</span>
              <span className="w-10 text-ink-muted">{r.t}</span>
              <span className="truncate font-semibold">{r.s}</span>
            </span>
            <span className="truncate text-ink-muted">{r.who}</span>
          </Row>
        ))}
        <p className="px-3 py-1 text-ink-muted">Short break · 10:00–10:15</p>
        <div className="rounded-xl border-2 border-amber-600 bg-amber-50 px-3 py-2">
          <div className="flex items-center justify-between gap-2 text-ink">
            <span className="flex min-w-0 items-center gap-2">
              <span className="w-6 font-bold">P4</span>
              <span className="w-10 text-ink-muted">10:15</span>
              <span className="font-semibold">Science</span>
            </span>
            <Chip tone="warn">Ms. Kavya on leave</Chip>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-1 text-ink">
              <ArrowRight className="h-3.5 w-3.5 text-amber-700" />
              <span>
                <span className="font-semibold">Mr. Arjun N.</span> · free in P4 · 5 of 7 periods today
              </span>
            </span>
            <Chip tone="ok">Assigned</Chip>
          </div>
        </div>
        <Row>
          <span className="flex items-center gap-2 text-ink">
            <span className="w-6 font-bold">P5</span>
            <span className="w-10 text-ink-muted">10:55</span>
            <span className="font-semibold">Social Science</span>
          </span>
          <span className="text-ink-muted">Mr. Das</span>
        </Row>
        <div className="pt-1">
          <Chip tone="dark">Sent to DigiBoard · Corridor B, staff room</Chip>
        </div>
      </div>
    ),
  },

  "assessment-report-cards": {
    title: "Marks · VIII-A · Mathematics",
    subtitle: "Half-yearly exam · out of 100",
    description:
      "A mark-entry table for four students with CBSE-style grades matching their marks, one mark flagged as missing so the result cannot be locked, and a co-scholastic row.",
    body: (
      <div className="space-y-3">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-ink-muted">
              <th className="pb-2 text-left font-semibold">Roll</th>
              <th className="pb-2 text-left font-semibold">Student</th>
              <th className="pb-2 text-right font-semibold">Marks</th>
              <th className="pb-2 text-right font-semibold">Grade</th>
            </tr>
          </thead>
          <tbody className="text-ink">
            {[
              { r: "01", n: "Aarav S.", m: "94", g: "A1" },
              { r: "02", n: "Bhavya K.", m: "83", g: "A2" },
              { r: "03", n: "Chirag P.", m: "76", g: "B1" },
            ].map((s) => (
              <tr key={s.r} className="border-t border-line-soft">
                <td className="py-1.5">{s.r}</td>
                <td className="py-1.5 font-semibold">{s.n}</td>
                <td className="py-1.5 text-right">{s.m}</td>
                <td className="py-1.5 text-right font-bold">{s.g}</td>
              </tr>
            ))}
            <tr className="border-t border-line-soft">
              <td className="py-1.5">04</td>
              <td className="py-1.5 font-semibold">Divya N.</td>
              <td className="py-1.5 text-right" colSpan={2}>
                <Chip tone="alert">Missing</Chip>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-ink-muted">Grade bands: A1 91–100 · A2 81–90 · B1 71–80 · B2 61–70 · C1 51–60</p>
        <Row>
          <span className="text-xs text-ink">
            <span className="font-semibold">Co-scholastic (Aarav S.)</span> · Art A · Health &amp; PE A · Work Ed. B
          </span>
        </Row>
        <div className="flex flex-wrap gap-1.5">
          <Chip tone="warn">Not locked · 1 mark missing</Chip>
          <Chip>HOD review next</Chip>
        </div>
      </div>
    ),
  },

  "fees-finance": {
    title: "Fee ledger · Adm. no. 2381",
    subtitle: "Riya S. · Class V-A · Instalment 2",
    description:
      "A student fee ledger: tuition and transport paid by UPI after a 10% sibling concession, annual charges of 6,000 rupees still due, and the paid and balance totals.",
    body: (
      <div className="space-y-3 text-xs">
        <div className="space-y-1.5">
          <Row>
            <span className="text-ink">Tuition fee · Q2</span>
            <span className="flex items-center gap-2">
              <span className="font-semibold text-ink">₹14,500</span>
              <Chip tone="ok">Paid · UPI</Chip>
            </span>
          </Row>
          <Row>
            <span className="text-ink">Sibling concession 10%</span>
            <span className="flex items-center gap-2">
              <span className="font-semibold text-ink">−₹1,450</span>
              <Chip>Approved</Chip>
            </span>
          </Row>
          <Row>
            <span className="text-ink">Transport · Route 4</span>
            <span className="flex items-center gap-2">
              <span className="font-semibold text-ink">₹3,200</span>
              <Chip tone="ok">Paid · UPI</Chip>
            </span>
          </Row>
          <Row>
            <span className="text-ink">Annual charges</span>
            <span className="flex items-center gap-2">
              <span className="font-semibold text-ink">₹6,000</span>
              <Chip tone="warn">Due</Chip>
            </span>
          </Row>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <Stat value="₹22,250" label="Payable" />
          <Stat value="₹16,250" label="Paid" tone="ok" />
          <Stat value="₹6,000" label="Balance" tone="warn" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip>Receipt R-0817 issued</Chip>
          <Chip>Late fee after due date · school rule</Chip>
        </div>
      </div>
    ),
  },

  communication: {
    title: "Notice · Class VI parents",
    subtitle: "Parent–teacher meeting",
    description:
      "A PTM notice to Class VI parents in English and Hindi, delivery counts by WhatsApp, SMS and app, and an open grievance ticket about a late bus.",
    body: (
      <div className="space-y-3 text-xs">
        <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-paper px-3 py-2 text-sm text-ink">
          PTM for Class VI on Saturday, 9 am–12 noon. Please book a 10-minute slot with the class teacher.
        </div>
        <div lang="hi" className="max-w-[92%] rounded-2xl rounded-tl-sm bg-paper px-3 py-2 text-sm text-ink">
          कक्षा 6 की अभिभावक-शिक्षक बैठक शनिवार सुबह 9 से 12 बजे तक है। कृपया अपना स्लॉट बुक करें।
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <Stat value="84" label="Sent" />
          <Stat value="81" label="Delivered" tone="ok" />
          <Stat value="58" label="Read" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip>WhatsApp 61</Chip>
          <Chip>SMS · DLT template 20</Chip>
          <Chip>App 3</Chip>
        </div>
        <Row>
          <span className="min-w-0 text-ink">
            <span className="font-semibold">GRV-031</span> · Bus late, Route 4 · Transport in-charge
          </span>
          <Chip tone="warn">Open</Chip>
        </Row>
      </div>
    ),
  },

  transport: {
    title: "Route 4 · Morning trip",
    subtitle: "Bus 4 · 34 riders · 40 seats",
    description:
      "A bus route screen with crew verification status, the stops with boarding counts and times, and GPS speed and status.",
    body: (
      <div className="space-y-3 text-xs">
        <div className="flex flex-wrap gap-1.5">
          <Chip tone="ok">
            <ShieldCheck className="h-3.5 w-3.5" /> Driver · police verified
          </Chip>
          <Chip tone="ok">
            <ShieldCheck className="h-3.5 w-3.5" /> Female attendant · police verified
          </Chip>
        </div>
        <ol className="space-y-1.5">
          {[
            { t: "7:05", s: "Jayanagar 4th Block", c: "6 of 6 boarded", tone: "ok" as Tone },
            { t: "7:18", s: "BTM Layout", c: "5 of 6 · 1 on leave", tone: "neutral" as Tone },
            { t: "7:31", s: "HSR Layout Sector 2", c: "Arriving", tone: "dark" as Tone },
            { t: "7:55", s: "School gate", c: "Alighting scan", tone: "neutral" as Tone },
          ].map((stop) => (
            <li key={stop.s}>
              <Row>
                <span className="flex min-w-0 items-center gap-2 text-ink">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                  <span className="w-9 shrink-0 text-ink-muted">{stop.t}</span>
                  <span className="truncate font-semibold">{stop.s}</span>
                </span>
                <Chip tone={stop.tone}>{stop.c}</Chip>
              </Row>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-1.5">
          <Chip>GPS device · 38 km/h</Chip>
          <Chip tone="ok">On planned route</Chip>
        </div>
      </div>
    ),
  },

  "library-inventory": {
    title: "Library · issue desk",
    subtitle: "Accession register",
    description:
      "A library screen with three book copies by accession number (issued, overdue with a fine, reserved), a stock-verification meter and a lab asset count.",
    body: (
      <div className="space-y-3 text-xs">
        <div className="space-y-1.5">
          <Row>
            <span className="min-w-0 text-ink">
              <span className="font-semibold">Acc. 10482</span> · Panchatantra tales
              <span className="block text-ink-muted">Roll 12, VII-B</span>
            </span>
            <Chip>Due in 3 days</Chip>
          </Row>
          <Row>
            <span className="min-w-0 text-ink">
              <span className="font-semibold">Acc. 08817</span> · Science, Class VIII
              <span className="block text-ink-muted">Roll 05, VIII-A</span>
            </span>
            <Chip tone="warn">4 days late · ₹8</Chip>
          </Row>
          <Row>
            <span className="min-w-0 text-ink">
              <span className="font-semibold">Acc. 11203</span> · School atlas
              <span className="block text-ink-muted">Roll 22, IX-C</span>
            </span>
            <Chip tone="ok">Reserved</Chip>
          </Row>
        </div>
        <div className="rounded-xl bg-paper p-3">
          <Meter label="Stock check · shelf 500–599" value={212} max={215} />
          <p className="mt-1.5 text-ink-muted">3 copies to resolve with the librarian</p>
        </div>
        <Row>
          <span className="text-ink">Physics lab · vernier callipers</span>
          <Chip tone="ok">24 of 24</Chip>
        </Row>
      </div>
    ),
  },

  "hr-staff": {
    title: "Staff onboarding · TGT Science",
    subtitle: "Meera J. · joining checks",
    description:
      "A staff onboarding checklist with police verification and certificates, one document awaited so student-record access stays on hold, a leave-to-substitution link and payroll inputs.",
    body: (
      <div className="space-y-3 text-xs">
        <div className="space-y-1.5">
          <Row>
            <span className="text-ink">Police verification certificate</span>
            <Chip tone="ok">Received</Chip>
          </Row>
          <Row>
            <span className="text-ink">Degree and B.Ed. certificates</span>
            <Chip tone="ok">Verified</Chip>
          </Row>
          <Row>
            <span className="text-ink">CTET certificate</span>
            <Chip tone="ok">Verified</Chip>
          </Row>
          <Row>
            <span className="text-ink">Relieving letter, previous school</span>
            <Chip tone="warn">Awaited</Chip>
          </Row>
        </div>
        <div className="rounded-xl border-2 border-amber-600 bg-amber-50 px-3 py-2 font-semibold text-amber-800">
          Student-record access on hold until all checks are complete
        </div>
        <Row>
          <span className="min-w-0 text-ink">Ms. Kavya · CL · Tuesday</span>
          <Chip>Period 4 cover created</Chip>
        </Row>
        <div className="flex flex-wrap gap-1.5">
          <Chip tone="dark">Payroll inputs</Chip>
          <Chip>Attendance &amp; LWP</Chip>
          <Chip>PF · ESI · PT · TDS</Chip>
        </div>
      </div>
    ),
  },

  "child-safeguarding": {
    title: "Gate · afternoon dispersal",
    subtitle: "Pickup check · 2:45 pm",
    description:
      "A gate screen: one child collected by a person on the authorised list after a photo check, one child kept in school because the person was not on the list, a visitor log entry and excursion consent progress.",
    body: (
      <div className="space-y-3 text-xs">
        <div className="flex items-center gap-3 rounded-xl bg-teal-50 p-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
            SK
          </span>
          <span className="min-w-0 text-ink">
            <span className="block font-semibold">Diya K., II-A → Suresh K. (uncle)</span>
            <span className="block text-teal-700">On authorised list · photo checked by guard</span>
          </span>
        </div>
        <div className="rounded-xl bg-red-50 p-3 text-ink">
          <span className="block font-semibold">Roll 09, I-B · person not on authorised list</span>
          <span className="block text-red-700">Child kept in school · parent being called</span>
        </div>
        <Row>
          <span className="min-w-0 text-ink">
            <span className="font-semibold">Visitor V-112</span> · Textbook vendor → Accounts
          </span>
          <Chip>In 1:10 pm</Chip>
        </Row>
        <div className="rounded-xl bg-paper p-3">
          <Meter label="Planetarium visit, Class V · consents" value={31} max={34} />
        </div>
      </div>
    ),
  },

  "governance-analytics": {
    title: "Principal dashboard",
    subtitle: "This week · as of 9:00 am",
    description:
      "A principal dashboard with weekly attendance, term fee collection and pending approvals, a bar chart of attendance by class, and UDISE+ and APAAR readiness.",
    body: (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-1.5">
          <Stat value="94%" label="Attendance" />
          <Stat value="78%" label="Term fees in" />
          <Stat value="6" label="Approvals" tone="warn" />
        </div>
        <BarChart
          title="Attendance by class this week (%)"
          data={[
            { label: "VI", value: 95 },
            { label: "VII", value: 93 },
            { label: "VIII", value: 92 },
            { label: "IX", value: 89, highlight: true },
            { label: "X", value: 96 },
          ]}
        />
        <div className="flex flex-wrap gap-1.5">
          <Chip tone="warn">UDISE+ · 3 fields to complete</Chip>
          <Chip>APAAR IDs · 412 of 438</Chip>
        </div>
      </div>
    ),
  },
};

const legacyKindToSlug: Record<MockupKind, string> = {
  chart: "attendance",
  calendar: "timetable-substitution",
  ledger: "fees-finance",
  shield: "identity-access",
  chat: "communication",
  cards: "admissions-enrollment",
};

export function ModuleMockup({ slug, kind = "cards", accent, className }: ModuleMockupProps) {
  const screen = screens[slug ?? ""] ?? screens[legacyKindToSlug[kind]];
  return (
    <figure className={cn("relative isolate mx-auto w-full max-w-xl select-none", className)}>
      {accent ? (
        <div
          aria-hidden="true"
          className={cn("pointer-events-none absolute -inset-6 -z-10 animate-blob bg-gradient-to-br blur-3xl", accent)}
        />
      ) : null}
      <div
        aria-hidden="true"
        className="rounded-3xl border border-line-soft bg-white p-4 shadow-[var(--shadow-lift)] sm:p-5"
      >
        <div className="flex items-start justify-between gap-3 border-b border-line-soft pb-3">
          <div className="min-w-0">
            <p className="font-display text-sm font-bold text-ink">{screen.title}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted">
              <Clock3 className="h-3 w-3 shrink-0" />
              {screen.subtitle}
            </p>
          </div>
          <Chip tone="warn">Illustrative</Chip>
        </div>
        <div className="mt-3">{screen.body}</div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink-muted">
        Illustrative screen with fictional data. The final design is shaped with founding schools.
        <span className="sr-only"> {screen.description}</span>
      </figcaption>
    </figure>
  );
}
