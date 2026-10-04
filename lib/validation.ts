import { z } from "zod";

export const moduleOptions = [
  "Admissions & Enrollment",
  "Attendance",
  "Timetable & Substitution",
  "Assessment & Report Cards",
  "Fees & Finance",
  "Communication",
  "Transport",
  "Library & Inventory",
  "HR & Staff",
  "Child Safeguarding",
  "DigiBoard Signage",
  "Full Suite",
] as const;

export const roleOptions = [
  "Principal / Head of School",
  "Trustee / Management",
  "Administrator / Registrar",
  "IT Coordinator",
  "Teacher",
  "Other",
] as const;

export const studentCountOptions = [
  "Under 250",
  "250 – 750",
  "750 – 1,500",
  "1,500 – 3,000",
  "3,000+",
] as const;

export const leadRequestSchema = z.object({
  schoolName: z.string().min(2, "School name is required").max(160),
  contactName: z.string().min(2, "Your name is required").max(120),
  role: z.enum(roleOptions),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+()\-\s]+$/, "Phone number contains invalid characters"),
  city: z.string().min(2, "City is required").max(120),
  studentCount: z.enum(studentCountOptions),
  modules: z.array(z.enum(moduleOptions)).min(1, "Select at least one area of interest"),
  message: z.string().max(2000).optional().or(z.literal("")),
  /** Honeypot field — real users never fill this in. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadRequestInput = z.infer<typeof leadRequestSchema>;
