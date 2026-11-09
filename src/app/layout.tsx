import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import type { ReactNode } from 'react';

// TEMPORAL (fase 1): estilos y fuente de la versión anterior. Se reemplazan en la fase 2.
import '@/legacy/styles/global.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });

export const metadata: Metadata = {
  title: 'ASISTENCIA PARA GAS SC | Seguros Especializados',
  description:
    'ASISTENCIA PARA GAS SC — Seguros especializados para la industria del gas, hidrocarburos y energía en México. Responsabilidad civil, ambiental y gastos médicos.',
  // TEMPORAL (fase 1): se sustituye por src/app/icon.svg en la fase 3.
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#060709',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-MX" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
