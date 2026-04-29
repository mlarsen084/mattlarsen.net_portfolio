import type { Metadata } from 'next';
import Link from 'next/link';
import { FlowFx } from '@/components/flow-fx';
import { PhotographyPageView } from '@/components/photography-page-view';
import { getSiteConfig } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Photography | Matthew Larsen',
  description:
    'Selected photography by Matthew Larsen across public affairs, documentary coverage, portraits, community work, and live events.',
  alternates: {
    canonical: '/photography',
  },
};

const photos = [
  {
    src: '/media/photography/photo-lantern-festival.webp',
    alt: 'Night view over a lantern festival in Wellington',
    title: 'Lantern festival, Wellington',
    detail: 'Night atmosphere, scale, and crowd movement in a single frame.',
    width: 2048,
    height: 1152,
    wide: true,
  },
  {
    src: '/media/photography/photo-mayoral-debate-detail.webp',
    alt: 'Audience members seated at the Wellington Mayoral Debate',
    title: 'Mayoral debate, audience detail',
    detail: 'A tighter event frame focused on faces, anticipation, and attention.',
    width: 2048,
    height: 1152,
  },
  {
    src: '/media/photography/photo-mayoral-debate-wide.webp',
    alt: 'Wide room view of the Wellington Mayoral Debate',
    title: 'Mayoral debate, room-wide context',
    detail: 'Environmental coverage that shows the scale and energy of the room.',
    width: 2048,
    height: 1152,
  },
  {
    src: '/media/photography/photo-retreat-discussion.webp',
    alt: 'Small group discussion during a retreat session',
    title: 'Retreat discussion coverage',
    detail: 'A documentary-style frame built around people in conversation.',
    width: 2048,
    height: 1365,
  },
  {
    src: '/media/photography/photo-award-detail.webp',
    alt: 'Gold pig-shaped award on a pedestal with shallow depth of field',
    title: 'Award detail study',
    detail: 'Light, texture, and shallow depth in a tighter detail shot.',
    width: 4608,
    height: 3072,
  },
];

const collections = [
  {
    title: 'Public affairs and protest',
    description:
      'Campaign environments, live political moments, protest coverage, and public-facing action photography.',
    items: [
      {
        src: '/media/photography/collections/public-affairs-truck-wrap-speech.webp',
        alt: 'Speaker with megaphone in front of a CAP RATES NOW truck wrap',
        title: 'Truck-wrap protest moment',
        detail: 'A live campaign frame built around movement, message, and scale.',
        width: 1276,
        height: 1800,
      },
      {
        src: '/media/photography/collections/public-affairs-protest-crowd.webp',
        alt: 'Crowd gathered in front of a CAP RATES NOW truck wrap',
        title: 'Crowd and campaign context',
        detail: 'Environmental coverage showing turnout, branding, and the wider scene.',
        width: 1800,
        height: 1200,
      },
      {
        src: '/media/photography/collections/public-affairs-stage-speech.webp',
        alt: 'Speaker addressing a crowd from a small stage setup',
        title: 'Stage-side political coverage',
        detail: 'A tighter action frame focused on the speaker, staging, and audience attention.',
        width: 1800,
        height: 1200,
      },
    ],
  },
  {
    title: 'Documentary and event coverage',
    description:
      'Observation-led images from rooms, panels, speeches, and live event environments where timing matters.',
    items: [
      {
        src: '/media/photography/collections/documentary-panel-room.webp',
        alt: 'Panel-style event room with seated attendees and speaker at the front',
        title: 'Room-wide documentary context',
        detail: 'A frame that balances atmosphere, audience, and speaker presence in one image.',
        width: 1800,
        height: 1012,
      },
      {
        src: '/media/photography/collections/documentary-speaker-vertical.webp',
        alt: 'Vertical frame of a speaker addressing a seated audience',
        title: 'Vertical speech coverage',
        detail: 'Portrait-oriented event coverage built around attention, body language, and focus.',
        width: 1200,
        height: 1800,
      },
      {
        src: '/media/photography/collections/documentary-microphone-panel.webp',
        alt: 'Close event frame with microphone and seated audience',
        title: 'Mic and audience detail',
        detail: 'A more observational frame where depth, gesture, and room tension carry the image.',
        width: 1800,
        height: 1800,
      },
    ],
  },
  {
    title: 'Community and retreat work',
    description:
      'Lifestyle, workshop, and retreat coverage that leans more human, informal, and documentary in tone.',
    items: [
      {
        src: '/media/photography/collections/community-kitchen-prep.webp',
        alt: 'Person preparing pizza dough in a kitchen',
        title: 'Kitchen prep documentary',
        detail: 'Hands-on community coverage built around action, texture, and real activity.',
        width: 1800,
        height: 1200,
      },
      {
        src: '/media/photography/collections/community-leading-discussion.webp',
        alt: 'Person leading a discussion in a group setting',
        title: 'Discussion and facilitation',
        detail: 'A people-first frame focused on conversation, leadership, and group energy.',
        width: 1800,
        height: 1200,
      },
      {
        src: '/media/photography/collections/community-outdoor-retreat.webp',
        alt: 'Small group gathered outdoors beneath tall trees',
        title: 'Outdoor retreat atmosphere',
        detail: 'A looser environmental frame showing place, people, and mood together.',
        width: 1800,
        height: 1200,
      },
    ],
  },
  {
    title: 'Portraits and group frames',
    description:
      'Portrait-led work, wider group images, and cleaner people-focused compositions across different settings.',
    items: [
      {
        src: '/media/photography/collections/portrait-outdoor-speaker.webp',
        alt: 'Woman speaking outdoors with microphone',
        title: 'Outdoor speaker portrait',
        detail: 'A cleaner portrait-style frame shaped by expression, light, and separation.',
        width: 1800,
        height: 1012,
      },
      {
        src: '/media/photography/collections/portrait-group-banners.webp',
        alt: 'Group portrait indoors with banners in the background',
        title: 'Indoor group portrait',
        detail: 'Structured group coverage with a clearer editorial portrait feel.',
        width: 1800,
        height: 1200,
      },
      {
        src: '/media/photography/collections/portrait-outdoor-group.webp',
        alt: 'Outdoor group portrait gathered in front of a large chair',
        title: 'Outdoor group frame',
        detail: 'A broader group composition that still keeps the image warm and approachable.',
        width: 1800,
        height: 1200,
      },
    ],
  },
];

export default function PhotographyPage() {
  const site = getSiteConfig();

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
