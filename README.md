# Pistol Shooting Competition: Registration Page

Live page: https://hamadkan138-hs.github.io/ss-shooting-range/

When someone registers:
1. Their details are saved to your Google Sheet (once step 2 below is done).
2. A WhatsApp message with their details opens, addressed to 0300-5730642.

## 1. Turn on GitHub Pages (one time)
Repo → **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main` / `(root)` → **Save**.
The link above goes live within 1–2 minutes.

## 2. Connect a Google Sheet (one time, about 2 minutes)
1. Create a new Google Sheet, e.g. "Shooting Competition Registrations".
2. In the sheet: **Extensions → Apps Script**. Delete what's there and paste everything from `apps-script.gs`. Save.
3. **Deploy → New deployment** → type **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   → **Deploy** → allow the permissions → copy the **Web app URL** (ends in `/exec`).
4. In this repo, edit `index.html`: find `SHEET_ENDPOINT: ''` and paste the URL between the quotes. Commit.

Registrations then appear in the **Registrations** tab. Use the **Paid?** and **Notes** columns to track payments.

## Optional: "slots remaining" bar
In `index.html`, set `TOTAL_SLOTS: 40` (or your number). The bar counts rows in the sheet.

## Changing details
Fee, venue and wording are plain text in `index.html`. Edit them on GitHub with the pencil icon and commit. The page updates within a minute.
