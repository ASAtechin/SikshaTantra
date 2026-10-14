# W1-B — Navigation & pages: status

**Status: DONE** (2026-10-14). Not run in a browser (per rules); W2 should exercise the menus in Playwright.

## Done
1. **Navbar** (`components/layout/Navbar.tsx`, `"use client"`, `<Navbar />` with no props)
   - Renders `<StatusBanner />` first (it scrolls away), then a `sticky top-0 z-50` header on solid `bg-paper` (no backdrop-filter, so the fixed mobile panel positions against the viewport).
   - Desktop (≥1024px): "Modules" is a `<button>` with `aria-expanded` / `aria-controls`. Click, Enter or Space toggles. Escape closes and returns focus to the button. Outside pointer-down or focus moving out closes it. Mouse hover opens it (200 ms close delay); a click after hover pins it open. The panel is always in the DOM (`hidden` when closed), sits right after the button in DOM/tab order, and spans the header container (`absolute inset-x-0`, inner `max-w-6xl`, `max-h-[calc(100dvh-8rem)]` scrolls), so it does not clip at 1024px. It shows all 12 modules in 6 groups (Admissions & records, Academics, Fees & finance, Safety, Staff & operations, Leadership), each with icon, name and tagline from `lib/modules-data` (no internal tags), plus "View all modules" → `/features`.
   - Links: DigiBoard, Learning library (`/library`), Pricing, How it works. Active state for the current section (`/features/*` highlights Modules, `/library/*` highlights Learning library); `aria-current="page"` on exact matches.
   - Right side: phone from `contact` (icon + `aria-label` at lg, number shown from xl), WhatsApp icon link only when `contact.whatsappHref`, primary `LinkButton` `CTA.primary` → `CTA.primaryHref`.
   - Mobile (<1024px): toggle button (`aria-label="Menu"`, `aria-expanded`, `aria-controls`, 44px). Full-height fixed panel below the header (top measured on open), `overflow-y-auto overscroll-contain`, page scroll locked on `<html>`. Contains grouped modules as an accordion (one button per group with `aria-expanded`), View all modules, all links, phone, WhatsApp (if set) and the CTA. Closes on route change, link click, Escape (focus back to toggle), focus leaving the header, and widening to desktop.
   - `useId` for all ids. Text ≥ 13px; colours `text-ink` / `text-ink-muted` / `text-amber-700` (all ≥ 5:1 per W0 table).
2. **Footer** (`components/layout/Footer.tsx`, server): honest blurb (school ERP + DigiBoard + learning library; early-access pill + `siteStatus.short`); phone, email (only if set), WhatsApp (only if set), `contact.city` ("Bengaluru, Karnataka, India"). Columns as `<nav>` with `<h2>` headings (12px uppercase `text-amber-300`): Product (Modules, DigiBoard, Learning library, Pricing, How it works, Book a demo), Modules (Admissions & Enrollment, Attendance, Fees & Finance, Assessment & Report Cards, Child Safeguarding, Transport — labels read from `getModule(slug).name`), Trust (Security & privacy, FAQ, Privacy notice). Bottom line "© {year} Siksha Tantra". Meta text `text-white/85` (9.9:1). Removed `mt-24`, decorative blobs and "refuse to guess" tagline. Links get `focus-visible:outline-amber-300` on the dark band.
3. **New pages** — each: Navbar, `<main id="main" tabIndex={-1}>`, one h1 (via `PageIntro`), `pageMetadata`, `ClosingCTA`, Footer.
   - `/pricing` — annual per-school licence; four factors (student count, modules, campuses, DigiBoard hardware quoted separately); founding-school note (no discounts or numbers); what a quote contains; 3 Q&As; link to /faq.
   - `/security` — "How it is designed" labelled "Design goals during early access" (role-based access, audit history, per-device screen enrolment, data minimisation; states no certification/audit is claimed); "Your data and the law" (DPDP Act 2023: verifiable parental consent incl. no tracking/targeted ads at children, notice, data-principal rights, breach reporting to the Board and affected people; school = data fiduciary, we process per agreement; "not legal advice"); "Hosting" (region and backups agreed per school and documented in the agreement — no India-hosting claim); "This website" → /privacy; in-page nav.
   - `/faq` — 12 Q&As in `<details>/<summary>` (live status, boards, parent app planned, migration, pricing → /pricing, languages, multi-campus planned, training & support, data ownership/export, WhatsApp/SMS needs approved provider + opt-in + DLT, DigiBoard hardware, how to start). FAQPage JSON-LD (`<` escaped).
   - `/privacy` — website-only notice, "Draft — pending legal review" note, "Last updated: 14 October 2026". Covers form fields (incl. W1-D's boards/campuses/current system/go-live/contact preference/consent), transient in-memory IP for rate limiting, host request logs, optional Cloudflare Turnstile (if enabled), library progress in localStorage only, no ad/analytics trackers (verified: no analytics scripts in app/components/lib/package.json), purpose, processors (SMTP provider, MongoDB Atlas, Vercel; regions "to be confirmed"), retention "to be confirmed", DPDP rights + Data Protection Board, children, changes.
   - `/how-it-works` — intro (duration agreed during discovery, no SLA), `HowItWorks` stages, "What we need from your school" (7 items), CTA.
4. **components/sections/**: deleted unused `CTASection`, `DigiBoardSpotlight`, `FeatureGrid`, `Hero`, `ProblemSolution`, `TeamExpertise`, `TrustBar`, `WhyUs` (grep across app/components/lib showed no imports; "Hero" only appears in a comment in LibraryExperience). Kept `RequestDemoForm` (W1-D) and rewrote `HowItWorks` (server component; honest copy; no "named owner"/"real SLAs"; `<ol>` with sr-only "Step n"; 12px step badge; `Reveal` instead of `whileInView` opacity:0; optional props `id`, `eyebrow`, `title`, `description`; also exports `onboardingSteps`). Added `PageIntro`, `ContentSection`, `ClosingCTA`.
5. **Sitemap**: added /pricing, /how-it-works, /security, /faq, /privacy. robots.ts unchanged.

## Files touched
- `components/layout/Navbar.tsx`, `components/layout/Footer.tsx` (rewritten)
- `app/pricing/page.tsx`, `app/security/page.tsx`, `app/faq/page.tsx`, `app/privacy/page.tsx`, `app/how-it-works/page.tsx` (new)
- `app/sitemap.ts`
- `components/sections/HowItWorks.tsx` (rewritten); `PageIntro.tsx`, `ContentSection.tsx`, `ClosingCTA.tsx` (new)
- Deleted: `components/sections/{CTASection,DigiBoardSpotlight,FeatureGrid,Hero,ProblemSolution,TeamExpertise,TrustBar,WhyUs}.tsx`

## Verification
- `npx eslint components/layout components/sections/{PageIntro,ClosingCTA,ContentSection,HowItWorks}.tsx app/pricing app/security app/faq app/privacy app/how-it-works app/sitemap.ts app/robots.ts` → clean.
- `npx tsc --noEmit` → no errors in W1-B files (remaining errors at time of writing are in W1-E library files and W1-A SpatialCanvas, in progress).
- Grep: no `text-[10px]`/`text-[11px]`, no `/40–/60` text opacities in owned files.

## Requests
- **W2 (QA)**: add library routes (`/library/[board]/[grade]/[subject]` and `/[chapter]`) to `app/sitemap.ts` once W1-E's routes/helpers are final (e.g. map over W1-E's static-params helper). Not done here to avoid depending on in-progress code.
- **W2**: `components/illustrations/ConnectIllustration.tsx`, `HeroIllustration.tsx`, `SafeguardingIllustration.tsx` are no longer imported anywhere after the section deletions (unless W1-C/W1-A start using them) — delete if still unused (owned by W1-C).
- **W2 / W1-D**: privacy notice states (a) an acknowledgement email is sent to the requester, (b) IP is held only in server memory for rate limiting, (c) Turnstile is used only if enabled. Confirm these match W1-D's final code; adjust `/privacy` if not.
- **W1-A**: Navbar height is 64px plus the StatusBanner (~36px, can wrap to 2 lines on narrow phones); it scrolls away, the 64px bar stays sticky.

## What W2 should test
- Desktop ≥1024 (incl. exactly 1024): Modules button via keyboard (Tab, Enter/Space, Tab into panel, Escape → focus back on button), outside click closes, hover opens/closes, panel not clipped, all 12 modules present with names + taglines, "View all modules" → /features; active states on /features/*, /library/*, /pricing, /how-it-works.
- <1024 (390, 768): toggle `aria-expanded`, panel fills below header, body does not scroll behind it, group accordions, Escape closes and refocuses toggle, route change closes, resize to ≥1024 closes.
- Footer: no email/WhatsApp links when env unset; city reads "Bengaluru, Karnataka, India"; all links resolve.
- New pages render one h1 and `main#main`; /faq JSON-LD validates as FAQPage; `<details>` work with keyboard; sitemap.xml lists the 5 new routes.
