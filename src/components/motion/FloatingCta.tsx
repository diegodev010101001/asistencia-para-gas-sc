'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FileText } from 'lucide-react';

import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

import styles from './FloatingCta.module.css';

interface FloatingCtaProps {
  quoteHref: string;
  /** null mientras el número de WhatsApp sea un marcador pendiente. */
  whatsappHref: string | null;
}

/**
 * Acceso flotante discreto a cotizar / WhatsApp.
 * Aparece después del primer pantallazo y se oculta cuando la sección de
 * contacto ya está visible (sería redundante).
 */
export function FloatingCta({ quoteHref, whatsappHref }: FloatingCtaProps) {
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry) setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // La sección de contacto cambia con la ruta: se vuelve a observar en cada navegación.
  useEffect(() => {
    const contact = document.getElementById('contacto');
    if (!contact) return;
    const io = new IntersectionObserver(([entry]) => setContactVisible(Boolean(entry?.isIntersecting)), { threshold: 0.05 });
    io.observe(contact);
    return () => {
      io.disconnect();
      setContactVisible(false);
    };
  }, [pathname]);

  const visible = pastHero && !contactVisible;

  return (
    <>
      <div ref={sentinel} className={styles.sentinel} aria-hidden="true" />
      <div className={styles.dock} data-visible={visible || undefined} inert={!visible} style={{ viewTransitionName: 'floating-cta' }}>
        {whatsappHref ? (
          <a href={whatsappHref} className={styles.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp">
            <WhatsAppIcon size={20} />
          </a>
        ) : null}
        <Link href={quoteHref} className={styles.quote}>
          <FileText size={18} strokeWidth={1.75} aria-hidden="true" />
          Cotizar
        </Link>
      </div>
    </>
  );
}
