import styles from './publications-section.module.css';

const publications = [
  {
    slug: 'taxpayer-manifesto',
    title: 'Taxpayer Manifesto',
    pages: 16,
    duration: '15 seconds',
    description:
      'I used a clear typographic hierarchy and a consistent blue palette to make a detailed publication easy to navigate. Franchise headlines, Proxima Nova body text, and Klinic Slab accents give each kind of information its own place while keeping the whole document connected.',
    motion:
      'The Blender render carries the publication’s artwork into a short motion piece, keeping the colours and identity consistent from the printed page to the screen.',
  },
  {
    slug: 'little-red-book',
    title: 'The Little Red Book',
    pages: 32,
    duration: '28 seconds',
    description:
      'A red, gold, and black palette, condensed League Gothic headings, and textured imagery give this publication a distinct identity. Consistent type styles, spacing, and page furniture hold the longer document together, with Neue Haas Grotesk and Proxima Nova supporting the reading hierarchy.',
    motion:
      'I brought the same cover artwork into Blender for the 3D render, carrying its texture, typography, and colour into the video so it feels like an extension of the publication.',
  },
];

export function PublicationsSection() {
  return (
    <section id="publications" className={styles.section} aria-labelledby="publications-title">
      <div className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>InDesign / Blender / Print</p>
          <h2 id="publications-title" className="section-title">print &amp; motion</h2>
        </div>
        <div className={styles.introCopy}>
          <p>
            I designed these publications in InDesign and created their 3D renders in Blender.
            Across the pages and videos, I kept the typography, brand fonts, and colours consistent
            so each project feels like one piece of work.
          </p>
          <p>
            This is where my background in print really comes through: building reusable paragraph
            styles, keeping layouts consistent, and thinking about how colour will reproduce.
            Understanding CMYK and spot colours informs those decisions, alongside the practical
            details of spacing, image quality, and preparing artwork for print.
          </p>
        </div>
      </div>

      <div className={styles.projects}>
        {publications.map((project, index) => (
          <article key={project.slug} className={styles.project}>
            <figure className={styles.videoBlock}>
              <video
                className={styles.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={`/media/publications/${project.slug}-poster.jpg`}
                aria-label={`${project.title} — 3D publication video`}
              >
                <source src={`/media/publications/${project.slug}.mp4`} type="video/mp4" />
                <a href={`/media/publications/${project.slug}.mp4`}>Watch the {project.title} video</a>
              </video>
              <figcaption>Blender render · {project.duration}</figcaption>
            </figure>

            <div className={styles.projectCopy}>
              <p className={styles.eyebrow}>0{index + 1} / Publication &amp; 3D motion</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>{project.motion}</p>
              <div className={styles.downloadRow}>
                <a className={styles.download} href={`/docs/publications/${project.slug}.pdf`} download>
                  Download PDF <span aria-hidden="true">↓</span>
                </a>
                <span>{project.pages} pages</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
