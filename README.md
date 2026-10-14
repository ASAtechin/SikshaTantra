# Shikshatantra

**School ERP, DigiBoard campus screens and a sample learning library for Indian schools.**

Shikshatantra is the customer-facing product website for a planned, modular school ERP. It explains how the system is intended to support school operations, demonstrates the DigiBoard signage concept, and lets school representatives request a demo.

> Product and workflow details on this site describe the current specification. They are not a claim that every module is already deployed or generally available. Actual implementation scope, integrations, applicable policies, timelines, and pricing must be confirmed for each school.

## Early Access Positioning

Shiksha Tantra is in early access: we are onboarding founding schools and shaping each module with them. The site says so in the status banner, on every module page and in the footer (`siteStatus` in `lib/site.ts`). Copy describes what each module is *designed to* do, separates what works today in the DigiBoard foundation from what is being built, and makes no claims about customers, certifications, service levels or prices. Module screens are labelled "Illustrative" and use fictional data. Keep new copy to the same standard.

## Website

- `/` — Buyer-first homepage: the hero names the category with "Book a demo" and "See all modules", four portals (learning library, School ERP panel, How learning works, DigiBoard), the operations simulator dialog, who it's for, grouped modules, safeguarding, onboarding steps and an FAQ teaser. Below 1024px a sticky bar opens the demo form in a dialog.
- `/features` — All twelve ERP modules grouped by the work they support, plus an "Also in scope (planned)" list.
- `/features/[slug]` — One page per module: illustrative screen, how it is designed to work, what it covers, details for Indian schools and related modules.
- `/digiboard` — Campus display screens: what works today in the DigiBoard foundation versus what is being built for school-wide rollout.
- `/library` — Sample learning library (not board-specific content). Filters for board, class and stream (11–12) and search are plain URL parameters (`?board=&grade=&stream=&q=`), so the shelf works without JavaScript.
- `/library/[board]` and `/library/[board]/[grade]` — Redirect to the matching shelf.
- `/library/[board]/[grade]/[subject]` — A book: chapters for that class, reading time and saved progress.
- `/library/[board]/[grade]/[subject]/[chapter]` — Chapter reader with text size, read aloud (where the browser supports it), "Check yourself" recall prompts, and interactive widgets on matching chapters. Board slugs: `cbse`, `cisce`, `maharashtra`, `karnataka`, `uttar-pradesh`. Chapters are identical across boards, so book and chapter pages declare the CBSE URL as canonical. Reading progress is stored only in the visitor's browser (`localStorage`).
- `/pricing` — How pricing is set for a school (no published numbers).
- `/how-it-works` — Onboarding stages and what we need from the school.
- `/security` — Security design goals during early access and the DPDP Act 2023 position.
- `/faq` — Common questions (with FAQPage structured data).
- `/privacy` — Privacy notice for this website (reviewed and final).
- `/request-demo` — Three-step demo request form.
- `POST /api/lead` — Validates submissions, emails the lead to the sales inbox, sends an acknowledgement to the submitter, and optionally stores a copy in MongoDB.
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon.svg`, `/apple-icon` — Generated metadata routes. Unknown URLs render a branded 404.

## ERP Modules Presented

The feature pages cover admissions and enrollment, identity and access, attendance, timetable and substitutions, assessment and report cards, fees and finance, communication, transport, library and inventory, HR and staff, child safeguarding, and governance and analytics.

DigiBoard is presented as the companion signage product, showing campus information sourced from the same school workflows. The detailed pages are generated from shared module data in `lib/modules-data.ts` so the overview, navigation menu, homepage and module pages stay aligned.

## Simulator and Library Boundaries

The operations simulator on the homepage uses local fictional data for three learners (fees and instalments, an RTE seat, roll call with a WhatsApp absence alert, CBSE-style term marks, transport and substitutions). It is a demonstration, not a claim that these workflows are live.

The learning library is **sample content**, written in-house and grouped by NEP stage (Foundational, Preparatory, Middle, Secondary, Senior Secondary). It is not an official NCERT/CISCE/state-board catalogue or reproduced textbook material, and the UI labels it as such. The catalogue lives in `lib/library/` (`catalog.ts` builds shelves, books and chapter routes; `grade-bands.ts` hides topics that do not suit a class). Before presenting board-specific or official chapters, add a verified content source with edition and rights metadata, and have each mapping reviewed by the responsible curriculum owner. English is the only medium for now.

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

Open `http://localhost:3000`. The site itself can be browsed without SMTP or MongoDB credentials; the demo form needs working SMTP credentials to send submissions. MongoDB is optional and stores only a secondary copy.

## Environment Configuration

Set these in the ignored `.env.local` file or your deployment platform's secret settings (see `.env.example`):

| Variable | Required | Purpose |
|---|---:|---|
| `SMTP_HOST` | Yes, for email | SMTP server hostname, e.g. `smtp.gmail.com`. `smtp.ethereal.email` is a test-only service that never delivers mail; the server logs a warning if it is used in production. |
| `SMTP_PORT` | Yes, for email | SMTP port, usually `587` with STARTTLS. |
| `SMTP_SECURE` | Yes, for email | `true` for implicit TLS (typically port 465); otherwise `false`. |
| `SMTP_USER` | Yes, for email | SMTP sender account username. |
| `SMTP_PASS` | Yes, for email | SMTP password or provider app-password. Never commit this value. |
| `SMTP_FROM` | No | Display name/address. Defaults to the configured SMTP account. |
| `LEAD_NOTIFICATION_EMAIL` | No | Inbox that receives every demo request. Defaults to `aditya26.upadhyay@gmail.com`. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Contact mailbox shown on the site and in acknowledgement emails. Defaults to `listen@shikshatantra.shop`; the domain needs mail (MX) records to receive it. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | WhatsApp number, digits only. Defaults to `9407174355`; a 10-digit Indian mobile gets the `91` country code automatically. |
| `NEXT_PUBLIC_BOOKING_URL` | No | Optional external scheduler. Leave empty: the site's own `/request-demo` form is the booking form. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | Cloudflare Turnstile site key; renders the spam check in the form. Set together with the secret key, or leave both empty. |
| `TURNSTILE_SECRET_KEY` | No | Cloudflare Turnstile secret; when set, `/api/lead` verifies the token. |
| `NEXT_PUBLIC_SITE_URL` | No | Public origin (no trailing slash) for canonical URLs, Open Graph, robots and sitemap. |
| `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` | No | Search-console ownership tokens. |
| `MONGODB_URI` | No | MongoDB connection string for secondary lead storage. Leads use the `leadrequests` collection in the selected database. |

`NEXT_PUBLIC_*` values are inlined at build time: rebuild after changing them.

For Gmail, enable 2-Step Verification and create an App Password from the Google Account security settings. Use that App Password as `SMTP_PASS`; do not use the normal Google account password. Provider-specific SMTP access and account policies apply.

The API returns an honest `503` when email delivery is not configured or fails. It does not report a successful request unless the notification email was accepted by the SMTP transport. The acknowledgement email to the submitter and the database copy are best-effort after that; their errors are logged server-side and do not fail the request.

## Production Build and Run

```bash
npm run build
npm run start
```

Before deployment:

1. Configure production SMTP credentials (not Ethereal). Leads go to `LEAD_NOTIFICATION_EMAIL` (default `aditya26.upadhyay@gmail.com`).
2. Decide whether to enable MongoDB lead persistence and configure an appropriately scoped database user if needed.
3. Set up mail (MX records) for `shikshatantra.shop` so `listen@shikshatantra.shop` receives email. Contact defaults live in `lib/site.ts`.
4. Configure the production domain, HTTPS, monitoring, backups/retention for lead data, and a production rate limiter appropriate to the hosting environment.
5. Submit a real end-to-end request and verify delivery to the intended inbox before announcing the form as live.

## Analytics and Lead Attribution

- **Vercel Web Analytics** (`<Analytics />` in `app/layout.tsx`) counts page views without cookies. Enable it once in the Vercel project (Analytics tab) or the script is not served. A successful demo request also sends a `Demo request` custom event with its source (custom events need a Vercel Pro plan).
- **Lead attribution** (`lib/attribution.ts`): the first page of a tab session records `utm_source`/`utm_medium`/`utm_campaign` (or `?ref=`), the external referrer and the landing page in `sessionStorage`. The demo form sends it with the lead; it appears as "Came from" in the lead email and as `attribution` in MongoDB.
- Tag every outreach link so leads show their channel, for example:
  - WhatsApp: `https://www.shikshatantra.shop/?utm_source=whatsapp&utm_campaign=bengaluru-principals`
  - Brochure QR code: `https://www.shikshatantra.shop/request-demo?utm_source=brochure&utm_medium=qr&utm_campaign=school-visits`
  - LinkedIn post: `https://www.shikshatantra.shop/?utm_source=linkedin&utm_medium=social`
- The `/privacy` notice describes both; keep it in step with any change here.

## Search Engines

- Google Search Console and Bing Webmaster Tools are verified by the meta tags in `app/layout.tsx` (Google also by `public/googlee2077de8374a0d66.html`). Submit `https://www.shikshatantra.shop/sitemap.xml` in both.
- `npm run indexnow` submits every sitemap URL to IndexNow (Bing, Yandex and others) using the key file `public/9d87829647ba6d8baf46e25cb9c9ce19.txt`. Run it after a production deploy that adds or changes pages.

## Data and Security Notes

- `.env.local` and other `.env.*` files are ignored by Git; `.env.example` contains blank placeholders only.
- Form data is schema-validated on the server. A honeypot, a basic per-process rate limit (5 valid requests per IP per 10 minutes, held in memory only) and optional Cloudflare Turnstile provide spam friction; the in-memory limiter is not distributed and should be replaced or supplemented for a multi-instance production deployment.
- A MongoDB write is optional and secondary to notification email. Restrict the database user to the target database and limit retained lead data according to an approved privacy policy.
- Contact and lead-inbox defaults are in `lib/site.ts` and `lib/email.ts`; the `/privacy` notice describes exactly what the form collects and is final. Student records are retained for 10 years from the passing out of the child's class.

## Scripts

```bash
npm run dev      # local development
npm run build    # production build and type-check
npm run start    # serve the production build
npm run lint     # run ESLint
npm run indexnow # submit the live sitemap to IndexNow (after deploy)
```
