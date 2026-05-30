# CLAUDE.md

Guidance for working in the Furvana landing-page repository.

## What this is

A single-page marketing site for **Furvana**, a smart self-grooming arch for
cats and small dogs. The page presents the product, its software/hardware
features, and a waitlist form that writes signups to a Google Sheet.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Vanilla CSS** — no Tailwind, CSS Modules, or CSS-in-JS. All styles live in
  one global stylesheet.
- **lucide-react** for all icons.
- Fonts via `next/font/google`: **Fraunces** (serif, headings) and **Mulish**
  (sans, body), exposed as the CSS variables `--font-fraunces` / `--font-mulish`.

## Commands

```bash
npm install      # install deps
npm run dev      # local dev server (http://localhost:3000)
npm run build    # production build — ALSO runs the TypeScript type-check
npm run start    # serve the production build
```

There is no separate lint or test script. **`npm run build` is the gate** for
type-correctness — run it before committing non-trivial changes.

## Project layout

```
src/
  app/
    layout.tsx        Root layout: fonts, SEO metadata, viewport
    page.tsx          The landing page — all sections, server component
    globals.css       Every style in the app (~470 lines)
    actions.ts        "use server" — joinWaitlist() posts signups to the webhook
    opengraph-image.tsx / twitter-image.tsx   Generated social images
  components/
    chrome.tsx        "use client" — Header (sticky nav), RevealObserver, HeroImage
    waitlist.tsx      "use client" — the waitlist form (email + multi-pet picker)
    breed-picker.tsx  "use client" — fuzzy-search breed combobox
  lib/
    data.ts           Content arrays: FEATURES, SOFTWARE, MARKETPLACE_STEPS,
                      HARDWARE, TREAT_PILLS, TRUST, SPECS
    breeds.ts         BREEDS list + Breed type (name/species/popular/fits/custom)
apps-script/
  Code.gs             Google Apps Script Web App that receives signups
public/               hero.jpg, dog.jpg, phone.jpg, logo.png
```

## Conventions

- **Content lives in `src/lib/data.ts`.** To add or edit a feature/spec card,
  edit the relevant array there — `page.tsx` maps over them. Import any new
  Lucide icon in `data.ts`.
- **CSS class names are prefixed `fv-`** (Furvana) and follow a loose BEM style.
  Reuse existing classes (`fv-card`, `fv-feat-grid`, `fv-sec-head`, `fv-pill`,
  `fv-btn`, …) before inventing new ones. Theme colors are CSS variables defined
  in `:root` at the top of `globals.css`.
- **`page.tsx` is a server component**; anything needing browser APIs/state
  (scroll, IntersectionObserver, forms) lives in a `"use client"` component
  under `src/components/`.
- **Section pattern:** a `<section className="fv-section" id="...">` containing
  `.fv-wrap`, a `.fv-sec-head.reveal` (tag + `fv-h2` + `fv-lead`), then a grid.
  Add scroll-reveal by giving an element `reveal` or `fv-stagger`
  (animated by `RevealObserver`). Nav links in `chrome.tsx` scroll to these ids.
- Headings use `<em>` for the italic tan accent (styled via `.fv-h2 em`, etc.).

## Waitlist data flow

1. `Waitlist` (waitlist.tsx) collects an email and **one or more pets**. Each
   pet is a `Breed` chosen via `BreedPicker`; selected pets render as removable
   chips. The picker stays in "add" mode (`value={null}`) and each commit is
   appended to the `pets: Breed[]` state.
2. On submit it calls the `joinWaitlist({ email, pets })` server action
   (`actions.ts`).
3. `joinWaitlist` POSTs JSON to `process.env.WAITLIST_WEBHOOK_URL`. **Multiple
   pets are flattened into one value per column**, joined by the delimiter
   `"; "` (the `DELIM` constant): e.g. `breed: "Maine Coon; Corgi"`. It also
   sends `count` (number of pets). Without the env var set (local dev) it
   returns a fallback queue position and skips the network call.
4. `apps-script/Code.gs` is the receiving Google Apps Script Web App. `doPost`
   appends a row (Timestamp, Email, Breed, Species, Fits, Custom, Pet count,
   Source) and returns `{ ok, pos }`, where `pos` is the row's waitlist
   position. **Keep the Apps Script columns/order in sync with the payload in
   `actions.ts`.** Changing headers requires re-running `setupHeaders` (or
   editing the sheet header row) and redeploying the Web App.

When adding a payload field, update **both** `actions.ts` (the POST body) and
`Code.gs` (`HEADERS` + `appendRow`).

## Breed picker notes

- `BREEDS` in `breeds.ts` carries a `fits` flag — `false` means the pet is
  bigger than the current arch envelope (9.5–15″ tall, 10.5–16.5″ wide); the UI
  surfaces an "XXL Furvana" notice for those.
- The picker does fuzzy matching (Levenshtein window) and lets users add a
  custom, off-list breed (`custom: true`, `species: "other"`).
