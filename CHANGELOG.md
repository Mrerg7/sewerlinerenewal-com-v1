# Changelog

## 2026-10-02

- Replaced the full-bleed image page with a domain-for-sale layout built around the existing lockup.
- SEO: title pattern, meta description, canonical URLs, JSON-LD (Organization, WebSite, Product, Article), robots.txt, sitemap via `@astrojs/sitemap`.
- CRO: above-the-fold name, availability, make-offer and contact-broker actions, escrow transfer steps, offer form that opens email to sales@desertrich.com, exit-intent outline request. No fabricated prices, testimonials, or viewer counters.
- Mobile: viewport meta, 48px targets, collapsible menu, sticky offer bar, no horizontal scroll.
- Light/dark theme. Concrete, navy, and pipe blue — not a parked-page palette.
- Still Cloudflare Workers static assets only (`wrangler.toml` `[assets] directory = "./dist"`). No adapter, no paid Workers features.
- CTAs carry `data-cta` attributes so a pixel can be attached later. No analytics ID was invented.
