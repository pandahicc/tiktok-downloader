# BVT official website

The official static website for **BVT — Batch Video Downloader for TikTok**, an
independent Chrome extension for single and bulk TikTok video downloads, short drama
episodes, and XLSX metadata export.

- Production domain: `https://bvtdownloader.app` (reserved; point DNS before launch)
- Chrome Web Store: [BVT: Batch Video Downloader for TikTok](https://chromewebstore.google.com/detail/bvt-batch-video-downloade/kgnhdajpegmmcekmmkofhgjojddajphe)
- Content language: English
- Extension version referenced by the site: `0.1.3`
- Support and privacy email: `pandahi.cc@gmail.com`

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro 7.4.x, static output |
| Styling | Tailwind CSS 4.3.x via `@tailwindcss/vite` |
| Content | Astro Content Collections + MDX (`@astrojs/mdx` 8.x) |
| Hosting | Cloudflare Workers/Pages or any static host |
| Client JS | None by default; JSON-LD plus optional GA4 |
| Images | Sharp for icon and Open Graph generation |

The site has no backend, database, CMS, user accounts, or contact form.

## Commands

```bash
npm install --cache /tmp/npm-cache   # this environment has a read-only ~/.npm
npm run dev                         # http://localhost:4321
npm run build                       # dist/
npm run check                       # link, metadata, JSON-LD, sitemap and asset checks
npm run verify                      # build + check
npm run preview                     # preview the production build
npm run og                          # regenerate public/og/bvt-og.png
```

The project requires Node 22.23.4 or newer. `.nvmrc` pins CI to Node 22.

## Domain

The domain is stored in one place: [`site.config.json`](site.config.json).

```json
{
  "url": "https://bvtdownloader.app"
}
```

`astro.config.mjs`, `src/data/site.ts`, and `scripts/check-site.mjs` all read the same
file. If the production domain changes, update this value and rebuild. The domain is
currently reserved; this repository does not configure DNS or deploy the site.

## Project structure

```text
src/
  components/           Shared UI (header, footer, CTA, FAQ, SEO, product shots, icons)
  content/guides/       5 MDX guides
  content.config.ts     Guides collection schema
  data/                 Site config, FAQ copy, screenshot registry
  layouts/              BaseLayout and ArticleLayout
  lib/                  Content helpers and JSON-LD schema builders
  pages/                All routes, including sitemap.xml.ts and robots.txt.ts
  styles/global.css     Tailwind theme, prose, placeholders, print/reduced-motion
public/
  images/brand/         BVT icons generated from static/icons/128.png
  images/screenshots/   BVT Chrome Web Store screenshots
  og/                   Default 1200×630 Open Graph image
  _headers              Edge security/cache headers
  site.webmanifest
docs/screenshot-guide.md
scripts/check-site.mjs
scripts/generate-og.mjs
```

## Content authoring

Guides are MDX files in `src/content/guides/`. Frontmatter:

```yaml
---
title: How to Download a TikTok Video on Desktop
description: A short, unique description used for cards and metadata.
pubDate: 2026-11-15
updatedDate: 2026-11-15
readingTime: 7
category: Downloading
featured: true
featureHref: /features/single-video-download/
featureLabel: Single Video Download
related:
  - how-to-bulk-download-tiktok-videos
takeaways:
  - One key takeaway.
draft: false
---
```

Rules:

- Do not start the body with an H1; the article layout renders the title.
- Use H2/H3 headings. The table of contents is generated from them.
- Link to the relevant feature page and at least two related guides.
- Include a limits section. Never imply complete TikTok coverage or affiliation.
- Use the real captures registered in `src/data/screenshots.ts`; the current site has no short drama
  screenshot, so that feature page uses a descriptive panel instead of a mocked UI.
- Keep `draft: true` for unfinished content; drafts are excluded from production builds,
  the Guides index, and the sitemap.

## Screenshot slots

See [docs/screenshot-guide.md](docs/screenshot-guide.md) for the mapping and rules.

The site ships with the five current BVT Chrome Web Store screenshots. The short drama
page intentionally uses a descriptive panel because the current listing has no short
drama screenshot. Do not create a fake product screenshot to fill that slot.

## Content accuracy rules

- BVT is the brand. The Chrome Web Store title is
  `BVT: Batch Video Downloader for TikTok`.
- “Watermark-free” and “HD” must always be qualified by source availability. BVT does
  not re-encode media and cannot remove a watermark embedded in the only source.
- “No login required” refers to BVT. TikTok may still show a login wall for some public
  content; BVT does not bypass it.
- Do not claim a complete creator archive, all of TikTok, guaranteed HD, unlimited
  downloads, official affiliation, or a fixed price.
- Do not display Chrome Web Store user counts or ratings.
- Every download page carries a rights notice. Availability is not authorization.

## Privacy and permissions

The Privacy Policy is written from the current `manifest.json`, not a generic template.
It discloses `storage`, `tabs`, `webRequest`, `declarativeNetRequest`, and the
`pandahi.cc` / TikTok host permissions. If the manifest changes, review the Privacy page.

## Deployment

Build the static output and deploy `dist/` to Cloudflare Workers/Pages or any static
host:

```bash
npm run verify
npx wrangler deploy
```

`wrangler.jsonc` is configured for static assets with a 404 page. Before deploying:

1. Point `bvtdownloader.app` DNS at the host.
2. Confirm the canonical, OG, sitemap, and robots URLs use the production domain.
3. Run `npm run verify`.

## Known open items

- The domain is reserved but not deployed or DNS-configured.
- The site uses the current Chrome Web Store screenshots. Replace them with fresh
  English captures when they are available.
- Plan limits and prices are shown in the extension, not on this site.
