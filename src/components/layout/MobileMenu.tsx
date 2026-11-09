'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Menu, X } from 'lucide-react';

import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

import styles from './MobileMenu.module.css';

interface MenuLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navLinks: readonly MenuLink[];
  seguroLinks: readonly MenuLink[];
  quoteHref: string;
  /** Enlace de WhatsApp ya construido en el servidor (null si no hay número). */
  whatsappHref: string | null;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

export function MobileMenu({ navLinks, seguroLinks, quoteHref, whatsappHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  // Bloqueo de scroll y foco inicial al abrir.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => {
      root.style.overflow = '';
    };
  }, [open]);

  // Si la ventana crece a escritorio con el menú abierto, se cierra.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia('(min-width: 64em)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [open]);

  // Escape cierra; Tab queda atrapado entre el botón y el panel.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab' || !panelRef.current || !buttonRef.current) return;
    const items = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  let index = 0;

  return (
    <div className={styles.root} onKeyDown={onKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="visually-hidden">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
        <span className={styles.icon} data-open={open || undefined} aria-hidden="true">
          <Menu size={22} strokeWidth={1.75} className={styles.iconMenu} />
          <X size={22} strokeWidth={1.75} className={styles.iconClose} />
        </span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        className={styles.panel}
        data-open={open || undefined}
        inert={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
      >
        <nav aria-label="Menú móvil" className={`container ${styles.content}`}>
          <ul role="list" className={styles.primary}>
            {navLinks.map(({ href, label }) => (
              <li key={href} style={{ '--i': index++ } as CSSProperties}>
                <Link href={href} className={styles.primaryLink} onClick={() => close(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.group} style={{ '--i': index++ } as CSSProperties}>
            <p className="label">Seguros</p>
            <ul role="list" className={styles.secondary}>
              {seguroLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={styles.secondaryLink} onClick={() => close(false)} transitionTypes={['nav-forward']}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footer} style={{ '--i': index++ } as CSSProperties}>
            <Link href={quoteHref} className={styles.cta} onClick={() => close(false)}>
              Solicitar cotización
            </Link>
            {whatsappHref ? (
              <a href={whatsappHref} className={styles.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => close(false)}>
                <WhatsAppIcon size={18} />
                Hablar por WhatsApp
                <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
              </a>
            ) : null}
          </div>
        </nav>
      </div>
    </div>
  );
}
