import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import type { Faq } from '@/data/faq-general';
import { QUOTE_HREF } from '@/data/navigation';
import { WHATSAPP_MESSAGES } from '@/data/site';

import styles from './FaqSection.module.css';

interface FaqSectionProps {
  items: readonly Faq[];
  index?: string;
  title?: string;
  lead?: string;
  /** Valor del atributo name de los <details> (único por página). */
  group?: string;
  whatsappMessage?: string;
}

/** Sección de preguntas frecuentes reutilizable (inicio y páginas de seguro). */
export function FaqSection({
  items,
  index,
  title = 'Preguntas frecuentes',
  lead = 'Lo que conviene saber antes de cotizar.',
  group = 'faq',
  whatsappMessage = WHATSAPP_MESSAGES.general,
}: FaqSectionProps) {
  return (
    <section className={styles.section} id="preguntas" aria-labelledby="faq-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.aside}>
          <SectionHeader index={index} label="Preguntas" title={title} lead={lead} id="faq-title" />
          <div className={styles.more} data-reveal>
            <p>¿Tienes otra pregunta?</p>
            <div className={styles.moreActions}>
              <WhatsAppButton message={whatsappMessage} label="Pregúntanos por WhatsApp" />
              <ButtonLink href={QUOTE_HREF} variant="ghost" arrow>
                Usar el formulario
              </ButtonLink>
            </div>
          </div>
        </div>
        <Accordion items={items} name={group} />
      </div>
    </section>
  );
}
