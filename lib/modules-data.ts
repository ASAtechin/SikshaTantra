/**
 * ERP module catalogue (W1-C). Copy describes how each module is DESIGNED to work: Shiksha Tantra is in
 * early access and the ERP modules are being built with founding schools (only the DigiBoard scheduling
 * and display foundation exists today). Keep wording to "designed to…", "planned" — never "live" claims.
 *
 * Backward-compatible fields: slug, icon, name, tag (internal code, no longer shown in UI), tagline,
 * summary, accent, mockup, steps, capabilities. Added: group, audience, indiaDetails, currentState.
 */
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
  FileSignature,
  KeyRound,
  UserCheck,
  Ban,
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
  MapPin,
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
  BellRing,
  Monitor,
  Clock3,
  Languages,
  Smartphone,
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Building2,
  IdCard,
  NotebookPen,
  ListChecks,
  Layers,
  Route,
  Navigation,
  Timer,
  FileSpreadsheet,
  IndianRupee,
  Camera,
  CalendarRange,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

/** Legacy hint for older consumers of ModuleMockup; each module now has its own mockup keyed by slug. */
export type MockupKind = "chart" | "calendar" | "ledger" | "shield" | "chat" | "cards";

export type ModuleGroup =
  | "Admissions & records"
  | "Academics"
  | "Fees & finance"
  | "Safety"
  | "Staff & operations"
  | "Leadership";

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
  /** Internal short code. Not shown in the UI; render `group` instead. */
  tag: string;
  group: ModuleGroup;
  /** Who in the school uses the module day to day. */
  audience: string;
  tagline: string;
  summary: string;
  accent: string;
  mockup: MockupKind;
  steps: ModuleStep[];
  capabilities: ModuleCapability[];
  /** "In Indian schools" scope bullets, worded as design/scope, not as shipped features. */
  indiaDetails: string[];
  /** Only set where something already exists today (the DigiBoard foundation). */
  currentState?: string;
}

export const moduleGroups: { name: ModuleGroup; description: string }[] = [
  {
    name: "Admissions & records",
    description: "Bringing a child into the school, and controlling who can see and change their record.",
  },
  {
    name: "Academics",
    description: "The daily academic cycle: attendance, the timetable, marks and report cards.",
  },
  {
    name: "Fees & finance",
    description: "Fee plans, collection, concessions and reconciliation with your accounts.",
  },
  {
    name: "Safety",
    description: "Getting children to school and home safely, and protecting them while they are with you.",
  },
  {
    name: "Staff & operations",
    description: "Parent communication, staff records, the library and school assets.",
  },
  {
    name: "Leadership",
    description: "What the principal and management need to see, and be able to trust.",
  },
];

export const modules: ModuleDetail[] = [
  {
    slug: "admissions-enrollment",
    icon: UserPlus,
    name: "Admissions & Enrollment",
    tag: "ADM",
    group: "Admissions & records",
    audience: "Admissions office, front desk and principal",
    tagline: "From first enquiry to an enrolled student, as one continuous record.",
    summary:
      "Designed to manage enquiries, online applications, document verification, interaction slots, quota and seat decisions, and certificates such as the TC and bonafide.",
    accent: "from-amber-400/20 to-amber-500/5",
    mockup: "cards",
    steps: [
      { icon: FileSignature, title: "Enquiry & application", desc: "Guardians apply online or at the front desk, and can save a draft." },
      { icon: ScanLine, title: "Document verification", desc: "Staff accept or return each document, with a remark." },
      { icon: CalendarDays, title: "Interaction & decision", desc: "Slots are scheduled; offers, waitlist and decisions are recorded with reasons." },
      { icon: FileCheck2, title: "Enrol & certify", desc: "Accepted applications become student records without re-entry." },
    ],
    capabilities: [
      { icon: FileSignature, label: "Online and walk-in applications" },
      { icon: ListChecks, label: "Document checklist you configure" },
      { icon: CalendarDays, label: "Interaction or entrance slots" },
      { icon: Layers, label: "Quota and sibling-priority rules" },
      { icon: ClipboardCheck, label: "Seat availability by class" },
      { icon: FileCheck2, label: "TC and bonafide certificates" },
    ],
    indiaDetails: [
      "Enquiry → application → document verification → interaction → offer → enrolment, tracked as one record per child.",
      "Document checklist set by your school: birth certificate, Aadhaar where applicable, the previous school's transfer certificate, address proof and photographs.",
      "Entrance test or interaction slots per class, with the panel's remarks recorded against the application.",
      "RTE 25% seats under Section 12(1)(c) kept as a separate category. Whether your state allots them centrally or the school runs the lottery, allotment and lottery records are designed to be kept for inspection.",
      "Sibling, staff-ward and other priority rules are set by your school, not fixed in the software.",
      "Transfer and bonafide certificates issued only after fee dues and library clearance are confirmed.",
    ],
  },
  {
    slug: "identity-access",
    icon: Fingerprint,
    name: "Identity & Access",
    tag: "IAM",
    group: "Admissions & records",
    audience: "School administrator, all staff and guardians",
    tagline: "Each person sees only what their role and relationship to the child allow.",
    summary:
      "Designed for OTP sign-in for parents, role-based staff access and separate permissions for each guardian, with every access change recorded.",
    accent: "from-brand-600/20 to-brand-600/5",
    mockup: "shield",
    steps: [
      { icon: KeyRound, title: "Sign in", desc: "Parents use a one-time password; staff use their own accounts." },
      { icon: UserCheck, title: "Scoped access", desc: "Staff see their classes; each guardian gets their own permissions." },
      { icon: Ban, title: "Change or remove", desc: "Access can be withdrawn when a role or relationship changes." },
      { icon: FileClock, title: "Recorded", desc: "Grants, changes and removals are kept in an access history." },
    ],
    capabilities: [
      { icon: Smartphone, label: "OTP sign-in for parents" },
      { icon: UserCog, label: "Role-based staff access" },
      { icon: UserCheck, label: "Permissions per guardian" },
      { icon: FileSignature, label: "Parental consent records" },
      { icon: Ban, label: "Access removal on exit" },
      { icon: FileClock, label: "Access-change history" },
    ],
    indiaDetails: [
      "Parents sign in with an OTP sent to their registered mobile number, so families do not share one password.",
      "Staff roles such as class teacher, subject teacher, accountant and principal see only what the role needs.",
      "Each guardian is set up separately: one may see fees and report cards, another only notices and pickup.",
      "Designed with the Digital Personal Data Protection Act, 2023 in mind: parents and students are data principals, and a child's data is processed with verifiable parental consent.",
      "Requests from a data principal to see or correct their data are designed to be logged and tracked to completion.",
      "A required second sign-in factor for sensitive staff roles such as fee and administrator accounts.",
      "Access is designed to end when a staff member leaves or a guardian relationship is removed.",
    ],
  },
  {
    slug: "attendance",
    icon: CalendarCheck2,
    name: "Attendance",
    tag: "ATT",
    group: "Academics",
    audience: "Class teachers, subject teachers, front office and parents",
    tagline: "Daily and period-wise attendance, with the same figure everywhere it appears.",
    summary:
      "Designed so a teacher marks a class in a few taps, and the same record flows to the parent, the report card and the principal's dashboard.",
    accent: "from-teal-500/20 to-teal-500/5",
    mockup: "chart",
    steps: [
      { icon: ScanLine, title: "Mark", desc: "The class teacher marks daily or period-wise attendance on a phone or computer." },
      { icon: BellRing, title: "Inform", desc: "Guardians who opted in receive an absence alert." },
      { icon: AlertTriangle, title: "Follow up", desc: "Unmarked registers and repeated absence are shown to the office." },
      { icon: FileCheck2, title: "Correct with history", desc: "A correction keeps the original entry and the reason." },
    ],
    capabilities: [
      { icon: CalendarCheck2, label: "Daily and period-wise registers" },
      { icon: Clock3, label: "Late arrivals" },
      { icon: CalendarX2, label: "Leave requests from parents" },
      { icon: Users, label: "Staff attendance" },
      { icon: BellRing, label: "Absence alerts to guardians" },
      { icon: DoorClosed, label: "Paper-register fallback" },
    ],
    indiaDetails: [
      "Daily attendance in the first period, plus period-wise marking for senior classes if your school uses it.",
      "Late arrivals recorded separately from absence, with the time of arrival.",
      "Parents can request leave in advance; approved leave shows as leave, not as an unexplained absence.",
      "Absence alerts to guardians on WhatsApp or SMS, sent only to guardians who opted in.",
      "Staff attendance alongside student attendance, feeding leave and substitution.",
      "If the network is down, teachers mark a paper register and enter it later; the late entry is recorded as such.",
      "Cumulative percentages for report cards and for checking board-exam attendance requirements, such as CBSE's 75% rule.",
    ],
  },
  {
    slug: "timetable-substitution",
    icon: CalendarClock,
    name: "Timetable & Substitution",
    tag: "CUR",
    group: "Academics",
    audience: "Timetable in-charge, academic coordinator and teachers",
    tagline: "Clash-checked timetables and quick substitutions, shown on campus screens.",
    summary:
      "Builds on the DigiBoard scheduling foundation: weekly timetables with conflict checks, and substitutions and room changes that appear on DigiBoard displays.",
    accent: "from-amber-400/20 to-teal-500/10",
    mockup: "calendar",
    currentState:
      "Working today in the DigiBoard foundation: weekly schedule editing, quick substitutions, room changes and schedule-conflict detection. The full ERP timetable builds on it.",
    steps: [
      { icon: CalendarDays, title: "Build", desc: "Periods, classes, teachers and rooms set up to your bell schedule." },
      { icon: Ban, title: "Check clashes", desc: "A teacher or room booked twice is flagged before publishing." },
      { icon: UserCog, title: "Substitute", desc: "Free teachers are suggested for an absent teacher's periods." },
      { icon: Monitor, title: "Display", desc: "Changes appear on DigiBoard screens and in teachers' views." },
    ],
    capabilities: [
      { icon: CalendarRange, label: "Bell schedules and period structures" },
      { icon: Ban, label: "Teacher and room clash checks" },
      { icon: Gauge, label: "Teacher load limits" },
      { icon: UserCog, label: "Substitution suggestions" },
      { icon: Monitor, label: "DigiBoard display updates" },
      { icon: FileClock, label: "Change history" },
    ],
    indiaDetails: [
      "Period structures you define, for example assembly, eight periods, short break and lunch, and Saturday half-days.",
      "Weekly period counts per subject per class, so each subject gets the periods your scheme of studies sets.",
      "Teacher load limits (periods per day and per week) checked while the timetable is built.",
      "Substitution for an absent teacher's periods, such as Period 4, suggests teachers who are free and under their load limit.",
      "Substitutions and room changes pushed to DigiBoard screens in corridors and staff rooms.",
      "Lab, library and games periods that need a particular room, or that combine sections.",
      "A separate exam-week timetable without losing the regular one.",
    ],
  },
  {
    slug: "assessment-report-cards",
    icon: GraduationCap,
    name: "Assessment & Report Cards",
    tag: "ASM",
    group: "Academics",
    audience: "Subject teachers, class teachers, exam coordinator and principal",
    tagline: "Your board's scheme set up once, and results locked before they are published.",
    summary:
      "Designed for mark entry against CBSE, CISCE or state-board schemes, co-scholastic grades, review before release, and report cards produced from locked results.",
    accent: "from-brand-600/20 to-amber-400/10",
    mockup: "chart",
    steps: [
      { icon: ClipboardList, title: "Configure", desc: "Terms, components, maximum marks and grade bands set for your board." },
      { icon: ClipboardCheck, title: "Enter marks", desc: "Missing and out-of-range marks are flagged as teachers enter them." },
      { icon: FileLock2, title: "Review & lock", desc: "After class-teacher and HOD review, results lock; later changes are recorded revisions." },
      { icon: FileCheck2, title: "Publish", desc: "Report cards are released to parents after approval." },
    ],
    capabilities: [
      { icon: GraduationCap, label: "CBSE, CISCE and state-board schemes" },
      { icon: SplitSquareHorizontal, label: "Scholastic and co-scholastic grades" },
      { icon: AlertTriangle, label: "Missing-mark checks" },
      { icon: FileLock2, label: "Locked, versioned results" },
      { icon: FileCheck2, label: "Report cards in your format" },
      { icon: FileSpreadsheet, label: "Board registration exports (planned)" },
    ],
    indiaDetails: [
      "Assessment schemes configured per school: CBSE periodic tests and term exams, CISCE, or your state board's pattern.",
      "Grade bands such as CBSE's eight-point A1–E scale, calculated from the marks so grade and marks match.",
      "Co-scholastic areas such as art education, health and physical education, and work education, graded on your school's scale.",
      "Holistic Progress Card in line with NEP 2020 and PARAKH guidance — planned.",
      "Board registration data exports, for example CBSE registration and the List of Candidates (LOC) — planned.",
      "APAAR ID stored on each student's record for board and government reporting.",
      "Class-teacher remarks, attendance and the promotion decision on the same report card.",
    ],
  },
  {
    slug: "fees-finance",
    icon: Wallet,
    name: "Fees & Finance",
    tag: "FIN",
    group: "Fees & finance",
    audience: "Accounts office, fee counter, principal and parents",
    tagline: "Fee plans, collections and receipts that reconcile to the rupee.",
    summary:
      "Designed for fee heads and instalments, concessions with approval, online payment through a payment gateway, counter collection, and receipts that match your accounts.",
    accent: "from-teal-500/20 to-brand-600/10",
    mockup: "ledger",
    steps: [
      { icon: Layers, title: "Set up", desc: "Fee heads, instalments, due dates and late-fee rules per class." },
      { icon: Receipt, title: "Collect", desc: "Parents pay online through a gateway; the counter takes cash and cheques." },
      { icon: SplitSquareHorizontal, title: "Approve", desc: "Concessions and waivers go to the approver your school names." },
      { icon: Landmark, title: "Reconcile", desc: "Gateway settlements and bank deposits matched to receipts." },
    ],
    capabilities: [
      { icon: Layers, label: "Fee heads and instalments" },
      { icon: Timer, label: "Late-fee rules" },
      { icon: PiggyBank, label: "Concessions with approval" },
      { icon: IndianRupee, label: "UPI and net banking via a gateway" },
      { icon: Receipt, label: "Receipts and fee certificates" },
      { icon: FileSpreadsheet, label: "Tally export" },
    ],
    indiaDetails: [
      "Fee heads such as tuition, transport, annual charges, lab and activity fees, with monthly, quarterly or term instalments.",
      "Late-fee rules your school sets, applied after the due date and waived only with approval.",
      "Sibling, staff-ward and merit concessions, each recorded with who approved it.",
      "RTE seats marked fee-waived, with tracking of the school's reimbursement claim to the state.",
      "Online payment by UPI, net banking and cards through a payment gateway, settled to the school's own bank account.",
      "A receipt for every payment, and annual tuition-fee certificates parents use for income-tax claims.",
      "Export to Tally for your accountant; GST applied only to items your CA marks as taxable, such as uniforms sold by the school.",
    ],
  },
  {
    slug: "communication",
    icon: MessagesSquare,
    name: "Communication",
    tag: "COM",
    group: "Staff & operations",
    audience: "Office staff, class teachers, principal and guardians",
    tagline: "Notices that reach the right parents, in a language they read.",
    summary:
      "Designed for class-wise notices and alerts over WhatsApp, SMS and app notifications, with delivery and read status, PTM scheduling and grievance tracking.",
    accent: "from-amber-400/20 to-brand-600/10",
    mockup: "chat",
    steps: [
      { icon: Megaphone, title: "Compose", desc: "Write once, and add a regional-language version if needed." },
      { icon: UserCheck, title: "Target", desc: "Whole school, a class, a section, a bus route or named guardians." },
      { icon: CheckCheck, title: "Track", desc: "Delivered and read status per channel, where the channel reports it." },
      { icon: Ticket, title: "Resolve", desc: "Parent concerns are logged as tickets with an owner." },
    ],
    capabilities: [
      { icon: MessagesSquare, label: "WhatsApp, SMS and app channels" },
      { icon: UserCheck, label: "Class, section and route targeting" },
      { icon: CheckCheck, label: "Delivery and read status" },
      { icon: Languages, label: "Regional-language notices" },
      { icon: CalendarDays, label: "PTM slot booking" },
      { icon: Ticket, label: "Grievance tracking" },
    ],
    indiaDetails: [
      "WhatsApp Business messages on approved templates, and SMS on DLT-registered templates and sender IDs, as TRAI rules require.",
      "Notices in English and the regional languages your parents read, such as Hindi, Kannada, Tamil or Marathi.",
      "Read receipts where the channel supports them (WhatsApp and the app); SMS reports delivery only.",
      "PTM scheduling: parents book a slot with the class teacher, and each teacher sees the day's list.",
      "Grievance tracking with an owner and a status, so a bus or fee complaint is not lost in a phone call.",
      "Circulars with acknowledgement for important notices such as a fee revision or exam schedule.",
      "Emergency alerts designed to reach guardians and DigiBoard screens together.",
    ],
  },
  {
    slug: "transport",
    icon: Bus,
    name: "Transport",
    tag: "OPS",
    group: "Safety",
    audience: "Transport in-charge, bus attendants, front office and parents",
    tagline: "Who boarded, who got off, and where the bus is.",
    summary:
      "Designed for routes and stops, boarding and alighting records, verified drivers and attendants, GPS device integration, and alerts for the office and parents.",
    accent: "from-teal-500/20 to-amber-400/10",
    mockup: "cards",
    steps: [
      { icon: Route, title: "Plan routes", desc: "Stops, timings, vehicle capacity and riders per route." },
      { icon: BadgeCheck, title: "Verify crew", desc: "Driver and attendant documents and police verification on file." },
      { icon: ScanLine, title: "Board & alight", desc: "Each child marked at their stop, morning and afternoon." },
      { icon: AlertTriangle, title: "Alert", desc: "Delays, missed stops and route deviations flagged to the office." },
    ],
    capabilities: [
      { icon: Route, label: "Routes, stops and riders" },
      { icon: ScanLine, label: "Boarding and alighting records" },
      { icon: BadgeCheck, label: "Driver and attendant verification" },
      { icon: MapPin, label: "GPS device integration" },
      { icon: Navigation, label: "Speed and route alerts" },
      { icon: FileClock, label: "Vehicle document expiry" },
    ],
    indiaDetails: [
      "Driver and attendant records with police verification, licence and badge details, and reminders before documents expire.",
      "A female attendant on buses where your state or board guidelines require one.",
      "Integration with the GPS device fitted to your buses, or your transport vendor's, for location and arrival times.",
      "Boarding and alighting marked per child per stop, by the attendant on a phone or by scanning ID cards.",
      "Speed and route-deviation alerts where the GPS device provides them.",
      "Vehicle fitness, permit, insurance and PUC dates tracked, in line with CBSE and state school-bus safety norms.",
      "Seat capacity per vehicle checked when riders are assigned.",
    ],
  },
  {
    slug: "library-inventory",
    icon: Library,
    name: "Library & Inventory",
    tag: "OPS",
    group: "Staff & operations",
    audience: "Librarian, lab assistants, store and accounts",
    tagline: "Every book copy and school asset, accounted for.",
    summary:
      "Designed for an accession register, copy-level issue and return, fines, stock verification, and an asset register for labs, sports and IT.",
    accent: "from-brand-600/20 to-teal-500/10",
    mockup: "cards",
    steps: [
      { icon: BookMarked, title: "Accession", desc: "Each copy gets an accession number and a shelf location." },
      { icon: RefreshCcw, title: "Issue & return", desc: "Issued to a student or staff member by ID card or barcode." },
      { icon: PackageSearch, title: "Verify stock", desc: "Periodic stock verification against the register." },
      { icon: FileCheck2, title: "Resolve", desc: "Lost or damaged items written off with approval." },
    ],
    capabilities: [
      { icon: BookMarked, label: "Accession register" },
      { icon: RefreshCcw, label: "Copy-level issue and return" },
      { icon: IndianRupee, label: "Overdue fines" },
      { icon: Boxes, label: "Reservations" },
      { icon: PackageSearch, label: "Stock verification" },
      { icon: ClipboardList, label: "Asset register" },
    ],
    indiaDetails: [
      "An accession register in the form libraries already keep: accession number, title, author, publisher, price and source (purchase or donation).",
      "Issue and return by copy, with borrowing limits per class that your librarian sets.",
      "Overdue fines at a rate your school sets, which can be collected at the fee counter.",
      "Annual stock verification that lists missing copies for the librarian to resolve.",
      "Library clearance checked before a transfer certificate is issued.",
      "An asset register for labs, sports, furniture and IT equipment, with location and condition.",
      "A book bank of textbook sets lent for the session, if your school runs one.",
    ],
  },
  {
    slug: "hr-staff",
    icon: Users,
    name: "HR & Staff",
    tag: "PSN",
    group: "Staff & operations",
    audience: "Principal, HR or administration office and accounts",
    tagline: "Staff records, checks, leave and payroll inputs in one place.",
    summary:
      "Designed so staff receive system and student access only after police verification and document checks, with leave linked to attendance and substitution.",
    accent: "from-amber-400/20 to-brand-600/10",
    mockup: "cards",
    steps: [
      { icon: ShieldCheck, title: "Check & onboard", desc: "Police verification and documents recorded before access is granted." },
      { icon: CalendarX2, title: "Leave", desc: "Leave requests approved and reflected in staff attendance." },
      { icon: UserCog, title: "Cover", desc: "Approved teacher leave creates substitution needs in the timetable." },
      { icon: Landmark, title: "Payroll inputs", desc: "Monthly inputs prepared for your payroll provider or accountant." },
    ],
    capabilities: [
      { icon: IdCard, label: "Staff records and documents" },
      { icon: BadgeCheck, label: "Police verification status" },
      { icon: CalendarX2, label: "Leave types and balances" },
      { icon: UserCog, label: "Leave linked to substitution" },
      { icon: FileSpreadsheet, label: "Payroll inputs (PF, ESI, PT, TDS)" },
      { icon: Ban, label: "Access removal on exit" },
    ],
    indiaDetails: [
      "Police verification certificate and document checks (qualifications, previous employment) recorded before system and student access is granted.",
      "Qualification records such as B.Ed. and CTET or TET where your board or state requires them.",
      "Leave types you define, such as CL, EL and ML, with balances per staff member.",
      "Approved teacher leave creates the day's substitution list in Timetable & Substitution.",
      "Monthly payroll inputs — attendance, leave without pay, PF, ESI, professional tax and TDS details — exported for your payroll provider or accountant. Shiksha Tantra does not run payroll itself.",
      "System access removed on the staff member's last working day.",
    ],
  },
  {
    slug: "child-safeguarding",
    icon: ShieldCheck,
    name: "Child Safeguarding",
    tag: "SFG",
    group: "Safety",
    audience: "Principal, child-protection committee, gate security and front office",
    tagline: "Built to support your school's child-protection duties, not to replace them.",
    summary:
      "Designed for authorised-pickup checks, a visitor log, separate consent records, and concern recording that escalates promptly, in line with the POCSO Act.",
    accent: "from-teal-500/20 to-amber-500/15",
    mockup: "shield",
    steps: [
      { icon: ScanLine, title: "Gate check", desc: "The person collecting a child is checked against the authorised list, with photo." },
      { icon: DoorClosed, title: "Visitor log", desc: "Visitors recorded with purpose, host, and time in and out." },
      { icon: FileSignature, title: "Consent", desc: "Photo, excursion and medical consents recorded separately." },
      { icon: ShieldAlert, title: "Record & escalate", desc: "Concerns are recorded and escalated straight away, without delaying a report to the police or SJPU." },
    ],
    capabilities: [
      { icon: Camera, label: "Authorised pickup list with photos" },
      { icon: DoorClosed, label: "Visitor log" },
      { icon: FileSignature, label: "Separate consent types" },
      { icon: ShieldAlert, label: "Concern recording and escalation" },
      { icon: HeartPulse, label: "Medical alerts for the staff who need them" },
      { icon: FileLock2, label: "Restricted access to sensitive records" },
    ],
    indiaDetails: [
      "POCSO Act, 2012: anyone who learns of a concern must report it to the police or the Special Juvenile Police Unit (SJPU). The system is designed to help record and escalate a concern; it must never hold a report back or require an approval before one is made.",
      "Case records for your school's POCSO or child-protection committee, with access limited to its members.",
      "Designed with NCPCR's guidance on the safety and security of children in schools, and CBSE's safety circulars, in mind.",
      "An authorised pickup list per child with photographs, so the guard can confirm identity at the gate.",
      "A visitor log with ID, purpose, person visited, and time in and out.",
      "Consent recorded separately for photographs and social media, excursions, and medical treatment.",
      "Staff complaints of sexual harassment go to the Internal Committee under the POSH Act, 2013, outside general HR access.",
    ],
  },
  {
    slug: "governance-analytics",
    icon: BarChart3,
    name: "Governance & Analytics",
    tag: "GOV",
    group: "Leadership",
    audience: "Principal, management, trust or society",
    tagline: "Figures your principal and management can trace back to the source.",
    summary:
      "Designed for principal and management dashboards, UDISE+ and APAAR data readiness, and an audit history of important changes.",
    accent: "from-brand-600/20 to-brand-600/5",
    mockup: "chart",
    steps: [
      { icon: BookOpen, title: "Define", desc: "Each metric has a written definition and scope." },
      { icon: LayoutDashboard, title: "Monitor", desc: "Principal and management dashboards, with drill-down to records." },
      { icon: ClipboardCheck, title: "Prepare returns", desc: "Data checked for gaps before UDISE+ and other returns." },
      { icon: FileClock, title: "Audit", desc: "Important changes kept in an audit history." },
    ],
    capabilities: [
      { icon: LayoutDashboard, label: "Principal dashboard" },
      { icon: BarChart3, label: "Management dashboard" },
      { icon: ClipboardCheck, label: "UDISE+ and APAAR readiness" },
      { icon: BookOpen, label: "Written metric definitions" },
      { icon: FileClock, label: "Audit history" },
      { icon: Building2, label: "Multi-campus roll-ups (planned)" },
    ],
    indiaDetails: [
      "UDISE+ data readiness: student, teacher and facility fields checked for gaps so the annual return is easier to prepare.",
      "APAAR ID coverage by class, so you know which students still need one.",
      "A principal dashboard for attendance, timetable gaps, results and pending approvals.",
      "A management dashboard for admissions, enrolment, fee collection and outstanding dues.",
      "Roll-ups across schools run by the same trust or society — planned.",
      "Audit history for changes to marks, fees, attendance and access.",
      "Reports exported to Excel or PDF for inspections and management meetings.",
    ],
  },
];

/** Further scope from the product specification. All planned; no dates are committed. */
export const plannedModules: { name: string; icon: LucideIcon; desc: string }[] = [
  {
    name: "Parent mobile app",
    icon: Smartphone,
    desc: "Attendance, homework, marks, fees, notices, bus route and leave requests, switching between children.",
  },
  {
    name: "Student portal",
    icon: GraduationCap,
    desc: "Own timetable, homework, marks and library, with age-appropriate access.",
  },
  {
    name: "Teacher portal",
    icon: NotebookPen,
    desc: "Today's periods, substitutions, attendance to mark, homework and marks entry.",
  },
  {
    name: "Principal & management portal",
    icon: LayoutDashboard,
    desc: "Dashboards, approvals and comparisons for school leaders.",
  },
  {
    name: "Student information system",
    icon: IdCard,
    desc: "One student record from admission to alumni: guardians, documents, health and history.",
  },
  {
    name: "Homework & assignments",
    icon: ClipboardList,
    desc: "Set, submit and review homework and assignments by class and subject.",
  },
  {
    name: "Examination management",
    icon: ClipboardCheck,
    desc: "Exam schedules, hall tickets, seating plans and invigilation duties.",
  },
  {
    name: "Promotion to new session",
    icon: RefreshCcw,
    desc: "Move classes into the next session while last year's records stay unchanged.",
  },
  {
    name: "Multi-campus management",
    icon: Building2,
    desc: "Several schools under one trust or society, with separate data and combined reports.",
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

/** Modules in the same group first, then the next modules in catalogue order. */
export function getRelatedModules(slug: string, count = 3): ModuleDetail[] {
  const mod = getModule(slug);
  if (!mod) return modules.slice(0, count);
  const sameGroup = modules.filter((m) => m.group === mod.group && m.slug !== slug);
  const others = getAdjacentModules(slug, modules.length).filter((m) => m.group !== mod.group);
  return [...sameGroup, ...others].slice(0, count);
}

export function getModulesByGroup(): { name: ModuleGroup; description: string; modules: ModuleDetail[] }[] {
  return moduleGroups.map((g) => ({ ...g, modules: modules.filter((m) => m.group === g.name) }));
}
