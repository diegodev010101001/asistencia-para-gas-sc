import type { MetadataRoute } from 'next';

import { SEGUROS } from '@/data/seguros';
import { absoluteUrl } from '@/data/site';

/** Fecha de la última revisión de contenido (actualízala al cambiar textos). */
const LAST_CONTENT_UPDATE = new Date('2026-11-09');

/** sitemap.xml generado en build a partir de src/data/seguros.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl('/'),
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...SEGUROS.map(({ slug }) => ({
      url: absoluteUrl(`/seguros/${slug}`),
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
