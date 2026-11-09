'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Isla única de interacción. Opera sobre el HTML que renderizan los Server
 * Components mediante atributos data-*, sin re-renders de React:
 *
 *  - [data-reveal]     revelado al entrar en pantalla (escalonado con --i).
 *  - [data-count-to]   contador animado al entrar en pantalla.
 *  - [data-spotlight]  luz que sigue al cursor + inclinación leve (≤3°).
 *  - [data-section]    enlace del header marcado como sección activa.
 *
 * Respeta prefers-reduced-motion y solo usa transform/opacity.
 * Se vuelve a ejecutar en cada cambio de ruta.
 */

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

function inViewport(el: Element) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
}

function setupReveal() {
  const root = document.documentElement;
  const pending = [...document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])')];
  // Lo que ya está visible se marca antes de activar el estado oculto: sin parpadeo.
  for (const el of pending) if (inViewport(el)) el.setAttribute('data-revealed', '');
  root.setAttribute('data-motion', '');

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-revealed', '');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  for (const el of pending) if (!el.hasAttribute('data-revealed')) observer.observe(el);
  return () => observer.disconnect();
}

function setupCounters() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-count-to]')];
  if (els.length === 0 || reducedMotion()) return () => {};

  const duration = 1600;
  const frames = new Set<number>();

  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.countTo);
    if (!Number.isFinite(target)) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = String(Math.round(target * easeOutExpo(t)));
      if (t < 1) frames.add(requestAnimationFrame(tick));
    };
    frames.add(requestAnimationFrame(tick));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        run(entry.target as HTMLElement);
      }
    },
    { threshold: 0.6 },
  );

  for (const el of els) {
    // Reserva el ancho final (cifras tabulares) para que el conteo no desplace nada.
    el.style.display = 'inline-block';
    el.style.minWidth = `${el.dataset.countTo?.length ?? 1}ch`;
    el.textContent = '0';
    observer.observe(el);
  }

  return () => {
    observer.disconnect();
    frames.forEach((id) => cancelAnimationFrame(id));
    for (const el of els) el.textContent = el.dataset.countTo ?? el.textContent;
  };
}

function setupSpotlight() {
  if (reducedMotion() || !finePointer()) return () => {};
  const cards = [...document.querySelectorAll<HTMLElement>('[data-spotlight]')];
  const cleanups: (() => void)[] = [];

  for (const card of cards) {
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        card.style.setProperty('--ry', `${((x / r.width - 0.5) * 5).toFixed(2)}deg`);
        card.style.setProperty('--rx', `${((0.5 - y / r.height) * 5).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    };
    card.addEventListener('pointermove', onMove, { passive: true });
    card.addEventListener('pointerleave', onLeave, { passive: true });
    // Al navegar se endereza la tarjeta para que el morph parta de su forma real.
    card.addEventListener('click', onLeave, { passive: true });
    cleanups.push(() => {
      cancelAnimationFrame(frame);
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
      card.removeEventListener('click', onLeave);
    });
  }
  return () => cleanups.forEach((fn) => fn());
}

function setupActiveSection(pathname: string) {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('a[data-section]')];
  const clear = () => links.forEach((l) => l.removeAttribute('aria-current'));
  if (pathname !== '/' || links.length === 0) {
    clear();
    return clear;
  }

  const sections = links
    .map((l) => document.getElementById(l.dataset.section ?? ''))
    .filter((s): s is HTMLElement => s !== null);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const l of links) {
          if (l.dataset.section === entry.target.id) l.setAttribute('aria-current', 'true');
          else l.removeAttribute('aria-current');
        }
      }
    },
    // Banda central de la ventana: la sección que la cruza es la activa.
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => observer.observe(s));
  return () => {
    observer.disconnect();
    clear();
  };
}

export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups = [setupReveal(), setupCounters(), setupSpotlight(), setupActiveSection(pathname)];
    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
