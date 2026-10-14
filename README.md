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
- `content/photography.json` (photo dimensions, captions, collections, and homepage selection)

## Media workflow

Drop originals into `source_assets/raw`, then run:

```bash
npm run media:convert
npm run media:check
```

## Notes

- Photography nav auto-links externally if `photography_url` is provided in `site.json`.
- If `photography_url` is `null`, nav points to the homepage photography section, with the full gallery at `/photography`.
- Portfolio photos are served as optimized WebP files in `public/media/photography/portfolio`.
- The production site is the Cloudflare Pages project `portfolio`, published from the static `out/` export.
