import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { Faq } from '@/data/faq-general';
import { QUOTE_HREF } from '@/data/navigation';

import styles from './FaqSection.module.css';

interface FaqSectionProps {
  items: readonly Faq[];
  index?: string;
  title?: string;
  lead?: string;
  /** Valor del atributo name de los <details> (único por página). */
  group?: string;
}

/** Sección de preguntas frecuentes reutilizable (inicio y páginas de seguro). */
export function FaqSection({
  items,
  index,
  title = 'Preguntas frecuentes',
  lead = 'Lo que conviene saber antes de cotizar.',
  group = 'faq',
}: FaqSectionProps) {
  return (
    <section className={styles.section} id="preguntas" aria-labelledby="faq-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.aside}>
          <SectionHeader index={index} label="Preguntas" title={title} lead={lead} id="faq-title" />
          <div className={styles.more} data-reveal>
            <p>¿Tienes otra pregunta?</p>
            <ButtonLink href={QUOTE_HREF} variant="ghost" arrow>
              Escríbenos
            </ButtonLink>
          </div>
        </div>
        <Accordion items={items} name={group} />
      </div>
    </section>
  );
}
