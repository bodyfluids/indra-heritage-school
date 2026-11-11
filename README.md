# Indra Heritage School

Static Astro rebuild of [indraheritageschool.com](https://indraheritageschool.com/), hosted on Cloudflare Pages.

## Links

- **GitHub:** https://github.com/bodyfluids/indra-heritage-school
- **Pages preview:** https://indra-heritage-school.pages.dev/
- **Custom domains (pending DNS):** `indraheritageschool.com`, `www.indraheritageschool.com`

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output directory: `dist/` (Cloudflare Pages publish directory).

Build command for Pages: `npm run build`

## Yearly edits

Almost all recurring client changes live in:

- [`site.config.ts`](./site.config.ts) — announcement banner, session year, copyright years, phones, email, Apply/WhatsApp/Facebook URLs, disclosure table rows/PDF paths
- [`public/images/`](./public/images/) — replace photos
- [`public/pdfs/`](./public/pdfs/) — replace CBSE disclosure PDFs

Then push to `main` (once Git is connected in Cloudflare) or redeploy with:

```bash
npm run build && npx wrangler pages deploy dist --project-name=indra-heritage-school --branch=main
```

## DNS cutover (required for the live domain)

Custom domains are already attached to the Pages project, but DNS still needs to point at Cloudflare Pages.

**Option A — Cloudflare as DNS (recommended)**

1. In Cloudflare Dashboard → Add site → `indraheritageschool.com`
2. Change nameservers at the registrar (Hostinger) to the Cloudflare nameservers
3. Cloudflare will finish SSL for the Pages custom domains automatically

**Option B — Keep Hostinger DNS**

Add these records at Hostinger:

| Type  | Name | Target                                   |
| ----- | ---- | ---------------------------------------- |
| CNAME | www  | `indra-heritage-school.pages.dev`        |
| CNAME | @    | `indra-heritage-school.pages.dev` (if Hostinger supports apex CNAME / ALIAS) |

Then wait for SSL to become Active in Pages → Custom domains.

## Connect GitHub → Cloudflare Pages (auto deploy on push)

In Cloudflare Dashboard → Workers & Pages → `indra-heritage-school` → Settings → Builds & deployments → Connect to Git → choose `bodyfluids/indra-heritage-school`, branch `main`, build `npm run build`, output `dist`.
