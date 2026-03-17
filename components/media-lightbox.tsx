'use client';

import { useEffect } from 'react';

type LightboxItem = {
  src: string;
  alt: string;
};

type Props = {
  item: LightboxItem | null;
  onClose: () => void;
};

export function MediaLightbox({ item, onClose }: Props) {
  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="media-lightbox" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <button className="media-lightbox-close" type="button" onClick={onClose}>
        Close
      </button>
      <div className="media-lightbox-stage" onClick={(event) => event.stopPropagation()}>
        <img src={item.src} alt={item.alt} />
        <p>{item.alt}</p>
      </div>
    </div>
  );
}
