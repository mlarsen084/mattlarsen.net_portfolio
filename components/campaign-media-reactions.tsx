'use client';

import Image from 'next/image';
import type { RefObject } from 'react';
import type { MediaReaction } from '@/lib/types';

type Props = {
  reactions: MediaReaction[];
  playingId: string | null;
  onPlay: (id: string) => void;
  activePlayerRef: RefObject<HTMLDivElement>;
};

function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
}

export function CampaignMediaReactions({ reactions, playingId, onPlay, activePlayerRef }: Props) {
  return (
    <section id="wcal-media-reactions" className="campaign-media-reactions" aria-labelledby="media-reactions-title">
      <h4 id="media-reactions-title">What the media said</h4>
      <p className="media-reactions-intro">Broadcast reactions to the capital gains tax ad.</p>
      <div className="media-reaction-grid">
        {reactions.map((reaction) => {
          const key = `reaction-${reaction.id}`;
          const playing = playingId === key;
          const facebook = Boolean(reaction.facebook_url);
          const youtube = Boolean(reaction.youtube_id);
          return (
            <article key={reaction.id} className={`media-reaction-card${facebook || youtube ? ' media-reaction-card--external' : ''}`}>
              <div
                className={`media-reaction-player${facebook ? ' media-reaction-player--facebook' : ''}${youtube ? ' media-reaction-player--youtube' : ''}${playing ? ' is-playing' : ''}`}
                ref={playing ? activePlayerRef : undefined}
              >
                {playing ? (
                  youtube ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${reaction.youtube_id}?autoplay=1&rel=0`}
                      title={reaction.title}
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : facebook ? (
                    <iframe
                      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(reaction.facebook_url!)}&show_text=false&autoplay=true`}
                      title={reaction.title}
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <video src={reaction.video} poster={reaction.poster} controls autoPlay playsInline preload="none"
                      aria-label={`${reaction.title} reaction`}>
                      <track kind="captions" src={reaction.captions_url} srcLang="en" label="English" />
                    </video>
                  )
                ) : (
                  <button type="button" className="campaign-play-button media-reaction-play"
                    aria-label={`Play ${reaction.title} reaction`} onClick={() => onPlay(key)}>
                    {reaction.poster ? (
                      <Image src={reaction.poster} alt={`${reaction.title} — ${reaction.outlet}`} width={900} height={900} />
                    ) : (
                      <span className="external-reaction-placeholder">{youtube ? 'Three News / Stuff' : 'Herald NOW'}<br /><span>{youtube ? 'YouTube' : 'Facebook reel'} · {reaction.duration}</span></span>
                    )}
                    <span className="campaign-play-label"><span aria-hidden="true">▶</span> {youtube ? 'Load YouTube report' : facebook ? 'Load Facebook video' : 'Play reaction'}</span>
                  </button>
                )}
              </div>
              <div className="media-reaction-copy">
                <p className="media-reaction-source">{reaction.outlet}{reaction.date ? ` · ${reaction.date}` : ''}</p>
                {reaction.context ? <p className="media-reaction-context">{reaction.context}</p> : null}
                <h5>{reaction.title}</h5>
                {reaction.quote ? <blockquote>“{reaction.quote}”</blockquote> : null}
                <p>{reaction.summary}</p>
                {reaction.excerpt ? <><p className="media-reaction-source">Short excerpt</p><blockquote>{reaction.excerpt}</blockquote></> : null}
                <div className="media-reaction-links">
                  <a href={reaction.source_url} target="_blank" rel="noreferrer">{youtube ? 'Watch full report on YouTube ↗' : facebook ? 'Watch on Facebook ↗' : 'Original broadcast ↗'}</a>
                  {reaction.transcript_url ? <a href={reaction.transcript_url} download>Download transcript</a> : null}
                </div>
                {reaction.segments ? (
                  <details className="media-reaction-transcript">
                    <summary>Read transcript <span>({reaction.duration})</span></summary>
                    <p className="transcript-note">Transcript of this clip. [unclear] marks indistinct speech.</p>
                    <div className="transcript-scroll" tabIndex={0} role="region" aria-label={`${reaction.title} transcript`}>
                      {reaction.segments.map((segment, index) => (
                        <p key={`${segment.start}-${index}`}><span className="transcript-time">{clock(segment.start)}</span> {segment.text}</p>
                      ))}
                    </div>
                  </details>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
