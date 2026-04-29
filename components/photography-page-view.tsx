'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { MediaLightbox } from '@/components/media-lightbox';

type PhotoItem = {
  src: string;
  alt: string;
  title: string;
  detail: string;
  width: number;
  height: number;
  wide?: boolean;
};

type PhotoCollection = {
  title: string;
  description: string;
  items: PhotoItem[];
};

type Props = {
  email: string;
  linkedin: string;
  photos: PhotoItem[];
  collections: PhotoCollection[];
};

export function PhotographyPageView({ email, linkedin, photos, collections }: Props) {
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (item: PhotoItem) => {
    setActiveImage({ src: item.src, alt: `${item.title} — ${item.detail}` });
  };

  return (
    <>
      <section className="photo-about-section photo-about-section--compact">
        <div className="photo-about-copy" data-reveal>
          <p className="photo-kicker">Photography</p>
          <h1 className="section-title">photography in progress</h1>
          <p className="photo-about-text">
            A growing edit across public affairs, events, documentary coverage, portraits, and community work. The
            point of this page is to show range alongside the design portfolio, not just one narrow photography lane.
          </p>
          <p className="photo-about-text">
            It is still intentionally selective for now, but these collections already show how I work across people,
            atmosphere, movement, live moments, and cleaner portrait-led frames.
          </p>
          <div className="photo-about-links">
            <Link href="/">Back to design portfolio</Link>
            <a href={`mailto:${email}`}>Email</a>
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="photo-gallery-section">
        <div className="photo-gallery-intro" data-reveal>
          <p className="photo-kicker">Selected frames</p>
          <h2 className="section-title">core photography edit</h2>
          <p className="section-sub">
            A tighter first pass across atmosphere, event coverage, detail, and documentary observation.
          </p>
        </div>

        <div className="photo-gallery-grid">
          {photos.map((item, idx) => (
            <article
              key={item.src}
              className={`photo-gallery-card${item.wide ? ' is-wide' : ''}`}
              data-reveal
              style={{ ['--d' as string]: idx } as CSSProperties}
            >
              <button type="button" className="photo-gallery-frame zoomable-media" onClick={() => openLightbox(item)}>
                <Image src={item.src} alt={item.alt} width={item.width} height={item.height} />
                <span className="zoom-label">Zoom</span>
              </button>
              <div className="photo-gallery-copy">
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </div>
            </article>
          ))}
        </div>

        <p className="photo-gallery-note" data-reveal>
          This page is still developing, but the strongest frames stay up front while the wider archive continues to
          grow.
        </p>
      </section>

      <section className="photo-collections-section">
        <div className="photo-gallery-intro" data-reveal>
          <p className="photo-kicker">Collections</p>
          <h2 className="section-title">range across different kinds of work</h2>
          <p className="section-sub">
            These grouped sets are here to show breadth: political action, documentary moments, community coverage,
            and people-focused frames.
          </p>
        </div>

        <div className="photo-collections-stack">
          {collections.map((collection, idx) => (
            <section key={collection.title} className="photo-collection-block" data-reveal>
              <div className="photo-collection-head">
                <p className="photo-kicker">Collection {String(idx + 1).padStart(2, '0')}</p>
                <h3 className="photo-collection-title">{collection.title}</h3>
                <p className="photo-collection-copy">{collection.description}</p>
              </div>

              <div className="photo-collection-grid">
                {collection.items.map((item) => (
                  <article key={item.src} className="photo-collection-card">
                    <button
                      type="button"
                      className="photo-collection-frame zoomable-media"
                      onClick={() => openLightbox(item)}
                    >
                      <Image src={item.src} alt={item.alt} width={item.width} height={item.height} />
                      <span className="zoom-label">Zoom</span>
                    </button>
                    <div className="photo-gallery-copy">
                      <strong>{item.title}</strong>
                      <span>{item.detail}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <MediaLightbox item={activeImage} onClose={() => setActiveImage(null)} />
    </>
  );
}
