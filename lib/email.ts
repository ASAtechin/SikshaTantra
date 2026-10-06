import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { LeadRequestInput } from "@/lib/validation";

const NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || "aditya26.upadhyay@gmail.com";

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Email is not configured: set SMTP_HOST, SMTP_USER, and SMTP_PASS (see .env.local.example)."
    );
  }

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : 587,
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return cachedTransporter;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderLeadEmailHtml(lead: LeadRequestInput): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 12px;font-size:13px;font-weight:600;color:#6b6f8a;white-space:nowrap;">${label}</td>
      <td style="padding:8px 12px;font-size:14px;color:#16182b;">${escapeHtml(value)}</td>
    </tr>`;

  return `
  <div style="font-family:-apple-system,Segoe UI,Inter,Arial,sans-serif;max-width:620px;margin:0 auto;">
    <div style="background:#0e1030;padding:24px 28px;border-radius:16px 16px 0 0;">
      <p style="margin:0;color:#fbbf24;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">
        New Implementation Request
      </p>
      <h1 style="margin:8px 0 0;color:#fff;font-size:20px;">${escapeHtml(lead.schoolName)}</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #eee;border-top:none;">
      ${row("Contact", lead.contactName)}
      ${row("Role", lead.role)}
      ${row("Email", lead.email)}
      ${row("Phone", lead.phone)}
      ${row("City", lead.city)}
      ${row("Student count", lead.studentCount)}
      ${row("Interested in", lead.modules.join(", "))}
      ${lead.message ? row("Message", lead.message) : ""}
    </table>
    <p style="padding:16px 12px;font-size:12px;color:#9094ac;border-radius:0 0 16px 16px;background:#fff;border:1px solid #eee;border-top:none;margin:0;">
      Submitted via the Siksha Tantra website request-a-demo form. Reply directly to this email to
      reach ${escapeHtml(lead.contactName)}.
    </p>
  </div>`;
}

/**
 * Sends a lead-notification email. Throws (never fakes success) if SMTP is
 * not configured or sending fails, so the caller can report that honestly.
 */
export async function sendLeadNotificationEmail(lead: LeadRequestInput): Promise<void> {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"Siksha Tantra Website" <${process.env.SMTP_USER}>`,
    to: NOTIFICATION_EMAIL,
    replyTo: lead.email,
    subject: `New implementation request — ${lead.schoolName}`,
    html: renderLeadEmailHtml(lead),
    text: [
      `School: ${lead.schoolName}`,
      `Contact: ${lead.contactName} (${lead.role})`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone}`,
      `City: ${lead.city}`,
      `Student count: ${lead.studentCount}`,
      `Interested in: ${lead.modules.join(", ")}`,
      lead.message ? `Message: ${lead.message}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
