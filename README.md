# Indra Heritage School

Static Astro rebuild of [indraheritageschool.com](https://indraheritageschool.com/), hosted on Cloudflare Pages.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is in `dist/` (Cloudflare Pages publish directory).

## Yearly edits

Almost all recurring client changes live in:

- [`site.config.ts`](./site.config.ts) — announcement banner, session year, copyright years, phones, email, Apply/WhatsApp/Facebook URLs, disclosure table rows/PDF paths
- [`public/images/`](./public/images/) — replace photos
- [`public/pdfs/`](./public/pdfs/) — replace CBSE disclosure PDFs

Then push to `main`. Cloudflare Pages rebuilds automatically.

## Deploy

1. Push this repo to GitHub.
2. Cloudflare Pages → Connect repository → branch `main`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Attach custom domain `indraheritageschool.com` (+ `www`) and confirm DNS.
