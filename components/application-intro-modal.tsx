'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  image: string;
};

export function ApplicationIntroModal({ image }: Props) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) return;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="application-intro-modal" role="dialog" aria-modal="true" aria-labelledby="application-intro-title">
      <button type="button" className="application-intro-close" onClick={() => setOpen(false)} aria-label="Close intro and view portfolio">
        × Close
      </button>

      <div className="application-intro-layout">
        <div className="application-intro-copy">
          <p className="application-intro-kicker">Personal Note</p>
          <h2 id="application-intro-title">Hi, I&apos;m Matthew.</h2>
          <p className="application-intro-text">
            I&apos;m currently applying for the Brisbane Bullets graphic design position, and this is a mock artwork I created
            specifically for the role.
          </p>
          <p className="application-intro-text">
            Thanks for taking the time to look through my portfolio.
          </p>
          <button type="button" className="application-intro-enter" onClick={() => setOpen(false)}>
            Close and View Portfolio
          </button>
        </div>

        <div className="application-intro-art">
          <Image src={image} alt="Brisbane Bullets Terry Taylor mock graphic" width={1440} height={1800} priority />
        </div>
      </div>
    </div>
  );
}
