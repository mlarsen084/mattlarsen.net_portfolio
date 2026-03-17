'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { ReelItem } from '@/lib/types';

type Props = {
  items: ReelItem[];
};

export function ReelLibrary({ items }: Props) {
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (!video) return;
      video.muted = activeAudioId !== id;
      if (activeAudioId === id) {
        video.volume = 1;
        video.play().catch(() => {});
      }
    });
  }, [activeAudioId]);

  function toggleAudio(id: string, hasAudio: boolean) {
    if (!hasAudio) return;

    const nextId = activeAudioId === id ? null : id;
    Object.entries(videoRefs.current).forEach(([videoId, video]) => {
      if (!video) return;
      const isTarget = nextId === videoId;
      video.muted = !isTarget;
      if (!isTarget) {
        video.volume = 0;
      } else {
        video.volume = 1;
        video.play().catch(() => {});
      }
    });
    setActiveAudioId(nextId);
  }

  return (
    <div className="reel-grid reel-library-grid">
      {items.map((item, idx) => {
        const audioActive = activeAudioId === item.id;
        const hasAudio = item.has_audio !== false;

        return (
          <article key={item.id} data-reveal style={{ ['--d' as string]: idx } as CSSProperties}>
            <div className="reel-media reel-media-fixed">
              <video
                ref={(node) => {
                  videoRefs.current[item.id] = node;
                }}
                autoPlay
                loop
                muted={!audioActive}
                playsInline
                preload="metadata"
                poster={item.poster}
                >
                <source src={item.video} type="video/mp4" />
              </video>
              {hasAudio ? (
                <button
                  type="button"
                  className={`reel-audio-toggle ${audioActive ? 'is-active' : ''}`}
                  onClick={() => toggleAudio(item.id, hasAudio)}
                >
                  {audioActive ? 'Mute' : 'Sound'}
                </button>
              ) : (
                <span className="reel-audio-note">Silent cut</span>
              )}
            </div>
            <h3>{item.title}</h3>
            <p>{item.caption}</p>
            <span>{item.duration}</span>
          </article>
        );
      })}
    </div>
  );
}
