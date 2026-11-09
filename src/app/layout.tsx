import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { ScrollSentinel } from '@/components/layout/ScrollSentinel';
import { FloatingCta } from '@/components/motion/FloatingCta';
import { MotionObserver } from '@/components/motion/MotionObserver';
import { QUOTE_HREF } from '@/data/navigation';
import { whatsappHref } from '@/data/site';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import skip from '@/components/layout/SkipLink.module.css';
import { fontVariables } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASISTENCIA PARA GAS SC | Seguros Especializados',
  description:
    'ASISTENCIA PARA GAS SC — Seguros especializados para la industria del gas, hidrocarburos y energía en México. Responsabilidad civil, ambiental y gastos médicos.',
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
