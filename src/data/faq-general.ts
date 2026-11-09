export interface Faq {
  question: string;
  answer: string;
}

/** Preguntas frecuentes generales (inicio). Respuestas del sitio anterior, con redacción revisada. */
export const FAQ_GENERAL: readonly Faq[] = [
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
