import Link from 'next/link';

import { Logo } from '@/components/brand/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { NAV_ITEMS, QUOTE_HREF } from '@/data/navigation';
import { SEGUROS } from '@/data/seguros';

import { MobileMenu } from './MobileMenu';
import styles from './SiteHeader.module.css';

// Solo primitivos hacia la isla cliente (serialización mínima).
const SEGURO_LINKS = SEGUROS.map(({ slug, nombreCorto }) => ({ href: `/seguros/${slug}`, label: nombreCorto }));
const NAV_LINKS = NAV_ITEMS.map(({ href, label }) => ({ href, label }));

export function SiteHeader() {
  return (
    <header className={styles.header} style={{ viewTransitionName: 'site-header' }}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="ASISTENCIA PARA GAS SC, ir al inicio" transitionTypes={['nav-back']}>
          <Logo animated />
        </Link>

        <nav aria-label="Principal" className={styles.nav}>
          <ul role="list" className={styles.navList}>
            {NAV_ITEMS.map(({ href, label, section }) => (
              <li key={href}>
                <Link href={href} className={styles.navLink} data-section={section} transitionTypes={['nav-back']}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ButtonLink href={QUOTE_HREF} variant="primary" className={styles.cta}>
            Cotizar
          </ButtonLink>
          <MobileMenu navLinks={NAV_LINKS} seguroLinks={SEGURO_LINKS} quoteHref={QUOTE_HREF} />
        </div>
      </div>
    </header>
  );
}
