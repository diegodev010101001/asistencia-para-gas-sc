import { ViewTransition, type ReactNode } from 'react';

/**
 * Transición direccional de página (skill vercel-react-view-transitions).
 * Va dentro de cada page.tsx, nunca en el layout (los layouts persisten y
 * enter/exit no se dispararían). Solo anima navegaciones etiquetadas con
 * transitionTypes 'nav-forward' (inicio → seguro) o 'nav-back' (seguro → inicio);
 * el resto (botón atrás del navegador, recargas) no anima.
 */
export function DirectionalTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
      exit={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
