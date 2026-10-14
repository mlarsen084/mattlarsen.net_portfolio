# Matthew Portfolio Site

Dark, work-first portfolio with a hero, 3D-style social scroll wall, publications, case studies, reel, and photography gallery.

## Quick start

```bash
npm install
npm run dev
```

## Content contracts

- `content/site.json`
- `content/wall-items.json` (30 items, exactly 5 with `focus_slot: true`)
- `content/cases/*.md`
- `content/reel.json`
- `content/photography.json` (photo dimensions, captions, collections, and selected photos)
- `content/wcal-campaign.json` (campaign videos, thumbnails, and optional YouTube IDs)

## Media workflow

Drop originals into `source_assets/raw`, then run:

```bash
npm run media:convert
npm run media:check
```

## Notes

- Photography nav auto-links externally if `photography_url` is provided in `site.json`.
- If `photography_url` is `null`, nav links to the separate photography page at `/photography`.
- Portfolio photos are served as optimized WebP files in `public/media/photography/portfolio`.
- The production site is the Cloudflare Pages project `portfolio`, published from the static `out/` export.
- WCAL videos load on click. Set an item's `youtube_id` to its 11-character YouTube video ID to use an embed instead of its local file.
- Existing video previews load near the viewport and pause when out of view or when the tab is hidden. Reduced-motion settings disable automatic playback.
