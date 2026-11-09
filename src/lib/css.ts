import type { CSSProperties } from 'react';

/** Variables CSS tipadas para el atributo style (p. ej. el índice de escalonado `--i`). */
export function cssVars(vars: Record<`--${string}`, string | number>): CSSProperties {
  return vars as CSSProperties;
}
