import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { LeadRequest } from "@/lib/models/LeadRequest";
import { leadRequestSchema } from "@/lib/validation";
import { sendLeadNotificationEmail } from "@/lib/email";

export const runtime = "nodejs";

// Best-effort in-memory throttle. Resets on redeploy/restart — fine for a
// marketing contact form, not a substitute for a real rate limiter at scale.
const submissionsByIp = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = leadRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Please check the form for errors.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // Honeypot: if filled, silently report success without sending anything.
  if (parsed.data.website) {
    return NextResponse.json({ success: true, id: "ok" }, { status: 201 });
  }

  const { website: _honeypot, ...lead } = parsed.data;
  void _honeypot;

  // Email is the authoritative delivery channel for this request — it must
  // succeed for the visitor to see "success". Database storage (below) is a
  // best-effort secondary copy; its failure never blocks a real success.
  try {
    await sendLeadNotificationEmail(lead);
  } catch (err) {
    console.error("[api/lead] email delivery failed:", err);
    return NextResponse.json(
      {
        success: false,
        error:
          "We couldn't deliver your request right now. Please email hello@shikshatantra.in or call +91 94071 74355, and we'll respond within one business day.",
      },
      { status: 503 }
    );
  }

  try {
    await dbConnect();
    await LeadRequest.create(lead);
  } catch (err) {
    // Non-fatal: the notification email already succeeded, which is the
    // part the visitor is relying on. Log for operational visibility only.
    console.error("[api/lead] secondary database storage failed:", err);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
