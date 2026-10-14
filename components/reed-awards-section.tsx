'use client';

import { GlowWord } from '@/components/glow-word';
import { ViewportVideo } from '@/components/viewport-video';

type Props = {
  video: string;
  videoPoster: string;
};

export function ReedAwardsSection({ video, videoPoster }: Props) {
  return (
    <section id="awards" className="reed-section">
      <div className="reed-layout">
        <div className="reed-copy" data-reveal>
          <p className="reed-kicker">Awards</p>
          <h2 className="section-title">Reed Awards</h2>
          <div className="reed-stats">
            <span>
              <GlowWord>Best International Campaign (National)</GlowWord>
            </span>
            <span>
              <GlowWord>Best International Online Video (National)</GlowWord>
            </span>
            <span>
              <GlowWord>Finalist:</GlowWord> Best Public Affairs Campaign
            </span>
          </div>
          <p className="reed-lead">
            Nicola&apos;s Fudge won <GlowWord>two international Reed Awards</GlowWord>, for the campaign and its video.
            I developed, directed, and edited the film using Premiere Pro, After Effects, and AI video tools.
          </p>
          <div className="reed-detail-stack">
            <p>
              My design work for the campaign included packaging, social graphics, and print material.
            </p>
          </div>
        </div>

        <div className="reed-side" data-reveal>
          <p className="reed-side-copy">
            Awarded to Nicola&apos;s Fudge at the Reed Awards.
          </p>
          <div className="reed-media-column">
            <figure className="reed-media-card">
              <ViewportVideo src={video} className="reed-award-video" autoPlay loop muted playsInline poster={videoPoster} />
              <figcaption className="reed-media-caption">
                <strong>Best International Online Video (National)</strong>
                <span>Nicola&apos;s Fudge film.</span>
              </figcaption>
            </figure>
            <figure className="reed-media-card is-second">
              <ViewportVideo src={video} className="reed-award-video" autoPlay loop muted playsInline poster={videoPoster} />
              <figcaption className="reed-media-caption">
                <strong>Best International Campaign (National)</strong>
                <span>Nicola&apos;s Fudge campaign.</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
