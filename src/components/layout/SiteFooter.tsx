import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { ReactNode } from 'react';

import { Logo } from '@/components/brand/Logo';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { NAV_ITEMS } from '@/data/navigation';
import { SEGUROS } from '@/data/seguros';
import { SITE, WHATSAPP_MESSAGES, addressText, emailHref, phoneHref, whatsappHref } from '@/data/site';

import styles from './SiteFooter.module.css';

const YEAR = new Date().getFullYear();

function ContactItem({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href: string | null }) {
  return (
    <li className={styles.contactItem}>
      <span className={styles.contactIcon} aria-hidden="true">
        {icon}
      </span>
      <span className="visually-hidden">{label}: </span>
      {href ? (
        <a href={href} className={styles.link}>
          {value}
        </a>
      ) : (
        <span>{value}</span>
      )}
    </li>
  );
}

export function SiteFooter() {
  const { contact } = SITE;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo tone="inverse" />
          <p className={styles.about}>{SITE.description}</p>
          <ul role="list" className={styles.regulators} aria-label="Marco regulatorio">
            {SITE.regulators.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <nav aria-label="Seguros" className={styles.col}>
          <h2 className={styles.colTitle}>Seguros</h2>
          <ul role="list" className={styles.list}>
            {SEGUROS.map(({ slug, nombre }) => (
              <li key={slug}>
                <Link href={`/seguros/${slug}`} className={styles.link} transitionTypes={['nav-forward']}>
                  {nombre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Secciones" className={styles.col}>
          <h2 className={styles.colTitle}>Sitio</h2>
          <ul role="list" className={styles.list}>
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={styles.link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>Contacto</h2>
          <ul role="list" className={styles.list}>
            <ContactItem icon={<Phone size={16} strokeWidth={1.75} />} label="Teléfono" value={contact.phone} href={phoneHref()} />
            <ContactItem icon={<WhatsAppIcon size={16} />} label="WhatsApp" value={contact.whatsapp} href={whatsappHref(WHATSAPP_MESSAGES.general)} />
            <ContactItem icon={<Mail size={16} strokeWidth={1.75} />} label="Correo" value={contact.email} href={emailHref()} />
            <ContactItem icon={<MapPin size={16} strokeWidth={1.75} />} label="Ubicación" value={addressText()} href={null} />
          </ul>
          <p className={styles.hours}>{contact.hours}</p>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {YEAR} {SITE.name}. Todos los derechos reservados.
        </p>
        {/* TODO: el enlace aparece en cuanto exista SITE.privacyUrl. */}
        {SITE.privacyUrl ? (
          <Link href={SITE.privacyUrl} className={styles.link}>
            Aviso de privacidad
          </Link>
        ) : null}
      </div>
    </footer>
  );
}
