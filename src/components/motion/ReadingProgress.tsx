'use client';

import { useEffect, useRef } from 'react';

import styles from './ReadingProgress.module.css';

/**
 * Barra de progreso de lectura. Usa animaciones ligadas al scroll de CSS
 * (animation-timeline: scroll()) sin JavaScript en el hilo principal; solo
 * donde no hay soporte se actualiza con un listener pasivo + rAF.
 */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar || CSS.supports('animation-timeline: scroll()')) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={ref} className={styles.bar} />
    </div>
  );
}
