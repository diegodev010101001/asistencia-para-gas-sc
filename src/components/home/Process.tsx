import { SectionHeader } from '@/components/ui/SectionHeader';
import { PROCESS } from '@/data/home';
import { cssVars } from '@/lib/css';

import styles from './Process.module.css';

export function Process() {
  return (
    <section className={styles.section} id="proceso" aria-labelledby="proceso-title">
      <div className="container">
        <SectionHeader
          index="03"
          label="Cómo cotizar"
          title="De tu operación a tu póliza, en cuatro pasos"
          lead="Sin costo y sin compromiso. Cada propuesta parte de un análisis de tu exposición real."
          id="proceso-title"
          align="split"
        />
        <ol role="list" className={styles.steps}>
          {PROCESS.map(({ title, text }, i) => (
            <li key={title} className={styles.step} data-reveal style={cssVars({ '--i': i })}>
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.tick} aria-hidden="true" />
              <h3 className={styles.title}>
                <span className="visually-hidden">Paso {i + 1}: </span>
                {title}
              </h3>
              <p className={styles.text}>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
