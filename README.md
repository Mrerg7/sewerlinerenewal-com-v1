# sewerlinerenewal.com

Premium domain-for-sale site. Astro 7 + Tailwind CSS 4, deployed as **Cloudflare Workers Static Assets** (no adapter, free plan).

## Stack

- Astro 7 (static output)
- Tailwind CSS 4 via `@tailwindcss/vite`
- `@astrojs/sitemap`
- Existing Cloudflare Images lockup
- Canonical URLs, Open Graph, Twitter cards, JSON-LD
- `robots.txt` + generated sitemap

## Local development

```bash
npm install
npm run dev
```

## Build & deploy (Cloudflare Workers Static Assets)

```bash
npm run build
npm run deploy
```

`wrangler.toml` stays assets-only:

```toml
[assets]
directory = "./dist"
```

No Worker script and no `@astrojs/cloudflare` adapter.

## Domain

Production: **https://sewerlinerenewal.com**

Offers go to `sales@desertrich.com`. Price is on request.
