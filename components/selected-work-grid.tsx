'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { MediaLightbox } from '@/components/media-lightbox';
import type { WallItem } from '@/lib/types';

type Props = {
  items: WallItem[];
};

export function SelectedWorkGrid({ items }: Props) {
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <div className="selected-grid">
        {items.map((item, idx) => (
          <button
            key={`selected-${item.id}`}
            type="button"
            className="selected-card zoomable-media"
            data-reveal
            onClick={() => setActiveImage({ src: item.image, alt: item.title })}
            style={{ ['--d' as string]: idx % 10 } as CSSProperties}
          >
            <Image src={item.image} alt={item.title} width={900} height={1125} />
            <span className="zoom-label">Zoom</span>
          </button>
        ))}
      </div>
      <MediaLightbox item={activeImage} onClose={() => setActiveImage(null)} />
    </>
  );
}
