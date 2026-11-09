import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { ReactNode } from 'react';

import { QuoteForm } from '@/components/forms/QuoteForm';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { CONTACT_SECTION } from '@/data/home';
import { SITE, WHATSAPP_MESSAGES, addressText, emailHref, phoneHref, whatsappHref } from '@/data/site';

import styles from './ContactSection.module.css';

interface ContactSectionProps {
  index?: string;
  /** Seguro preseleccionado en el formulario. */
  defaultSeguro?: string;
  title?: string;
  lead?: string;
  /** Mensaje inicial de WhatsApp (en las páginas de seguro menciona el seguro). */
  whatsappMessage?: string;
}

function InfoRow({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string | null }) {
  return (
    <li className={styles.row}>
      <span className={styles.rowIcon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.rowBody}>
        <span className={styles.rowLabel}>{label}</span>
        {href ? (
          <a href={href} className={styles.rowValue} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
            {value}
          </a>
        ) : (
          <span className={styles.rowValue}>{value}</span>
        )}
      </span>
    </li>
  );
}

/** CTA final: formulario de cotización + datos de contacto. */
export function ContactSection({
  index,
  defaultSeguro,
  title = CONTACT_SECTION.title,
  lead = CONTACT_SECTION.lead,
  whatsappMessage = WHATSAPP_MESSAGES.general,
}: ContactSectionProps) {
  const { contact } = SITE;
  const wa = whatsappHref(whatsappMessage);

  return (
    <section className={`on-ink ${styles.section}`} id="contacto" aria-labelledby="contacto-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.aside}>
          <SectionHeader index={index} label={CONTACT_SECTION.label} title={title} lead={lead} id="contacto-title" tone="inverse" />
          <WhatsAppButton message={whatsappMessage} label="Hablar por WhatsApp" variant="inverse" size="l" className={styles.waButton} />
          <ul role="list" className={styles.info}>
            <InfoRow icon={<WhatsAppIcon size={18} />} label="WhatsApp" value={contact.whatsapp} href={wa} />
            <InfoRow icon={<Phone size={18} strokeWidth={1.5} />} label="Teléfono" value={contact.phone} href={phoneHref()} />
            <InfoRow icon={<Mail size={18} strokeWidth={1.5} />} label="Correo" value={contact.email} href={emailHref()} />
            <InfoRow icon={<MapPin size={18} strokeWidth={1.5} />} label="Ubicación" value={addressText()} />
            <InfoRow icon={<Clock size={18} strokeWidth={1.5} />} label="Horario" value={contact.hours} />
          </ul>
        </div>

        <div className={styles.formCard} id="cotizar">
          <h3 className={styles.formTitle}>Datos para tu cotización</h3>
          <QuoteForm defaultSeguro={defaultSeguro} whatsappHref={wa} privacyUrl={SITE.privacyUrl} />
        </div>
      </div>
    </section>
  );
}
