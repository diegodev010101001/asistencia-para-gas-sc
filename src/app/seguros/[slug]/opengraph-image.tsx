import { SEGUROS, getSeguro } from '@/data/seguros';
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';

export const alt = 'Seguro especializado para la industria del gas LP — ASISTENCIA PARA GAS SC';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return SEGUROS.map(({ slug }) => ({ slug }));
}

/** Imagen Open Graph propia de cada seguro (generada en build). */
export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seguro = getSeguro(slug);
  return renderOgImage({
    eyebrow: seguro ? `Ficha ${seguro.code} · Seguro para gas LP` : 'Seguro para gas LP',
    title: seguro?.nombre ?? 'Seguros para la industria del gas LP',
    footer: seguro ? seguro.temas.join(' · ') : 'ASISTENCIA PARA GAS SC',
  });
}
