import type { ReactNode } from 'react';

import { cssVars } from '@/lib/css';

import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  /** Número de sección («02»). */
  index?: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  /** Nivel del encabezado: h2 en secciones, h1 solo si la página no tiene otro. */
  as?: 'h1' | 'h2';
  align?: 'start' | 'split';
  tone?: 'default' | 'inverse';
}

export function SectionHeader({
  index,
  label,
  title,
  lead,
  id,
  as: Heading = 'h2',
  align = 'start',
  tone = 'default',
}: SectionHeaderProps) {
  return (
    <header className={[styles.header, styles[align], styles[tone]].join(' ')}>
      <p className={`label ${styles.label}`} data-reveal>
        {index ? <span className={styles.index}>{index}</span> : null}
        <span className={styles.rule} aria-hidden="true" />
        {label}
      </p>
      <Heading id={id} className={styles.title} data-reveal style={cssVars({ '--i': 1 })}>
        {title}
      </Heading>
      {lead ? (
        <p className={styles.lead} data-reveal style={cssVars({ '--i': 2 })}>
          {lead}
        </p>
      ) : null}
    </header>
  );
}
