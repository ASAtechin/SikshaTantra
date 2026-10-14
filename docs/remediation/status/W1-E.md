# W1-E — Learning library: status

**Status: DONE** (2026-10-14). Not built or run in a browser (per W1 rules). Verified with `npx tsc --noEmit` (exit 0, whole repo), `npx eslint app/library components/library lib/library lib/curriculum-types.ts lib/curriculum-demo-data.ts` (clean), a catalog check script (all 12 classes × subjects) and an isolated `react-dom/server` render of every library client component (all render server-side; no `window` access during render).

## Routes (all real links; Back/Forward and sharing work)

| URL | File | Rendering |
|---|---|---|
| `/library?board=&grade=&stream=&q=` | `app/library/page.tsx` | Server, per request (reads `searchParams`). Defaults: `cbse`, Class 6; `stream` only for 11–12 (default `science`). |
| `/library/[board]` and `/library/[board]/[grade]` | `app/library/[board]/page.tsx`, `app/library/[board]/[grade]/page.tsx` | Redirect to the shelf (`/library?board=…&grade=…`); unknown → 404. |
| `/library/[board]/[grade]/[subject]` | `app/library/[board]/[grade]/[subject]/page.tsx` | `generateStaticParams` = all **335** board × class × subject books. |
| `/library/[board]/[grade]/[subject]/[chapter]` | `…/[chapter]/page.tsx` | `generateStaticParams` = **375** CBSE chapters; other boards (identical chapters) render on first visit (default `dynamicParams = true`) and are cached. |

- Board slugs: `cbse`, `cisce`, `maharashtra`, `karnataka`, `uttar-pradesh`. Class `1`–`12` (no leading zeros). Subject slugs: `mathematics`, `english`, `environmental-studies`, `art-and-craft`, `science`, `social-science`, `computing`, `physics`, `chemistry`, `biology`, `accountancy`, `business-studies`, `economics`, `history`, `geography`, `political-science`. Chapter = 1-based position in that class's book.
- Unknown board/class/subject/chapter, or a subject not offered at that class (e.g. `/library/cbse/3/science`) → `notFound()`.
- Metadata on every page. Because chapters are identical across boards, book and chapter pages set **canonical to the CBSE URL** (`canonicalBookPath`) to avoid 5× duplicate content.
- Every page: `Navbar`, `<main id="main" tabIndex={-1}>`, one `h1`, `Footer`, "Sample library" banner, CTA band "Bring this library to your school" → `CTA.primaryHref` / `CTA.primary`.

## Browse (`/library`)
- `components/library/ShelfFilters.tsx`: a plain GET form (works without JS via "Show books", which hides after hydration). With JS each change does `router.replace` (no history spam, focus stays on the control). Native radios in `fieldset`/`legend` (Board, Class grouped by stage, Stream only for 11–12), visible focus ring, labelled search input (`type=search`, debounced). Local state re-syncs from the URL only when the URL changed from elsewhere (Back/Forward), so typing is never overwritten.
- Search matches subject names **and** chapter titles; matching chapters are listed on the card as direct links.
- Medium filter removed; note: "English only for now. Hindi and regional-language editions are planned."
- Book cards (`BookCard.tsx`): class, stage, subject, "Optional at this stage" (Computing 3–5) or stream list (11–12), "N chapters for Class N · about M min", saved progress ("2 of 5 read"), cover art kept (now `aria-hidden`).

## Subjects per stage (NEP names)
| Stage | Classes | Subjects |
|---|---|---|
| Foundational | 1–2 | Mathematics, English, Environmental Studies (EVS), Art & Craft |
| Preparatory | 3–5 | Mathematics, Environmental Studies (EVS) (uses the EVS content; replaces "Science" + "Social Studies"), English, Computing (optional) |
| Middle | 6–8 | Mathematics, Science, Social Science, English, Computing |
| Secondary | 9–10 | same as Middle |
| Senior Secondary | 11–12 | Science: Physics, Chemistry, Biology, Mathematics, English · Commerce: Accountancy, Business Studies, Economics, Mathematics, English · Arts: History, Geography, Political Science, Economics, English |

## Grade-band table (`lib/library/grade-bands.ts`)
Editorial, conservative, **not a syllabus mapping**. Unlisted chapters/topics are open wherever the subject is offered. A chapter shows only if its band allows the class and ≥ 1 topic remains; chapters are then renumbered from 1 for that class.

| Subject (content id) | Item | Band |
|---|---|---|
| Mathematics (`math`) | Ch "Number sense" | ≤ 8 |
| | Ch "Shapes and space", "Fractions and ratio", "Data and chance" | ≥ 3 |
| | Ch "Algebra and functions" | ≥ 6 |
| | Operations as stories | ≥ 2 |
| | Estimation, Sequences, Symmetry | ≥ 3 |
| | Area and perimeter | ≥ 4 |
| | A letter for the unknown, Angles and lines, Ratio and proportion, Percentages | ≥ 6 |
| | Part of a whole | 3–8 |
| | Averages | ≥ 7 |
| | Likelihood | ≥ 8 |
| | Functions (domain), Reading a graph (slope) | ≥ 9 |
| English (`language`) | Ch "Reading closely", "Writing clearly" | ≥ 3 |
| | Plot and structure, Imagery | ≥ 3 |
| | Character and voice, Theme, Form and meaning, Grammar as a tool, Register and tone, Discussion and debate | ≥ 6 |
| Computing (`computing`) | Ch "Data representation", "Data, AI and ethics" | ≥ 6 |
| | Patterns and abstraction, Variables and data, Functions, The instruction cycle, Operating systems, Packets and protocols | ≥ 6 |
| Art & Craft (`art`) | Art and culture | ≥ 3 (so hidden at 1–2) |
| | Design ("form follows function") | ≥ 6 (so hidden at 1–2) |

Resulting shelves (CBSE shown; all boards identical): Class 1 Mathematics 2 chapters (Number sense: Place value; Patterns and rules: Predict the next step), Class 2 adds Operations as stories; Class 1–2 English 3 chapters; EVS 6; Art 6. Classes 3–5: Maths 5, EVS 6, English 6, Computing 4. Classes 6–8: all subjects 6 (Maths topics grow with class). Classes 9–12: Maths 5 (Number sense retired). No book currently has < 2 chapters; the "More chapters for this class are being written" note is implemented on the book page for when one does.

## Reader (`/library/…/[chapter]`)
- Server-rendered chapter (header, topics, key points) inside `ReaderShell` (client) — fully readable without JS.
- Stage template: Classes 1–5 body 19px (A+ 22px), 55ch measure, line-height 1.75, larger gaps and headings, gentler prompts; Classes 6–12 body 17px (A+ 20px), 70ch, 1.65. "Text size" A / A+ (`aria-pressed`, persisted in localStorage). "Read aloud" (Web Speech API, `lang="en-IN"`, en-IN voice if present, slower for 1–5; hidden when unsupported; stops on navigation).
- Reading time computed from the chapter's words: 120 wpm (Classes 1–5), 180 wpm (6–12), minimum 1 min. (Every chapter is honestly "1 min"; books 1–5 min.)
- **Check yourself** (`CheckYourself.tsx`): per topic, a recall prompt → `<details>` "Show the key points" (works without JS) → "I remembered it" / "Not yet" (`aria-pressed`) → live summary "You checked X of N and remembered Y", with links back to each "Not yet" topic (`#topic-<id>`). Built only from existing key points. Ratings are not saved.
- **Reflect**: the existing prompt, now with a labelled textarea; no `name`, not in a form; note "What you type stays on this page. It is not saved or sent anywhere."
- **Progress** (`lib/library/local-store.ts`): `useSyncExternalStore` stores, every storage call in try/catch, in-memory fallback, server snapshot = empty, cross-tab `storage` sync. Key `siksha-library-progress-v1` → `{ "<board>/<grade>/<subject>": { read: number[], last?: number } }`. Reader: "Mark chapter as read" toggle + "N of M chapters read" (completion, `aria-live`); chapter rail shows read marks; visiting a chapter records it for **"Continue where you left off"** on the book page.
- Prev/next chapter links (`rel`), last chapter links back to the book; breadcrumbs `Library › Board · Class › Subject › Chapter n`; chapter rail with `aria-current="page"`.
- Interactives (moved out of `LivingBookReader` into `components/library/interactives/`, rewritten), shown only on matching chapters:
  - `PatternMachine` on Mathematics "Patterns and rules": consecutive terms (3, 6, 9, 12, … up to n; step +2/+3/+5/+10), rule in words, formula `term n = step × n` only from Class 6, predict-the-next-term check.
  - `ForceExplorer` on Science "Forces and energy" (6–10) and Physics "Forces and laws" (11–12): learner sets force (N) and mass (kg); predict-then-check ("block gets heavier → acceleration?"); `a = F ÷ m` shown from Class 9 (in words + value below); "Push the block" runs one accelerating move whose duration follows `a`; reduced motion → no animation, result described in text.

## Content edits (rewording only; no new topics)
`lib/library/subjects-stem.ts`
| Before | After |
|---|---|
| Series shares current, parallel shares voltage | In series, the same current flows through every part; in parallel, every branch has the same voltage |
| Fast clocks run slow | A moving clock ticks slower than one at rest (time dilation) |
| Light speed is the same for all | The speed of light is the same for all observers |
| Energy is delivered, not used up | Current is not used up; energy is transferred to the components |
| Changing fields induce current | A changing magnetic field can induce a current |
| Current makes magnetism and back. (summary) | Current makes magnetism, and changing magnetism makes current. |
| Angle in equals angle out | The angle of incidence equals the angle of reflection |
| Slope of position is velocity | The slope of a position–time graph is velocity |
| Slope of velocity is acceleration | The slope of a velocity–time graph is acceleration |
| Area under velocity is distance | The area under a velocity–time graph is displacement |
| Mass does not change fall rate | Without air resistance, mass does not change how fast things fall |
| Gravity accelerates everything equally. (summary) | Without air resistance, everything falls with the same acceleration. |
| Motion needs no cause, change does | Steady motion needs no force; a change in motion does |
| Direction of force sets direction of change | Acceleration is in the direction of the net force |
| Heavier means harder to accelerate | More mass means less acceleration for the same force |
| Speed stores kinetic energy | Moving objects have kinetic energy |
| Height stores potential energy | Raised objects store gravitational potential energy |
| Friction exports energy as heat | Friction transfers energy as heat |
| Balanced forces keep steady motion | Balanced forces cause no change in motion |
| Gravity pulls everything down | Gravity pulls objects towards the Earth |
| Physical change is reversible in principle | Physical change does not make a new substance |
| Signs include heat, gas or colour | Signs can include heat, gas or a colour change |
| Energy flows from the sun upward | Energy flows from the sun through plants to animals |
| The same water is reused forever | Earth's water is used again and again |
| Parallel lines keep equal angles | A line crossing parallel lines makes equal corresponding angles |
| A whole is a fraction over itself | A whole can be written with the same top and bottom, like 4/4 |
| Many trials reveal the true rate | Over many trials, results get closer to the expected chance |
| Position predicts reactivity | Position helps predict reactivity |
| Pairs repel and spread out | Electron pairs repel and spread out |
| Each step is tenfold | Each pH step is a tenfold change |
| Reactive metals need electricity | The most reactive metals need electricity (electrolysis) |
| Oxygen improves the yield | With oxygen, respiration releases more energy |
| Breakdown causes disease | When balance fails, illness can follow |
| Two copies of each gene | Most body cells carry two copies of each gene |
| Chance sets each outcome | Which copy is passed on is a matter of chance |
| Variation enables survival | Variation helps populations survive change |
| DNA confirms relationships | DNA comparisons reveal relationships |
| Plants give food and air | Plants give us food and oxygen |
| Dirty water makes us ill | Dirty water can make us ill |
| Festivals follow the seasons | Many festivals follow the seasons |

`lib/library/subjects-humanities.ts`
| Before | After |
|---|---|
| Shortages and surpluses self-correct | Shortages and surpluses push prices to adjust |
| Projections distort something | Every flat map projection distorts something |
| Location is coordinates | Location can be given as coordinates |
| Moderate is normal | Moderate inflation is common |
| Majority must protect minority | Majority rule must protect minority rights |

Also removed the hard-coded `minutes` from all 96 chapters (and the `LibraryChapter.minutes` type field).

## Accessibility
- Native radios in `fieldset`/`legend` (board, class, stream, pattern step, force prediction); `aria-pressed` on toggle buttons (text size, self-ratings); labelled search, sliders (`<label>` + `<output>`), textarea, predict input; `role="status"`/`aria-live` for feedback, progress and shelf updates; breadcrumbs `nav` with `aria-current`; rail `aria-current="page"`.
- No text below 12px; all `stone-*` removed; text uses `ink` / `ink-muted` / `ink-subtle`, theme **ink** colours (≥ 7.4:1) and AA tokens. Theme accent colours (some < 4.5:1) are now only borders/decoration.
- Hover lifts are `motion-safe:`; force animation respects reduced motion. No `opacity:0` wrappers.

## Files
- Rewritten: `app/library/page.tsx`, `lib/library/catalog.ts`, `lib/library/types.ts`.
- New: `app/library/[board]/page.tsx`, `app/library/[board]/[grade]/page.tsx`, `app/library/[board]/[grade]/[subject]/page.tsx`, `app/library/[board]/[grade]/[subject]/[chapter]/page.tsx`, `lib/library/grade-bands.ts`, `lib/library/local-store.ts`, `components/library/{BookCard,CheckYourself,LibraryChrome,ProgressBits,ReaderShell,ShelfFilters}.tsx`, `components/library/interactives/{PatternMachine,ForceExplorer}.tsx`.
- Edited: `lib/library/subjects-stem.ts`, `lib/library/subjects-humanities.ts` (wording + minutes), `components/library/subject-visuals.tsx` (cover `aria-hidden`).
- Deleted (dead): `components/library/LibraryExperience.tsx` (also removes its extra `MotionConfig`), `components/library/BookDetail.tsx`, `components/library/BookReader.tsx`.
- Untouched: `components/spatial/CurriculumExplorer.tsx`, `components/spatial/LivingBookReader.tsx`, `lib/curriculum-demo-data.ts`, `lib/curriculum-types.ts` (still exports `ERPSimulationState`, `BoardType`, `Stream`).

## Requests / notes for other workstreams
- **W2 (delete):** after W1-A's change, nothing imports `components/spatial/CurriculumExplorer.tsx` or `components/spatial/LivingBookReader.tsx`, and `lib/curriculum-demo-data.ts` is only imported by those two. Delete all three. `lib/curriculum-types.ts` must stay (`ERPSimulationState` for the simulator; `BoardType`/`Stream` for the library); its other types (`CurriculumSelection`, `Textbook`, `CurriculumCatalogProvider`, …) become unused and can be pruned if desired.
- **W1-B (sitemap):** add `/library`. Optionally add the canonical book/chapter URLs: `allBookParams().filter(p => p.board === "cbse")` and `prerenderedChapterParams()` from `@/lib/library/catalog` (`/library/${board}/${grade}/${subject}[/${chapter}]`).
- **Owner/content:** the early-class text (Classes 1–5) is still the original adult-register wording; the bands only hide unsuitable topics. Age-appropriate rewrites and any board-specific editions need a content source.

## What W2 should test (production build)
1. `/library` with JS off: shelf for CBSE Class 6 visible; pick Class 11 + "Show books" → Stream fieldset appears; search "fraction" + submit → Mathematics card listing "Chapter 4: Fractions and ratio" link.
2. `/library` with JS: clicking Board/Class/Stream updates the URL (`?board=…&grade=…&stream=…`) without losing focus; arrow keys move within radio groups; Back/Forward restores the selection; search filters by subject and chapter title.
3. `/library?board=cbse&grade=1` → 4 books, Mathematics shows "2 chapters for Class 1"; `/library/cbse/1/mathematics` has no "Domain"/"Slope"/algebra; `/library/cbse/9/mathematics/5` (Algebra and functions) does show "Slope is rate of change".
4. `/library/cbse/3/environmental-studies` exists; `/library/cbse/3/science` → 404; `/library/cbse/6/science` OK; `/library/cbse/13/mathematics`, `/library/cbse/06/mathematics`, `/library/icse/6/mathematics`, `/library/cbse/1/mathematics/3` → 404. `/library/karnataka/7` → redirects to `/library?board=karnataka&grade=7`.
5. Reader `/library/cbse/6/mathematics/2`: Pattern machine shows 3, 6, 9, 12 and predicting 15 says "Yes"; `/library/cbse/7/science/3` and `/library/cbse/11/physics/2`: Force explorer, a = F ÷ m (formula from Class 9), "Push the block" with reduced motion emulated → no movement. Other chapters: no widget.
6. Check yourself: open a topic's key points → rate "Not yet" → summary links jump to the topic. Works (reveal only) with JS off.
7. "Mark chapter as read" → rail check, book page "1 of 6 chapters read", card "1 of 6 read"; reload persists; visit chapter 3 then the book page shows "Continue where you left off — Chapter 3"; with storage blocked nothing throws.
8. Text size A+ persists across chapters; Classes 1–5 body ≥ 18px and lines ≤ ~55ch; 6–12 ≈ 17px. "Read aloud" appears only where `speechSynthesis` exists and stops on navigation.
9. `/library/cbse/11/physics/4` reads "In series, the same current flows through every part…"; `/library/cbse/12/physics/6` reads "A moving clock ticks slower than one at rest (time dilation)".
10. Every library page: one `h1`, `main#main`, sample banner text, CTA "Book a demo" → `/request-demo`, no text < 12px, contrast ≥ 4.5:1, no horizontal overflow at 320px.
