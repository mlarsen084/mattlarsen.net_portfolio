'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MediaLightbox } from '@/components/media-lightbox';
import type { PhotoItem } from '@/lib/types';

export function PhotographySection({ photos }: { photos: PhotoItem[] }) {
  const [activeImage, setActiveImage] = useState<PhotoItem | null>(null);

  return (
    <section id="photography" className="photography-section">
      <div className="photography-heading" data-reveal>
        <div>
          <h2 className="section-title">photography</h2>
          <p className="section-sub">People, places, and live moments. Selected photography alongside my design work.</p>
        </div>
        <Link className="photography-gallery-link" href="/photography">View full gallery ↗</Link>
      </div>
      <div className="photography-preview-grid">
        {photos.map((photo) => (
          <article className="photo-gallery-card" key={photo.src} data-reveal>
            <button
              type="button"
              className="photo-gallery-frame zoomable-media"
              aria-label={`Enlarge ${photo.title}`}
              onClick={() => setActiveImage(photo)}
            >
              <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
              <span className="zoom-label">Zoom</span>
            </button>
            <div className="photo-gallery-copy">
              <strong>{photo.title}</strong>
              <span>{photo.detail}</span>
            </div>
          </article>
        ))}
      </div>
      <MediaLightbox item={activeImage} onClose={() => setActiveImage(null)} />
    </section>
  );
}
