'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MediaLightbox } from '@/components/media-lightbox';
import styles from './rocket-lab-section.module.css';

const mediaRoot = '/media/rocketlab/';
const process = [
  {
    file: 'loxsat-process-01-concept.jpg',
    title: '01 Concept',
    description: 'a quick photo comp to find the idea',
    alt: 'Initial LOXSAT photo composition with a rocket and satellite over a wireframe Earth.',
  },
  {
    file: 'loxsat-process-02-first-vector.jpg',
    title: '02 First vector',
    description: 'the first flat build in Illustrator',
    alt: 'First circular vector patch with a diagonal rocket, stars, and a pale blue Earth with grid lines.',
  },
  {
    file: 'loxsat-process-03-new-palette.jpg',
    title: '03 New palette',
    description: 'navy and blue, closer to space',
    alt: 'LOXSAT vector patch with a new navy and blue Earth palette beneath the rocket and stars.',
  },
  {
    file: 'loxsat-process-04-payload-added.jpg',
    title: '04 Payload added',
    description: 'satellite in, but the composition got crowded',
    alt: 'LOXSAT vector patch with a large satellite added across the upper left of the rocket and Earth.',
  },
  {
    file: 'loxsat-process-05-simplified.jpg',
    title: '05 Simplified',
    description: 'grid out, satellite scaled back',
    alt: 'Simplified LOXSAT patch with a smaller satellite at the lower right and no grid on Earth.',
  },
  {
    file: 'loxsat-process-06-final.jpg',
    title: '06 Final',
    description: 'mission type, a gold inner ring, and snowflakes for the liquid oxygen',
    alt: 'Final LOXSAT mission patch with a rocket, satellite, blue Earth, gold inner ring, snowflakes, and Rocket Lab lettering.',
  },
];

const heroImages = [
  { ...process[5], caption: 'Final artwork', width: 1200, height: 1200 },
  {
    file: 'patch.jpg',
    caption: 'Embroidered',
    alt: 'Embroidered LOXSAT mission patch mockup stitched onto black fabric.',
    width: 1024,
    height: 1024,
  },
];

const detailImages = [
  {
    file: 'patch-detail-edge.jpg',
    caption: 'Merrowed edge',
    alt: 'Close-up of the LOXSAT patch border with red merrowed stitching and white Rocket Lab lettering on red fabric.',
  },
  {
    file: 'patch-detail-satellite.jpg',
    caption: 'Satellite and snowflake detail',
    alt: 'Close-up of the embroidered blue and gold satellite, blue snowflake, and gold inner ring on the LOXSAT patch.',
  },
];

export function RocketLabSection() {
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <section id="rocket-lab" className={styles.section} aria-labelledby="rocket-lab-title">
        <header className={styles.intro}>
          <p className={styles.eyebrow}>For Rocket Lab</p>
          <h2 id="rocket-lab-title" className="section-title">LOXSAT mission patch</h2>
          <p className="section-sub">
            Here&apos;s a patch I made for your upcoming LOXSAT mission. I designed it in Illustrator specifically for my Brand Designer application.
          </p>
        </header>

        <div className={styles.hero}>
          {heroImages.map((item) => (
            <figure key={item.file} className={styles.figure}>
              <button
                type="button"
                className={styles.imageButton}
                aria-label={`Enlarge ${item.caption.toLowerCase()}`}
                aria-haspopup="dialog"
                onClick={() => setActiveImage({ src: mediaRoot + item.file, alt: item.alt })}
              >
                <Image
                  src={mediaRoot + item.file}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 1055px) 45vw, 480px"
                  priority
                />
              </button>
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.process}>
          <h3 className={styles.processTitle}>Details</h3>
          <div className={styles.hero}>
            {detailImages.map((item) => (
              <figure key={item.file} className={styles.figure}>
                <button
                  type="button"
                  className={styles.imageButton}
                  aria-label={`Enlarge ${item.caption.toLowerCase()}`}
                  aria-haspopup="dialog"
                  onClick={() => setActiveImage({ src: mediaRoot + item.file, alt: item.alt })}
                >
                  <Image
                    src={mediaRoot + item.file}
                    alt={item.alt}
                    width={1200}
                    height={1200}
                    sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 1055px) 45vw, 480px"
                  />
                </button>
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Reserved for a future apparel image; no image is loaded yet. */}
        <figure hidden data-apparel-slot className={styles.figure}>
          <figcaption>Apparel</figcaption>
        </figure>

        <div className={styles.process}>
          <h3 className={styles.processTitle}>Process</h3>
          <div className={styles.processGrid}>
            {process.map((item) => (
              <figure key={item.file} className={styles.figure}>
                <button
                  type="button"
                  className={styles.imageButton}
                  aria-label={`Enlarge ${item.title.toLowerCase()}`}
                  aria-haspopup="dialog"
                  onClick={() => setActiveImage({ src: mediaRoot + item.file, alt: item.alt })}
                >
                  <Image
                    src={mediaRoot + item.file}
                    alt={item.alt}
                    width={1200}
                    height={1200}
                    sizes="(max-width: 600px) 45vw, (max-width: 1024px) 30vw, 15vw"
                  />
                </button>
                <figcaption><strong>{item.title}</strong> – {item.description}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <MediaLightbox item={activeImage} onClose={() => setActiveImage(null)} />
    </>
  );
}
