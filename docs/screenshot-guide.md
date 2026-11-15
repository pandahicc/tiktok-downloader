# BVT screenshot slots

The site ships with the five current BVT Chrome Web Store screenshots. Each one is a
real product capture, not a mock. The short drama feature page intentionally uses a
descriptive panel because the current listing has no short drama screenshot.

## Current files

| File | Where it appears | What it shows |
|---|---|---|
| `public/images/screenshots/single-download.webp` | Home hero; Single Video Download | Download control on a public For You video. |
| `public/images/screenshots/explore-list.webp` | Home gallery | Download controls on Explore cards. |
| `public/images/screenshots/search-list.webp` | Home gallery; Bulk Download | Add and download controls on Search results. |
| `public/images/screenshots/creator-profile.webp` | Home gallery; Creator Video Download | Download entry point on a public creator profile. |
| `public/images/screenshots/creator-panel.webp` | Home gallery; XLSX Export | Creator panel with filters, Export, and Download actions. |

All files are 1280×800. The registry lives in
[`src/data/screenshots.ts`](../src/data/screenshots.ts).

## Rules

- Use real BVT UI on a public TikTok page. Do not mock the interface.
- Remove or mask personal data, account handles, and anything you do not have permission
  to publish.
- Keep the native dimensions of the capture. Update `width` and `height` in
  `src/data/screenshots.ts` if a replacement has different dimensions.
- Keep the alt text and caption accurate. If the UI changes, update the registry.
- Prefer English captures for an English site. If a capture shows another locale, keep
  the caption factual and note that the extension UI follows the browser language.
- Do not create a fake short drama screenshot. If a real capture is added later, add a
  `drama` entry to the registry and use `ProductShot` on the short drama page.

## Replacing a file

```bash
# Example: replace the single-video capture
cp ~/captures/bvt-single.webp public/images/screenshots/single-download.webp
npm run build
```

If the filename changes, update the matching `base` value in
`src/data/screenshots.ts`. Rebuild after adding a file; the check site script verifies
the five expected files and their dimensions.

## Required screenshots for a future refresh

| Slot | What it should show |
|---|---|
| `single-download` | The download control and progress on a public video page. |
| `explore-list` | Download controls on an Explore page. |
| `search-list` | Add and download controls on Search results. |
| `creator-profile` | The Download entry point on a public profile. |
| `creator-panel` | Creator channels, filters, selection, Export, and Download actions. |
| `short-drama` (optional) | The episode grid with selected episodes and the save/export actions. |
| `xlsx` (optional) | The exported workbook or the export action with selected rows. |
