import { ArrowUpRight } from 'lucide-react';

import { buttonClass } from '@/components/ui/Button';
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
          <SectionHeader title={ABOUT.title} id="about-title" />
          {ABOUT.paragraphs.map((parts, i) => (
            <p key={i} className={styles.paragraph} data-reveal style={cssVars({ '--i': i + 2 })}>
              {parts.map((part, j) => {
                if (typeof part === 'string') return part;
                const strong = <strong key={j}>{part.strong}</strong>;
                return 'href' in part ? (
                  <a key={j} href={part.href} target="_blank" rel="noopener noreferrer">
                    {strong}
                    <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
                  </a>
                ) : (
                  strong
                );
              })}
            </p>
          ))}
          <p className={styles.paragraph} data-reveal style={cssVars({ '--i': ABOUT.paragraphs.length + 2 })}>
            <strong>{ABOUT.closing}</strong>
          </p>
          <div className={styles.alliance} data-reveal style={cssVars({ '--i': ABOUT.paragraphs.length + 3 })}>
            <p className="label">{ABOUT.alliance.text}</p>
            <a href={ABOUT.alliance.href} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary')}>
              <span>{ABOUT.alliance.cta}</span>
              <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
              <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
            </a>
          </div>
        </div>

        <div className={styles.media} data-reveal>
          <Figure
            src={imgTuberias}
            alt={ABOUT.imageAlt}
            // Desde 64em la foto toma la altura de la columna de texto y se recorta
            // con cover (~1.6× la altura de antes), así que necesita más resolución.
            sizes="(min-width: 64em) 60vw, 100vw"
            caption="Infraestructura de gas LP"
            className={styles.figure}
          />
        </div>

        <div className={styles.reasons}>
          <h3 className={`label ${styles.reasonsTitle}`} data-reveal>
            Por qué elegirnos
          </h3>
          <ol role="list" className={styles.reasonList}>
            {REASONS.map(({ title, text }, i) => (
              <li key={title} className={styles.reason} data-reveal style={cssVars({ '--i': i })}>
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
