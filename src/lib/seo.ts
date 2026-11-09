import type { Metadata } from 'next';

import { SITE } from '@/data/site';

interface PageSeo {
  title: string;
  description: string;
  /** Ruta canónica relativa (se resuelve contra metadataBase). */
  path: string;
  keywords?: readonly string[];
}

/**
 * Metadatos completos por ruta. Next fusiona los objetos de metadata de forma
 * superficial: si una página define openGraph, reemplaza el del layout. Por
 * eso cada ruta construye su bloque completo con esta función.
 * La imagen OG/Twitter la aporta el archivo opengraph-image de cada segmento.
 */
export function buildMetadata({ title, description, path, keywords }: PageSeo): Metadata {
  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: SITE.locale,
      siteName: SITE.name,
      url: path,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
