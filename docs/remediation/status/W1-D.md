# W1-D — Lead pipeline: status

**Status: DONE** (2026-10-14). Not run in a browser (per rules). The route handler and email module were tested in isolation with mocks (no real email, DB or network).

## Completed
1. **Premature submit fixed** (`RequestDemoForm.tsx`). All submits go through one `onSubmit` handler that always calls `preventDefault()`. On steps 1–2 it only runs `goNext()`; on step 3 it runs `handleSubmit`. Continue (`key="continue"`, `type="submit"`) and Request my demo (`key="submit"`, `type="submit"`) are separate DOM nodes, so a click on Continue can't turn into a submit. A submit within 700 ms of reaching step 3 is ignored (stops a double-click on Continue from landing on Submit). Enter in a text field on steps 1–2 moves to the next step. Enter on a radio or checkbox tile does nothing. Validation mode is `onTouched`, so step 3 shows no errors when it opens.
2. **Plain error messages** (`lib/validation.ts`, zod 4.6.5): every field has its own message, e.g. "Choose the number of students", "Choose at least one board", "Enter a 10-digit mobile number or a landline with its STD code", "Please tick this box so we can contact you". Phone is 10–15 digits and at most 25 characters. Text is trimmed.
3. **Accessibility**:
   - Single-choice tiles (students, role, campuses, contact preference, current system, go-live) are native radio inputs styled as tiles. Arrow keys work natively.
   - Multi-choice tiles (boards, modules) are native checkboxes, each with a visible check box.
   - Every group uses `fieldset`/`legend`, and the group is linked to its error with `aria-describedby`.
   - Text inputs and checkboxes get `aria-invalid` and `aria-describedby`.
   - When step validation fails, focus moves to the first invalid field (the checked radio or the first option). A submit-time error on an earlier step jumps to that step and focuses the field.
   - The step list is an `<ol>` with `aria-current="step"`. A polite live region announces "Step 2 of 3: Your details". A visible "Step n of 3" line is shown.
   - Focus moves to the first control only when changing steps, never on page load.
   - Success panel has `role="status"`; its `h2` gets focus.
   - Error alert has `role="alert"` and shows contact links from `lib/site.ts`.
   - Autocomplete: organization, address-level2, name, email, tel. `inputMode` set for email and phone.
   - Inputs use `border-line` and 16px text. Text is 12px or larger, colours are tokens only, and errors are `text-red-700`.
   - The honeypot is moved off-screen, `aria-hidden`, and taken out of the tab order.
   - Tailwind variants (`has-checked`, named `group/tile`, `aria-[invalid=true]`, `sm:not-sr-only`) were compiled through `@tailwindcss/postcss` and checked.
4. **New fields**:
   - Step 1, School: name, city, students, **boards** (multi, required), **campuses** (optional).
   - Step 2, You: name, role, email, phone, **preferred contact** (optional).
   - Step 3, Needs: modules (now also Identity & Access, Governance & Analytics, Learning library), **current system** (optional) with **"Which ERP or software?"** (optional, shown only for Another ERP / Mixed), **planned go-live** (optional), message, consent.
   - Campuses are labelled "1 / 2–3 / 4–10 / More than 10" instead of "10+", so 10 doesn't fall in two options.
   - Step order and field lists live in `leadFormSteps` in `lib/validation.ts`.
5. **Consent and privacy**: before Submit the form shows "We use these details only to respond to your request. See our privacy notice." The link goes to `/privacy` and opens in a new tab so the form keeps its data. Below it is a required checkbox, "I agree to be contacted about this request". The "never share with third parties" sentence is gone.
6. **API** (`app/api/lead/route.ts`), in order:
   1. Parse JSON (400 if invalid).
   2. **Honeypot** check before the schema. A filled honeypot gets a silent 201 and nothing is sent or stored.
   3. Validate with the shared schema (422 with `issues` as fieldErrors).
   4. Rate limit: in memory, keyed by `x-real-ip` or the first `x-forwarded-for` address, 5 per 10 minutes, counting **valid submissions only** (429).
   5. Optional **Turnstile** check, only when `TURNSTILE_SECRET_KEY` is set: missing or rejected token returns 400, Cloudflare unreachable returns 503.
   6. Record the submission for the rate limit.
   7. Normalise the lead: nulls become undefined, the ERP name is dropped unless the current system is Another ERP or Mixed, and the token and honeypot are removed.
   8. Send the notification email. If it fails, return an honest **503** using `contact` from `lib/site.ts` (phone always; email only if set).
   9. Send the acknowledgement email and save to the database **in parallel, best-effort**.
   10. Respond 201 `{ success: true, acknowledged }`. The form says "We've also sent a confirmation…" only when `acknowledged` is true.
7. **Email** (`lib/email.ts`):
   - No personal Gmail fallback. If `LEAD_NOTIFICATION_EMAIL` is unset, the send throws with a clear log line and the route returns 503.
   - The notification includes all new fields and a consent row. HTML is escaped, header line breaks are stripped, and the palette is updated.
   - New `sendLeadAcknowledgementEmail` goes to the submitter, with reply-to set to the sales inbox. It covers what happens next (worded honestly for early access), contact channels from `lib/site.ts`, a privacy link and "if you didn't request this, ignore". It does **not** echo the free-text message, so the form can't be used to relay text to third parties.
   - If `SMTP_HOST` is `*.ethereal.email` and `NODE_ENV=production`, it logs a loud `console.warn` on every send but does not block.
8. **Model** (`lib/models/LeadRequest.ts`): new fields with enums imported from validation (boards, campuses, preferredContact, currentSystem, currentErp, goLive) and `consentAt` (Date, required). Phone `maxlength` is 25.
9. **Page** (`app/request-demo/page.tsx`):
   - `<main id="main" tabIndex={-1}>`; the badge uses `CTA.primary`.
   - Reassurances are honest, including "A walkthrough shaped around your boards, size and current system". "What happens next" is honest, with no "30-minute" promise or canned-video claim.
   - The `siteStatus` early-access line appears near the top.
   - "Prefer to talk first?" shows phone, plus WhatsApp, email and booking only when configured.
   - The metadata phone comes from `contact`. Headings go h1, then h2; the form section has an sr-only h2.
   - The 11px text is gone and all colours are tokens.
10. **Env examples**: personal Gmail removed. Added `LEAD_NOTIFICATION_EMAIL` (blank, required), `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_BOOKING_URL`, and the optional `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY`. Both files note that Ethereal is test-only.

`RequestDemoForm` is still a named export with no props (W1-A can `next/dynamic` it). It uses `useId`, so two instances on one page won't clash.

## Files touched
`components/sections/RequestDemoForm.tsx`, `lib/validation.ts`, `lib/form-options.ts`, `app/api/lead/route.ts`, `lib/email.ts`, `lib/models/LeadRequest.ts`, `app/request-demo/page.tsx`, `.env.example`, `.env.local.example`. `lib/mongodb.ts` unchanged (no change needed). `.env.local` not read or touched.

## Verification
- `npx tsc --noEmit`: no errors in W1-D files. 26 errors remain in other streams' in-progress files (library, SpatialCanvas).
- `npx eslint` on all W1-D files: exit 0.
- Isolated test with jiti (scratchpad, mocked email, DB, model and nodemailer; `fetch` mocked for Turnstile): **30/30 checks passed**. Covered:
  - Route responses: bad JSON 400; honeypot before schema gives a silent 201 with nothing sent; invalid input 422 with human messages only.
  - Normalisation: valid input gives 201 with notify, ack and DB each called once; the ERP name is dropped or kept correctly; `consentAt` is stored.
  - Failures: notification failure gives 503 with the phone number and no hard-coded email; ack or DB failure still returns 201 with `acknowledged: false`.
  - Rate limit: invalid posts don't count (5 × 201 then 429); the first `x-forwarded-for` address is used as the key.
  - Turnstile: missing or rejected token 400, verified 201, unreachable 503; siteverify receives the secret and `remoteip`.
  - Email module: missing `LEAD_NOTIFICATION_EMAIL` throws and sends nothing; the notification has all new fields and escaped HTML; the ack goes to the submitter with reply-to set to the inbox and no free text; Ethereal in production logs a warning.

## Requests / notes for others
- **Owner (D10):** `LEAD_NOTIFICATION_EMAIL` now has **no default**. If `.env.local` or the production env doesn't set it, every submission returns 503. Set it to the shared sales inbox before deploying. Confirm production SMTP is not Ethereal.
- **W1-B:** the form links to `/privacy`. The notice should mention that the lead goes by email (SMTP provider), is optionally stored in MongoDB, and that an acknowledgement email is sent to the submitter. Optional Turnstile (Cloudflare) runs only if configured.
- **W1-A:** the form renders its own `h2` only on success. The dialog should provide its own heading. The form includes no close button.
- **W2:** see the QA list below.

## W2 QA checklist (always intercept `/api/lead` with `page.route`)
1. **No auto-submit:**
   - Fill step 1, click Continue; fill step 2, click Continue. **0 requests** to `/api/lead`, and step 3 shows no error text.
   - Select a module, tick consent, click Back, then Continue: still 0 requests.
   - Double-click Continue on step 2: 0 requests.
   - Only clicking "Request my demo" sends exactly 1 request.
2. **Enter key:** Enter in School name (step 1) and Email (step 2) moves to the next step (or shows errors) and never sends a request. Enter on a radio or checkbox tile does nothing.
3. **Errors:**
   - Continue on an empty step 1 shows "Choose the number of students" and "Choose at least one board" (no "Invalid option…" text) and focuses School name.
   - With valid text but no student count, focus goes to the first student-count radio.
   - Step 3 with no module or no consent: focus goes to the first module checkbox or the consent box.
4. **ARIA:**
   - The current step `li` has `aria-current="step"`, and the live region text updates to "Step 2 of 3: Your details".
   - Radios and checkboxes are native and arrow keys move within radio groups.
   - Invalid inputs have `aria-invalid="true"` and `aria-describedby` pointing to an existing error id.
   - No element has focus after page load (`document.activeElement === body`).
5. **Payload** (inspect the intercepted request body): includes `boards[]`, `campuses|null`, `preferredContact|null`, `modules[]`, `currentSystem|null`, `currentErp` (input only shown for Another ERP / Mixed), `goLive|null`, `consent: true`, `website: ""`.
6. **Success** (fulfil 201 `{success:true, acknowledged:true}`): `role="status"` panel and focus on the "Request received" heading. The confirmation sentence appears only when `acknowledged` is true. WhatsApp and booking links appear only when the env vars are set. "Send another request" returns to step 1 with the form empty.
7. **Error** (fulfil 503 `{success:false,error:"…"}`): `role="alert"` with the error text plus Call +91 94071 74355. No `hello@shikshatantra.in` anywhere. Email and WhatsApp links appear only when configured.
8. **Privacy:** the privacy link points to `/privacy` (opens in a new tab), and the consent checkbox is required.
9. **Turnstile:** with no `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, there is no request to challenges.cloudflare.com.
10. **/request-demo page:**
    - Exactly one `main#main[tabindex=-1]`, and the early-access line is visible.
    - No text below 12px; input borders are `#838D86`.
    - At 320px wide, no horizontal overflow and the tiles wrap.
11. **Homepage ContactHub dialog** (W1-A, lazy-loaded): repeat checks 1 and 6 inside the dialog. Focus moves to the success heading inside the dialog.
