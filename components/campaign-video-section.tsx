'use client';

import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import { MediaLightbox } from '@/components/media-lightbox';
import { CampaignMediaReactions } from '@/components/campaign-media-reactions';
import type { VideoCampaign } from '@/lib/types';

export function CampaignVideoSection({ campaign }: { campaign: VideoCampaign }) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);
  const activePlayerRef = useRef<HTMLDivElement | null>(null);
  const videos = campaign.items.filter((item) => item.video || item.youtube_id);
  const thumbnails = campaign.items.filter((item) => !item.video && !item.youtube_id);

  useEffect(() => {
    const player = activePlayerRef.current;
    if (!playingId || !player) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setPlayingId(null);
    });
    observer.observe(player);
    const onVisibility = () => {
      if (document.hidden) setPlayingId(null);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [playingId]);

  return (
    <article id="we-cant-afford-labour" className="experience-case campaign-video-case">
      <div className="experience-copy">
        <div className="experience-copy-inner">
          <p className="experience-date">Campaign videos</p>
          <h3>{campaign.title}</h3>
          <p className="experience-role">Video editing, motion graphics, and thumbnails</p>
          <p className="experience-body">{campaign.description}</p>
          <div className="experience-metrics">
            <span>Premiere Pro</span>
            <span>After Effects</span>
            <span>AI tools</span>
          </div>
          <a className="experience-link" href={campaign.campaign_url} target="_blank" rel="noreferrer">
            View campaign website
          </a>
        </div>
      </div>
      <div className="experience-media-column">
        <div className="campaign-video-grid">
          {videos.map((item) => (
            <Fragment key={item.id}>
            <figure id={`wcal-ad-${item.id}`} className={`campaign-video-card${item.id === 'capital-gains-tax' ? ' campaign-video-card--featured' : ''}`}>
              <div className="campaign-video-player" ref={playingId === item.id ? activePlayerRef : undefined}>
                {playingId === item.id ? (
                  item.youtube_id ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${item.youtube_id}?autoplay=1&rel=0`}
                      title={`${campaign.title}: ${item.title}`}
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <video src={item.video} poster={item.poster} controls autoPlay playsInline preload="none"
                      aria-label={`${campaign.title}: ${item.title}`} />
                  )
                ) : (
                  <button type="button" className="campaign-play-button" onClick={() => setPlayingId(item.id)}
                    aria-label={`Play ${item.title}`}>
                    <Image src={item.poster} alt={item.alt} width={1600} height={900} />
                    <span className="campaign-play-label"><span aria-hidden="true">▶</span> Play video</span>
                  </button>
                )}
              </div>
              <figcaption><strong>{item.title}</strong><span>{item.duration}</span></figcaption>
            </figure>
            {item.id === 'capital-gains-tax' ? (
              <CampaignMediaReactions reactions={campaign.reactions} playingId={playingId} onPlay={setPlayingId}
                activePlayerRef={activePlayerRef} />
            ) : null}
            </Fragment>
          ))}
        </div>
        <div className="campaign-thumbnails">
          <h4>Campaign thumbnails</h4>
          <div className="experience-gallery-grid">
            {thumbnails.map((item) => (
              <button key={item.id} type="button" className="experience-gallery-card zoomable-media"
                aria-label={`Enlarge ${item.title} thumbnail`}
                onClick={() => {
                  setPlayingId(null);
                  setActiveImage({ src: item.poster, alt: item.alt });
                }}>
                <Image src={item.poster} alt={item.alt} width={1600} height={900} />
                <span className="zoom-label">Zoom</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <MediaLightbox item={activeImage} onClose={() => setActiveImage(null)} />
    </article>
  );
}
