# Tim's Apothecary — Google Sheet Template

This is the data layer for the storefront. The app reads from one sheet and writes orders to another. No database to spin up — just two tabs in a Google Sheet you own.

## Sheets to create

### 1. `products` (read by the app)

One row per SKU. Headers must be on **row 1** exactly as below (lowercase, snake_case-ish — the API maps these to fields):

| id | name | image | description | price | manufacturer | type | quantity | dosage | substance |
|---|---|---|---|---|---|---|---|---|---|
| TA-001 | Ashwagandha Root 600mg | https://... | An adaptogenic herb traditionally used to support stress response and sleep quality. | 24.90 | NOW Foods | Capsules | 90 caps | 600mg per capsule | Withania somnifera |
| TA-002 | Magnesium Glycinate 400mg | https://... | Highly bioavailable magnesium for muscle relaxation, sleep, and nervous system support. | 19.50 | Pure Encapsulations | Capsules | 120 caps | 400mg per capsule | Magnesium bisglycinate |
| TA-003 | Vitamin D3 5000 IU + K2 | https://... | Fat-soluble vitamin D paired with K2 (MK-7) for calcium absorption and bone health. | 16.00 | Thorne | Softgels | 60 softgels | 5000 IU D3 / 90mcg K2 | Cholecalciferol + Menaquinone-7 |
| TA-004 | Elderberry Syrup | https://... | Standardized black elderberry extract traditionally used for immune support during seasonal changes. | 22.00 | Gaia Herbs | Liquid | 8 fl oz | 500mg elderberry per tsp | Sambucus nigra |
| TA-005 | Probiotic 50B CFU | https://... | Multi-strain probiotic for daily gut health and digestive balance. Shelf-stable. | 29.00 | Seed | Capsules | 30 caps | 50 billion CFU | Lactobacillus + Bifidobacterium blend |

**Field notes**
- `id` — your SKU. Must be unique. Keep it short (e.g. `TA-001`).
- `name` — displayed on the product card and detail drawer.
- `image` — full public URL to a product photo. Host anywhere (Cloudinary, Imgur, your own CDN). Square crops work best.
- `description` — 1-2 short sentences. Plain text.
- `price` — number only, no currency symbol. Currency symbol is set in `src/helpers/constants.tsx` (default `$`).
- `manufacturer` — the brand/supplier (e.g. "Thorne", "Pure Encapsulations"). For drop-ship, this is your supplier's brand.
- `type` — physical format/category (e.g. "Capsules", "Tincture", "Powder", "Tea", "Topical").
- `quantity` — pack size as a human-readable string (e.g. "90 caps", "8 fl oz", "120g"). Not a stock count.
- `dosage` — strength per unit (e.g. "600mg per capsule", "5000 IU").
- `substance` — active ingredient(s), Latin binomial where appropriate.

### 2. `orders` (written by the app)

Headers on row 1, the app appends one row per checkout:

| items | address | phone_number | email | bill_amount |
|---|---|---|---|---|

- `items` — JSON string of the cart snapshot: `[{ id, name, price, quantity, ... }, ...]`. Treated as opaque by the app.
- `address` — full shipping address as a single string.
- `phone_number` — customer's phone.
- `email` — customer's email.
- `bill_amount` — subtotal as a number (no currency symbol).

You'll see orders appear in real time as customers check out. From here you can confirm with the customer (WhatsApp/email), place the order with your drop-ship supplier, and update the customer with tracking.

## Wiring it up

1. In [Google Cloud Console](https://console.developers.google.com/): create a project, enable the **Google Sheets API**, create a **service account**, download the JSON key, note the service account email.
2. Create the two sheets above. Share both with the service account email (Editor access).
3. Copy the spreadsheet IDs from the URL: `https://docs.google.com/spreadsheets/d/<THIS_PART>/edit`.
4. In `packages/medsy-classic/`, copy `.env.local.sample` to `.env.local` and fill in:
   - `GOOGLE_SPREADSHEET_ID_PRODUCT` — the products sheet ID
   - `GOOGLE_SPREADSHEET_ID_ORDER` — the orders sheet ID
   - `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` — from the JSON key
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` — from the JSON key (paste the full `-----BEGIN PRIVATE KEY-----...-----END PRIVATE KEY-----\n` block, including the newlines)
5. From the repo root: `yarn dev:medsy-classic`, open http://localhost:3000.

## Follow-ups (not done in the rebrand pass)

These are intentionally left for you to handle so the rebrand stays scoped to copy + brand:

- [ ] Replace the placeholder text-wordmark logo with a real SVG/PNG of your actual logo (currently `src/assets/icons/logo.tsx`)
- [ ] Replace `public/favicon.ico` with a real favicon for Tim's Apothecary
- [ ] Update `[Your street address]` and `[your-email@example.com]` in `src/containers/term/data.ts` with your real business address + contact
- [ ] Update the currency in `src/helpers/constants.tsx` if you want BRL or another symbol
- [ ] Add real product photos and descriptions to the `products` sheet
- [ ] Set up your Vercel env vars to match `.env.local` before deploying
- [ ] Decide on a payment flow (the current order form just collects contact + shipping; you confirm and collect payment out-of-band)
