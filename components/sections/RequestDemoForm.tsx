"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  School,
  User,
  ListChecks,
} from "lucide-react";
import {
  leadRequestSchema,
  type LeadRequestInput,
  moduleOptions,
  roleOptions,
  studentCountOptions,
} from "@/lib/validation";
import { roleIcons, studentCountMeta, moduleIcons } from "@/lib/form-options";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-brand-950/12 bg-white px-4 py-3 text-sm text-brand-950 placeholder:text-brand-950/35 outline-none transition-colors focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15";

const labelClass = "mb-1.5 block text-sm font-semibold text-brand-950/80";

const steps = [
  { key: "school", title: "Your School", icon: School, fields: ["schoolName", "city", "studentCount"] as const },
  { key: "you", title: "Your Details", icon: User, fields: ["contactName", "role", "email", "phone"] as const },
  { key: "needs", title: "Your Needs", icon: ListChecks, fields: ["modules", "message"] as const },
];

export function RequestDemoForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LeadRequestInput>({
    resolver: zodResolver(leadRequestSchema),
    mode: "onChange",
    defaultValues: { modules: [] },
  });

  const selectedRole = useWatch({ control, name: "role" });
  const selectedStudentCount = useWatch({ control, name: "studentCount" });
  const selectedModules = useWatch({ control, name: "modules" }) || [];
  const schoolNameValue = useWatch({ control, name: "schoolName" });
  const contactNameValue = useWatch({ control, name: "contactName" });

  async function goNext() {
    const valid = await trigger(steps[step].fields as unknown as (keyof LeadRequestInput)[]);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function toggleModule(m: (typeof moduleOptions)[number]) {
    const current = selectedModules;
    const next = current.includes(m) ? current.filter((x) => x !== m) : [...current, m];
    setValue("modules", next, { shouldValidate: true });
  }

  async function onSubmit(data: LeadRequestInput) {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const response = await res.json().catch(() => null) as { success?: boolean; error?: string } | null;
      if (!res.ok || response?.success !== true) {
        setStatus("error");
        setErrorMessage(
          response?.error ??
          (res.status >= 500
            ? "We couldn't deliver your request right now. Please contact us directly."
            : "We couldn't submit your request. Check the details and try again.")
        );
        return;
      }
      setStatus("success");
      reset();
      setStep(0);
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't reach our server. Please contact us directly and we'll respond within one business day."
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 rounded-3xl border border-teal-200 bg-teal-50 px-8 py-16 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500 text-white">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="font-display text-2xl font-bold text-brand-950">Request received!</h3>
        <p className="max-w-sm text-sm leading-relaxed text-brand-950/60">
          Thank you for reaching out. A member of our rollout team will contact you within one
          business day to schedule your personalised walkthrough.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Submit another request
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot — hidden from real users */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register("website")} />

      {/* Step progress */}
      <div className="mb-8 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.key} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
                i < step
                  ? "border-teal-500 bg-teal-500 text-white"
                  : i === step
                  ? "border-brand-950 bg-brand-950 text-amber-400"
                  : "border-brand-950/15 bg-white text-brand-950/30"
              )}
            >
              {i < step ? <Check className="h-[18px] w-[18px]" /> : <s.icon className="h-[18px] w-[18px]" />}
            </div>
            <div className="hidden min-w-0 sm:block">
              <p className={cn("text-xs font-bold leading-tight", i <= step ? "text-brand-950" : "text-brand-950/35")}>
                {s.title}
              </p>
              <p className="text-[10px] text-brand-950/35">Step {i + 1} of {steps.length}</p>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("h-0.5 flex-1 rounded-full transition-colors", i < step ? "bg-teal-500" : "bg-brand-950/10")} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {step === 0 && (
            <>
              <div>
                <label className={labelClass} htmlFor="schoolName">School name</label>
                <input id="schoolName" autoFocus className={inputClass} placeholder="Sunrise Public School" {...register("schoolName")} />
                {errors.schoolName && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.schoolName.message}</p>}
              </div>
              <div>
                <label className={labelClass} htmlFor="city">City</label>
                <input id="city" className={inputClass} placeholder="Pune" {...register("city")} />
                {errors.city && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.city.message}</p>}
              </div>
              <fieldset>
                <legend className={labelClass}>How many students?</legend>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {studentCountOptions.map((opt) => {
                    const meta = studentCountMeta[opt];
                    const active = selectedStudentCount === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setValue("studentCount", opt, { shouldValidate: true })}
                        className={cn(
                          "flex flex-col items-start gap-2 rounded-2xl border p-3.5 text-left transition-all",
                          active ? "border-brand-950 bg-brand-950 text-white" : "border-brand-950/10 bg-white hover:border-brand-950/30"
                        )}
                      >
                        <meta.icon className={cn("h-5 w-5", active ? "text-amber-400" : "text-brand-700")} />
                        <span className="text-xs font-bold leading-tight">{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.studentCount && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.studentCount.message}</p>}
              </fieldset>
            </>
          )}

          {step === 1 && (
            <>
              {schoolNameValue && (
                <div className="flex items-center gap-2 rounded-xl bg-brand-950/5 px-3.5 py-2 text-xs font-bold text-brand-950/60">
                  <School className="h-3.5 w-3.5" /> {schoolNameValue}
                </div>
              )}
              <div>
                <label className={labelClass} htmlFor="contactName">Your name</label>
                <input id="contactName" autoFocus className={inputClass} placeholder="Anjali Sharma" {...register("contactName")} />
                {errors.contactName && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.contactName.message}</p>}
              </div>
              <fieldset>
                <legend className={labelClass}>Your role</legend>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {roleOptions.map((opt) => {
                    const Icon = roleIcons[opt];
                    const active = selectedRole === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setValue("role", opt, { shouldValidate: true })}
                        className={cn(
                          "flex flex-col items-start gap-2 rounded-2xl border p-3.5 text-left transition-all",
                          active ? "border-brand-950 bg-brand-950 text-white" : "border-brand-950/10 bg-white hover:border-brand-950/30"
                        )}
                      >
                        <Icon className={cn("h-5 w-5", active ? "text-amber-400" : "text-brand-700")} />
                        <span className="text-xs font-bold leading-tight">{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.role && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.role.message}</p>}
              </fieldset>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="email">Work email</label>
                  <input id="email" type="email" className={inputClass} placeholder="you@yourschool.edu" {...register("email")} />
                  {errors.email && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="phone">Phone number</label>
                  <input id="phone" type="tel" className={inputClass} placeholder="+91 98765 43210" {...register("phone")} />
                  {errors.phone && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.phone.message}</p>}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {contactNameValue && (
                <div className="flex items-center gap-2 rounded-xl bg-brand-950/5 px-3.5 py-2 text-xs font-bold text-brand-950/60">
                  <User className="h-3.5 w-3.5" /> {contactNameValue}
                  {selectedRole ? ` · ${selectedRole}` : ""}
                </div>
              )}
              <fieldset>
                <legend className={labelClass}>Which areas are you interested in?</legend>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {moduleOptions.map((m) => {
                    const Icon = moduleIcons[m];
                    const active = selectedModules.includes(m);
                    return (
                      <button
                        type="button"
                        key={m}
                        onClick={() => toggleModule(m)}
                        className={cn(
                          "flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-semibold transition-all",
                          active ? "border-brand-950 bg-brand-950 text-white" : "border-brand-950/10 bg-white hover:border-brand-950/30"
                        )}
                      >
                        <Icon className={cn("h-4 w-4 shrink-0", active ? "text-amber-400" : "text-brand-700")} />
                        {m}
                      </button>
                    );
                  })}
                </div>
                {errors.modules && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.modules.message}</p>}
              </fieldset>
              <div>
                <label className={labelClass} htmlFor="message">Anything specific we should know? (optional)</label>
                <textarea
                  id="message"
                  rows={4}
                  className={cn(inputClass, "resize-none")}
                  placeholder="Tell us about your current challenges, timeline, or questions..."
                  {...register("message")}
                />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {status === "error" && (
        <motion.div
          role="alert"
          aria-live="assertive"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p>{errorMessage}</p>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold">
              <a className="underline underline-offset-2" href="mailto:hello@shikshatantra.in">Email hello@shikshatantra.in</a>
              <a className="underline underline-offset-2" href="tel:+919407174355">Call +91 94071 74355</a>
            </p>
          </div>
        </motion.div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={goBack}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        ) : (
          <span />
        )}

        {step < steps.length - 1 ? (
          <Button type="button" size="lg" onClick={goNext} className="group">
            Continue
            <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
          </Button>
        ) : (
          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <Loader2 className="h-[18px] w-[18px] animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Implementation Request"
            )}
          </Button>
        )}
      </div>

      {step === steps.length - 1 && (
        <p className="mt-4 text-xs text-brand-950/45">
          By submitting, you agree to be contacted by our team regarding your request. We never
          share your information with third parties.
        </p>
      )}
    </form>
  );
}
