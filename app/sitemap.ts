import type { MetadataRoute } from 'next';
import { getSiteConfig } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteConfig();
  const base = site.site_url.replace(/\/$/, '');

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/photography`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];
}
