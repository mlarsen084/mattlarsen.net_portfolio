'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { MediaLightbox } from '@/components/media-lightbox';
import { CampaignVideoSection } from '@/components/campaign-video-section';
import { ViewportVideo } from '@/components/viewport-video';
import type { CaseStudy, VideoCampaign } from '@/lib/types';

type Props = {
  cases: CaseStudy[];
  campaign: VideoCampaign;
};

export function ExperienceSection({ cases, campaign }: Props) {
  const [playingEmbed, setPlayingEmbed] = useState<string | null>(null);
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
          <h2 className="section-title">noteworthy campaigns</h2>
          <p className="section-sub">Campaign design, video, and print work.</p>
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
                  {entry.video_embed_url && playingEmbed === entry.slug ? (
                    <iframe
                      src={`${entry.video_embed_url}?autoplay=1&rel=0`}
                      title={`${entry.title} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : entry.video_embed_url ? (
                    <button type="button" className="campaign-play-button" onClick={() => setPlayingEmbed(entry.slug)}
                      aria-label={`Play ${entry.title}`}>
                      <Image src={entry.cover_image} alt={`${entry.title} video poster`} width={1440} height={810} />
                      <span className="campaign-play-label"><span aria-hidden="true">▶</span> Play video</span>
                    </button>
                  ) : entry.video ? (
                    <ViewportVideo src={entry.video} autoPlay loop muted playsInline poster={entry.video_poster} controls />
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
          <CampaignVideoSection campaign={campaign} />
        </div>
      </section>

      <MediaLightbox item={activeImage} onClose={() => setActiveImage(null)} />
    </>
  );
}
