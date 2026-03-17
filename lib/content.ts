import fs from 'node:fs';
import path from 'node:path';
import { CaseStudy, ReelItem, SiteConfig, WallItem } from '@/lib/types';

const ROOT = process.cwd();

function readJson<T>(relPath: string): T {
  const filePath = path.join(ROOT, relPath);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  if (!raw.startsWith('---\n')) {
    return { data: {}, body: raw };
  }

  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) {
    return { data: {}, body: raw };
  }

  const front = raw.slice(4, end).split('\n');
  const body = raw.slice(end + 5).trim();

  const data: Record<string, unknown> = {};
  let currentArrayKey = '';

  for (const line of front) {
    if (line.trim().startsWith('- ') && currentArrayKey) {
      const value = line.trim().replace('- ', '').replace(/^"|"$/g, '');
      const arr = (data[currentArrayKey] as string[]) || [];
      arr.push(value);
      data[currentArrayKey] = arr;
      continue;
    }

    currentArrayKey = '';
    const idx = line.indexOf(':');
    if (idx === -1) continue;

    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();

    if (!value) {
      data[key] = [];
      currentArrayKey = key;
      continue;
    }

    if (value === 'true' || value === 'false') {
      data[key] = value === 'true';
      continue;
    }

    data[key] = value.replace(/^"|"$/g, '');
  }

  return { data, body };
}

export function getSiteConfig(): SiteConfig {
  return readJson<SiteConfig>('content/site.json');
}

export function getWallItems(): WallItem[] {
  return readJson<WallItem[]>('content/wall-items.json');
}

export function getReelItems(): ReelItem[] {
  return readJson<ReelItem[]>('content/reel.json');
}

export function getCases(): CaseStudy[] {
  const dir = path.join(ROOT, 'content/cases');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

  return files
    .map((file) => {
      const full = path.join(dir, file);
      const raw = fs.readFileSync(full, 'utf-8');
      const { data, body } = parseFrontmatter(raw);

      return {
        title: String(data.title ?? ''),
        slug: String(data.slug ?? file.replace(/\.md$/, '')),
        year: String(data.year ?? ''),
        client_or_org: String(data.client_or_org ?? ''),
        role: String(data.role ?? ''),
        challenge: String(data.challenge ?? ''),
        approach: String(data.approach ?? ''),
        outcome: String(data.outcome ?? ''),
        metrics: (data.metrics as string[]) ?? [],
        cover_image: String(data.cover_image ?? ''),
        gallery: (data.gallery as string[]) ?? [],
        video: data.video ? String(data.video) : undefined,
        video_poster: data.video_poster ? String(data.video_poster) : undefined,
        video_embed_url: data.video_embed_url ? String(data.video_embed_url) : undefined,
        external_url: data.external_url ? String(data.external_url) : undefined,
        external_label: data.external_label ? String(data.external_label) : undefined,
        featured: Boolean(data.featured),
        tags: (data.tags as string[]) ?? [],
        body,
      } satisfies CaseStudy;
    })
    .sort((a, b) => b.year.localeCompare(a.year));
}
