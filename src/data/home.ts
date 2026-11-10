/**
 * Contenido del inicio. Textos reescritos a partir del sitio anterior;
 * las cifras son las existentes (no se añadieron datos nuevos).
 */

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
  label: 'Seguros para gas LP e hidrocarburos',
  titleLines: ['Seguros para', 'la industria', 'del gas LP'],
  // Posicionamiento confirmado (PRODUCT.md): agente/intermediario, no aseguradora.
  lead: 'Somos agentes de seguros especializados en gas LP: analizamos tu operación y colocamos tu póliza con la aseguradora. Para plantas, autotanques y transportistas.',
  // Dato verificable en lugar de una afirmación genérica de cumplimiento.
  compliance: { title: 'Todo México', text: 'Oficina en Aguascalientes' },
  imageAlt: 'Tanque horizontal de almacenamiento de gas LP con escalera y plataforma de servicio en una planta',
} as const;

export const ABOUT = {
  title: 'Protegemos lo que mueve a México',
  paragraphs: [
    'ASISTENCIA PARA GAS SC es un agente de seguros dedicado a la cadena del gas LP e hidrocarburos: plantas de almacenamiento, autotanques, transporte y comercialización. No emitimos pólizas: analizamos tu operación, cotizamos y colocamos la póliza con aseguradoras.',
    'Nuestro trabajo es reducir tu exposición al riesgo con coberturas pensadas para entornos de alta exigencia operativa, que den continuidad al negocio, cumplimiento regulatorio y tranquilidad financiera.',
  ],
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
