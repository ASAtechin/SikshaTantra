"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { useForm, useWatch, type FieldErrors, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
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
  type LucideIcon,
} from "lucide-react";
import {
  leadRequestSchema,
  leadFormSteps,
  type LeadRequestInput,
  boardOptions,
  campusOptions,
  contactPreferenceOptions,
  currentSystemNeedsErpName,
  currentSystemOptions,
  goLiveOptions,
  moduleOptions,
  roleOptions,
  studentCountOptions,
} from "@/lib/validation";
import { roleIcons, studentCountMeta, moduleIcons, contactPreferenceIcons } from "@/lib/form-options";
import { contact } from "@/lib/site";
import { readAttribution } from "@/lib/attribution";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FieldName = keyof LeadRequestInput;
type Status = "idle" | "submitting" | "success" | "error";

const lastStep = leadFormSteps.length - 1;
const stepIcons: LucideIcon[] = [School, User, ListChecks];
/** Ignore a submit that lands this soon after the last step appears (e.g. a double-click on Continue). */
const SUBMIT_GUARD_MS = 700;
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";

const defaultValues: Partial<LeadRequestInput> = {
  schoolName: "",
  city: "",
  boards: [],
  contactName: "",
  email: "",
  phone: "",
  modules: [],
  currentErp: "",
  message: "",
  consent: false,
  st_hp_field: "",
};

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-brand-950 focus:ring-2 focus:ring-brand-950/20 aria-[invalid=true]:border-red-700";
const labelClass = "mb-1.5 block text-sm font-semibold text-ink";
const errorClass = "mt-1.5 text-sm font-medium text-red-700";

function Optional() {
  return <span className="font-normal text-ink-muted"> (optional)</span>;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={errorClass}>
      {message}
    </p>
  );
}

function ChoiceTile({
  type,
  id,
  value,
  label,
  icon: Icon,
  registration,
  describedBy,
  invalid,
}: {
  type: "radio" | "checkbox";
  id: string;
  value: string;
  label: string;
  icon?: LucideIcon;
  registration: UseFormRegisterReturn;
  describedBy?: string;
  invalid?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "group/tile relative flex min-h-12 cursor-pointer items-center gap-2.5 rounded-2xl border bg-white px-3.5 py-3 text-sm font-semibold leading-tight text-ink transition-colors hover:border-brand-950",
        "has-checked:border-brand-950 has-checked:bg-brand-950 has-checked:text-white",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-950 has-[:focus-visible]:ring-offset-2",
        invalid ? "border-red-700" : "border-line"
      )}
    >
      <input
        id={id}
        type={type}
        value={value}
        className="sr-only"
        aria-describedby={describedBy}
        aria-invalid={type === "checkbox" && invalid ? true : undefined}
        {...registration}
      />
      {Icon && <Icon aria-hidden className="h-5 w-5 shrink-0 text-brand-700 group-has-checked/tile:text-amber-400" />}
      <span className="min-w-0 flex-1">{label}</span>
      <span
        aria-hidden
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center border-2 border-line group-has-checked/tile:border-amber-400",
          type === "checkbox" ? "rounded-md group-has-checked/tile:bg-amber-400" : "rounded-full"
        )}
      >
        {type === "checkbox" ? (
          <Check className="h-3.5 w-3.5 text-brand-950 opacity-0 group-has-checked/tile:opacity-100" />
        ) : (
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400 opacity-0 group-has-checked/tile:opacity-100" />
        )}
      </span>
    </label>
  );
}

function ChoiceGroup({
  legend,
  optional,
  errorId,
  error,
  columns = "grid-cols-2 sm:grid-cols-3",
  children,
}: {
  legend: string;
  optional?: boolean;
  errorId: string;
  error?: string;
  columns?: string;
  children: ReactNode;
}) {
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className={labelClass}>
        {legend}
        {optional && <Optional />}
      </legend>
      <div className={cn("grid gap-2.5", columns)}>{children}</div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

interface TurnstileApi {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileScript: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  turnstileScript ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      turnstileScript = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return turnstileScript;
}

/** Cloudflare Turnstile check. Rendered only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set. */
function TurnstileWidget({ siteKey, onToken }: { siteKey: string; onToken: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let widgetId: string | undefined;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return;
        widgetId = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          callback: (token: string) => onToken(token),
          "expired-callback": () => onToken(""),
          "error-callback": () => onToken(""),
        });
      })
      .catch(() => onToken(""));
    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [siteKey, onToken]);

  return <div ref={ref} className="min-h-[65px]" />;
}

function ContactLinks({ className }: { className?: string }) {
  return (
    <p className={cn("flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold", className)}>
      <a className="underline underline-offset-2" href={contact.phoneHref}>
        Call {contact.phoneDisplay}
      </a>
      {contact.whatsappHref && (
        <a className="underline underline-offset-2" href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
          WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {contact.emailHref && (
        <a className="underline underline-offset-2" href={contact.emailHref}>
          Email {contact.email}
        </a>
      )}
    </p>
  );
}

export function RequestDemoForm() {
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [turnstileMissing, setTurnstileMissing] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  /** What to focus when the next step panel mounts: a field name, the first control, or nothing (initial load). */
  const pendingFocus = useRef<FieldName | "first" | null>(null);
  const lastStepShownAt = useRef(0);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    getFieldState,
    formState: { errors },
    reset,
  } = useForm<LeadRequestInput>({
    resolver: zodResolver(leadRequestSchema),
    mode: "onTouched",
    defaultValues,
  });

  const selectedRole = useWatch({ control, name: "role" });
  const currentSystem = useWatch({ control, name: "currentSystem" });
  const schoolNameValue = useWatch({ control, name: "schoolName" });
  const contactNameValue = useWatch({ control, name: "contactName" });
  const showErpName = !!currentSystem && currentSystemNeedsErpName.includes(currentSystem);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const focusField = useCallback((name: FieldName) => {
    const form = formRef.current;
    if (!form) return;
    const target =
      form.querySelector<HTMLElement>(`[name="${name}"]:checked`) ?? form.querySelector<HTMLElement>(`[name="${name}"]`);
    target?.focus();
  }, []);

  const onStepMount = useCallback(
    (node: HTMLDivElement | null) => {
      const target = pendingFocus.current;
      if (!node || !target) return;
      pendingFocus.current = null;
      if (target === "first") node.querySelector<HTMLElement>("input, textarea, select")?.focus();
      else focusField(target);
    },
    [focusField]
  );

  function showStep(next: number, focus: FieldName | "first") {
    pendingFocus.current = focus;
    if (next === lastStep) lastStepShownAt.current = Date.now();
    setAnnouncement(`Step ${next + 1} of ${leadFormSteps.length}: ${leadFormSteps[next].title}`);
    setStep(next);
  }

  async function goNext() {
    const fields = leadFormSteps[step].fields;
    const valid = await trigger([...fields]);
    if (!valid) {
      const firstInvalid = fields.find((name) => getFieldState(name).invalid);
      if (firstInvalid) requestAnimationFrame(() => focusField(firstInvalid));
      return;
    }
    showStep(Math.min(step + 1, lastStep), "first");
  }

  function goBack() {
    showStep(Math.max(step - 1, 0), "first");
  }

  function onInvalid(invalid: FieldErrors<LeadRequestInput>) {
    const target = leadFormSteps.findIndex((s) => s.fields.some((name) => invalid[name]));
    if (target === -1) return;
    const firstInvalid = leadFormSteps[target].fields.find((name) => invalid[name]);
    if (!firstInvalid) return;
    if (target !== step) showStep(target, firstInvalid);
    else requestAnimationFrame(() => focusField(firstInvalid));
  }

  async function onValid(data: LeadRequestInput) {
    if (turnstileSiteKey && !turnstileToken) {
      setTurnstileMissing(true);
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, attribution: readAttribution(), turnstileToken: turnstileToken || undefined }),
      });
      const response = (await res.json().catch(() => null)) as
        | { success?: boolean; error?: string; acknowledged?: boolean }
        | null;
      if (!res.ok || response?.success !== true) {
        setStatus("error");
        setErrorMessage(
          response?.error ??
            (res.status >= 500
              ? "We couldn't deliver your request right now. Please contact us directly."
              : "We couldn't send your request. Check the details and try again.")
        );
        if (turnstileSiteKey) {
          setTurnstileToken("");
          setTurnstileKey((k) => k + 1);
        }
        return;
      }
      track("Demo request", { source: readAttribution()?.source ?? "unknown" });
      setAcknowledged(response.acknowledged === true);
      setStatus("success");
      setAnnouncement("");
      reset(defaultValues);
      setStep(0);
      setTurnstileToken("");
    } catch {
      setStatus("error");
      setErrorMessage("We couldn't reach our server. Please contact us directly and we'll respond within one business day.");
    }
  }

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    // Steps 1–2: Continue and Enter in a text field both arrive here and only move forward.
    if (step < lastStep) {
      void goNext();
      return;
    }
    if (Date.now() - lastStepShownAt.current < SUBMIT_GUARD_MS) return;
    void handleSubmit(onValid, onInvalid)();
  }

  function onFormKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    // Enter on a choice tile must never advance or submit the form.
    const target = event.target as HTMLElement;
    if (
      event.key === "Enter" &&
      target instanceof HTMLInputElement &&
      (target.type === "radio" || target.type === "checkbox")
    ) {
      event.preventDefault();
    }
  }

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 rounded-3xl border border-teal-200 bg-teal-50 px-6 py-12 text-center sm:px-8"
      >
        <span aria-hidden className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500 text-white">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h2 ref={successHeadingRef} tabIndex={-1} className="font-display text-2xl font-bold text-ink outline-none">
          Request received
        </h2>
        <p className="max-w-sm text-base leading-relaxed text-ink-muted">
          Thank you. We&apos;ll contact you within one business day to agree a time for your walkthrough.
          {acknowledged && " We've also sent a confirmation to your email address."}
        </p>
        {(contact.whatsappHref || contact.bookingHref) && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-semibold text-ink">Prefer not to wait?</p>
            <div className="flex flex-wrap justify-center gap-3">
              {contact.bookingHref && (
                <a
                  className="rounded-full bg-brand-950 px-5 py-2.5 text-sm font-semibold text-white underline-offset-2 hover:underline"
                  href={contact.bookingHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pick a time now<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {contact.whatsappHref && (
                <a
                  className="rounded-full border-2 border-brand-950/40 px-5 py-2 text-sm font-semibold text-ink underline-offset-2 hover:underline"
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        )}
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Send another request
        </Button>
      </motion.div>
    );
  }

  const stepFields = leadFormSteps[step];
  const StepIcon = stepIcons[step];

  return (
    <form ref={formRef} onSubmit={onFormSubmit} onKeyDown={onFormKeyDown} noValidate>
      {/* Honeypot — hidden from people and assistive technology; bots that fill it are dropped by the API. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("st_hp_field")}>Leave this field empty</label>
        <input id={fieldId("st_hp_field")} type="text" tabIndex={-1} autoComplete="off" {...register("st_hp_field")} />
      </div>

      <ol className="mb-6 flex items-center gap-2" aria-label="Form progress">
        {leadFormSteps.map((s, i) => {
          const Icon = stepIcons[i];
          return (
            <li key={s.key} aria-current={i === step ? "step" : undefined} className="flex flex-1 items-center gap-2">
              <span
                aria-hidden
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  i < step
                    ? "border-teal-500 bg-teal-500 text-white"
                    : i === step
                      ? "border-brand-950 bg-brand-950 text-amber-400"
                      : "border-line bg-white text-ink-muted"
                )}
              >
                {i < step ? <Check className="h-[18px] w-[18px]" /> : <Icon className="h-[18px] w-[18px]" />}
              </span>
              <span className="sr-only sm:not-sr-only sm:min-w-0">
                <span className={cn("block text-xs font-bold leading-tight", i <= step ? "text-ink" : "text-ink-muted")}>
                  {s.title}
                </span>
                <span className="block text-xs text-ink-muted">
                  Step {i + 1} of {leadFormSteps.length}
                  {i < step && <span className="sr-only"> (done)</span>}
                </span>
              </span>
              {i < leadFormSteps.length - 1 && (
                <span
                  aria-hidden
                  className={cn("h-0.5 flex-1 rounded-full transition-colors", i < step ? "bg-teal-500" : "bg-line-soft")}
                />
              )}
            </li>
          );
        })}
      </ol>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      <p id={fieldId("step-title")} className="mb-5 flex items-center gap-2 text-sm font-semibold text-ink-muted">
        <StepIcon aria-hidden className="h-4 w-4" />
        Step {step + 1} of {leadFormSteps.length}: {stepFields.title}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          ref={onStepMount}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-6"
        >
          {step === 0 && (
            <>
              <div>
                <label className={labelClass} htmlFor={fieldId("schoolName")}>
                  School name
                </label>
                <input
                  id={fieldId("schoolName")}
                  autoComplete="organization"
                  className={inputClass}
                  placeholder="Sunrise Public School"
                  aria-invalid={errors.schoolName ? true : undefined}
                  aria-describedby={errors.schoolName ? errorId("schoolName") : undefined}
                  {...register("schoolName")}
                />
                <FieldError id={errorId("schoolName")} message={errors.schoolName?.message} />
              </div>
              <div>
                <label className={labelClass} htmlFor={fieldId("city")}>
                  City
                </label>
                <input
                  id={fieldId("city")}
                  autoComplete="address-level2"
                  className={inputClass}
                  placeholder="Pune"
                  aria-invalid={errors.city ? true : undefined}
                  aria-describedby={errors.city ? errorId("city") : undefined}
                  {...register("city")}
                />
                <FieldError id={errorId("city")} message={errors.city?.message} />
              </div>
              <ChoiceGroup legend="How many students?" errorId={errorId("studentCount")} error={errors.studentCount?.message}>
                {studentCountOptions.map((opt, i) => (
                  <ChoiceTile
                    key={opt}
                    type="radio"
                    id={fieldId(`studentCount-${i}`)}
                    value={opt}
                    label={opt}
                    icon={studentCountMeta[opt].icon}
                    registration={register("studentCount")}
                    describedBy={errors.studentCount ? errorId("studentCount") : undefined}
                    invalid={!!errors.studentCount}
                  />
                ))}
              </ChoiceGroup>
              <ChoiceGroup
                legend="Which boards do you follow? Choose all that apply."
                errorId={errorId("boards")}
                error={errors.boards?.message}
              >
                {boardOptions.map((opt, i) => (
                  <ChoiceTile
                    key={opt}
                    type="checkbox"
                    id={fieldId(`boards-${i}`)}
                    value={opt}
                    label={opt}
                    registration={register("boards")}
                    describedBy={errors.boards ? errorId("boards") : undefined}
                    invalid={!!errors.boards}
                  />
                ))}
              </ChoiceGroup>
              <ChoiceGroup
                legend="How many campuses?"
                optional
                columns="grid-cols-2 sm:grid-cols-4"
                errorId={errorId("campuses")}
                error={errors.campuses?.message}
              >
                {campusOptions.map((opt, i) => (
                  <ChoiceTile
                    key={opt}
                    type="radio"
                    id={fieldId(`campuses-${i}`)}
                    value={opt}
                    label={opt}
                    registration={register("campuses")}
                  />
                ))}
              </ChoiceGroup>
            </>
          )}

          {step === 1 && (
            <>
              {schoolNameValue && (
                <p className="flex items-center gap-2 rounded-xl bg-brand-950/5 px-3.5 py-2 text-sm font-semibold text-ink-muted">
                  <School aria-hidden className="h-4 w-4" /> {schoolNameValue}
                </p>
              )}
              <div>
                <label className={labelClass} htmlFor={fieldId("contactName")}>
                  Your name
                </label>
                <input
                  id={fieldId("contactName")}
                  autoComplete="name"
                  className={inputClass}
                  placeholder="Anjali Sharma"
                  aria-invalid={errors.contactName ? true : undefined}
                  aria-describedby={errors.contactName ? errorId("contactName") : undefined}
                  {...register("contactName")}
                />
                <FieldError id={errorId("contactName")} message={errors.contactName?.message} />
              </div>
              <ChoiceGroup legend="Your role" errorId={errorId("role")} error={errors.role?.message}>
                {roleOptions.map((opt, i) => (
                  <ChoiceTile
                    key={opt}
                    type="radio"
                    id={fieldId(`role-${i}`)}
                    value={opt}
                    label={opt}
                    icon={roleIcons[opt]}
                    registration={register("role")}
                    describedBy={errors.role ? errorId("role") : undefined}
                    invalid={!!errors.role}
                  />
                ))}
              </ChoiceGroup>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor={fieldId("email")}>
                    Work email
                  </label>
                  <input
                    id={fieldId("email")}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    className={inputClass}
                    placeholder="you@yourschool.in"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? errorId("email") : undefined}
                    {...register("email")}
                  />
                  <FieldError id={errorId("email")} message={errors.email?.message} />
                </div>
                <div>
                  <label className={labelClass} htmlFor={fieldId("phone")}>
                    Phone number
                  </label>
                  <input
                    id={fieldId("phone")}
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    className={inputClass}
                    placeholder="+91 98765 43210"
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={errors.phone ? errorId("phone") : undefined}
                    {...register("phone")}
                  />
                  <FieldError id={errorId("phone")} message={errors.phone?.message} />
                </div>
              </div>
              <ChoiceGroup
                legend="How should we contact you?"
                optional
                errorId={errorId("preferredContact")}
                error={errors.preferredContact?.message}
              >
                {contactPreferenceOptions.map((opt, i) => (
                  <ChoiceTile
                    key={opt}
                    type="radio"
                    id={fieldId(`preferredContact-${i}`)}
                    value={opt}
                    label={opt}
                    icon={contactPreferenceIcons[opt]}
                    registration={register("preferredContact")}
                  />
                ))}
              </ChoiceGroup>
            </>
          )}

          {step === 2 && (
            <>
              {contactNameValue && (
                <p className="flex items-center gap-2 rounded-xl bg-brand-950/5 px-3.5 py-2 text-sm font-semibold text-ink-muted">
                  <User aria-hidden className="h-4 w-4" /> {contactNameValue}
                  {selectedRole ? ` · ${selectedRole}` : ""}
                </p>
              )}
              <ChoiceGroup
                legend="Which areas should the walkthrough cover? Choose all that apply."
                errorId={errorId("modules")}
                error={errors.modules?.message}
              >
                {moduleOptions.map((m, i) => (
                  <ChoiceTile
                    key={m}
                    type="checkbox"
                    id={fieldId(`modules-${i}`)}
                    value={m}
                    label={m}
                    icon={moduleIcons[m]}
                    registration={register("modules")}
                    describedBy={errors.modules ? errorId("modules") : undefined}
                    invalid={!!errors.modules}
                  />
                ))}
              </ChoiceGroup>
              <ChoiceGroup
                legend="What do you use today?"
                optional
                columns="grid-cols-2 sm:grid-cols-4"
                errorId={errorId("currentSystem")}
                error={errors.currentSystem?.message}
              >
                {currentSystemOptions.map((opt, i) => (
                  <ChoiceTile
                    key={opt}
                    type="radio"
                    id={fieldId(`currentSystem-${i}`)}
                    value={opt}
                    label={opt}
                    registration={register("currentSystem")}
                  />
                ))}
              </ChoiceGroup>
              {showErpName && (
                <div>
                  <label className={labelClass} htmlFor={fieldId("currentErp")}>
                    Which ERP or software?
                    <Optional />
                  </label>
                  <input
                    id={fieldId("currentErp")}
                    className={inputClass}
                    placeholder="Name of the system you use"
                    aria-invalid={errors.currentErp ? true : undefined}
                    aria-describedby={errors.currentErp ? errorId("currentErp") : undefined}
                    {...register("currentErp")}
                  />
                  <FieldError id={errorId("currentErp")} message={errors.currentErp?.message} />
                </div>
              )}
              <ChoiceGroup
                legend="When would you like to start?"
                optional
                errorId={errorId("goLive")}
                error={errors.goLive?.message}
              >
                {goLiveOptions.map((opt, i) => (
                  <ChoiceTile
                    key={opt}
                    type="radio"
                    id={fieldId(`goLive-${i}`)}
                    value={opt}
                    label={opt}
                    registration={register("goLive")}
                  />
                ))}
              </ChoiceGroup>
              <div>
                <label className={labelClass} htmlFor={fieldId("message")}>
                  Anything specific we should know?
                  <Optional />
                </label>
                <textarea
                  id={fieldId("message")}
                  rows={4}
                  className={cn(inputClass, "resize-y")}
                  placeholder="Current challenges, term dates, or questions"
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? errorId("message") : undefined}
                  {...register("message")}
                />
                <FieldError id={errorId("message")} message={errors.message?.message} />
              </div>

              <div className="rounded-2xl border border-line-soft bg-paper p-4">
                <p className="text-sm text-ink-muted">
                  We use these details only to respond to your request. See our{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener"
                    className="font-semibold text-ink underline underline-offset-2"
                  >
                    privacy notice<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  .
                </p>
                <div className="mt-3 flex items-start gap-3">
                  <input
                    id={fieldId("consent")}
                    type="checkbox"
                    className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-brand-950"
                    aria-invalid={errors.consent ? true : undefined}
                    aria-describedby={errors.consent ? errorId("consent") : undefined}
                    {...register("consent")}
                  />
                  <label htmlFor={fieldId("consent")} className="cursor-pointer text-sm font-semibold text-ink">
                    I agree to be contacted about this request
                  </label>
                </div>
                <FieldError id={errorId("consent")} message={errors.consent?.message} />
              </div>

              {turnstileSiteKey && (
                <div>
                  <TurnstileWidget
                    key={turnstileKey}
                    siteKey={turnstileSiteKey}
                    onToken={setTurnstileToken}
                  />
                  {turnstileMissing && !turnstileToken && (
                    <p className={errorClass} role="alert">
                      Please complete the verification check above. If it does not load, contact us directly.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {status === "error" && (
        <div role="alert" className="mt-5 flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p>{errorMessage}</p>
            <ContactLinks className="mt-2" />
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button key="back" type="button" variant="ghost" onClick={goBack}>
            <ArrowLeft aria-hidden className="h-4 w-4" /> Back
          </Button>
        ) : (
          <span />
        )}

        {step < lastStep ? (
          <Button key="continue" type="submit" size="lg" className="group/continue">
            Continue
            <ArrowRight
              aria-hidden
              className="h-[18px] w-[18px] transition-transform group-hover/continue:translate-x-1 motion-reduce:transform-none"
            />
          </Button>
        ) : (
          <Button key="submit" type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <Loader2 aria-hidden className="h-[18px] w-[18px] animate-spin" /> Sending…
              </>
            ) : (
              "Request my demo"
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
