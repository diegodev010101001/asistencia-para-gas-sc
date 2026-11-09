import { LOGO_GEOMETRY } from '@/lib/brand';

import styles from './Logo.module.css';

type Tone = 'default' | 'mono' | 'inverse';

interface LogoMarkProps {
  size?: number;
  tone?: Tone;
  /** Barrido de la aguja al cargar (solo en el header). */
  animated?: boolean;
  className?: string;
}

/** Ícono «Manómetro». Decorativo: el nombre accesible lo da el contenedor. */
export function LogoMark({ size = 36, tone = 'default', animated = false, className }: LogoMarkProps) {
  const { viewBox, arc, needle, pivot, stroke } = LOGO_GEOMETRY;
  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={[styles.mark, styles[tone], className].filter(Boolean).join(' ')}
    >
      <path d={arc} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
      <g className={animated ? styles.needleAnimated : undefined}>
        <path d={needle} className={styles.needle} strokeWidth={stroke} strokeLinecap="round" />
      </g>
      <circle cx={pivot.cx} cy={pivot.cy} r={pivot.r} fill="currentColor" />
    </svg>
  );
}

interface LogoProps {
  tone?: Tone;
  animated?: boolean;
  /** Muestra la línea descriptiva bajo el nombre. */
  withTagline?: boolean;
}

/** Logo completo: ícono + wordmark en texto real (accesible y nítido a cualquier tamaño). */
export function Logo({ tone = 'default', animated = false, withTagline = true }: LogoProps) {
  return (
    <span className={[styles.logo, styles[tone]].join(' ')}>
      <LogoMark tone={tone} animated={animated} />
      <span className={styles.wordmark}>
        <span className={styles.name}>
          Asistencia para Gas <span className={styles.suffix}>SC</span>
        </span>
        {withTagline ? <span className={styles.tagline}>Seguros · Gas LP</span> : null}
      </span>
    </span>
  );
}
