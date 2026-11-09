'use server';

import { deliverQuote } from '@/lib/mail';
import {
  HONEYPOT_FIELD,
  readQuote,
  validateQuote,
  type QuoteState,
} from '@/lib/quote-schema';

/**
 * Server Action del formulario de cotización.
 * Vuelve a validar en el servidor (nunca se confía en el cliente) y delega el
 * envío al adaptador de src/lib/mail.ts. No vuelve dinámicas las páginas:
 * siguen prerenderizadas y la acción se ejecuta como función aparte.
 */
export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  // Bot: se responde éxito sin enviar nada.
  const trap = formData.get(HONEYPOT_FIELD);
  if (typeof trap === 'string' && trap.trim() !== '') {
    return { status: 'success', message: 'Recibimos tu solicitud.' };
  }

  const values = readQuote(formData);
  const errors = validateQuote(values);
  if (Object.keys(errors).length > 0) {
    return { status: 'invalid', message: 'Revisa los campos marcados.', errors, values };
  }

  const result = await deliverQuote(values);
  if (!result.ok) {
    return {
      status: 'error',
      message:
        result.reason === 'not-configured'
          ? 'El envío en línea no está disponible por ahora. Escríbenos por WhatsApp o correo y te respondemos.'
          : 'No pudimos enviar tu solicitud. Inténtalo de nuevo en un momento.',
      values,
    };
  }

  return {
    status: 'success',
    message: 'Recibimos tu solicitud. Te contactaremos en menos de 48 horas hábiles.',
  };
}
