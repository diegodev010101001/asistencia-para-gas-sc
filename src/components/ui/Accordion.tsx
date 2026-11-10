import { Plus } from 'lucide-react';

import type { Faq } from '@/data/faq-general';
import { cssVars } from '@/lib/css';

import styles from './Accordion.module.css';

interface AccordionProps {
  items: readonly Faq[];
  /** Agrupa los <details>: abrir uno cierra los demás (atributo nativo name). */
  name: string;
}

/**
 * Acordeón con <details>/<summary> nativos: accesible con teclado, funciona
 * sin JavaScript y el contenido completo queda en el HTML prerenderizado.
 */
export function Accordion({ items, name }: AccordionProps) {
  return (
    <div className={styles.list}>
      {items.map(({ question, answer }, i) => (
        <details key={question} name={name} className={styles.item} data-reveal style={cssVars({ '--i': i })}>
          <summary className={styles.summary}>
            <span className={styles.question}>{question}</span>
            <span className={styles.icon} aria-hidden="true">
              <Plus size={20} strokeWidth={1.5} />
            </span>
          </summary>
          <div className={styles.answer}>
            <p>{answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
