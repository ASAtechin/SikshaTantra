# W1-A — Homepage: status

**Status: DONE** (2026-10-14). Not run in a browser (no dev/build in W1). W2 should cover the items under "For W2 QA".

## Done
1. **Scroll trap removed.** The hero (`SpatialCanvas`) is now an ordinary `<section>` in page flow at every width: no fixed `h-[92svh]`, no inner `overflow-y-auto` scroller, no wheel/pointer handlers. On lg+ it is a 3-column CSS grid (portals | hero | portals, `min-h: max(40rem, 100svh − 6rem)`), with the paper/forest/ochre canvas look (ambient gradients, grain, orbit SVG) kept as decoration. Drag-to-pan and zoom were removed: with no instructions and nothing to discover off-screen they only added a way to lose the content.
2. **Shared Navbar.** The homepage's own header is gone; `app/page.tsx` renders `<Navbar />` (W1-B's, sticky, with mobile menu).
3. **Buyer-first hero.** Wordmark "Siksha Tantra" as eyebrow; the single `h1`: "School ERP and campus screens *for Indian schools*"; sub-copy names admissions, attendance, fees, report cards, DigiBoard screens and the sample learning library; `CTA.primary` → `CTA.primaryHref` (LinkButton lg) and `CTA.secondary` (outline lg); `siteStatus.label` pill + `siteStatus.short` under the CTAs. Removed: X/Y/zoom readout, "Drag to wander · Ctrl + scroll", "Curriculum preview" pill, "A curriculum, not a corridor", "Enter the learning universe", "Explore books", zoom buttons.
   Portals (one DOM set; grid on mobile, placed around the hero on lg via `display: contents`): **Learning library** → `/library` (link), **School ERP** → dialog, **How learning works** → dialog with `CTA.library` → `/library`, **DigiBoard screens** → `/digiboard` (link).
   **CommandDock deleted** (`components/spatial/CommandDock.tsx`, owned, no other importers). Its search covered only the four portals, the Navbar already reaches every page, and on mobile it was hidden anyway.
4. **Dialogs.** The School ERP and How-learning-works panels and the simulator use the W0 `Dialog` + `DialogCloseButton`. The four School ERP tiles link to `/features/admissions-enrollment`, `/features/attendance`, `/features/communication` and `/features/fees-finance` (names come from `getModule()`). "Try the operations demo" swaps the panel for the simulator dialog; closing returns focus to the portal button. The simulator footer has a `CTA.primary` LinkButton.
5. **ContactHub** is now a slim **sticky** bottom bar (`sticky bottom-0 z-40 lg:hidden`, safe-area padding) placed after `<Footer />`. It sits in normal flow at the end of the page, so it never covers the last content or the dialogs (z-100). Buttons: `CTA.primary` (opens a Dialog with the form) + "WhatsApp" when `contact.whatsappHref` is set, otherwise "Call us" (`contact.phoneHref`). `RequestDemoForm` loads with `next/dynamic` (`ssr: false`) only when the dialog first opens. Contact links in the dialog come from `contact` (email, WhatsApp, booking shown only when non-null). On lg+ the Navbar and hero carry the CTA.
6. **Simulator data** (`SchoolOperationsSimulator`, local types; no `curriculum-types` import):
   - Per-student data for 3 fictional learners; a pressed-state student picker (`aria-pressed`) switches ledger, roll call and marks.
   - Fees: balance = sum of line items (null = shown "Not applied"). Regular payers: tuition instalment 2 of 3, transport/lab fee, late-fee rule (₹50/day, cap ₹500; Ananya is 4 days late = ₹200), sibling concession approved (Aarav, applied) or awaiting approval (Ananya, not applied). Status card shows Pending/Overdue + "Pay via UPI (demo)"; paying adds a "Paid via UPI" ledger line, balance ₹0, "Paid" + receipt number. Kabir (Class VII) has an RTE 12(1)(c) seat: tuition ₹0, "Waived for the learner. Reimbursement claimed from the state", "No fee due"; no RTE line for the Class IX student.
   - Marks: "Class <n> · Term 1 (school-based, CBSE-style)", Internal /20 + Term exam /80 = Total /100, grade computed from the total on the CBSE 8-point scale (A1 91–100 … E ≤ 32); co-scholastic row (Work Education, Art Education, Health & PE on A–C); note says it is not an official CBSE format. Rendered as a real `<table>`.
   - Roll call: per-student Present/Late/Absent toggle (`aria-pressed`); class count updates; WhatsApp preview "Namaste, <student> was marked absent in Class <x-y> at the 09:10 roll call today…" (late variant; no alert when present); opt-in + approved provider/template note kept.
   - Panel sizes to content (no fixed height; the Dialog scrolls if needed). Horizontal tab row on all widths.
7. **Landing sections** (`LandingSections.tsx`, now a server component), order after the hero: TrustStrip → AudienceStrip → ModuleShowcase → SafeguardingBand → BeforeAfter → DigiBoardBand → OnboardingTeaser → FaqTeaser → ClosingCta.
   - TrustStrip: six plain buyer benefits as a **static row** (no marquee, so no pause control or duplicate set needed).
   - AudienceStrip "Who it's for": Principal → governance-analytics; Management & trustees → fees-finance; Office & accounts → admissions-enrollment; Teachers & parents → attendance + `/library`.
   - ModuleShowcase: grouped (Admissions & records / Academics / Fees & finance / Safety / Staff & operations / Leadership) from `lib/modules-data`; any module not in a group falls into "More modules"; no tag pill; uses only `slug/name/tagline/icon`.
   - SafeguardingBand: "Know who may collect every child" → `/features/child-safeguarding` (points restate the module's existing capabilities, "designed to support POCSO reporting duties").
   - BeforeAfter: right column "What Siksha Tantra is designed to do", reworded items.
   - DigiBoardBand: "Fails safe / Per-device identity / Always live" replaced with "designed to…" wording.
   - OnboardingTeaser: 4 steps reworded from HowItWorks (no SLA) → `/how-it-works`.
   - FaqTeaser: 4 native `<details>` (no-JS safe) → `/faq`, `/pricing`. No prices or SLAs.
   - ClosingCta: `CTA.primary`, booking/WhatsApp when set, call. Removed "We respond within one business day" (unverified SLA).
8. `app/page.tsx`: `<main id="main" tabIndex={-1}>`, ReducedMotionProvider wrapper removed, exactly one `h1` (verified by SSR render).
9. A11y in owned files: no `text-[8–11px]`, no hex colours, no text opacity below /80 (grep clean); tokens `text-ink`, `text-ink-muted`, `border-line-soft`, `bg-forest`, `text-gold`, `text-ochre`, `text-sage`; visible focus rings on every interactive element; `aria-pressed` on all toggles; `aria-live` on fee status, alert preview, transport and substitution results; reduced motion: no JS animation left in owned files (CSS transitions are cut by the W0 global rule). Hero text over the gold gradient uses `text-ink/80` (computed ≥ 5:1 at the gradient peak; `ink-muted` would be 4.6:1).

## Files touched
- `app/page.tsx`
- `components/spatial/SpatialCanvas.tsx` (rewritten)
- `components/spatial/SchoolOperationsSimulator.tsx` (rewritten; props now `{ titleId, onClose }`)
- `components/spatial/ContactHub.tsx` (rewritten; no props)
- `components/landing/LandingSections.tsx` (rewritten; new exports `AudienceStrip`, `SafeguardingBand`, `OnboardingTeaser`, `FaqTeaser`)
- `components/spatial/CommandDock.tsx` (deleted)

## Verification
- `npx tsc --noEmit`: no errors in owned files (remaining errors are all in W1-E's in-progress `components/library/**`).
- `npx eslint app/page.tsx components/spatial/SpatialCanvas.tsx components/spatial/ContactHub.tsx components/spatial/SchoolOperationsSimulator.tsx components/landing/LandingSections.tsx` → exit 0.
- SSR smoke test (jiti + `react-dom/server`, outside Next): hero + all sections + ContactHub render; 1 `h1`; removed strings absent; internal links: `/request-demo /features /library /digiboard /how-it-works /faq /pricing` and all 12 `/features/<slug>` (dialog contents are not SSR-rendered, by design of `Dialog`). Simulator renders; fee maths checked (Aarav ₹23,400; Ananya ₹22,700; Kabir ₹0).

## For W2 QA
- 390 / 768 px: wheel and touch scroll go from hero to footer; no inner scroller. 1024 / 1280 / 1440: portals do not overlap the hero text; no horizontal overflow at 320.
- Sticky bottom bar (< 1024px): never hides the footer's last line; opens the form dialog; form chunk requested only on open (network tab); WhatsApp vs Call fallback with/without `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- Dialogs: School ERP, How learning works, simulator, contact form — focus in, Tab wrap, Escape, focus back to the opener; "Try the operations demo" → simulator → Escape returns focus to the School ERP portal.
- Simulator: switch student changes ledger/marks/alert name; Pay via UPI → Paid + balance ₹0; Kabir shows RTE "No fee due"; grades match totals.
- `/how-it-works`, `/faq`, `/pricing` links depend on W1-B's new pages.

## Requests for others
- **W1-B (Navbar):** the homepage relies on the Navbar for the lg+ "Book a demo" button and for mobile navigation. Keep the Navbar ≤ z-50 (the bottom bar is z-40).
- **W1-C (modules-data):** the homepage uses only `slug`, `name`, `tagline`, `icon` and `getModule()`. If a slug changes, update `moduleGroups` / `audiences` / `erpAreas` in my files (or tell W2). Taglines like "Our biggest differentiator…" show on the homepage, so the honest rewording there flows through.
- **W1-D:** `RequestDemoForm` is lazy-loaded inside a Dialog (`ContactHub`); it must render without props and not autofocus on mount (the Dialog moves focus to the first focusable element).
- **W2:** `CurriculumExplorer.tsx` / `LivingBookReader.tsx` are no longer imported by the homepage.
