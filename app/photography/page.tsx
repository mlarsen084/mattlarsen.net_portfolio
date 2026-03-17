import Link from 'next/link';
import { getSiteConfig } from '@/lib/content';

export default function PhotographyPage() {
  const site = getSiteConfig();

  return (
    <main className="photo-placeholder">
      <p className="kicker">coming soon</p>
      <h1>Photography Portfolio Coming Soon</h1>
      <p>Selected work will be added here.</p>
      <a href={`mailto:${site.email}`}>Notify me</a>
      <Link href="/">Back to design portfolio</Link>
    </main>
  );
}
