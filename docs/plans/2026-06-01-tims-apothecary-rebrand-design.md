# Tim's Apothecary — Rebrand Design

**Date:** 2026-06-01
**Status:** Approved, in execution
**Scope:** Surface rebrand of `medsy-classic` package. Zero feature changes.

## Context

`medsy` is a Next.js medicine e-commerce template that already uses Google Sheets as a database, with a product schema (`dosage`, `substance`, `manufacturer`, `type`) that maps cleanly to drop-shipped health remedies and supplements. Tim wants to use it as a starter for "Tim's Apothecary", keeping the architecture intact and only re-skinning the user-facing copy and brand assets.

## Decisions locked in

| Decision | Choice | Rationale |
|---|---|---|
| Theme | `medsy-classic` | Best fit for a traditional apothecary feel |
| Package manager | Yarn (unchanged) | Avoids workspace conversion risk; existing scripts work as-is |
| Rebrand depth | Surface only | Keep `@medsy/classic` package name and folder names; only re-skin visible brand |
| Feature changes | None | Order → spreadsheet, contact form only, no payment integration |
| Database | Google Sheets (built-in) | Already wired; schema fits supplements perfectly |
| Schema | Unchanged | `id, name, image, description, price, manufacturer, type, quantity, dosage, substance` |

## Brand identity

- **Name:** Tim's Apothecary
- **Vibe:** warm, herbal, trustworthy, vintage-modern apothecary
- **Hero headline:** "Tim's Apothecary delivers trusted remedies to your door"
- **Hero subtitle:** "Get your go-to remedies and supplements, delivered."
- **Color:** Keep the existing primary green `#209F85` (apothecary herbal) — no Tailwind palette change needed
- **Typography:** Use existing font stack; logo wordmark to be a simple text-based "Tim's Apothecary" in a serif-ish style (placeholder, easy to swap when real logo arrives)
- **Currency:** Leave `$` (placeholder) — user can swap to BRL/USD later

## Files touched

### User-facing strings
- `packages/medsy-classic/src/pages/index.tsx` — `<title>`, meta description
- `packages/medsy-classic/src/pages/faq.tsx` — `<title>`, meta description
- `packages/medsy-classic/src/pages/terms.tsx` — `<title>`, meta description
- `packages/medsy-classic/src/containers/hero-block.tsx` — H1 + subtitle
- `packages/medsy-classic/src/containers/layout/header.tsx` — sr-only label
- `packages/medsy-classic/src/containers/layout/footer.tsx` — copyright year + brand link (RedQ → Tim's Apothecary)
- `packages/medsy-classic/src/containers/drawer/views/menus.tsx` — drop dead `medsy-modern`/`medsy-minimal` cross-links, rename "Medsy Classic" to "Home", sr-only label
- `packages/medsy-classic/src/components/search.tsx` — placeholder
- `packages/medsy-classic/src/components/search-outline.tsx` — placeholder
- `packages/medsy-classic/src/containers/term/data.ts` — replace demo placeholder copy (Little & Big, Jon doe, demo@demo.com)

### Brand assets
- `packages/medsy-classic/src/assets/icons/logo.tsx` — replace "Medsy" wordmark SVG with text-based "Tim's Apothecary" placeholder (apothecary serif, herbal green)
- `packages/medsy-classic/public/favicon.ico` — **not replaced** (binary; user to swap when real favicon ready). Noted in spreadsheet template doc as a follow-up.

### Config / repo
- `package.json` (root) — `name: "tims-apothecary"`, `author: "Tim"`, add `description`
- `README.md` (root) — rebrand the "About" paragraph; keep all technical setup intact

### New docs
- `docs/spreadsheet-template.md` — Google Sheet column hints + 5 sample product rows for the user to seed

## Out of scope (explicit YAGNI)

- Renaming `@medsy/classic` package or `medsy-classic/` folder (workspace package name affects yarn install resolution; user explicitly chose surface rebrand)
- Touching `packages/medsy-minimal/` (it's a sibling demo, not the target)
- API route changes (`src/pages/api/order.tsx` — works as-is)
- Schema changes (works for supplements)
- Payment integration (drop-ship model: customer contacts via order form, Tim confirms + arranges payment manually via WhatsApp/etc.)
- OG tags, theme-color, manifest.json (not required for "zero changes")
- Tailwind palette change (existing green is apothecary-perfect)
- `medsy-modern` script references in root `package.json` (the `medsy-modern` package doesn't exist on disk; scripts are dead but harmless — leave to avoid scope creep)
- Real favicon/logo design (deferred — placeholder text wordmark is fine for now)

## Verification

After edits:
1. `yarn build:medsy-classic` — must compile clean
2. `yarn dev:medsy-classic` — must boot without runtime errors
3. Visual sanity check via grep: `rg -i "medsy|redq" packages/medsy-classic/src` should return only intentional matches (id attributes, etc.)
