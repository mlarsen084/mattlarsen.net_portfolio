import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ExperienceSection } from '@/components/experience-section';
import { FlowFx } from '@/components/flow-fx';
import { GlowWord } from '@/components/glow-word';
import { ReedAwardsSection } from '@/components/reed-awards-section';
import { ReelLibrary } from '@/components/reel-library';
import { RocketLabSection } from '@/components/rocket-lab-section';
import { PublicationsSection } from '@/components/publications-section';
import { SelectedWorkGrid } from '@/components/selected-work-grid';
import { SiteNav } from '@/components/site-nav';
import { WallSection } from '@/components/wall-section';
import { getCases, getReelItems, getSiteConfig, getWallItems } from '@/lib/content';

const metrics = [
  {
    id: 'daily-output',
    content: (
      <>
        <GlowWord>15-35</GlowWord> graphics and videos delivered daily
      </>
    ),
  },
  {
    id: 'weekly-reach',
    content: (
      <>
        ~<GlowWord>1 million</GlowWord> weekly views
      </>
    ),
  },
  {
    id: 'print-output',
    content: (
      <>
        <GlowWord>100,000+</GlowWord> unique variable-data print outputs
      </>
    ),
  },
  {
    id: 'reed-proof',
    content: (
      <>
        Creative on a <GlowWord>two-time Reed Award-winning</GlowWord> campaign
      </>
    ),
  },
];

const skillGroups: { label: string; items: string[] }[] = [
  { label: 'ADOBE', items: ['InDesign', 'Illustrator', 'Photoshop', 'Lightroom', 'Premiere Pro', 'After Effects', 'Audition', 'Media Encoder'] },
  { label: 'DESIGN', items: ['Typography', 'Layout Systems', 'Campaign Identity', 'Art Direction', 'Figma', 'Brand Systems'] },
  { label: 'PHOTO & 3D', items: ['Photography', 'Photo Retouching', 'Image Selection', 'Compositing', 'Blender', 'Visual Mockups'] },
  { label: 'AI & WORKFLOWS', items: ['Freepik AI', 'Midjourney', 'SeeDream', 'Veo', 'Generative AI Node Workflows', 'Grok', 'Nano Banana Pro'] },
  { label: 'VIDEO', items: ['Storyboarding', 'Editing', 'Motion Design', 'Short-form Video', 'Creative Direction', 'Video Models'] },
  { label: 'COMMUNICATION', items: ['Campaign Messaging', 'Stakeholder Communication', 'Brief Writing', 'Creative Presentation', 'Client Liaison', 'Rapid Response'] },
  { label: 'PRODUCTION', items: ['Pre-press', 'Color Management', 'Packaging', 'Large-format Print', 'File Prep', 'Production Reliability'] },
];

export default function HomePage() {
  const site = getSiteConfig();
  const wallItems = getWallItems();
  const cases = getCases().filter((entry) => entry.featured).slice(0, 4);
  const reel = getReelItems();
  const hasPhotographyExternal = Boolean(site.photography_url);

  return (
    <main>
      <FlowFx />
      <SiteNav config={site} />
      <RocketLabSection />

      <section className="cv-hero" id="top">
        <div className="hero-layout">
          <div className="hero-stack">
            <h1>{site.name}</h1>
            <p className="hero-role">Graphic Designer</p>
            <div className="hero-contact">
              <p>Wellington, New Zealand | Willing to relocate</p>
              <p>{site.email}</p>
              <p>+64 22 394 7708</p>
            </div>
            <div className="hero-links">
              <a href={site.cv_url} target="_blank" rel="noreferrer">
                Download CV
              </a>
              <a href={site.print_portfolio_url} target="_blank" rel="noreferrer">
                Print portfolio
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <div className={`hero-media-slot hero-mobile-${site.hero_video_mobile_mode}`}>
            <video
              className="hero-video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              controls={false}
              poster={site.hero_video_poster_url}
            >
              <source src={site.hero_video_url} type="video/mp4" />
            </video>
            <Image
              className="hero-poster"
              src={site.hero_video_poster_url}
              alt="iPhone flip animation poster"
              width={1920}
              height={1080}
              priority
            />
          </div>
        </div>
        <a className="hero-scroll-cue" href="#publications">
          <span className="hero-scroll-label">Scroll Down</span>
          <span className="hero-scroll-sub">Selected work starts below</span>
        </a>
      </section>

      <PublicationsSection />

      <ExperienceSection cases={cases} />

      <WallSection items={wallItems} />

      <section className="profile-section">
        <h2 className="section-title" data-reveal>
          profile
        </h2>
        <p data-reveal>
          Graphic designer focused on brand systems, typography, visual hierarchy, and campaign storytelling across digital,
          motion, and print. Delivers <GlowWord>15-35</GlowWord> social graphics and videos daily, supporting approximately{' '}
          <GlowWord>1 million weekly views</GlowWord> across social channels and work later recognised with{' '}
          <GlowWord>two international Reed Awards</GlowWord>.
        </p>
      </section>

      <section className="proof-strip">
        {metrics.map((metric, idx) => (
          <p key={metric.id} data-reveal style={{ ['--d' as string]: idx } as CSSProperties}>
            {metric.content}
          </p>
        ))}
      </section>

      <section className="selected-work">
        <h2 className="section-title">selected work</h2>
        <p className="section-sub">A tighter scan of campaign graphics, layouts, and stop-scroll moments.</p>
        <SelectedWorkGrid items={wallItems.slice(0, 30)} />
      </section>

      <section id="reel" className="reel-section">
        <h2 className="section-title">reel</h2>
        <p className="section-sub">Selected motion work across campaign ads, explainers, and fast-turnaround cutdowns.</p>
        <ReelLibrary items={reel} />
      </section>

      <section className="skills-section">
        <h2 className="section-title">tools &amp; skills</h2>
        <p className="section-sub">Software, craft skills, and production workflows used most often.</p>
        <div className="skills-groups">
          {skillGroups.map((group) => (
            <article key={group.label} className="skill-group">
              <h3>{group.label}</h3>
              <div className="skill-pills">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <ReedAwardsSection
        video="/media/reed/spinning-reed-award.mp4"
        videoPoster="/media/reed/spinning-reed-award-poster.jpg"
      />

      <section id="contact" className="contact-section">
        <h2 className="section-title">contact</h2>
        <p>
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <div className="contact-links">
          <a href={site.cv_url} target="_blank" rel="noreferrer">
            Download CV
          </a>
          <a href={site.print_portfolio_url} target="_blank" rel="noreferrer">
            Print portfolio
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {hasPhotographyExternal ? (
            <a href={site.photography_url ?? '#'} target="_blank" rel="noreferrer">
              Photography
            </a>
          ) : (
            <Link href="/photography">Photography (Coming Soon)</Link>
          )}
        </div>
      </section>
    </main>
  );
}
