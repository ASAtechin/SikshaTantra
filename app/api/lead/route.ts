import { NextResponse } from "next/server";
import { z } from "zod";
import { dbConnect } from "@/lib/mongodb";
import { LeadRequest } from "@/lib/models/LeadRequest";
import { currentSystemNeedsErpName, leadRequestSchema, type LeadRecord } from "@/lib/validation";
import { sendLeadAcknowledgementEmail, sendLeadNotificationEmail } from "@/lib/email";
import { contact } from "@/lib/site";

export const runtime = "nodejs";

const contactLine = `call ${contact.phoneDisplay}${contact.email ? ` or email ${contact.email}` : ""}`;

// Best-effort in-memory throttle: counts valid submissions per client IP. It resets on redeploy and is
// per-instance, so it is not a real rate limiter at scale; enable Turnstile (below) for stronger protection.
const submissionsByIp = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Cap on acknowledgement emails per instance per hour, so the endpoint can't be used to mass-mail
// arbitrary addresses through our SMTP account. Leads are still delivered when the cap is hit.
const ackTimes: number[] = [];
const ACK_WINDOW_MS = 60 * 60 * 1000;
const MAX_ACKS_PER_WINDOW = 20;

function takeAckSlot(): boolean {
  const now = Date.now();
  while (ackTimes.length && now - ackTimes[0] >= ACK_WINDOW_MS) ackTimes.shift();
  if (ackTimes.length >= MAX_ACKS_PER_WINDOW) return false;
  ackTimes.push(now);
  return true;
}

function recentSubmissions(ip: string, now: number): number[] {
  return (submissionsByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
}

function isRateLimited(ip: string): boolean {
  return recentSubmissions(ip, Date.now()).length >= MAX_PER_WINDOW;
}

function recordSubmission(ip: string) {
  const now = Date.now();
  if (submissionsByIp.size > 5000) {
    for (const [key, times] of submissionsByIp) {
      if (!times.some((t) => now - t < WINDOW_MS)) submissionsByIp.delete(key);
    }
  }
  submissionsByIp.set(ip, [...recentSubmissions(ip, now), now]);
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/**
 * Optional Cloudflare Turnstile check. Active only when BOTH TURNSTILE_SECRET_KEY and
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY are set; with only the secret the form can't render the widget, so
 * verification is skipped (with a warning) rather than rejecting every real lead.
 */
async function verifyTurnstile(token: string | undefined, ip: string): Promise<"ok" | "failed" | "unavailable"> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return "ok";
  if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()) {
    console.warn("[api/lead] TURNSTILE_SECRET_KEY is set without NEXT_PUBLIC_TURNSTILE_SITE_KEY; skipping verification.");
    return "ok";
  }
  if (!token) return "failed";
  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (data.success === true) return "ok";
    console.warn("[api/lead] Turnstile rejected the token:", data["error-codes"]);
    return "failed";
  } catch (err) {
    console.error("[api/lead] Turnstile verification unavailable:", err);
    return "unavailable";
  }
}

function hasFilledHoneypot(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const value = (body as Record<string, unknown>).st_hp_field;
  return typeof value === "string" ? value.trim().length > 0 : value != null && value !== false;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot first: report success without sending or storing anything, so bots learn nothing.
  if (hasFilledHoneypot(body)) {
    console.warn("[api/lead] honeypot filled; request dropped.");
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const parsed = leadRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Please check the form for errors.", issues: z.flattenError(parsed.error).fieldErrors },
      { status: 422 }
    );
  }

  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: `We've received several requests from your network in the last few minutes. Please try again later, or ${contactLine}.`,
      },
      { status: 429 }
    );
  }

  const { st_hp_field: _honeypot, turnstileToken, ...data } = parsed.data;
  void _honeypot;

  const turnstile = await verifyTurnstile(turnstileToken, ip);
  if (turnstile === "failed") {
    return NextResponse.json(
      { success: false, error: "We couldn't confirm the verification check. Please complete it again and resend." },
      { status: 400 }
    );
  }
  if (turnstile === "unavailable") {
    return NextResponse.json(
      { success: false, error: `We couldn't verify your request right now. Please try again in a minute, or ${contactLine}.` },
      { status: 503 }
    );
  }

  recordSubmission(ip);

  const needsErpName = !!data.currentSystem && currentSystemNeedsErpName.includes(data.currentSystem);
  const lead: LeadRecord = {
    ...data,
    campuses: data.campuses ?? undefined,
    preferredContact: data.preferredContact ?? undefined,
    currentSystem: data.currentSystem ?? undefined,
    currentErp: needsErpName && data.currentErp ? data.currentErp : undefined,
    goLive: data.goLive ?? undefined,
    message: data.message || undefined,
  };

  // Email to the sales inbox is the authoritative delivery channel: it must succeed for the visitor
  // to see "success". The acknowledgement and the database copy below are best-effort.
  try {
    await sendLeadNotificationEmail(lead);
  } catch (err) {
    console.error("[api/lead] lead notification email failed:", err);
    return NextResponse.json(
      {
        success: false,
        error: `We couldn't deliver your request right now. Please ${contactLine}, and we'll respond within one business day.`,
      },
      { status: 503 }
    );
  }

  const [acknowledgement, storage] = await Promise.allSettled([
    takeAckSlot() ? sendLeadAcknowledgementEmail(lead) : Promise.reject(new Error("acknowledgement cap reached")),
    dbConnect().then(() => LeadRequest.create({ ...lead, consentAt: new Date() })),
  ]);
  if (acknowledgement.status === "rejected") {
    console.error("[api/lead] acknowledgement email failed (lead was delivered):", acknowledgement.reason);
  }
  if (storage.status === "rejected") {
    console.error("[api/lead] secondary database storage failed (lead was delivered):", storage.reason);
  }

  return NextResponse.json({ success: true, acknowledged: acknowledgement.status === "fulfilled" }, { status: 201 });
}
