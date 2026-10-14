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
  "Identity & Access",
  "Governance & Analytics",
  "DigiBoard Signage",
  "Learning library",
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

export const boardOptions = ["CBSE", "CISCE (ICSE/ISC)", "State board", "IB/Cambridge", "Other"] as const;

export const campusOptions = ["1", "2–3", "4–10", "More than 10"] as const;

export const currentSystemOptions = ["Paper & Excel", "Another ERP", "Mixed", "Not sure"] as const;

export const goLiveOptions = ["This term", "Next academic session", "Just exploring"] as const;

export const contactPreferenceOptions = ["Phone", "WhatsApp", "Email"] as const;

/** Current-system answers that make the optional "which ERP?" text box relevant. */
export const currentSystemNeedsErpName: readonly (typeof currentSystemOptions)[number][] = ["Another ERP", "Mixed"];

const requiredText = (label: string, max: number) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(2, { error: `${label} is required` })
    .max(max, { error: `Keep this under ${max} characters` });

const optionalText = (max: number) =>
  z.string().trim().max(max, { error: `Keep this under ${max} characters` }).optional();

export const leadRequestSchema = z.object({
  // Step 1 — school
  schoolName: requiredText("School name", 160),
  city: requiredText("City", 120),
  studentCount: z.enum(studentCountOptions, { error: "Choose the number of students" }),
  boards: z
    .array(z.enum(boardOptions, { error: "Choose a board from the list" }), {
      error: "Choose at least one board",
    })
    .min(1, { error: "Choose at least one board" }),
  campuses: z.enum(campusOptions, { error: "Choose the number of campuses" }).nullish(),

  // Step 2 — contact person
  contactName: requiredText("Your name", 120),
  role: z.enum(roleOptions, { error: "Choose your role" }),
  email: z
    .string({ error: "Email is required" })
    .trim()
    .max(254, { error: "Keep this under 254 characters" })
    .pipe(z.email({ error: "Enter a valid email address, like name@school.in" })),
  phone: z
    .string({ error: "Phone number is required" })
    .trim()
    .max(25, { error: "Keep this under 25 characters" })
    .regex(/^[0-9+()\-\s]*$/, { error: "Use digits only, with an optional + country code" })
    .refine(
      (value) => {
        const digits = value.replace(/\D/g, "").length;
        return digits >= 10 && digits <= 15;
      },
      { error: "Enter a 10-digit mobile number or a landline with its STD code" }
    ),
  preferredContact: z.enum(contactPreferenceOptions, { error: "Choose how we should contact you" }).nullish(),

  // Step 3 — needs
  modules: z
    .array(z.enum(moduleOptions, { error: "Choose an area from the list" }), {
      error: "Choose at least one area of interest",
    })
    .min(1, { error: "Choose at least one area of interest" }),
  currentSystem: z.enum(currentSystemOptions, { error: "Choose what you use today" }).nullish(),
  currentErp: optionalText(120),
  goLive: z.enum(goLiveOptions, { error: "Choose when you would like to start" }).nullish(),
  message: optionalText(2000),
  consent: z.boolean({ error: "Please tick this box so we can contact you" }).refine((value) => value === true, {
    error: "Please tick this box so we can contact you",
  }),

  /** Cloudflare Turnstile token; only checked by the API when TURNSTILE_SECRET_KEY is set. */
  turnstileToken: z.string().max(2048).optional(),
  /** Honeypot field — real users never fill this in. The API checks it before parsing. */
  st_hp_field: z.string().optional(),
});

export type LeadRequestInput = z.infer<typeof leadRequestSchema>;

/** What the API stores and emails: validated input without the honeypot and Turnstile token. */
export type LeadRecord = Omit<LeadRequestInput, "st_hp_field" | "turnstileToken">;

/** Fields shown in each step of the form, in visual order (used for step validation and focus). */
export const leadFormSteps = [
  { key: "school", title: "Your school", fields: ["schoolName", "city", "studentCount", "boards", "campuses"] },
  { key: "you", title: "Your details", fields: ["contactName", "role", "email", "phone", "preferredContact"] },
  { key: "needs", title: "Your needs", fields: ["modules", "currentSystem", "currentErp", "goLive", "message", "consent"] },
] as const satisfies readonly { key: string; title: string; fields: readonly (keyof LeadRequestInput)[] }[];
