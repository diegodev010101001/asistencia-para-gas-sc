/**
 * Fuente única de los seguros: rutas (generateStaticParams), metadatos,
 * JSON-LD, sitemap, tarjetas del inicio y la plantilla de detalle salen de aquí.
 *
 * Contenido reescrito a partir de las páginas del sitio anterior. No se
 * inventaron cifras: las existentes se marcan con TODO para confirmación y
 * lo que falta queda como marcador visible «[…]».
 */
import type { StaticImageData } from 'next/image';

import imgCargaDescarga from '@/assets/RCyRA_cargaydescarga.jpg.jpeg';
import imgIndustria from '@/assets/RA_industria.jpg.jpeg';
import imgPersonal from '@/assets/RC_personasplantagaslp.jpg.jpeg';
import imgQueNoCubre from '@/assets/RC_quenocubrelapoliza.jpg.jpeg';

import type { Faq } from './faq-general';
import { SEGURO_META, type SeguroMeta } from './seguros-meta';

export { SEGURO_SLUGS, type SeguroSlug } from './seguros-meta';

export type SeguroIcon = 'shield' | 'droplets' | 'heart-pulse';

export interface SeguroImage {
  src: StaticImageData;
  alt: string;
}

export interface Punto {
  titulo: string;
  texto?: string;
}

export interface Escenario {
  titulo: string;
  situacion: string;
  /** Qué responde la póliza (o por qué queda fuera). */
  respuesta: string;
  resultado: 'cubierto' | 'excluido';
}

export type BloqueExtra =
  | { tipo: 'datos'; id: string; titulo: string; intro?: string; items: readonly { etiqueta: string; valor: string; detalle?: string }[]; nota?: string }
  | { tipo: 'pasos'; id: string; titulo: string; intro?: string; items: readonly Punto[]; nota?: string }
  | { tipo: 'lista'; id: string; titulo: string; intro?: string; items: readonly Punto[] }
  | {
      tipo: 'comparacion';
      id: string;
      titulo: string;
      intro?: string;
      malo: { titulo: string; items: readonly string[]; consecuencia: string };
      bueno: { titulo: string; items: readonly string[]; consecuencia: string };
      nota?: string;
    };

export interface Seguro extends SeguroMeta {
  icono: SeguroIcon;
  /** Resumen corto (tarjetas, meta description de respaldo). */
  resumen: string;
  temas: readonly [string, string, string];
  imagen: SeguroImage;
  hero: { titulo: string; subtitulo: string };
  /** Qué es y por qué importa. */
  descripcion: readonly string[];
  cubre: readonly Punto[];
  /** Alcance: a quién o qué protege (chips). */
  alcance?: readonly string[];
  noCubre: readonly Punto[];
  noCubreImagen?: SeguroImage;
  notaExclusiones: string;
  dirigidoA: readonly Punto[];
  notaDirigido?: string;
  escenarios: readonly Escenario[];
  extras: readonly BloqueExtra[];
  faqs: readonly Faq[];
  seo: { title: string; description: string; keywords: readonly string[] };
  /** Tipo de servicio para el JSON-LD (schema.org Service.serviceType). */
  serviceType: string;
}

const NOTA_POLIZA = 'Las condiciones exactas dependen de la póliza contratada. Revisa siempre con tu asesor las condiciones particulares antes de contratar.';

export const SEGUROS: readonly Seguro[] = [
  /* ──────────────────────────────────────────────────────────────────────
     01 · RESPONSABILIDAD CIVIL
     ────────────────────────────────────────────────────────────────────── */
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
    hero: {
      titulo: 'Responsabilidad civil para gas LP e hidrocarburos',
      subtitulo:
        'Protección para plantas, estaciones, autotanques y transporte especializado ante daños a terceros, con defensa jurídica incluida.',
    },
    descripcion: [
      'El seguro de responsabilidad civil protege económicamente a tu empresa frente a los daños que su operación cause a terceros en cualquier punto de la cadena energética: almacenamiento, distribución, transporte y expendio de combustibles.',
      'Además de resguardar el patrimonio ante reclamaciones, suele ser una condición para obtener y mantener vigentes permisos y concesiones ante la CNE y la ASEA, y fortalece la confianza de clientes, socios y proveedores.',
    ],
    cubre: [
      { titulo: 'RC de operación', texto: 'Daños derivados de las actividades normales del negocio.' },
      { titulo: 'RC por carga y descarga', texto: 'Accidentes durante maniobras, tanto en instalaciones fijas como en operaciones móviles de autotanques y pipas.' },
      { titulo: 'RC por transporte', texto: 'Daños ocasionados por la carga transportada.' },
      { titulo: 'Contaminación súbita y accidental', texto: 'Eventos ambientales repentinos derivados de la operación.' },
      { titulo: 'RC vehicular en exceso', texto: 'Cobertura complementaria para flotillas.' },
      { titulo: 'RC cruzada', texto: 'Protección entre empresas relacionadas.' },
      { titulo: 'RC arrendatario', texto: 'Daños a inmuebles arrendados.' },
      { titulo: 'Trabajos terminados', texto: 'Daños derivados de trabajos ya ejecutados.' },
      { titulo: 'Defensa jurídica y fianzas', texto: 'Gastos de defensa legal y pago de fianzas relacionadas con reclamaciones cubiertas.' },
    ],
    alcance: [
      'Lesiones corporales a terceros',
      'Bienes materiales ajenos',
      'Plantas y equipos industriales',
      'Inmuebles colindantes',
      'Daño moral',
      'Productos transportados',
    ],
    noCubre: [
      { titulo: 'Contaminación gradual', texto: 'Procesos lentos y progresivos. Se cubren con el seguro de Responsabilidad Ambiental.' },
      { titulo: 'Actos intencionales', texto: 'Daños causados deliberadamente.' },
      { titulo: 'Guerra o terrorismo', texto: 'Conflictos armados y actos de terrorismo.' },
      { titulo: 'Responsabilidad profesional', texto: 'Errores en asesoría o servicios especializados.' },
      { titulo: 'Negligencia grave', texto: 'Fallas deliberadas o negligencia grave comprobada.' },
      { titulo: 'Daños cibernéticos', texto: 'Ataques informáticos o fallas digitales.' },
      { titulo: 'Multas administrativas', texto: 'Sanciones impuestas por autoridades regulatorias.' },
      { titulo: 'Operaciones fuera del giro', texto: 'Actividades no declaradas en la póliza.' },
      { titulo: 'Incumplimiento deliberado de normas', texto: 'Violación intencional de regulaciones.' },
    ],
    noCubreImagen: {
      src: imgQueNoCubre,
      alt: 'Persona manipulando cilindros de gas LP en la vía pública sin equipo de seguridad',
    },
    notaExclusiones:
      'La póliza protege operaciones declaradas y apegadas a las NOM. El manejo informal de cilindros fuera de instalaciones autorizadas, sin equipo de protección ni documentación en regla, es una de las exclusiones más frecuentes.',
    dirigidoA: [
      { titulo: 'Plantas de almacenamiento', texto: 'Gas LP' },
      { titulo: 'Estaciones de servicio', texto: 'Combustibles' },
      { titulo: 'Estaciones de carburación', texto: 'Gas vehicular' },
      { titulo: 'Autotanques y pipas', texto: 'Distribución' },
      { titulo: 'Transporte de hidrocarburos', texto: 'Especializado' },
      { titulo: 'Cilindros portátiles', texto: 'Comercialización' },
      { titulo: 'Instalación y mantenimiento', texto: 'Equipos de gas' },
      { titulo: 'Operaciones industriales', texto: 'Y comerciales' },
    ],
    notaDirigido: 'La cobertura se adapta a operaciones locales, regionales o nacionales.',
    escenarios: [
      {
        titulo: 'Incidente durante la descarga de un autotanque',
        situacion: 'Durante una maniobra de descarga falla una conexión y el incidente daña vehículos y una bodega colindante.',
        respuesta: 'RC por carga y descarga: daños a bienes de terceros e inmuebles vecinos, más defensa jurídica.',
        resultado: 'cubierto',
      },
      {
        titulo: 'Falla en tuberías o válvulas de la planta',
        situacion: 'Una falla en la infraestructura de distribución provoca un incidente que lesiona a personas ajenas a la operación.',
        respuesta: 'RC de operación: lesiones corporales a terceros, daño moral y gastos de defensa.',
        resultado: 'cubierto',
      },
      {
        titulo: 'Accidente en ruta',
        situacion: 'Un autotanque en tránsito provoca daños a terceros relacionados con la carga que transporta.',
        respuesta: 'RC por transporte; para flotillas, la RC vehicular en exceso complementa la póliza del vehículo.',
        resultado: 'cubierto',
      },
      {
        titulo: 'Manejo informal de cilindros',
        situacion: 'Personal de la empresa manipula cilindros en la vía pública, fuera de instalaciones autorizadas y sin equipo de protección.',
        respuesta: 'Operación no declarada o fuera de norma: queda excluida de la póliza.',
        resultado: 'excluido',
      },
      {
        titulo: 'Contaminación que se acumula con los años',
        situacion: 'Una fuga lenta contamina el suelo de la planta y se detecta mucho tiempo después.',
        respuesta: 'La contaminación gradual no entra en RC; se protege con el seguro de Responsabilidad Ambiental.',
        resultado: 'excluido',
      },
    ],
    extras: [
      {
        tipo: 'lista',
        id: 'normativa',
        titulo: 'Cumplimiento normativo y regulatorio',
        intro: 'La póliza se estructura para responder a las obligaciones del sector.',
        items: [
          { titulo: 'Permisos CNE', texto: 'Comisión Nacional de Energía.' },
          { titulo: 'Regulaciones ASEA', texto: 'Agencia de Seguridad, Energía y Ambiente.' },
          { titulo: 'Normas Oficiales Mexicanas', texto: 'NOM aplicables al sector hidrocarburos.' },
          { titulo: 'Transporte y expendio', texto: 'Obligaciones operativas federales.' },
          { titulo: 'Contratos gaseros', texto: 'Requisitos de grupos gaseros y concesionarios.' },
        ],
      },
      {
        tipo: 'lista',
        id: 'prevencion',
        titulo: 'Medidas de prevención obligatorias',
        intro: 'Mantenerlas al día es parte de las condiciones para que la cobertura responda.',
        items: [
          { titulo: 'Capacitación constante' },
          { titulo: 'Protocolos técnicos' },
          { titulo: 'Señalización preventiva' },
          { titulo: 'Prohibición de fumar' },
          { titulo: 'Cumplimiento de normas industriales' },
        ],
      },
    ],
    faqs: [
      {
        question: '¿Qué daños cubre el seguro de responsabilidad civil para gas LP?',
        answer:
          'Lesiones corporales y daños materiales a terceros —personas, bienes, instalaciones y propiedades vecinas—, daño moral y productos transportados, además de los gastos de defensa jurídica y fianzas relacionadas con reclamaciones cubiertas.',
      },
      {
        question: '¿Cubre las maniobras de carga y descarga de autotanques?',
        answer:
          'Sí. La cobertura de RC por carga y descarga aplica tanto en instalaciones fijas como en operaciones móviles de autotanques y pipas, que son los momentos de mayor exposición.',
      },
      {
        question: '¿La responsabilidad civil cubre la contaminación?',
        answer:
          'Solo la contaminación súbita y accidental. La contaminación gradual —fugas lentas o procesos progresivos— se excluye y se protege con el seguro de Responsabilidad Ambiental.',
      },
      {
        question: '¿Me sirve para cumplir con la CNE y la ASEA?',
        answer:
          'La póliza se diseña para atender los requisitos de permisos de la CNE, las regulaciones de ASEA y las NOM aplicables; es una condición frecuente para obtener y mantener autorizaciones vigentes.',
      },
      {
        question: '¿Puedo ajustar la cobertura al tamaño de mi operación?',
        answer: 'Sí. La cobertura se adapta a operaciones locales, regionales o nacionales y al tipo de actividad declarada.',
      },
      {
        question: '¿Qué no cubre normalmente?',
        answer:
          'Contaminación gradual, actos intencionales, guerra o terrorismo, responsabilidad profesional, negligencia grave, daños cibernéticos, multas administrativas, operaciones fuera del giro e incumplimiento deliberado de normas.',
      },
    ],
    seo: {
      title: 'Seguro de Responsabilidad Civil para gas LP y autotanques',
      description:
        'Seguro de responsabilidad civil para gaseras, plantas de gas LP, autotanques y transporte de hidrocarburos: daños a terceros, carga y descarga y defensa jurídica. CNE y ASEA.',
      keywords: [
        'responsabilidad civil gas LP',
        'seguro para gaseras',
        'seguro autotanques gas LP',
        'seguro de responsabilidad civil hidrocarburos',
        'seguro carga y descarga gas LP',
      ],
    },
    serviceType: 'Seguro de responsabilidad civil',
  },

  /* ──────────────────────────────────────────────────────────────────────
     02 · RESPONSABILIDAD AMBIENTAL
     ────────────────────────────────────────────────────────────────────── */
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
    hero: {
      titulo: 'Responsabilidad ambiental para el sector hidrocarburos',
      subtitulo:
        'Contención, limpieza, remediación y restauración ante derrames, fugas y contaminación de suelo o agua, alineadas con las disposiciones de ASEA.',
    },
    descripcion: [
      'Las operaciones con hidrocarburos pueden generar pasivos ambientales de gran magnitud: un siniestro mayor en gas LP puede causar daños por decenas de millones de pesos. Una póliza insuficiente deja al permisionario, a sus socios y directivos con responsabilidad personal.',
      'Por eso la cobertura debe incluir remediación, contención y restauración ambiental, con límites basados en un análisis de riesgo real y no solo para cumplir un trámite.',
    ],
    cubre: [
      { titulo: 'Atención de emergencias', texto: 'Ejecución de medidas inmediatas ante el evento.' },
      { titulo: 'Contención y limpieza', texto: 'De sitios afectados, con mitigación de impactos y daños ambientales.' },
      { titulo: 'Restauración o compensación ambiental', texto: 'Para devolver el sitio a sus condiciones o compensar el daño.' },
      { titulo: 'Caracterización de sitios contaminados', texto: 'Estudios para dimensionar la afectación.' },
      { titulo: 'Remediación de sitios contaminados', texto: 'Tratamiento de suelo, subsuelo y mantos acuíferos.' },
      { titulo: 'Contaminación súbita, accidental y gradual', texto: 'Según las condiciones y límites contratados.' },
      { titulo: 'Gastos de emergencia y mitigación', texto: 'Incluidos en la cobertura.' },
    ],
    noCubre: [
      { titulo: 'Contaminación gradual no declarada', texto: 'Condiciones preexistentes o conocidas que no se reportaron, como fugas lentas detectadas años después.' },
      { titulo: 'Incumplimiento de normas de seguridad', texto: 'Eventos por falta de mantenimiento documentado o violación de protocolos (negligencia grave o dolo).' },
      { titulo: 'Conductor no autorizado', texto: 'Accidentes de transporte con un operador sin licencia vigente o adecuada.' },
      { titulo: 'Multas y daños punitivos', texto: 'Sanciones administrativas de ASEA o CNE por incumplimiento.' },
      { titulo: 'Tanques subterráneos', texto: 'Requieren cobertura específica; sin ella, su contaminación queda fuera.' },
      { titulo: 'Reporte tardío (claims-made)', texto: 'Reclamaciones presentadas fuera del periodo de reporte de la póliza.' },
    ],
    notaExclusiones: NOTA_POLIZA,
    dirigidoA: [
      { titulo: 'Plantas de almacenamiento', texto: 'Gas LP' },
      { titulo: 'Autotanques y transporte', texto: 'Hidrocarburos' },
      { titulo: 'Estaciones de servicio', texto: 'Combustibles' },
      { titulo: 'Estaciones de carburación', texto: 'Gas vehicular' },
      { titulo: 'Distribuidores', texto: 'Gas LP' },
      { titulo: 'Operadores logísticos', texto: 'Energéticos' },
      { titulo: 'Empresas industriales', texto: 'Con manejo de hidrocarburos' },
    ],
    escenarios: [
      {
        titulo: 'Derrame en maniobra de carga o descarga',
        situacion: 'Una fuga durante el trasvase contamina el suelo, el subsuelo y alcanza un manto acuífero.',
        respuesta: 'Atención de emergencia, contención, limpieza, caracterización y remediación del sitio.',
        resultado: 'cubierto',
      },
      {
        // TODO: confirmar cifras del ejemplo (provienen del sitio anterior).
        titulo: 'Derrame en transporte: ejemplo de deducible',
        situacion: 'La remediación de un derrame en carretera cuesta USD 200,000.',
        respuesta:
          'Deducible RA de transporte: 10 % del siniestro con mínimo de USD 15,000 (en este caso, USD 20,000). La aseguradora cubre la diferencia hasta el límite contratado.',
        resultado: 'cubierto',
      },
      {
        titulo: 'Fuga lenta en un tanque subterráneo',
        situacion: 'Se detecta contaminación de suelo y agua causada por un tanque enterrado, años después de iniciada.',
        respuesta: 'Excluido salvo que se haya contratado cobertura específica para tanques subterráneos y la condición se haya declarado.',
        resultado: 'excluido',
      },
      {
        titulo: 'Explosión por falta de mantenimiento',
        situacion: 'El evento ocurre en un equipo sin mantenimiento documentado, en violación de protocolos.',
        respuesta: 'Excluido por negligencia grave.',
        resultado: 'excluido',
      },
      {
        titulo: 'Incidente reportado fuera de tiempo',
        situacion: 'En una póliza base reclamación (claims-made), el incidente no se reporta dentro de la vigencia.',
        respuesta: 'Excluido: la reclamación queda fuera del periodo de reporte.',
        resultado: 'excluido',
      },
    ],
    extras: [
      {
        tipo: 'datos',
        id: 'condiciones',
        titulo: 'Límites y deducibles de referencia',
        intro: 'Condiciones publicadas en nuestro sitio anterior. Los valores definitivos se fijan en la póliza.',
        // TODO: confirmar límite y deducibles vigentes.
        items: [
          { etiqueta: 'Límite de cobertura', valor: 'USD 2,000,000', detalle: 'Por evento y en el agregado.' },
          { etiqueta: 'Deducible RA', valor: 'USD 30,000', detalle: 'Por evento en instalaciones fijas.' },
          { etiqueta: 'Deducible RA transporte', valor: '10 %', detalle: 'Del siniestro, con mínimo de USD 15,000.' },
        ],
        nota: 'Documenta el criterio técnico que justifica los límites contratados.',
      },
      {
        tipo: 'comparacion',
        id: 'enfoque',
        titulo: 'Protección real frente a cumplimiento administrativo',
        malo: {
          titulo: 'Contratar solo para «pasar el trámite»',
          items: ['Límites insuficientes para riesgos reales', 'Exclusiones sin revisar', 'Deducibles impagables', 'Sin análisis de exposición'],
          consecuencia: 'Ante un siniestro mayor, la empresa enfrenta daños no cubiertos que pueden comprometer su continuidad.',
        },
        bueno: {
          titulo: 'Proteger a la sociedad y al patrimonio',
          items: [
            'Límites basados en análisis de riesgo real',
            'Cobertura de escenarios catastróficos',
            'Deducibles financieramente viables',
            'Revisión de exclusiones críticas',
          ],
          consecuencia: 'Protección efectiva ante eventos adversos, continuidad operativa y cumplimiento con la sociedad.',
        },
      },
      {
        tipo: 'pasos',
        id: 'siniestro',
        titulo: 'Qué pasa en caso de siniestro',
        items: [
          { titulo: 'Ocurre el siniestro', texto: 'Explosión, derrame, accidente de transporte o contaminación detectada.' },
          // TODO: confirmar plazo de aviso (24–72 h en el sitio anterior).
          { titulo: 'Notificación inmediata', texto: 'Avisa a la aseguradora dentro del plazo (24 a 72 horas). Un retraso puede anular la cobertura.' },
          { titulo: 'Ajuste y valuación', texto: 'La aseguradora envía un ajustador, valúa los daños y determina la cobertura aplicable.' },
          { titulo: 'Aplicación del deducible', texto: 'El permisionario paga el deducible y la aseguradora cubre el excedente hasta el límite.' },
        ],
        nota: 'Un aviso oportuno puede reducir el deducible en algunos casos.',
      },
    ],
    faqs: [
      {
        question: '¿Qué cubre el seguro de responsabilidad ambiental?',
        answer:
          'Atención de emergencias, contención y limpieza de sitios, mitigación de impactos, caracterización y remediación de sitios contaminados, y restauración o compensación ambiental, además de los gastos de emergencia.',
      },
      {
        question: '¿Cumple con lo que solicita la ASEA?',
        answer:
          'Sí. La responsabilidad por daño ambiental considera las disposiciones solicitadas por ASEA: medidas inmediatas, contención y limpieza, restauración o compensación, caracterización y remediación de sitios contaminados.',
      },
      {
        question: '¿Cubre la contaminación gradual?',
        answer:
          'Puede cubrirse si se contrata y declara. Las condiciones preexistentes o conocidas que no se reportaron quedan excluidas, igual que los tanques subterráneos sin cobertura específica.',
      },
      {
        question: '¿Qué significa que una póliza sea claims-made?',
        answer:
          'Que es «base reclamación»: responde a las reclamaciones presentadas durante la vigencia o el periodo de reporte. Un incidente que no se reporta a tiempo queda fuera.',
      },
      {
        question: '¿Cómo funcionan los deducibles?',
        answer:
          'Como referencia: USD 30,000 por evento en instalaciones fijas y, en transporte, 10 % del siniestro con mínimo de USD 15,000. El permisionario paga el deducible y la aseguradora cubre el excedente hasta el límite contratado.',
      },
      {
        question: '¿Cuánto tiempo tengo para avisar de un siniestro?',
        answer: 'Debe notificarse dentro del plazo de la póliza, normalmente entre 24 y 72 horas. Un aviso tardío puede anular la cobertura.',
      },
    ],
    seo: {
      title: 'Seguro de Responsabilidad Ambiental ASEA para gas LP',
      description:
        'Seguro ambiental para gaseras y transporte de hidrocarburos: contención, limpieza, remediación y restauración ante derrames y contaminación de suelo o agua, conforme a ASEA.',
      keywords: [
        'seguro ambiental ASEA',
        'seguro de responsabilidad ambiental gas LP',
        'seguro remediación derrames hidrocarburos',
        'contaminación gradual seguro',
        'seguro ambiental para gaseras',
      ],
    },
    serviceType: 'Seguro de responsabilidad ambiental',
  },

  /* ──────────────────────────────────────────────────────────────────────
     03 · GASTOS MÉDICOS MAYORES
     ────────────────────────────────────────────────────────────────────── */
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
    hero: {
      titulo: 'Gastos médicos mayores para el personal del sector energético',
      subtitulo:
        'Protección médica para trabajadores expuestos a riesgos industriales en plantas de gas LP, transporte de hidrocarburos y operaciones de campo.',
    },
    descripcion: [
      'Quienes operan plantas, autotanques y equipos de gas trabajan todos los días en entornos de alto riesgo. Este seguro cubre los gastos médicos derivados de accidentes laborales para que la atención no dependa de la capacidad económica del trabajador ni de la empresa.',
      'Aplica a todo el personal operativo y contempla desde la atención de urgencia y la hospitalización hasta la rehabilitación.',
    ],
    cubre: [
      { titulo: 'Atención médica inmediata', texto: 'Urgencias, hospitalización, cirugías y consultas derivadas de accidentes laborales.' },
      { titulo: 'Rehabilitación y recuperación', texto: 'Fisioterapia, rehabilitación motriz y terapia especializada posterior al accidente.' },
      { titulo: 'Medicamentos y terapias', texto: 'Medicamentos prescritos, estudios de laboratorio, radiografías y tratamientos ambulatorios.' },
      { titulo: 'Traslados y ambulancia', texto: 'Ambulancia terrestre y aérea, y traslados entre centros médicos en emergencias.' },
    ],
    noCubre: [
      { titulo: 'Enfermedades preexistentes no declaradas' },
      { titulo: 'Accidentes bajo influencia de alcohol o sustancias' },
      { titulo: 'Lesiones autoinfligidas' },
      { titulo: 'Tratamientos estéticos o electivos', texto: 'No relacionados con el accidente.' },
    ],
    notaExclusiones: NOTA_POLIZA,
    dirigidoA: [
      { titulo: 'Personal de plantas de almacenamiento' },
      { titulo: 'Operadores de autotanques y pipas' },
      { titulo: 'Personal de transporte de hidrocarburos' },
      { titulo: 'Técnicos de instalación y mantenimiento' },
      { titulo: 'Personal de estaciones de servicio y carburación' },
      { titulo: 'Cuadrillas de operaciones de campo' },
    ],
    notaDirigido: 'Aplica a todo el personal operativo de la empresa.',
    escenarios: [
      {
        titulo: 'Lesión durante una maniobra en planta',
        situacion: 'Un técnico sufre una lesión mientras opera equipo de gas en la planta.',
        respuesta: 'Atención de urgencias, hospitalización, cirugía y medicamentos derivados del accidente.',
        resultado: 'cubierto',
      },
      {
        titulo: 'Accidente de un operador en carretera',
        situacion: 'El operador de un autotanque resulta herido en un accidente durante una ruta de distribución.',
        respuesta: 'Ambulancia y traslado a un centro médico especializado, hospitalización y estudios.',
        resultado: 'cubierto',
      },
      {
        titulo: 'Recuperación después del alta',
        situacion: 'Tras la hospitalización, el trabajador necesita terapia para recuperar movilidad.',
        respuesta: 'Fisioterapia, rehabilitación motriz y terapia especializada.',
        resultado: 'cubierto',
      },
      {
        titulo: 'Accidente bajo influencia de alcohol',
        situacion: 'La lesión ocurre mientras el trabajador está bajo los efectos del alcohol u otras sustancias.',
        respuesta: 'Exclusión de la póliza.',
        resultado: 'excluido',
      },
    ],
    extras: [
      {
        tipo: 'datos',
        id: 'ficha',
        titulo: 'Ficha de la cobertura',
        items: [
          { etiqueta: 'Tipo de cobertura', valor: 'Gastos médicos por accidente laboral' },
          { etiqueta: 'Aplicable a', valor: 'Todo el personal operativo' },
          // TODO: confirmar tiempo de emisión (3–7 días hábiles en el sitio anterior).
          { etiqueta: 'Emisión', valor: '3 a 7 días hábiles' },
          // TODO: suma asegurada, deducible y coaseguro (no existen en el sitio anterior).
          { etiqueta: 'Suma asegurada', valor: '[Por definir]', detalle: 'Se define en la propuesta según tu plantilla.' },
        ],
      },
    ],
    faqs: [
      {
        question: '¿Qué gastos cubre el seguro de gastos médicos mayores?',
        answer:
          'Urgencias, hospitalización, cirugías y consultas derivadas de accidentes laborales; medicamentos, laboratorio y radiografías; ambulancia terrestre y aérea; y rehabilitación posterior al accidente.',
      },
      {
        question: '¿A quién protege?',
        answer: 'A todo el personal operativo expuesto a riesgos industriales: plantas, autotanques, transporte, mantenimiento y operaciones de campo.',
      },
      {
        question: '¿Cubre accidentes fuera de la planta?',
        answer: 'Sí. Contempla accidentes en instalaciones de gas, durante el transporte y en operaciones de campo.',
      },
      {
        question: '¿Incluye rehabilitación?',
        answer: 'Sí. Incluye fisioterapia, rehabilitación motriz y terapia especializada para la recuperación posterior al accidente.',
      },
      {
        question: '¿Qué no cubre?',
        answer:
          'Enfermedades preexistentes no declaradas, accidentes bajo la influencia de alcohol o sustancias, lesiones autoinfligidas y tratamientos estéticos o electivos no relacionados con el accidente.',
      },
      {
        question: '¿Cuánto tarda la emisión de la póliza?',
        answer: 'Para operaciones estándar, de 3 a 7 días hábiles a partir de la aceptación de la propuesta.',
      },
    ],
    seo: {
      title: 'Seguro de Gastos Médicos Mayores para personal de gas LP',
      description:
        'Gastos médicos mayores para trabajadores de plantas de gas LP, autotanques y transporte de hidrocarburos: urgencias, hospitalización, ambulancia y rehabilitación por accidente laboral.',
      keywords: [
        'gastos médicos mayores trabajadores gas LP',
        'seguro médico para operadores de autotanques',
        'seguro accidentes laborales sector energético',
        'gastos médicos para gaseras',
      ],
    },
    serviceType: 'Seguro de gastos médicos mayores',
  },
];

export function getSeguro(slug: string): Seguro | undefined {
  return SEGUROS.find((s) => s.slug === slug);
}

export function otherSeguros(slug: string): readonly Seguro[] {
  return SEGUROS.filter((s) => s.slug !== slug);
}
