import {
  GraduationCap,
  Landmark,
  ClipboardList,
  Laptop2,
  BookOpen,
  MoreHorizontal,
  UserPlus,
  CalendarCheck2,
  CalendarClock,
  Wallet,
  MessagesSquare,
  Bus,
  Library,
  Users,
  ShieldCheck,
  Monitor,
  LayoutGrid,
  School,
  type LucideIcon,
} from "lucide-react";
import type { roleOptions, studentCountOptions, moduleOptions } from "@/lib/validation";

export const roleIcons: Record<(typeof roleOptions)[number], LucideIcon> = {
  "Principal / Head of School": GraduationCap,
  "Trustee / Management": Landmark,
  "Administrator / Registrar": ClipboardList,
  "IT Coordinator": Laptop2,
  Teacher: BookOpen,
  Other: MoreHorizontal,
};

export const studentCountMeta: Record<(typeof studentCountOptions)[number], { icon: LucideIcon; hint: string }> = {
  "Under 250": { icon: School, hint: "A single small campus" },
  "250 – 750": { icon: School, hint: "One or two sections per grade" },
  "750 – 1,500": { icon: School, hint: "A well-established school" },
  "1,500 – 3,000": { icon: School, hint: "A large, multi-section school" },
  "3,000+": { icon: School, hint: "A major institution or group" },
};

export const moduleIcons: Record<(typeof moduleOptions)[number], LucideIcon> = {
  "Admissions & Enrollment": UserPlus,
  Attendance: CalendarCheck2,
  "Timetable & Substitution": CalendarClock,
  "Assessment & Report Cards": GraduationCap,
  "Fees & Finance": Wallet,
  Communication: MessagesSquare,
  Transport: Bus,
  "Library & Inventory": Library,
  "HR & Staff": Users,
  "Child Safeguarding": ShieldCheck,
  "DigiBoard Signage": Monitor,
  "Full Suite": LayoutGrid,
};
