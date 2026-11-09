/**
 * Validación del formulario de cotización.
 * Se usa en el cliente (validación en vivo) y en el servidor (Server Action),
 * así las reglas y los mensajes son siempre los mismos.
 */
import { SEGURO_META } from '@/data/seguros-meta';

export const SEGURO_OPTIONS = [
  ...Object.values(SEGURO_META).map(({ slug, nombreCorto }) => ({ value: slug, label: nombreCorto })),
  { value: 'varios', label: 'Más de uno / no estoy seguro' },
] as const;

export const OPERACION_OPTIONS = [
  'Planta de almacenamiento',
  'Autotanques y pipas',
  'Transporte de hidrocarburos',
  'Estación de carburación',
  'Estación de servicio',
  'Distribución de cilindros',
  'Instalación y mantenimiento',
  'Otra operación industrial',
] as const;

export const QUOTE_FIELDS = ['nombre', 'empresa', 'correo', 'telefono', 'seguro', 'operacion', 'mensaje', 'privacidad'] as const;

export type QuoteField = (typeof QUOTE_FIELDS)[number];
export type QuoteValues = Record<QuoteField, string>;
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export const EMPTY_QUOTE: QuoteValues = {
  nombre: '',
  empresa: '',
  correo: '',
  telefono: '',
  seguro: '',
  operacion: '',
  mensaje: '',
  privacidad: '',
};

export const LIMITS = {
  nombre: { min: 2, max: 80 },
  empresa: { max: 120 },
  mensaje: { min: 10, max: 1500 },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SEGURO_VALUES = new Set<string>(SEGURO_OPTIONS.map((o) => o.value));
const OPERACION_VALUES = new Set<string>(OPERACION_OPTIONS);

export function validateField(field: QuoteField, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case 'nombre':
      if (!value) return 'Escribe tu nombre.';
      if (value.length < LIMITS.nombre.min) return 'El nombre es demasiado corto.';
      if (value.length > LIMITS.nombre.max) return `Máximo ${LIMITS.nombre.max} caracteres.`;
      return undefined;
    case 'empresa':
      if (value.length > LIMITS.empresa.max) return `Máximo ${LIMITS.empresa.max} caracteres.`;
      return undefined;
    case 'correo':
      if (!value) return 'Escribe tu correo electrónico.';
      if (!EMAIL_RE.test(value)) return 'Revisa el formato del correo (ejemplo: nombre@empresa.mx).';
      return undefined;
    case 'telefono': {
      if (!value) return undefined; // opcional
      const digits = value.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 13) return 'Usa un teléfono de 10 dígitos (con lada).';
      return undefined;
    }
    case 'seguro':
      if (!SEGURO_VALUES.has(value)) return 'Elige el seguro que te interesa.';
      return undefined;
    case 'operacion':
      if (!OPERACION_VALUES.has(value)) return 'Elige el tipo de operación.';
      return undefined;
    case 'mensaje':
      if (!value) return 'Cuéntanos brevemente sobre tu operación.';
      if (value.length < LIMITS.mensaje.min) return 'Agrega un poco más de detalle.';
      if (value.length > LIMITS.mensaje.max) return `Máximo ${LIMITS.mensaje.max} caracteres.`;
      return undefined;
    case 'privacidad':
      if (value !== 'on') return 'Necesitamos tu autorización para responderte.';
      return undefined;
  }
}

export function validateQuote(values: QuoteValues): QuoteErrors {
  const errors: QuoteErrors = {};
  for (const field of QUOTE_FIELDS) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

export function readQuote(formData: FormData): QuoteValues {
  const values = { ...EMPTY_QUOTE };
  for (const field of QUOTE_FIELDS) {
    const v = formData.get(field);
    values[field] = typeof v === 'string' ? v : '';
  }
  return values;
}

export type QuoteState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'invalid'; message: string; errors: QuoteErrors; values: QuoteValues }
  | { status: 'error'; message: string; values: QuoteValues };

export const INITIAL_QUOTE_STATE: QuoteState = { status: 'idle' };

/** Campo trampa para bots: los humanos no lo ven ni lo llenan. */
export const HONEYPOT_FIELD = 'sitio_web';
