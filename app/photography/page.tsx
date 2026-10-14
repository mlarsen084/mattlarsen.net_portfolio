import type { Metadata } from 'next';
import Link from 'next/link';
import { FlowFx } from '@/components/flow-fx';
import { PhotographyPageView } from '@/components/photography-page-view';
import { getPhotographyItems, getSiteConfig } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Photography | Matthew Larsen',
  description:
    'Selected photography by Matthew Larsen across public affairs, documentary coverage, portraits, community work, and live events.',
  alternates: {
    canonical: '/photography',
  },
};

export default function PhotographyPage() {
  const site = getSiteConfig();
  const items = getPhotographyItems();
  const photos = items.filter((photo) => photo.featured);
  const descriptions: Record<string, string> = {
    'Public affairs and protest': 'Speakers, flags, crowds, and press coverage in public spaces.',
    'Campaigns in the street': 'Campaign graphics and live activity in their street-level setting.',
    'Events and people': 'Conversations, production details, and the people in the room.',
    'Landscape and place': 'Architecture, urban messages, and quieter views beyond the city.',
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
