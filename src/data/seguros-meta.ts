/**
 * Identidad ligera de los seguros (sin imágenes ni contenido de detalle).
 * La pueden importar componentes cliente —como el formulario— sin arrastrar
 * el contenido completo de src/data/seguros.ts al bundle del navegador.
 */

export const SEGURO_SLUGS = [
  'responsabilidad-civil',
  'responsabilidad-ambiental',
  'gastos-medicos-mayores',
] as const;

export type SeguroSlug = (typeof SEGURO_SLUGS)[number];

export interface SeguroMeta {
  slug: SeguroSlug;
  /** Número de ficha («01», «02», «03»). */
  code: string;
  nombre: string;
  nombreCorto: string;
}

export const SEGURO_META: Record<SeguroSlug, SeguroMeta> = {
  'responsabilidad-civil': {
    slug: 'responsabilidad-civil',
    code: '01',
    nombre: 'Seguro de Responsabilidad Civil',
    nombreCorto: 'Responsabilidad Civil',
  },
  'responsabilidad-ambiental': {
    slug: 'responsabilidad-ambiental',
    code: '02',
    nombre: 'Seguro de Responsabilidad Ambiental',
    nombreCorto: 'Responsabilidad Ambiental',
  },
  'gastos-medicos-mayores': {
    slug: 'gastos-medicos-mayores',
    code: '03',
    nombre: 'Seguro de Gastos Médicos Mayores',
    nombreCorto: 'Gastos Médicos Mayores',
  },
};

export function isSeguroSlug(value: string): value is SeguroSlug {
  return (SEGURO_SLUGS as readonly string[]).includes(value);
}
