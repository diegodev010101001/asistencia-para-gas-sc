/**
 * Contenido del inicio. Textos reescritos a partir del sitio anterior;
 * las cifras son las existentes (no se añadieron datos nuevos).
 */
import { INSURANCE_PARTNER, SITE } from './site';

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

/** Estadísticas del sitio anterior, conservadas tal cual. */
export const STATS: readonly Stat[] = [
  { value: 500, suffix: '+', label: 'Empresas protegidas' },
  { value: 10, suffix: '+', label: 'Años de experiencia' },
  { value: 3, suffix: '', label: 'Seguros especializados' },
];

export const HERO = {
  titleLines: ['Seguros para', 'la industria', 'del gas LP'],
  // Posicionamiento (PRODUCT.md): asociación del sector; los seguros, mediante su aliado Conseguro Broker.
  lead: `Somos una asociación dedicada al sector de hidrocarburos. Con nuestro aliado ${INSURANCE_PARTNER.name} acercamos seguros para plantas, autotanques y transportistas de gas LP.`,
  // Dato verificable en lugar de una afirmación genérica de cumplimiento.
  compliance: { title: 'Todo México', text: 'Oficina en Aguascalientes' },
  imageAlt: 'Tanque horizontal de almacenamiento de gas LP con escalera y plataforma de servicio en una planta',
} as const;

/** Fragmento de texto; `{ strong }` se muestra en negritas y, con `href`, como enlace externo. */
export type Inline = string | { strong: string; href?: string };

/** «Protegemos lo que mueve a México»: redacción del cliente, sin cambios. */
export const ABOUT = {
  title: 'Protegemos lo que mueve a México',
  paragraphs: [
    [
      { strong: SITE.name },
      ' es una asociación dedicada a impulsar y proporcionar soluciones y servicios especializados para el sector de hidrocarburos y la industria energética en México.',
    ],
    [
      'A través de nuestra vinculación con empresas, operadores y profesionales de la industria, promovemos servicios que contribuyen al fortalecimiento, desarrollo y continuidad de las operaciones del sector.',
    ],
    [
      'Como parte de nuestra propuesta de valor, mantenemos una alianza estratégica con ',
      { strong: INSURANCE_PARTNER.name, href: INSURANCE_PARTNER.url },
      ', firma especializada en intermediación de seguros, para acercar soluciones de aseguramiento diseñadas para las necesidades específicas de la industria de hidrocarburos.',
    ],
    [
      'Nuestro objetivo es ofrecer un respaldo integral que combine conocimiento del sector, servicios especializados y soluciones de protección patrimonial, responsabilidad civil y responsabilidad ambiental.',
    ],
  ] satisfies readonly (readonly Inline[])[],
  /** Bloque «Alianza estratégica» con enlace al sitio del aliado. */
  alliance: {
    text: `Alianza estratégica con ${INSURANCE_PARTNER.name}`,
    cta: `Conocer a ${INSURANCE_PARTNER.name}`,
    href: INSURANCE_PARTNER.url,
  },
  /** Frase de cierre, destacada. */
  closing:
    'Conectamos a la industria con soluciones que protegen su operación, fortalecen su patrimonio y contribuyen a la continuidad de sus negocios.',
  imageAlt: 'Válvulas y tuberías amarillas de gas LP con etiquetas de cierre en una planta de distribución',
} as const;

export interface Reason {
  title: string;
  text: string;
}

/** «Por qué elegirnos»: argumentos presentes en el sitio anterior. */
export const REASONS: readonly Reason[] = [
  {
    title: 'Especialización energética',
    text: 'Trabajamos solo con la cadena del gas LP e hidrocarburos: entendemos la operación antes de proponer una póliza.',
  },
  {
    title: 'Cumplimiento CNE y ASEA',
    text: 'Coberturas alineadas con los permisos de la Comisión Nacional de Energía, las disposiciones de ASEA y las NOM aplicables.',
  },
  {
    title: 'Límites con fundamento técnico',
    text: 'Límites, deducibles y exclusiones se revisan contra tu exposición real, no solo para «pasar el trámite».',
  },
  {
    title: 'Cobertura a tu escala',
    text: 'Pólizas que se ajustan a operaciones locales, regionales o nacionales.',
  },
];

export interface ProcessStep {
  title: string;
  text: string;
}

export const PROCESS: readonly ProcessStep[] = [
  {
    title: 'Cuéntanos tu operación',
    text: 'Tipo de actividad, ubicación, flota y capacidad de almacenamiento. Puedes hacerlo con el formulario o por WhatsApp.',
  },
  {
    title: 'Analizamos tu exposición',
    text: 'Revisamos escenarios de riesgo, límites necesarios, deducibles viables y exclusiones críticas para tu giro.',
  },
  {
    title: 'Recibe tu propuesta',
    text: 'Te enviamos una propuesta personalizada y sin costo en menos de 48 horas hábiles.',
  },
  {
    title: 'Emisión de la póliza',
    text: 'Operaciones estándar: de 3 a 7 días hábiles. Riesgos complejos o de alta capacidad: hasta 15 días hábiles.',
  },
];

export const CONTACT_SECTION = {
  title: 'Solicita tu cotización sin costo',
  lead: 'Cuéntanos sobre tu operación y te enviamos una propuesta personalizada en menos de 48 horas hábiles.',
} as const;
