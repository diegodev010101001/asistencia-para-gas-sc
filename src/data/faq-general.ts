import { INSURANCE_PARTNER, SITE } from './site';

export interface Faq {
  question: string;
  answer: string;
}

/** Preguntas frecuentes generales (inicio). Respuestas del sitio anterior, con redacción revisada. */
export const FAQ_GENERAL: readonly Faq[] = [
  {
    // Posicionamiento confirmado por el cliente (PRODUCT.md): asociación + aliado en seguros.
    question: '¿Ustedes son la aseguradora?',
    answer: `No. ${SITE.name} es una asociación dedicada a impulsar soluciones y servicios especializados para el sector de hidrocarburos y la industria energética en México. Los seguros se ofrecen a través de nuestra alianza estratégica con ${INSURANCE_PARTNER}, firma especializada en intermediación de seguros; la póliza la emite la compañía aseguradora.`,
  },
  {
    question: `¿Cuál es la relación con ${INSURANCE_PARTNER}?`,
    answer: `Es nuestro aliado estratégico en seguros. Nosotros aportamos el conocimiento del sector y la vinculación con empresas, operadores y profesionales de la industria; ${INSURANCE_PARTNER}, como firma especializada en intermediación de seguros, acerca las soluciones de aseguramiento diseñadas para las necesidades de la industria de hidrocarburos.`,
  },
  {
    question: '¿Qué tipo de empresas pueden contratar estos seguros?',
    answer:
      'Cualquier empresa de la cadena energética: plantas de almacenamiento de gas LP, estaciones de servicio y de carburación, distribuidoras, transportistas especializados, operadores logísticos y empresas industriales que manejan hidrocarburos.',
  },
  {
    question: '¿En qué se diferencia el seguro de Responsabilidad Civil del de Responsabilidad Ambiental?',
    answer:
      'La Responsabilidad Civil cubre daños a terceros —personas y propiedades— derivados de la operación de tu empresa. La Responsabilidad Ambiental cubre los costos de contención, limpieza, remediación y restauración por contaminación de suelo o agua, incluidos eventos graduales cuando se contratan.',
  },
  {
    question: '¿La cotización tiene costo?',
    answer:
      'No. La cotización es gratuita, sin compromiso y se prepara con base en la operación específica de tu empresa.',
  },
  {
    question: '¿Las pólizas cumplen con los requisitos de CNE y ASEA?',
    answer:
      'Sí. Las coberturas se diseñan para atender las disposiciones de la Comisión Nacional de Energía (CNE), de la Agencia de Seguridad, Energía y Ambiente (ASEA) y las Normas Oficiales Mexicanas aplicables al sector hidrocarburos.',
  },
  {
    question: '¿Cuánto tarda en emitirse una póliza?',
    answer:
      'Depende del perfil de riesgo. Las operaciones estándar suelen emitirse en 3 a 7 días hábiles; los riesgos complejos o de alta capacidad pueden tomar hasta 15 días hábiles, ya que incluyen análisis técnico y aceptación por parte de la aseguradora.',
  },
];
