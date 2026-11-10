'use server';

import {
  HONEYPOT_FIELD,
  formatMxPhone,
  quoteSchema,
  readQuote,
  seguroNombre,
  toFieldErrors,
  type QuoteState,
} from '@/lib/quote-schema';
import { sendQuoteEmail } from '@/lib/server/emailjs';
import { checkRateLimit, getClientIp } from '@/lib/server/rate-limit';

const GENERIC_ERROR =
  'No pudimos enviar tu solicitud en este momento. Inténtalo de nuevo en unos minutos o escríbenos por WhatsApp o correo.';

/**
 * Server Action del formulario de cotización.
 * Orden: honeypot → validación (zod, mismo esquema que el cliente) →
 * rate limit por IP → envío con EmailJS en el servidor.
 * Al cliente nunca llegan detalles internos: solo mensajes amables.
 */
export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  // 1. Honeypot: un bot llenó el campo oculto. Se finge éxito sin enviar nada.
  const trap = formData.get(HONEYPOT_FIELD);
  if (typeof trap === 'string' && trap.trim() !== '') {
    console.info('[cotización] Honeypot activado: envío descartado.');
    return { status: 'success', message: 'Recibimos tu solicitud. Te contactaremos en menos de 48 horas hábiles.' };
  }

  // 2. Validación en el servidor (nunca se confía en el cliente).
  const values = readQuote(formData);
  const parsed = quoteSchema.safeParse(values);
  if (!parsed.success) {
    return { status: 'invalid', message: 'Revisa los campos marcados.', errors: toFieldErrors(parsed.error), values };
  }

  // 3. Rate limiting básico por IP (ver limitaciones en src/lib/server/rate-limit.ts).
  const limit = checkRateLimit(await getClientIp());
  if (!limit.ok) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfterMs / 60_000));
    console.warn('[cotización] Rate limit alcanzado.');
    return {
      status: 'error',
      message: `Recibimos varias solicitudes desde tu conexión. Espera ${minutes} min antes de enviar otra, o escríbenos por WhatsApp.`,
      values,
    };
  }

  // 4. Envío. El detalle de cualquier fallo queda en el log del servidor.
  const result = await sendQuoteEmail(parsed.data);
  if (!result.ok) {
    return { status: 'error', message: GENERIC_ERROR, values };
  }

  // Comprobante con lo que se validó y envió: funciona también sin JavaScript.
  return {
    status: 'success',
    message: 'Recibimos tu solicitud. Te contactaremos en menos de 48 horas hábiles.',
    receipt: {
      seguro: seguroNombre(parsed.data.seguro),
      operacion: parsed.data.operacion,
      email: parsed.data.email,
      telefono: formatMxPhone(parsed.data.telefono),
    },
  };
}
