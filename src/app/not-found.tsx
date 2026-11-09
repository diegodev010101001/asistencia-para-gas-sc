import type { Metadata } from 'next';
import Link from 'next/link';

import { ButtonLink } from '@/components/ui/Button';
import { SEGUROS } from '@/data/seguros';

import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={styles.section} aria-labelledby="nf-title">
      <div className={`container ${styles.inner}`}>
        <p className="label">
          <span className={styles.code}>Error 404</span> — Lectura fuera de rango
        </p>

        <div className={styles.gauge} aria-hidden="true">
          <svg viewBox="0 0 120 70" className={styles.gaugeSvg}>
            <path d="M10 64a50 50 0 0 1 100 0" className={styles.gaugeArc} />
            <g className={styles.gaugeNeedle}>
              <path d="M60 64 L60 22" />
            </g>
            <circle cx="60" cy="64" r="4" />
          </svg>
        </div>

        <h1 id="nf-title" className={`display ${styles.title}`}>
          Esta página no existe
        </h1>
        <p className={styles.lead}>
          La dirección que buscas cambió o nunca existió. Puedes volver al inicio o ir directo a uno de nuestros
          seguros.
        </p>

        <div className={styles.actions}>
          <ButtonLink href="/" variant="primary" arrow transitionTypes={['nav-back']}>
            Volver al inicio
          </ButtonLink>
        </div>

        <ul role="list" className={styles.links}>
          {SEGUROS.map(({ slug, nombre }) => (
            <li key={slug}>
              <Link href={`/seguros/${slug}`} className={styles.link} transitionTypes={['nav-forward']}>
                {nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
