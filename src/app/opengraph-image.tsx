import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';

export const alt = 'ASISTENCIA PARA GAS SC — Seguros para la industria del gas LP en México';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: 'Seguros para gas LP e hidrocarburos',
    title: 'Protección técnica para cada etapa de la operación',
    footer: 'Responsabilidad Civil · Responsabilidad Ambiental · Gastos Médicos Mayores',
  });
}
