'use client';

import { useEffect, useRef } from 'react';

import styles from './PointerLight.module.css';

/**
 * Luz suave que sigue al cursor sobre la retícula del hero.
 * Solo con puntero fino y sin movimiento reducido; se mueve con transform
 * dentro de requestAnimationFrame (sin re-renders ni layout).
 */
export function PointerLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = ref.current;
    const area = light?.parentElement;
    if (!light || !area) return;
    const ok = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!ok.matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = area.getBoundingClientRect();
        light.style.transform = `translate3d(${e.clientX - r.left}px, ${e.clientY - r.top}px, 0)`;
        light.dataset.active = '';
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      delete light.dataset.active;
    };

    area.addEventListener('pointermove', onMove, { passive: true });
    area.addEventListener('pointerleave', onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <div ref={ref} className={styles.light} aria-hidden="true" />;
}
