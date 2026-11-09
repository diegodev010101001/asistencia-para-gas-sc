/**
 * Fuente única de los seguros: rutas, metadatos, JSON-LD y sitemap salen de aquí.
 * (Fase 1: solo identidad y slugs. El contenido completo se añade en la fase 5.)
 */

export const SEGURO_SLUGS = [
  'responsabilidad-civil',
  'responsabilidad-ambiental',
  'gastos-medicos-mayores',
] as const;

export type SeguroSlug = (typeof SEGURO_SLUGS)[number];

export interface Seguro {
  slug: SeguroSlug;
  nombre: string;
  nombreCorto: string;
}

export const SEGUROS: readonly Seguro[] = [
  {
    slug: 'responsabilidad-civil',
    nombre: 'Seguro de Responsabilidad Civil',
    nombreCorto: 'Responsabilidad Civil',
  },
  {
    slug: 'responsabilidad-ambiental',
    nombre: 'Seguro de Responsabilidad Ambiental',
    nombreCorto: 'Responsabilidad Ambiental',
  },
  {
    slug: 'gastos-medicos-mayores',
    nombre: 'Seguro de Gastos Médicos Mayores',
    nombreCorto: 'Gastos Médicos Mayores',
  },
];

export function isSeguroSlug(value: string): value is SeguroSlug {
  return (SEGURO_SLUGS as readonly string[]).includes(value);
}

export function getSeguro(slug: string): Seguro | undefined {
  return SEGUROS.find((s) => s.slug === slug);
}
