import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import type { ReactNode } from 'react';

import { fontVariables } from '@/lib/fonts';
import './globals.css';

// TEMPORAL: fuente del código heredado (src/legacy). Se elimina en la fase 5.
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap', preload: false });

export const metadata: Metadata = {
  title: 'ASISTENCIA PARA GAS SC | Seguros Especializados',
  description:
    'ASISTENCIA PARA GAS SC — Seguros especializados para la industria del gas, hidrocarburos y energía en México. Responsabilidad civil, ambiental y gastos médicos.',
  // TEMPORAL (fase 1): se sustituye por src/app/icon.svg en la fase 3.
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#f4f2ee',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-MX" data-scroll-behavior="smooth" className={`${fontVariables} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
