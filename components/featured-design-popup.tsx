'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './featured-design-popup.module.css';

export function FeaturedDesignPopup() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="featured-design-title"
      aria-describedby="featured-design-description"
      onClose={() => setIsOpen(false)}
    >
      <button
        className={styles.close}
        type="button"
        aria-label="Close featured design"
        autoFocus
        onClick={() => dialogRef.current?.close()}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Featured design</p>
        <h2 id="featured-design-title" className={styles.title}>LOXSAT</h2>
        <p className={styles.subtitle}>Mission patch design</p>
      </header>
      <img
        className={styles.image}
        src="/media/loxsat.png"
        alt="LOXSAT Rocket Lab mission patch design with a rocket, satellite, Earth, and stars."
        width={1440}
        height={1800}
        fetchPriority="high"
      />
      <div className={styles.copy}>
        <p id="featured-design-description">
          I designed this artwork for my Rocket Lab job application.
        </p>
      </div>
    </dialog>
  );
}
