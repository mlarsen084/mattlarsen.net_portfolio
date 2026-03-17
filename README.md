# Matthew Portfolio Site

Dark, work-first portfolio scaffold with a large 3D-style scroll wall, case studies, reel, and photography placeholder.

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

## Media workflow

Drop originals into `source_assets/raw`, then run:

```bash
npm run media:convert
npm run media:check
```

## Notes

- Photography nav auto-links externally if `photography_url` is provided in `site.json`.
- If `photography_url` is `null`, nav points to `/photography` coming-soon page.
