import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { ScrollSentinel } from '@/components/layout/ScrollSentinel';
import { FloatingCta } from '@/components/motion/FloatingCta';
import { MotionObserver } from '@/components/motion/MotionObserver';
import { QUOTE_HREF } from '@/data/navigation';
import { SITE, whatsappHref } from '@/data/site';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import skip from '@/components/layout/SkipLink.module.css';
import { fontVariables } from '@/lib/fonts';
import './globals.css';

/** Metadatos base. Cada página completa los suyos con buildMetadata (src/lib/seo.ts). */
export const metadata: Metadata = {
  // TODO: dominio final (NEXT_PUBLIC_SITE_URL en Vercel). Base de canonical, OG y sitemap.
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Seguros para la industria del gas LP`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    siteName: SITE.name,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#f4f2ee',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-MX" data-scroll-behavior="smooth" className={fontVariables}>
      <body>
        <a href="#contenido" className={skip.skip}>
          Saltar al contenido
        </a>
        <ScrollSentinel />
        <SiteHeader />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <FloatingCta quoteHref={QUOTE_HREF} whatsappHref={whatsappHref('Hola, me gustaría cotizar un seguro para mi operación.')} />
        <MotionObserver />
      </body>
    </html>
  );
}
