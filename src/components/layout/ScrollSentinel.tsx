'use client';

import { useEffect, useRef } from 'react';

/**
 * Marca <html data-scrolled> cuando la página deja de estar en la parte superior.
 * Usa IntersectionObserver sobre un elemento centinela: ningún listener de scroll
 * y ningún re-render de React (el header reacciona solo con CSS).
 */
export function ScrollSentinel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(([entry]) => {
      root.toggleAttribute('data-scrolled', entry ? !entry.isIntersecting : false);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 24, pointerEvents: 'none' }}
    />
  );
}
