import {
  UserPlus,
  Fingerprint,
  CalendarCheck2,
  CalendarClock,
  GraduationCap,
  Wallet,
  MessagesSquare,
  Bus,
  Library,
  Users,
  ShieldCheck,
  BarChart3,
  FileCheck2,
  ScanLine,
  Dices,
  FileSignature,
  KeyRound,
  UserCheck,
  Ban,
  Camera,
  ClipboardCheck,
  SplitSquareHorizontal,
  RefreshCcw,
  Megaphone,
  CheckCheck,
  Ticket,
  AlertTriangle,
  Receipt,
  Landmark,
  PiggyBank,
  CalendarX2,
  Inbox,
  MessageSquareWarning,
  MapPin,
  Radio,
  BusFront,
  BookMarked,
  PackageSearch,
  Boxes,
  UserCog,
  CalendarDays,
  FileLock2,
  DoorClosed,
  HeartPulse,
  Gauge,
  ShieldAlert,
  FileClock,
  type LucideIcon,
} from "lucide-react";

export type MockupKind = "chart" | "calendar" | "ledger" | "shield" | "chat" | "cards";

export interface ModuleStep {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ModuleCapability {
  icon: LucideIcon;
  label: string;
}

export interface ModuleDetail {
  slug: string;
  icon: LucideIcon;
  name: string;
  tag: string;
  tagline: string;
  summary: string;
  accent: string;
  mockup: MockupKind;
  steps: ModuleStep[];
  capabilities: ModuleCapability[];
}

export const modules: ModuleDetail[] = [
  {
    slug: "admissions-enrollment",
    icon: UserPlus,
    name: "Admissions & Enrollment",
    tag: "ADM",
    tagline: "From first enquiry to enrolled — with zero double-bookings.",
    summary: "Online applications, fair seat allocation, and instant transfer certificates.",
    accent: "from-amber-400/20 to-amber-500/5",
    mockup: "cards",
    steps: [
      { icon: FileSignature, title: "Apply Online", desc: "Guardian submits form + documents" },
      { icon: ScanLine, title: "Auto-Verify", desc: "Documents scanned & quota checked" },
      { icon: Dices, title: "Fair Allocation", desc: "Seats assigned, provably unbiased" },
      { icon: FileCheck2, title: "Instant TC", desc: "Transfer certificate in one click" },
    ],
    capabilities: [
      { icon: FileSignature, label: "Online applications" },
      { icon: ScanLine, label: "Document scanning" },
      { icon: Dices, label: "Quota & sibling priority" },
      { icon: Ban, label: "No double-booked seats" },
      { icon: FileCheck2, label: "Tamper-proof TC" },
      { icon: ClipboardCheck, label: "Waitlist automation" },
    ],
  },
  {
    slug: "identity-access",
    icon: Fingerprint,
    name: "Identity & Access",
    tag: "IAM",
    tagline: "Exactly the right access, for exactly the right person.",
    summary: "Role-based logins with independent, instantly revocable guardian permissions.",
    accent: "from-brand-600/20 to-brand-600/5",
    mockup: "shield",
    steps: [
      { icon: KeyRound, title: "Verified Login", desc: "MFA for every sensitive role" },
      { icon: UserCheck, title: "Scoped Access", desc: "Pickup, contact & data kept separate" },
      { icon: Ban, title: "Instant Revoke", desc: "One toggle removes access, live" },
      { icon: FileClock, title: "Full Trail", desc: "Every access change is logged" },
    ],
    capabilities: [
      { icon: KeyRound, label: "Mandatory MFA" },
      { icon: UserCheck, label: "Independent guardian roles" },
      { icon: Ban, label: "Instant revocation" },
      { icon: ShieldAlert, label: "Safeguarding-aware checks" },
      { icon: UserCog, label: "Staff vetting gate" },
      { icon: FileClock, label: "Immutable access log" },
    ],
  },
  {
    slug: "attendance",
    icon: CalendarCheck2,
    name: "Attendance",
    tag: "ATT",
    tagline: "One tap. Every number agrees, everywhere.",
    summary: "Live attendance that reconciles instantly across register, app, and report card.",
    accent: "from-teal-500/20 to-teal-500/5",
    mockup: "chart",
    steps: [
      { icon: ScanLine, title: "One-Tap Capture", desc: "Teacher marks the whole class" },
      { icon: RefreshCcw, title: "Auto-Reconcile", desc: "Every surface updates instantly" },
      { icon: AlertTriangle, title: "Flag Gaps", desc: "Missing registers surfaced, not hidden" },
      { icon: FileCheck2, title: "Audit Trail", desc: "Corrections never erase history" },
    ],
    capabilities: [
      { icon: ScanLine, label: "Daily & period-wise" },
      { icon: RefreshCcw, label: "Instant reconciliation" },
      { icon: DoorClosed, label: "Offline paper fallback" },
      { icon: FileCheck2, label: "Non-destructive corrections" },
      { icon: Gauge, label: "Live percentage reports" },
      { icon: AlertTriangle, label: "Missing-register alerts" },
    ],
  },
  {
    slug: "timetable-substitution",
    icon: CalendarClock,
    name: "Timetable & Substitution",
    tag: "CUR",
    tagline: "Conflict-free schedules, substitutes in one tap.",
    summary: "No double-bookings, and every change reflects live on DigiBoard displays.",
    accent: "from-amber-400/20 to-teal-500/10",
    mockup: "calendar",
    steps: [
      { icon: CalendarDays, title: "Build Timetable", desc: "Class, teacher & room, auto-checked" },
      { icon: Ban, title: "Zero Conflicts", desc: "Hard rules block any clash" },
      { icon: UserCog, title: "One-Tap Substitute", desc: "Absence covered in seconds" },
      { icon: Radio, title: "Live Everywhere", desc: "Every screen updates at once" },
    ],
    capabilities: [
      { icon: Ban, label: "No double-bookings" },
      { icon: UserCog, label: "Instant substitutes" },
      { icon: CalendarDays, label: "Multi-day delegation" },
      { icon: Radio, label: "Live DigiBoard sync" },
      { icon: ClipboardCheck, label: "Homework workflow" },
      { icon: FileClock, label: "Full change history" },
    ],
  },
  {
    slug: "assessment-report-cards",
    icon: GraduationCap,
    name: "Assessment & Report Cards",
    tag: "ASM",
    tagline: "Any board. Locked results. Zero tampering.",
    summary: "Multi-board grading with moderation and digitally signed report cards.",
    accent: "from-brand-600/20 to-amber-400/10",
    mockup: "chart",
    steps: [
      { icon: ClipboardCheck, title: "Enter Marks", desc: "Per board's own grading rules" },
      { icon: SplitSquareHorizontal, title: "Moderate", desc: "Statistical checks + grace marks" },
      { icon: FileLock2, title: "Lock Result", desc: "Tamper-evident, versioned" },
      { icon: FileCheck2, title: "Publish", desc: "Signed report card, instantly" },
    ],
    capabilities: [
      { icon: GraduationCap, label: "CBSE / ICSE / State boards" },
      { icon: SplitSquareHorizontal, label: "Statistical moderation" },
      { icon: FileLock2, label: "Locked, versioned results" },
      { icon: FileCheck2, label: "Digitally signed cards" },
      { icon: RefreshCcw, label: "Audited revisions only" },
      { icon: ClipboardCheck, label: "Board candidate export" },
    ],
  },
  {
    slug: "fees-finance",
    icon: Wallet,
    name: "Fees & Finance",
    tag: "FIN",
    tagline: "Every rupee traced, every month closed clean.",
    summary: "Online and counter payments reconciled automatically, to the rupee.",
    accent: "from-teal-500/20 to-brand-600/10",
    mockup: "ledger",
    steps: [
      { icon: Receipt, title: "Collect", desc: "Online, counter, cash or cheque" },
      { icon: RefreshCcw, title: "Reconcile", desc: "Matched same-day, automatically" },
      { icon: SplitSquareHorizontal, title: "Approve", desc: "Dual sign-off on concessions" },
      { icon: Landmark, title: "Close", desc: "Clean month-end, every time" },
    ],
    capabilities: [
      { icon: Receipt, label: "Online + counter payments" },
      { icon: RefreshCcw, label: "Same-day reconciliation" },
      { icon: PiggyBank, label: "Concessions & write-offs" },
      { icon: Landmark, label: "Bank reconciliation" },
      { icon: ClipboardCheck, label: "Cashier shift close" },
      { icon: FileClock, label: "Immutable receipts" },
    ],
  },
  {
    slug: "communication",
    icon: MessagesSquare,
    name: "Communication",
    tag: "COM",
    tagline: "The right message, to the right guardian, every time.",
    summary: "Targeted notices with delivery proof, plus structured grievance handling.",
    accent: "from-amber-400/20 to-brand-600/10",
    mockup: "chat",
    steps: [
      { icon: Megaphone, title: "Compose", desc: "Draft once, target precisely" },
      { icon: UserCheck, title: "Smart Audience", desc: "Only the correct guardians" },
      { icon: CheckCheck, title: "Delivery Proof", desc: "Sent, read & acknowledged" },
      { icon: Ticket, title: "Grievances", desc: "Tracked to resolution, not lost" },
    ],
    capabilities: [
      { icon: UserCheck, label: "Precise audience targeting" },
      { icon: CheckCheck, label: "Delivery & read receipts" },
      { icon: Ticket, label: "Grievance redressal" },
      { icon: MessageSquareWarning, label: "SLA-based escalation" },
      { icon: AlertTriangle, label: "Emergency broadcasts" },
      { icon: Inbox, label: "One inbox, every notice" },
    ],
  },
  {
    slug: "transport",
    icon: Bus,
    name: "Transport",
    tag: "OPS",
    tagline: "Every child accounted for, every single trip.",
    summary: "Boarding scans and capacity checks — because GPS alone isn't proof of safety.",
    accent: "from-teal-500/20 to-amber-400/10",
    mockup: "cards",
    steps: [
      { icon: Ban, title: "Capacity Check", desc: "Overloaded trips never dispatch" },
      { icon: ScanLine, title: "Board & Alight", desc: "Scanned per child, per stop" },
      { icon: AlertTriangle, title: "Missing-Child Alert", desc: "Escalates instantly, not silently" },
      { icon: MapPin, title: "Safe Close", desc: "Trip closes only when verified" },
    ],
    capabilities: [
      { icon: ScanLine, label: "Boarding/alighting scans" },
      { icon: Ban, label: "Certified capacity checks" },
      { icon: BusFront, label: "Mid-route rider changes" },
      { icon: DoorClosed, label: "Breakdown fallback" },
      { icon: MapPin, label: "Live route tracking" },
      { icon: AlertTriangle, label: "Safety-first escalation" },
    ],
  },
  {
    slug: "library-inventory",
    icon: Library,
    name: "Library & Inventory",
    tag: "OPS",
    tagline: "Every book, every asset — tracked, not guessed.",
    summary: "Issue, return, reserve, and resolve stock variance cleanly.",
    accent: "from-brand-600/20 to-teal-500/10",
    mockup: "cards",
    steps: [
      { icon: BookMarked, title: "Issue / Return", desc: "Copy-level, not just title-level" },
      { icon: Boxes, title: "Reserve", desc: "Hold queue for popular titles" },
      { icon: PackageSearch, title: "Count", desc: "Physical stock checked regularly" },
      { icon: FileCheck2, title: "Resolve", desc: "Variance owned, never ignored" },
    ],
    capabilities: [
      { icon: BookMarked, label: "Copy-level tracking" },
      { icon: Boxes, label: "Reservation queues" },
      { icon: PackageSearch, label: "Inventory variance resolution" },
      { icon: PiggyBank, label: "Configurable fines" },
      { icon: FileClock, label: "Full custody trail" },
      { icon: ClipboardCheck, label: "Asset + book tracking" },
    ],
  },
  {
    slug: "hr-staff",
    icon: Users,
    name: "HR & Staff",
    tag: "PSN",
    tagline: "Onboarding to exit — safeguarded at every step.",
    summary: "Staff records, leave, and payroll inputs, gated by mandatory safeguarding checks.",
    accent: "from-amber-400/20 to-brand-600/10",
    mockup: "cards",
    steps: [
      { icon: ShieldCheck, title: "Vet & Onboard", desc: "Background check before access" },
      { icon: CalendarX2, title: "Leave", desc: "Linked directly to attendance" },
      { icon: Landmark, title: "Payroll Input", desc: "Locked batches, traceable edits" },
      { icon: Ban, title: "Exit", desc: "Access revoked the same day" },
    ],
    capabilities: [
      { icon: ShieldCheck, label: "Safeguarding vetting gate" },
      { icon: CalendarX2, label: "Leave linked to attendance" },
      { icon: Landmark, label: "Payroll-input batches" },
      { icon: Ban, label: "Immediate exit revocation" },
      { icon: FileClock, label: "Traceable corrections" },
      { icon: UserCog, label: "Delegated substitute roles" },
    ],
  },
  {
    slug: "child-safeguarding",
    icon: ShieldCheck,
    name: "Child Safeguarding",
    tag: "SFG",
    tagline: "Our biggest differentiator. Not an afterthought.",
    summary: "Custody-aware gate checks, granular consent, and a sealed incident channel.",
    accent: "from-teal-500/20 to-amber-500/15",
    mockup: "shield",
    steps: [
      { icon: ScanLine, title: "Gate Check", desc: "Pickup verified against court orders" },
      { icon: FileSignature, title: "Granular Consent", desc: "Excursions, medical, media — separate" },
      { icon: FileLock2, title: "Sealed Reports", desc: "Visible only to Safeguarding Lead" },
      { icon: HeartPulse, title: "Medical Alerts", desc: "Actionable, never over-exposed" },
    ],
    capabilities: [
      { icon: ScanLine, label: "Court-order aware pickup" },
      { icon: FileSignature, label: "Independent consent types" },
      { icon: FileLock2, label: "Sealed incident reporting" },
      { icon: HeartPulse, label: "Actionable medical alerts" },
      { icon: Camera, label: "Consent-checked media" },
      { icon: FileClock, label: "24-hour escalation clock" },
    ],
  },
  {
    slug: "governance-analytics",
    icon: BarChart3,
    name: "Governance & Analytics",
    tag: "GOV",
    tagline: "Dashboards your Principal can actually trust.",
    summary: "Certified KPIs, gated releases, and an audit trail that's never silently altered.",
    accent: "from-brand-600/20 to-brand-600/5",
    mockup: "chart",
    steps: [
      { icon: FileCheck2, title: "Certify Metrics", desc: "Definitions locked before display" },
      { icon: Gauge, title: "One Number", desc: "Dashboard, report & export agree" },
      { icon: ShieldAlert, title: "Gate Every Release", desc: "Evidence required, not assumed" },
      { icon: FileLock2, title: "Preserve History", desc: "Nothing silently deleted" },
    ],
    capabilities: [
      { icon: Gauge, label: "Certified, consistent KPIs" },
      { icon: ShieldAlert, label: "Gated release discipline" },
      { icon: FileLock2, label: "Honest, permanent audit trail" },
      { icon: FileCheck2, label: "Data-subject request handling" },
      { icon: RefreshCcw, label: "Evidence-based completion" },
      { icon: BarChart3, label: "Real-time school-wide view" },
    ],
  },
];

export function getModule(slug: string): ModuleDetail | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getAdjacentModules(slug: string, count = 3): ModuleDetail[] {
  const idx = modules.findIndex((m) => m.slug === slug);
  if (idx === -1) return modules.slice(0, count);
  const rest = [...modules.slice(idx + 1), ...modules.slice(0, idx)];
  return rest.slice(0, count);
}
