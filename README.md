# Furvana Landing Page

The official landing page for **Furvana** — the smart self-grooming arch that pampers your cat or small dog automatically.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Lucide React** (icons)
- **Vanilla CSS** with CSS custom properties
- **Google Fonts** (Fraunces + Mulish via `next/font`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Environment Variables

| Name | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | optional | Canonical site URL used by `metadataBase` for OG/Twitter tags. Defaults to `https://furvana-landing.vercel.app`. |
| `WAITLIST_WEBHOOK_URL` | optional | Google Apps Script `/exec` URL the waitlist Server Action POSTs to. When unset, signups still "succeed" in the UI with a placeholder position — useful for local dev. |

## Waitlist data (Google Sheet)

The free path: the Server Action in `src/app/actions.ts` POSTs each signup to a Google Apps Script Web App that appends a row to a Sheet. Share the Sheet with your team and they see signups live — no third-party SaaS, no row limits, you own the data.

One-time setup:

1. Create a new Google Sheet.
2. Open **Extensions → Apps Script** and paste the contents of `apps-script/Code.gs`.
3. In the Apps Script editor, run `setupHeaders` once (it writes the header row).
4. **Deploy → New deployment → Web app**
   - *Execute as*: Me
   - *Who has access*: Anyone
   - Copy the `/exec` URL.
5. In Vercel → Project → Settings → Environment Variables, add `WAITLIST_WEBHOOK_URL` with that `/exec` URL. Redeploy.
6. Share the Sheet (View) with your team.

When the env var is missing the form still works in dev — `joinWaitlist` returns a placeholder position so you can iterate on UX without setting up the webhook.

## Project Structure

```
src/
  app/
    layout.js    # Root layout with fonts & metadata
    globals.css  # All styles
    page.js      # Landing page (client component)
public/
    hero.jpg     # Hero image
    dog.jpg      # Dog section image
    phone.jpg    # App mockup image
    logo.png     # Furvana logo
```
