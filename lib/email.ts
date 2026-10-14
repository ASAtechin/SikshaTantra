import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { LeadRecord } from "@/lib/validation";
import { contact, siteName, siteUrl } from "@/lib/site";

let cachedTransporter: Transporter | null = null;

function isEtherealHost(host: string): boolean {
  return /(^|\.)ethereal\.email$/i.test(host.trim());
}

function getTransporter(): Transporter {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Email is not configured: set SMTP_HOST, SMTP_USER, and SMTP_PASS (see .env.example).");
  }

  if (process.env.NODE_ENV === "production" && isEtherealHost(SMTP_HOST)) {
    console.warn(
      "[email] WARNING: SMTP_HOST is smtp.ethereal.email in production. Ethereal is a test service and NEVER delivers " +
        "mail: lead notifications and acknowledgements are being lost. Configure a real SMTP provider."
    );
  }

  if (cachedTransporter) return cachedTransporter;

  const port = SMTP_PORT ? Number(SMTP_PORT) : 587;
  // Port 465 speaks TLS from the first byte; 587/25 start in plain text and upgrade with STARTTLS.
  // A mismatch fails with "wrong version number", so the port decides and SMTP_SECURE only matters
  // for non-standard ports.
  const secure = port === 465 ? true : port === 587 || port === 25 ? false : SMTP_SECURE === "true";
  if (SMTP_SECURE !== undefined && (SMTP_SECURE === "true") !== secure) {
    console.warn(`[email] SMTP_SECURE=${SMTP_SECURE} does not match port ${port}; using secure=${secure}.`);
  }

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    requireTLS: !secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return cachedTransporter;
}

/** The inbox that receives every lead. LEAD_NOTIFICATION_EMAIL overrides the default. */
function getNotificationAddress(): string {
  return process.env.LEAD_NOTIFICATION_EMAIL?.trim() || "aditya26.upadhyay@gmail.com";
}

function fromAddress(): string {
  return process.env.SMTP_FROM || `"${siteName} Website" <${process.env.SMTP_USER}>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Keeps user-supplied text out of header line breaks. */
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function leadRows(lead: LeadRecord): [string, string][] {
  const currentSystem = lead.currentSystem
    ? lead.currentErp
      ? `${lead.currentSystem} (${lead.currentErp})`
      : lead.currentSystem
    : "";
  const rows: [string, string | null | undefined][] = [
    ["School", lead.schoolName],
    ["City", lead.city],
    ["Students", lead.studentCount],
    ["Boards", lead.boards.join(", ")],
    ["Campuses", lead.campuses],
    ["Contact", lead.contactName],
    ["Role", lead.role],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Preferred contact", lead.preferredContact],
    ["Interested in", lead.modules.join(", ")],
    ["Current system", currentSystem],
    ["Planned go-live", lead.goLive],
    ["Message", lead.message],
    ["Consent", "Agreed to be contacted about this request"],
  ];
  return rows.filter((row): row is [string, string] => !!row[1]);
}

function renderLeadEmailHtml(lead: LeadRecord): string {
  const rows = leadRows(lead)
    .map(
      ([label, value]) => `
    <tr>
      <td style="padding:8px 12px;font-size:13px;font-weight:600;color:#5C6A61;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;font-size:14px;color:#1E3329;white-space:pre-wrap;">${escapeHtml(value)}</td>
    </tr>`
    )
    .join("");

  return `
  <div style="font-family:-apple-system,Segoe UI,Inter,Arial,sans-serif;max-width:620px;margin:0 auto;">
    <div style="background:#1E3329;padding:24px 28px;border-radius:16px 16px 0 0;">
      <p style="margin:0;color:#EFD080;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">
        New demo request
      </p>
      <h1 style="margin:8px 0 0;color:#fff;font-size:20px;">${escapeHtml(lead.schoolName)}</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #DCDFD6;border-top:none;">
      ${rows}
    </table>
    <p style="padding:16px 12px;font-size:12px;color:#5C6A61;border-radius:0 0 16px 16px;background:#fff;border:1px solid #DCDFD6;border-top:none;margin:0;">
      Submitted via the ${siteName} website demo form. Reply directly to this email to reach
      ${escapeHtml(lead.contactName)}.
    </p>
  </div>`;
}

/**
 * Sends the lead to LEAD_NOTIFICATION_EMAIL. Throws (never fakes success) if SMTP or the
 * notification inbox is not configured or sending fails, so the caller can report that honestly.
 */
export async function sendLeadNotificationEmail(lead: LeadRecord): Promise<void> {
  const to = getNotificationAddress();
  const transporter = getTransporter();

  await transporter.sendMail({
    from: fromAddress(),
    to,
    replyTo: lead.email,
    subject: oneLine(`New demo request — ${lead.schoolName}, ${lead.city}`),
    html: renderLeadEmailHtml(lead),
    text: leadRows(lead)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n"),
  });
}

const contactChannelPhrase: Record<NonNullable<LeadRecord["preferredContact"]>, string> = {
  Phone: "by phone",
  WhatsApp: "on WhatsApp",
  Email: "by email",
};

/**
 * Confirms receipt to the person who submitted the form. Best-effort: the caller must not fail the
 * request if this throws. Only fixed copy and the chosen options (boards, modules) are included — never
 * the name, school or message — so the form cannot be used to relay arbitrary text to a third party.
 */
export async function sendLeadAcknowledgementEmail(lead: LeadRecord): Promise<void> {
  const replyTo = getNotificationAddress();
  const transporter = getTransporter();

  const channel = lead.preferredContact ? ` ${contactChannelPhrase[lead.preferredContact]}` : "";
  const steps = [
    `We read your request: your boards (${lead.boards.join(", ")}), school size and the areas you chose (${lead.modules.join(", ")}).`,
    `We contact you within one business day${channel} to agree a time for a walkthrough.`,
    `We take you through those areas live. ${siteName} is in early access, so we will be clear about what is available today and what is still being built.`,
  ];
  const channels: [string, string, string][] = [
    ["Phone", contact.phoneDisplay, contact.phoneHref],
    ...(contact.whatsappHref ? [["WhatsApp", "Message us", contact.whatsappHref] as [string, string, string]] : []),
    ...(contact.email && contact.emailHref ? [["Email", contact.email, contact.emailHref] as [string, string, string]] : []),
    ...(contact.bookingHref ? [["Book a time", contact.bookingHref, contact.bookingHref] as [string, string, string]] : []),
  ];
  const privacyUrl = `${siteUrl}/privacy`;

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Inter,Arial,sans-serif;max-width:620px;margin:0 auto;color:#1E3329;">
    <div style="background:#1E3329;padding:24px 28px;border-radius:16px 16px 0 0;">
      <p style="margin:0;color:#EFD080;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">${siteName}</p>
      <h1 style="margin:8px 0 0;color:#fff;font-size:20px;">We've received your demo request</h1>
    </div>
    <div style="background:#fff;border:1px solid #DCDFD6;border-top:none;border-radius:0 0 16px 16px;padding:20px 28px;font-size:15px;line-height:1.6;">
      <p style="margin:0 0 12px;">Hello,</p>
      <p style="margin:0 0 12px;">Thank you for asking about a ${siteName} walkthrough for your school.</p>
      <p style="margin:16px 0 8px;font-weight:700;">What happens next</p>
      <ol style="margin:0 0 16px;padding-left:20px;">
        ${steps.map((s) => `<li style="margin-bottom:6px;">${escapeHtml(s)}</li>`).join("")}
      </ol>
      <p style="margin:16px 0 8px;font-weight:700;">Want to reach us sooner?</p>
      <ul style="margin:0 0 16px;padding-left:20px;">
        ${channels
          .map(
            ([label, text, href]) =>
              `<li>${label}: <a href="${escapeHtml(href)}" style="color:#1E3329;">${escapeHtml(text)}</a></li>`
          )
          .join("")}
      </ul>
      <p style="margin:16px 0 0;font-size:13px;color:#5C6A61;">
        If you did not make this request, you can ignore this email. We use these details only to respond to the
        request — see our privacy notice: <a href="${privacyUrl}" style="color:#5C6A61;">${privacyUrl}</a>
      </p>
    </div>
  </div>`;

  const text = [
    "Hello,",
    "",
    `Thank you for asking about a ${siteName} walkthrough for your school.`,
    "",
    "What happens next",
    ...steps.map((s, i) => `${i + 1}. ${s}`),
    "",
    "Want to reach us sooner?",
    ...channels.map(([label, text, href]) => `${label}: ${href.startsWith("tel:") || href.startsWith("mailto:") ? text : href}`),
    "",
    `If you did not make this request, you can ignore this email. We use these details only to respond to the request. Privacy notice: ${privacyUrl}`,
  ].join("\n");

  await transporter.sendMail({
    from: fromAddress(),
    to: lead.email,
    replyTo,
    subject: `We've received your demo request — ${siteName}`,
    html,
    text,
  });
}
