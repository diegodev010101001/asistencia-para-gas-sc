/**
 * Fuente única de los seguros: rutas, metadatos, JSON-LD y sitemap salen de aquí.
 * (Fase 4: identidad y datos de tarjeta. El contenido de detalle se añade en la fase 5.)
 */
import type { StaticImageData } from 'next/image';

import imgCargaDescarga from '@/assets/RCyRA_cargaydescarga.jpg.jpeg';
import imgIndustria from '@/assets/RA_industria.jpg.jpeg';
import imgPersonal from '@/assets/RC_personasplantagaslp.jpg.jpeg';

import { SEGURO_META, type SeguroMeta } from './seguros-meta';

export { SEGURO_SLUGS, isSeguroSlug, type SeguroSlug } from './seguros-meta';

export type SeguroIcon = 'shield' | 'droplets' | 'heart-pulse';

export interface SeguroImage {
  src: StaticImageData;
  alt: string;
}

export interface Seguro extends SeguroMeta {
  icono: SeguroIcon;
  resumen: string;
  temas: readonly [string, string, string];
  imagen: SeguroImage;
}

export const SEGUROS: readonly Seguro[] = [
  {
    ...SEGURO_META['responsabilidad-civil'],
    icono: 'shield',
    resumen:
      'Protección ante daños a terceros —personas, propiedades e instalaciones— en toda la cadena de operación del gas LP e hidrocarburos.',
    temas: ['RC Operación', 'Carga y Descarga', 'Transporte'],
    imagen: {
      src: imgCargaDescarga,
      alt: 'Manguera de llenado conectada a la válvula de un cilindro de gas LP durante una maniobra de carga',
    },
  },
  {
    ...SEGURO_META['responsabilidad-ambiental'],
    icono: 'droplets',
    resumen:
      'Remediación, contención y restauración ante derrames, fugas y contaminación de suelo o agua en operaciones energéticas.',
    temas: ['Remediación', 'Contaminación Gradual', 'Claims-Made'],
    imagen: {
      // TODO: sustituir por una imagen de derrame o suelo contaminado cuando esté disponible.
      src: imgIndustria,
      alt: 'Chimeneas industriales emitiendo columnas de humo sobre una planta al atardecer',
    },
  },
  {
    ...SEGURO_META['gastos-medicos-mayores'],
    icono: 'heart-pulse',
    resumen:
      'Cobertura médica para trabajadores expuestos a riesgos industriales, incluidos accidentes en instalaciones de gas, transporte y operaciones de campo.',
    temas: ['Accidentes Laborales', 'Hospitalización', 'Rehabilitación'],
    imagen: {
      // TODO: imagen propia para Gastos Médicos Mayores (hoy reutiliza una foto de personal en planta).
      src: imgPersonal,
      alt: 'Tres técnicos con casco y uniforme de seguridad revisando documentación en una planta de gas',
    },
  },
];

export function getSeguro(slug: string): Seguro | undefined {
  return SEGUROS.find((s) => s.slug === slug);
}
