import type { Seguro } from '@/data/seguros';

import styles from './FichaIndex.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

/** Índice de la ficha con los mismos números que llevan sus secciones. */
function buildIndex(seguro: Seguro) {
  const extras = seguro.extras.filter((e) => e.tipo !== 'datos').length;
  return [
    { id: 'cobertura', label: 'Cobertura', num: pad(2) },
    { id: 'dirigido', label: 'A quién va dirigido', num: pad(3) },
    { id: 'escenarios', label: 'Escenarios', num: pad(4) },
    { id: 'preguntas', label: 'Preguntas', num: pad(5 + extras) },
    { id: 'cotizar', label: 'Cotizar', num: pad(6 + extras) },
  ];
}

/**
 * Índice fijo bajo el header durante toda la ficha (páginas de ~10,000 px).
 * La sección activa la marca MotionObserver mediante [data-spy]; sin
 * JavaScript sigue siendo una lista de anclas.
 */
export function FichaIndex({ seguro }: { seguro: Seguro }) {
  return (
    <nav aria-label="Contenido de la ficha" className={styles.index}>
      <div className="container">
        <ol className={styles.list}>
          {buildIndex(seguro).map(({ id, label, num }) => (
            <li key={id}>
              <a href={`#${id}`} className={styles.link} data-spy={id}>
                <span className={styles.num} aria-hidden="true">
                  {num}
                </span>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
