import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import type { ReactNode } from 'react';

import { ScrollSentinel } from '@/components/layout/ScrollSentinel';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import skip from '@/components/layout/SkipLink.module.css';
import { fontVariables } from '@/lib/fonts';
import './globals.css';

// TEMPORAL: fuente del código heredado (src/legacy). Se elimina en la fase 5.
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap', preload: false });

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
    <html lang="es-MX" data-scroll-behavior="smooth" className={`${fontVariables} ${geist.variable}`}>
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
      </body>
    </html>
  );
}
