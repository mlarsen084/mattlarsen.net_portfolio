import Link from 'next/link';
import { SiteConfig } from '@/lib/types';

type Props = {
  config: SiteConfig;
};

export function SiteNav({ config }: Props) {
  const photographyHref = config.photography_url ?? '/photography';
  const photographyExternal = Boolean(config.photography_url);

  return (
    <header className="site-nav">
      <Link href="/" className="brand-mark">
        ML
      </Link>
      <nav>
        <a href="#wall">wall</a>
        <a href="#awards">awards</a>
        <a href="#cases">experience</a>
        <a href="#publications">print &amp; motion</a>
        <a href="#reel">reel</a>
        <a href="#contact">contact</a>
        {photographyExternal ? (
          <a href={photographyHref} target="_blank" rel="noreferrer">
            photography
          </a>
        ) : (
          <Link href={photographyHref}>photography</Link>
        )}
      </nav>
    </header>
  );
}
