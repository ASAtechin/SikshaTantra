# Shikshatantra

**A school-management ERP experience, presented with DigiBoard digital signage.**

Shikshatantra is the customer-facing product website for a planned, modular school ERP. It explains how the system is intended to support school operations, demonstrates the DigiBoard signage concept, and lets school representatives request an implementation discussion.

> Product and workflow details on this site describe the current specification. They are not a claim that every module is already deployed or generally available. Actual implementation scope, integrations, applicable policies, timelines, and pricing must be confirmed for each school.

## Website

- `/` — Product overview, school workflow pain points, interactive module explorer, DigiBoard introduction, comparison, rollout approach, and implementation CTA.
- `/features` — Index of the ERP modules.
- `/features/[slug]` — Module-specific explanation, workflow steps, capabilities, and visual interface mockup.
- `/digiboard` — Dedicated overview of campus digital signage, schedule updates, alerts, and offline behavior.
- `/request-demo` — Three-step school implementation request form.
- `POST /api/lead` — Validates submissions, sends an email notification, and optionally stores a secondary copy in MongoDB.

## ERP Modules Presented

The feature pages cover admissions and enrollment, identity and access, attendance, timetable and substitutions, assessment and report cards, fees and finance, communication, transport, library and inventory, HR and staff, child safeguarding, and governance and analytics.

DigiBoard is presented as the companion signage product, showing campus information sourced from the same school workflows. The detailed pages are generated from shared module data in `lib/modules-data.ts` so the overview and module pages stay aligned.

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS v4
- Framer Motion and Lucide icons
- React Hook Form and Zod validation
- Nodemailer for SMTP notifications
- Mongoose for optional MongoDB lead persistence

## Local Development

Requirements: Node.js compatible with Next.js 16 and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The site itself can be browsed without SMTP or MongoDB credentials; the implementation-request form needs working SMTP credentials to send submissions. MongoDB is optional and stores only a secondary copy.

## Environment Configuration

Set these in the ignored `.env.local` file or your deployment platform's secret settings:

| Variable | Required | Purpose |
|---|---:|---|
| `SMTP_HOST` | Yes, for email | SMTP server hostname, e.g. `smtp.gmail.com`. |
| `SMTP_PORT` | Yes, for email | SMTP port, usually `587` with STARTTLS. |
| `SMTP_SECURE` | Yes, for email | `true` for implicit TLS (typically port 465); otherwise `false`. |
| `SMTP_USER` | Yes, for email | SMTP sender account username. |
| `SMTP_PASS` | Yes, for email | SMTP password or provider app-password. Never commit this value. |
| `SMTP_FROM` | No | Display name/address. Defaults to the configured SMTP account. |
| `LEAD_NOTIFICATION_EMAIL` | No | Destination inbox; defaults to `aditya26.upadhyay@gmail.com`. |
| `MONGODB_URI` | No | MongoDB connection string for secondary lead storage. Leads use the `leadrequests` collection in the selected database. |

For Gmail, enable 2-Step Verification and create an App Password from the Google Account security settings. Use that App Password as `SMTP_PASS`; do not use the normal Google account password. Provider-specific SMTP access and account policies apply.

The API returns an honest `503` when email delivery is not configured or fails. It does not report a successful request unless the notification email was accepted by the SMTP transport. Database persistence is best-effort after successful email delivery; database errors are logged server-side and do not silently discard the email.

## Production Build and Run

```bash
npm run build
npm run start
```

Before deployment:

1. Configure production SMTP credentials and the destination inbox as deployment secrets.
2. Decide whether to enable MongoDB lead persistence and configure an appropriately scoped database user if needed.
3. Replace demo contact details (phone number, address, and email branding) with approved business contact information.
4. Configure the production domain, HTTPS, monitoring, backups/retention for lead data, and a production rate limiter appropriate to the hosting environment.
5. Submit a real end-to-end request and verify delivery to the intended inbox before announcing the form as live.

## Data and Security Notes

- `.env.local` and other `.env.*` files are ignored by Git; `.env.example` contains blank placeholders only.
- Form data is schema-validated on the server. A honeypot and a basic per-process rate limit provide initial spam friction; the in-memory limiter is not distributed and should be replaced or supplemented for a multi-instance production deployment.
- A MongoDB write is optional and secondary to notification email. Restrict the database user to the target database and limit retained lead data according to an approved privacy policy.
- The current SMTP destination default and contact details are project defaults and must be reviewed before public production launch.

## Scripts

```bash
npm run dev      # local development
npm run build    # production build and type-check
npm run start    # serve the production build
npm run lint     # run ESLint
```
