import { Archivo, Public_Sans } from 'next/font/google';

/**
 * Display: Archivo variable con eje de ancho (wdth 62–125) para titulares
 * expandidos tipo señalética industrial.
 * Texto: Public Sans variable, diseñada para máxima legibilidad.
 *
 * next/font descarga las fuentes en build, las sirve desde el mismo dominio,
 * aplica font-display: swap, genera fallbacks métricos (sin CLS) y precarga
 * los archivos. Solo subset latin (incluye á, é, í, ó, ú, ñ, ¿, ¡).
 */
export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
});

export const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-public-sans',
});

export const fontVariables = `${archivo.variable} ${publicSans.variable}`;
