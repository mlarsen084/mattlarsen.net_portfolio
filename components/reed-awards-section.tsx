'use client';

import { GlowWord } from '@/components/glow-word';

type Props = {
  video: string;
  videoPoster: string;
};

export function ReedAwardsSection({ video, videoPoster }: Props) {
  return (
    <section id="awards" className="reed-section">
      <div className="reed-layout">
        <div className="reed-copy" data-reveal>
          <p className="reed-kicker">International Proof</p>
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
          <blockquote className="reed-quote">
            “The other win: <GlowWord>Best International Online Video (National)</GlowWord> puts the work of our{' '}
            <GlowWord>25-year-old</GlowWord> in-house graphic designer, <GlowWord>Matthew Larsen</GlowWord> on par with what
            the best advertising and creative agencies can produce with <GlowWord>seven or eight figure budgets</GlowWord>.”
          </blockquote>
          <p className="reed-lead">
            The Nicola&apos;s Fudge film was a <GlowWord>solo-directed and solo-built</GlowWord> piece by{' '}
            <GlowWord>Matthew Larsen</GlowWord>, created with <GlowWord>Premiere Pro</GlowWord>,{' '}
            <GlowWord>After Effects</GlowWord>, and <GlowWord>video-generation models</GlowWord>.
          </p>
          <div className="reed-detail-stack">
            <p>
              Nicola&apos;s Fudge proved out a complete campaign world: packaging, social, landing page, rapid cutdowns,
              and the online video that won internationally.
            </p>
            <p>
              In the same note to the team, Jordan framed the wider campaign win alongside work recognised for Claudia
              Sheinbaum&apos;s Mexican Presidential Campaign, the Liberal Party of Canada 2021 Election Campaign,{' '}
              <GlowWord>NATO&apos;s We Are NATO</GlowWord> campaign, and Justin Trudeau&apos;s Bring Canada Back campaign.
            </p>
          </div>
        </div>

        <div className="reed-side" data-reveal>
          <p className="reed-side-copy">
            Two international wins, built inside a lean in-house team, with the video category won by a piece conceived,
            directed, and produced by one designer.
          </p>
          <div className="reed-media-column">
            <figure className="reed-media-card">
              <video className="reed-award-video" autoPlay loop muted playsInline preload="metadata" poster={videoPoster}>
                <source src={video} type="video/mp4" />
              </video>
              <figcaption className="reed-media-caption">
                <strong>Best International Online Video (National)</strong>
                <span>Nicola&apos;s Fudge. Solo-directed and built by Matthew Larsen.</span>
              </figcaption>
            </figure>
            <figure className="reed-media-card is-second">
              <video className="reed-award-video" autoPlay loop muted playsInline preload="metadata" poster={videoPoster}>
                <source src={video} type="video/mp4" />
              </video>
              <figcaption className="reed-media-caption">
                <strong>Best International Campaign (National)</strong>
                <span>Campaign world recognised alongside major international political work.</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
