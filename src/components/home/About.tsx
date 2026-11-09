import { Figure } from '@/components/ui/Figure';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ABOUT, REASONS } from '@/data/home';
import { cssVars } from '@/lib/css';
import imgTuberias from '@/assets/RC_tuberiasgaslp.jpg.jpeg';

import styles from './About.module.css';

export function About() {
  return (
    <section className={styles.section} id="nosotros" aria-labelledby="about-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <SectionHeader index="01" label={ABOUT.label} title={ABOUT.title} id="about-title" />
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i} className={styles.paragraph} data-reveal style={cssVars({ '--i': i + 2 })}>
              {p}
            </p>
          ))}
        </div>

        <div className={styles.media} data-reveal>
          <Figure
            src={imgTuberias}
            alt={ABOUT.imageAlt}
            sizes="(min-width: 64em) 36vw, 100vw"
            ratio="3 / 4"
            caption="Infraestructura de gas LP"
          />
        </div>

        <div className={styles.reasons}>
          <h3 className={`label ${styles.reasonsTitle}`} data-reveal>
            Por qué elegirnos
          </h3>
          <ol role="list" className={styles.reasonList}>
            {REASONS.map(({ title, text }, i) => (
              <li key={title} className={styles.reason} data-reveal style={cssVars({ '--i': i })}>
                <span className={styles.reasonNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className={styles.reasonTitle}>{title}</h4>
                <p className={styles.reasonText}>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
