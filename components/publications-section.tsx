import styles from './publications-section.module.css';

const publications = [
  {
    slug: 'taxpayer-manifesto',
    title: 'Taxpayer Manifesto',
    pages: 16,
    duration: '15 seconds',
    description:
      'A 16-page publication designed in InDesign, using a blue palette, Franchise headlines, Proxima Nova body text, and Klinic Slab accents.',
    motion:
      'I used the finished artwork to create a 3D animation in Blender.',
  },
  {
    slug: 'little-red-book',
    title: 'The Little Red Book',
    pages: 32,
    duration: '28 seconds',
    description:
      'A 32-page publication designed in InDesign, using red, gold, and black with League Gothic headings, Neue Haas Grotesk, and Proxima Nova.',
    motion:
      'I created the accompanying Blender animation using the publication’s cover artwork.',
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
            Publications designed in InDesign, with 3D animations made in Blender.
          </p>
          <p>
            My print work includes page layout, paragraph styles, image preparation, and colour
            management for CMYK and spot-colour printing.
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
