import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import styles from './Breadcrumbs.module.css';

export interface Crumb {
  label: string;
  href?: string;
}

/** Ruta de navegación. El último elemento es la página actual (aria-current). */
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Ruta de navegación" className={styles.nav}>
      <ol className={styles.list}>
        {items.map(({ label, href }, i) => {
          const last = i === items.length - 1;
          return (
            <li key={label} className={styles.item}>
              {href && !last ? (
                <Link href={href} className={styles.link} transitionTypes={['nav-back']}>
                  {label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{label}</span>
              )}
              {!last ? <ChevronRight size={14} aria-hidden="true" className={styles.sep} /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
