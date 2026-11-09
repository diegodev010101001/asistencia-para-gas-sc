import { PointerLight } from '@/components/motion/PointerLight';
import { ButtonLink } from '@/components/ui/Button';
import { Figure } from '@/components/ui/Figure';
import { QUOTE_HREF } from '@/data/navigation';
import { HERO, STATS } from '@/data/home';
import { cssVars } from '@/lib/css';
import imgTanque from '@/assets/tanque.png';

import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title" id="inicio">
      <div className={styles.grid} aria-hidden="true" />
      <PointerLight />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`label ${styles.label}`}>
            <span className={styles.dot} aria-hidden="true" />
            {HERO.label}
          </p>

          <h1 id="hero-title" className={`display ${styles.title}`}>
            {HERO.titleLines.map((line, i) => (
              <span key={line} className={styles.line}>
                <span className={styles.lineInner} style={cssVars({ '--i': i })}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className={styles.lead}>{HERO.lead}</p>

          <div className={styles.actions}>
            <ButtonLink href={QUOTE_HREF} variant="primary" size="l" arrow>
              Solicitar cotización
            </ButtonLink>
            <ButtonLink href="/#seguros" variant="secondary" size="l">
              Ver seguros
            </ButtonLink>
          </div>
        </div>

        <div className={styles.visual}>
          <Figure
            src={imgTanque}
            alt={HERO.imageAlt}
            sizes="(min-width: 64em) 40vw, (min-width: 40em) 80vw, 100vw"
            position="38% 50%"
            preload
            className={styles.figure}
          />
          <div className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            <span>
              <strong>{HERO.compliance.title}</strong>
              <span className={styles.badgeText}>{HERO.compliance.text}</span>
            </span>
          </div>
        </div>

        <dl className={styles.stats}>
          {STATS.map(({ value, suffix, label }, i) => (
            <div key={label} className={styles.stat} style={cssVars({ '--i': i })}>
              <dt className={styles.statLabel}>{label}</dt>
              <dd className={styles.statValue}>
                <span data-count-to={value}>{value}</span>
                {suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
