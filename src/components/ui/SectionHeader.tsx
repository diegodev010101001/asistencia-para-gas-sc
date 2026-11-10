import type { ReactNode } from 'react';

import { cssVars } from '@/lib/css';

import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  /**
   * Número de sección («02»), solo donde el orden aporta información (las
   * fichas de seguro, cuyo índice lo repite). Va dentro del propio título,
   * no como etiqueta encima: el título se sostiene solo.
   */
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  /** Nivel del encabezado: h2 en secciones, h1 solo si la página no tiene otro. */
  as?: 'h1' | 'h2';
  align?: 'start' | 'split';
  tone?: 'default' | 'inverse';
}

export function SectionHeader({ index, title, lead, id, as: Heading = 'h2', align = 'start', tone = 'default' }: SectionHeaderProps) {
  return (
    <header className={[styles.header, styles[align], styles[tone]].join(' ')}>
      <Heading id={id} className={styles.title} data-reveal>
        {index ? (
          <span className={styles.index} aria-hidden="true">
            {index}
          </span>
        ) : null}
        {title}
      </Heading>
      {lead ? (
        <p className={styles.lead} data-reveal style={cssVars({ '--i': 1 })}>
          {lead}
        </p>
      ) : null}
    </header>
  );
}
