/**
 * Esquema único del formulario de cotización (zod).
 * Lo usan el cliente (validación en vivo, campo por campo) y la Server Action
 * (validación definitiva), así nunca hay dos reglas distintas.
 *
 * Importante: este módulo se incluye en el bundle del navegador. No debe
 * importar nada de servidor ni el contenido pesado de src/data/seguros.ts.
 */
import { z } from 'zod';

import { SEGURO_META, SEGURO_SLUGS } from '@/data/seguros-meta';

/** Opción para quien necesita más de un seguro o aún no sabe cuál (RC y RA se contratan juntos a menudo). */
export const SEGURO_VARIOS = 'varios';
const SEGURO_VALUES = [...SEGURO_SLUGS, SEGURO_VARIOS] as const;
export type SeguroValue = (typeof SEGURO_VALUES)[number];

/** Tipos de operación del público del sitio (mismos perfiles de «A quién va dirigido»). */
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

export const LIMITS = {
  nombre: { min: 2, max: 80 },
  empresa: { max: 120 },
  email: { max: 254 },
  telefono: { max: 20 },
  mensaje: { min: 10, max: 1500 },
} as const;

/**
 * Teléfono de México: 10 dígitos. Acepta espacios, guiones, paréntesis y el
 * prefijo internacional (+52 o el antiguo +52 1 de celulares), que se eliminan.
 */
export function normalizeMxPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 13 && digits.startsWith('521')) return digits.slice(3);
  if (digits.length === 12 && digits.startsWith('52')) return digits.slice(2);
  return digits;
}

export const quoteSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, { error: 'Escribe tu nombre.' })
    .min(LIMITS.nombre.min, { error: 'El nombre es demasiado corto.' })
    .max(LIMITS.nombre.max, { error: `Máximo ${LIMITS.nombre.max} caracteres.` }),
  empresa: z
    .string()
    .trim()
    .max(LIMITS.empresa.max, { error: `Máximo ${LIMITS.empresa.max} caracteres.` }),
  email: z
    .string()
    .trim()
    .min(1, { error: 'Escribe tu correo electrónico.' })
    .max(LIMITS.email.max, { error: 'El correo es demasiado largo.' })
    .pipe(z.email({ error: 'Revisa el formato del correo (ejemplo: nombre@empresa.mx).' })),
  telefono: z
    .string()
    .trim()
    .min(1, { error: 'Escribe tu teléfono.' })
    .max(LIMITS.telefono.max, { error: 'Usa un teléfono de 10 dígitos (con lada).' })
    .transform(normalizeMxPhone)
    .refine((v) => /^\d{10}$/.test(v), { error: 'Usa un teléfono de 10 dígitos (con lada).' }),
  seguro: z.enum(SEGURO_VALUES, { error: 'Elige el seguro que te interesa (o «Más de uno / no estoy seguro»).' }),
  operacion: z.enum(OPERACION_OPTIONS, { error: 'Elige el tipo de operación.' }),
  mensaje: z
    .string()
    .trim()
    .min(1, { error: 'Cuéntanos brevemente sobre tu operación.' })
    .min(LIMITS.mensaje.min, { error: 'Agrega un poco más de detalle.' })
    .max(LIMITS.mensaje.max, { error: `Máximo ${LIMITS.mensaje.max} caracteres.` }),
  privacidad: z.literal('on', { error: 'Necesitamos tu autorización para responderte.' }),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;
export type QuoteField = keyof QuoteInput;
/** Valores crudos del formulario (siempre texto). */
export type QuoteValues = Record<QuoteField, string>;
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export const QUOTE_FIELDS = Object.keys(quoteSchema.shape) as QuoteField[];

export const EMPTY_QUOTE: QuoteValues = {
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  seguro: '',
  operacion: '',
  mensaje: '',
  privacidad: '',
};

export const SEGURO_OPTIONS: readonly { value: SeguroValue; label: string }[] = [
  ...SEGURO_SLUGS.map((slug) => ({ value: slug, label: SEGURO_META[slug].nombreCorto })),
  { value: SEGURO_VARIOS, label: 'Más de uno / no estoy seguro' },
];

/** Nombre legible del seguro elegido (para el correo). */
export function seguroNombre(value: SeguroValue): string {
  return value === SEGURO_VARIOS ? 'Más de uno o aún no sabe cuál' : SEGURO_META[value].nombre;
}

/** Validación de un solo campo (en vivo, en el cliente). Devuelve el primer error. */
export function validateField(field: QuoteField, value: string): string | undefined {
  const result = quoteSchema.shape[field].safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

/** Primer mensaje de error por campo. */
export function toFieldErrors(error: z.ZodError<QuoteInput>): QuoteErrors {
  const flat = z.flattenError(error).fieldErrors as Partial<Record<QuoteField, string[]>>;
  const errors: QuoteErrors = {};
  for (const field of QUOTE_FIELDS) {
    const first = flat[field]?.[0];
    if (first) errors[field] = first;
  }
  return errors;
}

/** Lee solo los campos conocidos del FormData, siempre como texto. */
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

/** Campo trampa para bots: invisible para personas; si llega lleno, se finge éxito. */
export const HONEYPOT_FIELD = 'sitio_web';
