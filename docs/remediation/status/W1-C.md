# W1-C — ERP content: status

**Status: DONE** (2026-10-14). Not built or run in a browser (per W1 rules). `npx tsc --noEmit`: no errors in W1-C files (remaining errors at time of check were only in W1-E's in-progress `components/library/**`). `npx eslint lib/modules-data.ts components/illustrations app/features app/digiboard` → exit 0. All 12 mockups + SignageIllustration rendered to static HTML with react-dom/server (via jiti) without errors.

## Files touched (all owned)
- `lib/modules-data.ts` — rewritten copy; new fields/exports (see contract below).
- `components/illustrations/ModuleMockup.tsx` — rebuilt: 12 per-module static mini-screens.
- `components/illustrations/SignageIllustration.tsx` — static (no framer, no opacity-0 SSR), palette tokens, text ≥ 12px, "Illustrative" chip, sr-only caption.
- `components/illustrations/HeroIllustration.tsx`, `ConnectIllustration.tsx`, `SafeguardingIllustration.tsx` — only text-size/contrast fixes, invented numbers replaced, "LIVE" → "Illustrative", chart container given a height. **These three are not imported by any live page** (only by `components/sections/Hero.tsx` / `CTASection.tsx`, themselves unused) → W2 may delete them together with those sections.
- `app/features/page.tsx`, `app/features/[slug]/page.tsx`, `app/digiboard/page.tsx` — rewritten.

## Contract changes in `lib/modules-data.ts` (backward compatible)
- Unchanged exports/fields: `modules`, `getModule`, `getAdjacentModules`, `ModuleDetail.{slug,icon,name,tag,tagline,summary,accent,mockup,steps,capabilities}`, `MockupKind`, `ModuleStep`, `ModuleCapability`.
- `tag` kept (string) but **must not be rendered** (internal code).
- Added to `ModuleDetail`: `group: ModuleGroup` ("Admissions & records" | "Academics" | "Fees & finance" | "Safety" | "Staff & operations" | "Leadership"), `audience: string`, `indiaDetails: string[]`, `currentState?: string` (timetable only — what exists in the DigiBoard foundation).
- New exports: `ModuleGroup`, `moduleGroups` (name + description, display order), `plannedModules` (9 planned items from the spec: parent app, student/teacher/principal portals, SIS, homework, exam management, promotion, multi-campus), `getRelatedModules(slug, count)`, `getModulesByGroup()`.
- `ModuleMockup` props: `{ slug?: string; kind?: MockupKind; accent?: string; className?: string }` — pass `slug` for the module's own screen; `kind` only as legacy fallback (FeatureGrid still compiles).

## Delivered vs brief
1. Heroes: every module has its own labelled mock screen (Indian details: Class VIII-A, roll numbers, ₹ ledger that adds up — payable ₹22,250 = paid ₹16,250 + balance ₹6,000 —, UPI, PTM in English + Hindi, DLT SMS, Route 4 stops with police-verified driver and female attendant, CBSE A1/A2/B1 grades matching marks + co-scholastic row, Period 4 substitution with load, police verification gating access, authorised pickup with photo check + refused pickup, visitor log, consent meter, UDISE+/APAAR chips). "Illustrative" chip + visible caption "Illustrative screen with fictional data"; inner screen `aria-hidden`, sr-only description per module. Charts: explicit px heights, value + axis labels, axis from 0. Static server markup (no JS, nothing at opacity 0). No text < 12px.
2. Honest copy: "designed to…"/"planned" throughout; absolutes removed; module CTA → `CTA.primary`, closing "Walk through how X is designed for your school"; early-access line from `siteStatus` in each module hero.
3. Tags removed from W1-C UI; `group` shown (badge on module page, label on cards).
4. India details: 6–7 bullets per module ("In Indian schools — Details your team will ask about"). GDPR "data-subject request" removed (identity uses DPDP Act 2023 "data principal", "verifiable parental consent"; governance no longer mentions it). Safeguarding reframed around POCSO s.19-style reporting to police/SJPU (system must never hold back a report), POCSO/child-protection committee, NCPCR + CBSE safety guidance, pickup list with photos, visitor log, consents, POSH IC. "Safeguarding Lead", "court-order", "sealed", "24-hour escalation clock" removed.
5. `/features`: grouped sections with jump nav, plain cards (icon, name, group, tagline), DigiBoard link card, "Also in scope (planned)" (no dates), closing CTA, early-access line.
6. `/features/[slug]`: `<main id="main" tabIndex={-1}>`, breadcrumb `nav[aria-label=Breadcrumb]` with `aria-current="page"`, hero (group badge, h1, tagline, summary, "Used by", currentState note for timetable, early-access line, Book a demo + See all modules), mockup, "How it is designed to work" (ordered list, "Step n"), "What the module covers", India details, related modules (same group first), closing CTA with phone from `contact`. Metadata shape unchanged.
7. `/digiboard`: `main#main`; CTAs → `CTA.primaryHref` / `CTA.secondaryHref` (no `/#features`); "included with every plan" removed; "Working today in the DigiBoard foundation" (8 items per spec §12.1) vs "Being built for school-wide rollout" (5 items, each tagged "Being built"); "Where it is used"; "What you need" (existing TVs/displays, player device per screen, network, site survey); naming line "display screens, not a classroom smartboard or interactive panel"; dark hero and closing CTA kept.
8. A11y in owned files: text-ink / ink-muted tokens (no brand-950 opacity < /70 on light), headings h1→h2→h3 in order, decorative blobs `aria-hidden`, icons `aria-hidden`, arrows `motion-reduce:transform-none`.

## Requests for other workstreams
- **W1-A (`components/landing/LandingSections.tsx:104`)** and **W1-B (`components/layout/Navbar.tsx:103`)**: still render `module.tag` / `m.tag` (ADM, IAM…). Please render `m.group` instead (or nothing). Field stays for compatibility.
- **W1-B**: `components/sections/FeatureGrid.tsx` (if kept) should pass `slug={mod.slug}` to `ModuleMockup` and stop rendering `mod.tag`. If sections are deleted, `HeroIllustration`, `ConnectIllustration`, `SafeguardingIllustration` become dead — W2 can delete them.
- **W1-D**: module list for the form can come from `modules` (name/slug) — unchanged.

## For W2 QA
- `/features/<each of 12 slugs>`: mockup visible, non-empty, labelled "Illustrative"; bar charts (attendance, governance) have visible bars and labels; no element with computed font-size < 12px; no horizontal overflow at 320–390px (watch: identity-access permission table, transport stop rows, timetable rows).
- No "ADM/IAM/CUR/OPS/PSN/SFG/GOV/ATT/ASM/FIN/COM" text on /features, /features/*, /digiboard.
- Skip link focuses `main#main` on /features, /features/[slug], /digiboard; breadcrumb has `aria-current="page"`.
- Links: `/features#planned`, group anchors, related-module links, `/digiboard` card, all CTAs → `/request-demo` and `/features`.
- Copy grep: no "GDPR", "data-subject", "Safeguarding Lead", "court-order", "sealed", "included with every plan", "/#features", "Request Implementation", "running on your".
- Hindi notice in the communication mockup renders (system Devanagari font).
