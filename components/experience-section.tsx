'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { MediaLightbox } from '@/components/media-lightbox';
import type { CaseStudy } from '@/lib/types';

type Props = {
  cases: CaseStudy[];
};

export function ExperienceSection({ cases }: Props) {
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);
  const shouldGlowMetric = (metric: string) => /(winner|finalist|reed|international|national|\d)/i.test(metric);

  const normalizedCases = useMemo(
    () =>
      cases.map((entry) => ({
        ...entry,
        mediaGallery: entry.video || entry.video_embed_url ? [entry.cover_image, ...entry.gallery] : entry.gallery,
      })),
    [cases],
  );

  return (
    <>
      <section id="cases" className="experience-section">
        <div className="experience-intro" data-reveal>
          <h2 className="section-title">experience</h2>
          <p className="section-sub">Two featured campaigns, with the narrative on the left and the working media library on the right.</p>
        </div>

        <div className="experience-track">
          {normalizedCases.map((entry) => (
            <article key={entry.slug} className="experience-case" data-reveal>
              <div className="experience-copy">
                <div className="experience-copy-inner">
                  <p className="experience-date">{entry.year}</p>
                  <h3>{entry.title}</h3>
                  <p className="experience-role">
                    {entry.client_or_org}
                    <span>{entry.role}</span>
                  </p>
                  <div className="experience-metrics">
                    {entry.metrics.map((metric) => (
                      <span key={metric} className={shouldGlowMetric(metric) ? 'is-glow' : undefined}>
                        {metric}
                      </span>
                    ))}
                  </div>
                  <ul>
                    <li>{entry.challenge}</li>
                    <li>{entry.approach}</li>
                    <li>{entry.outcome}</li>
                  </ul>
                  {entry.body
                    .split(/\n\s*\n/)
                    .filter(Boolean)
                    .map((paragraph) => (
                      <p key={paragraph} className="experience-body">
                        {paragraph}
                      </p>
                    ))}

                  {entry.external_url ? (
                    <a className="experience-link" href={entry.external_url} target="_blank" rel="noreferrer">
                      {entry.external_label ?? 'View campaign'}
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="experience-media-column">
                <div className="experience-feature-media" data-reveal>
                  {entry.video_embed_url ? (
                    <iframe
                      src={entry.video_embed_url}
                      title={`${entry.title} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : entry.video ? (
                    <video autoPlay loop muted playsInline preload="metadata" poster={entry.video_poster} controls>
                      <source src={entry.video} type="video/mp4" />
                    </video>
                  ) : (
                    <button
                      type="button"
                      className="experience-feature-button zoomable-media"
                      onClick={() => setActiveImage({ src: entry.cover_image, alt: entry.title })}
                    >
                      <Image src={entry.cover_image} alt={entry.title} width={1440} height={1800} />
                      <span className="zoom-label">Zoom</span>
                    </button>
                  )}
                </div>

                <div className="experience-gallery-grid">
                  {entry.mediaGallery.map((asset, idx) => (
                    <button
                      key={asset}
                      type="button"
                      className="experience-gallery-card zoomable-media"
                      onClick={() => setActiveImage({ src: asset, alt: `${entry.title} sample ${idx + 1}` })}
                    >
                      <Image src={asset} alt={`${entry.title} sample ${idx + 1}`} width={1200} height={900} />
                      <span className="zoom-label">Zoom</span>
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <MediaLightbox item={activeImage} onClose={() => setActiveImage(null)} />
    </>
  );
}
