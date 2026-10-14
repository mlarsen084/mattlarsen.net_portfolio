import type { Metadata } from 'next';
import Link from 'next/link';
import { FlowFx } from '@/components/flow-fx';
import { PhotographyPageView } from '@/components/photography-page-view';
import { getPhotographyItems, getSiteConfig } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Photography | Matthew Larsen',
  description:
    'Event, campaign, portrait, and landscape photography by Matthew Larsen.',
  alternates: {
    canonical: '/photography',
  },
};

export default function PhotographyPage() {
  const site = getSiteConfig();
  const items = getPhotographyItems();
  const photos = items.filter((photo) => photo.featured);
  const descriptions: Record<string, string> = {
    'Public affairs and protests': 'Speakers, flags, crowds, and press coverage in public spaces.',
    'Campaign photography': 'Campaign events, truck graphics, and street interviews.',
    'Events and portraits': 'Panels, portraits, audiences, and event details.',
    'Landscapes and streets': 'Buildings, billboards, and landscapes.',
  };
  const collections = Object.entries(descriptions).map(([title, description]) => ({
    title,
    description,
    items: items.filter((photo) => photo.collection === title && !photo.featured),
  }));

  return (
    <main className="photography-page">
      <FlowFx />

      <header className="photo-page-nav">
        <Link href="/" className="brand-mark">
          ML
        </Link>
        <nav className="photo-page-nav-links">
          <Link href="/">design portfolio</Link>
          <a href={`mailto:${site.email}`}>email</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            linkedin
          </a>
        </nav>
      </header>

      <PhotographyPageView email={site.email} linkedin={site.linkedin} photos={photos} collections={collections} />
    </main>
  );
}
