# Shiksha Tantra — Review Remediation Plan

Branch: `fix/site-review-remediation` (created from `main`). Nothing is committed by agents; the owner commits after review.

Source: the October 2026 review (education, ERP, and four design reviews). This plan turns its findings into
workstreams with strict file ownership so several engineers can work in parallel without conflicts.

---

## Master prompt (paste into any new session to resume)

```text
You are the integration lead for the Siksha Tantra website remediation.
Repo: /home/rntbci/Personal Projects/Digi-Board/shikshatantra, branch fix/site-review-remediation.

1. Read docs/remediation/PLAN.md (this file) and every docs/remediation/status/*.md.
2. Find workstreams whose status is not DONE. Respect the wave order: W0 before W1; W2 (QA) last.
3. For each unfinished workstream, start an engineer agent with the prompt in the "Engineer prompts" section,
   adding: "Resume: read docs/remediation/status/<ID>.md first and continue from it."
   Independent W1 workstreams run in parallel.
4. When all W1 streams are DONE, run W2 QA. Fix or re-dispatch what QA reports.
5. Do not commit or push unless the owner asks. Report what changed, what was verified, and open decisions.
```

## Resume protocol (usage limits / new session)

- Every engineer writes `docs/remediation/status/<ID>.md` with: status (IN PROGRESS / DONE / BLOCKED),
  completed items, remaining items, files touched, and verification run. Update it before stopping.
- A new session uses the master prompt above. Work already on disk is kept; agents continue from their status file.

---

## Decisions taken by default (owner to confirm — flagged, not invented)

| # | Decision | Default used | Owner action |
|---|---|---|---|
| D1 | Brand spelling | Keep "Siksha Tantra" (no rename) | Decide Siksha vs Shiksha; domain uses "shiksha" |
| D2 | Contact email | `hello@shikshatantra.in` does not exist (NXDOMAIN). Email comes from `NEXT_PUBLIC_CONTACT_EMAIL`; if unset, email links are hidden | Set a working mailbox |
| D3 | WhatsApp / calendar | From `NEXT_PUBLIC_WHATSAPP_NUMBER` / `NEXT_PUBLIC_BOOKING_URL`; hidden if unset | Provide number / booking link |
| D4 | Positioning | Honest "Early access — onboarding founding schools" line; claims rephrased to "designed to…"; no "live on your data" promises | Confirm wording |
| D5 | Pricing | Page explains how pricing is set; no numbers invented | Add real packages when ready |
| D6 | Libraries | One library at `/library` with URL routes; homepage "Living books" links there; canvas dialogs leave the homepage | — |
| D7 | Medium filter | Hidden until non-English content exists; library labelled "sample, not board-specific" | Source board-aligned content |
| D8 | Legal | Factual privacy notice written from what the code does, marked "pending legal review"; no Terms page | Legal review; Terms |
| D9 | About / team | Not created (no verified facts) | Provide team facts |
| D10 | Lead inbox | Default personal Gmail removed; `LEAD_NOTIFICATION_EMAIL` required | Set shared business inbox; confirm prod SMTP is not Ethereal |

---

## Shared contracts (built in W0, used by everyone)

- `lib/site.ts` exports `contact` (`phoneDisplay`, `phoneHref`, `email | null`, `whatsappHref | null`,
  `bookingHref | null`), `CTA` labels (`primary: "Book a demo"`, `secondary: "See all modules"`),
  and `siteStatus` (early-access line). No component hard-codes phone/email/CTA text after W1.
- `components/ui/Dialog.tsx`: accessible modal (portal, focus in + trap, `inert` background, Escape,
  focus return, scroll lock, `max-height: calc(100dvh - 2rem)`, full scrim, z-index above floating CTAs).
- Design tokens in `app/globals.css`: the canvas palette becomes the system (paper `#F7F5EE`,
  primary `#263E34`, accent on dark `#EFD080`, ochre text `#7A5A1E`, muted text `#5C6A61`).
  Existing `brand-*`, `amber-*`, `teal-*` utility names are remapped to AA-checked values so pages
  change palette without class rewrites. Text tokens: `ink`, `ink-muted`, `ink-subtle` all ≥ 4.5:1 on paper.
- Type floor: no text below 12px; body 16px. Use `Button`/`LinkButton` (3 sizes) and `SectionHeading`.
- Motion: `MotionConfig reducedMotion="user"` at the root; content never server-renders at `opacity:0`.

---

## Workstreams and file ownership

Only edit files you own. Need a change elsewhere? Write it under "Requests" in your status file.

| ID | Wave | Engineer | Owns | Must deliver |
|---|---|---|---|---|
| W0 | 0 | Foundation | `app/globals.css`, `app/layout.tsx`, `app/icon.svg`, `app/favicon.ico`, `app/not-found.tsx`, `app/opengraph-image.tsx`, `components/ui/**`, `lib/site.ts`, `lib/utils.ts`, `components/landing/motion-primitives.tsx`, `components/landing/ReducedMotionProvider.tsx` | Shared contracts above; branded 404 with links; monogram favicon replacing the Next default; `lang="en-IN"`; skip link; italic font face; Reveal visible without JS; OG image in brand font |
| W1-A | 1 | Homepage | `app/page.tsx`, `components/spatial/SpatialCanvas.tsx`, `components/spatial/CommandDock.tsx`, `components/spatial/ContactHub.tsx`, `components/spatial/SchoolOperationsSimulator.tsx`, `components/landing/LandingSections.tsx` | Fix mobile scroll trap; shared Navbar on home (mobile menu); buyer-first hero (H1 names the category, "Book a demo" + "See all modules"); remove X/Y readout, "Drag to wander", decorative pill; "Living books" → `/library`; remove CurriculumExplorer/LivingBookReader dialogs from home (do not delete files); Ideas-in-motion CTA; panels & simulator use `Dialog`; floating CTA never covers content or dialogs; simulator data fixes (Paid vs balance; RTE seat = fee waived, Classes ≤ 8 only; CBSE grades match marks + co-scholastic row; WhatsApp absence alert naming the selected student; per-student data); trust strip → buyer benefits with pause control; who-it's-for strip; safeguarding band; onboarding steps section; FAQ teaser; contrast & 12px floor in owned files |
| W1-B | 1 | Navigation & pages | `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`, `app/pricing/**`, `app/security/**`, `app/faq/**`, `app/privacy/**`, `app/how-it-works/**`, `app/sitemap.ts`, `app/robots.ts`, `components/sections/**` | One sticky Navbar for every page incl. home (keyboard-accessible grouped modules menu showing all 12, `aria-expanded`, Escape; mobile menu; "Learning library" link; Pricing; "Book a demo"); Footer with Library, Pricing, Security, FAQ, Privacy links, fixed "Bengaluru, Karnataka", contact from `lib/site.ts`; new pages Pricing (model only), Security & Privacy (what exists vs planned, DPDP posture), FAQ, Privacy notice (factual, pending legal review), How it works / onboarding (reuse HowItWorks content, no SLA promises); delete unused sections; sitemap updated |
| W1-C | 1 | ERP content | `lib/modules-data.ts`, `components/illustrations/**`, `app/features/page.tsx`, `app/features/[slug]/page.tsx`, `app/digiboard/page.tsx` | Fix module heroes (no 0px bars; per-module mockups with labelled realistic Indian-school content for all 12); remove internal tags (ADM, IAM…); honest wording ("designed to…"); Indian framing (POCSO reporting, NCPCR/CBSE safety, police verification, DPDP "data principal", UDISE+/APAAR/CBSE registration exports, RTE quota, instalments/late fees/UPI/Tally/tuition-fee certificates, PF/ESI/PT/TDS inputs, WhatsApp/SMS/regional languages); add "Also in scope" section listing parent app, portals, SIS, homework, exams, promotion, multi-campus as planned; per-page closing CTA; `/digiboard` fix `/#features` → `/features`, remove "included with every plan", separate "available today" (scheduling, substitutions, emergency broadcast) from "planned" |
| W1-D | 1 | Lead pipeline | `components/sections/RequestDemoForm.tsx`, `lib/validation.ts`, `lib/form-options.ts`, `app/api/lead/route.ts`, `lib/email.ts`, `lib/models/LeadRequest.ts`, `lib/mongodb.ts`, `app/request-demo/page.tsx`, `.env.example`, `.env.local.example` | Fix self-submit; plain error messages; radiogroup/`aria-pressed` states; `aria-invalid` + `aria-describedby`; focus first error; success `role=status`; `autocomplete`; no autofocus on load; new fields (boards multi-select, campuses, current system, go-live term, contact preference; learning library + Identity & Access + Governance options); privacy link + consent text; honeypot handled before schema; acknowledgement email to the school; no personal-Gmail default; WhatsApp/booking alternatives from `lib/site.ts`; lazy-load form where opened in a dialog is W1-A's call — export the form so it can be `next/dynamic` imported |
| W1-E | 1 | Learning library | `app/library/**`, `components/library/**`, `lib/library/**`, `components/spatial/CurriculumExplorer.tsx`, `components/spatial/LivingBookReader.tsx`, `lib/curriculum-demo-data.ts`, `lib/curriculum-types.ts` (keep `ERPSimulationState` exported) | URL routes `/library` → `/library/[board]/[grade]/[subject]` → `.../[chapter]` (static params, metadata, content visible without JS); browser Back works; saved progress in `localStorage` (try/catch), progress = chapters read; honest sample labelling, hide medium filter; streams only for 11–12; stage names per NEP (Foundational/Preparatory/Middle/Secondary); takeaways check = recall questions with reveal + feedback built from existing key points (no new facts); interactive sample widgets moved in only where the chapter matches (pattern → "Patterns and rules"; force → "Forces and laws"/"Forces and energy"), fixed (3→6→9→12 sequence, a = F/m); reword ambiguous bullets ("Series shares current…", "Fast clocks run slow"); a11y (pressed states, fieldset/legend, focus to new heading); CTA "Bring this library to your school"; minutes computed from word count |
| W2 | 2 | QA & integration | read-only first, then small fixes anywhere | `npm run lint`, `npx tsc --noEmit`, `npm run build`; Playwright regression on a production server: scroll at 390/768, form never auto-submits (intercept `/api/lead`), all 12 module heroes non-empty, dialogs take focus + Escape, no text < 12px, contrast ≥ 4.5:1 sample, no-JS visibility, no horizontal overflow 320–1440, all internal links resolve; delete files no longer imported; README update; final report |

---

## Global engineering rules

- Next.js 16: read the relevant guide in `node_modules/next/dist/docs/` before using an API you are unsure of.
- Do not run `npm run build`, `next dev` or `next start` in W1 (shared `.next/`). Verify with
  `npx tsc --noEmit` and `npx eslint <your files>`. Only W2 builds.
- Never submit the real form to `/api/lead` (it sends email and writes to MongoDB). Intercept it in tests.
- No invented facts: no customer names, prices, certifications, team bios, SLAs, or curriculum content
  beyond rewording what exists. Unknowns become clearly marked placeholders or env-driven values.
- Match the surrounding code style; keep comments sparse. Do not commit.

---

## Owner decisions applied (14 October 2026)

- D1 Brand spelling: **Shiksha Tantra** (renamed site-wide).
- D2 Contact email: `listen@shikshatantra.shop` (default in `lib/site.ts`). The domain needs MX records to receive mail.
- D3 WhatsApp: `9407174355` (→ `wa.me/919407174355`). Booking: the site's own `/request-demo` form; no external scheduler.
- D4 "We reply within one business day" is a confirmed commitment.
- D5 Pricing: set per school by communication volume and the scale of use the school commits to; no rate card.
- D8 Privacy notice: reviewed and final. Student records retained 10 years from the passing out of the child's class.
- D10 Lead inbox: `aditya26.upadhyay@gmail.com` (default in `lib/email.ts`; `LEAD_NOTIFICATION_EMAIL` overrides).
