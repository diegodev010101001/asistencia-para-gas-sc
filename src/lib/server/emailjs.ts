import 'server-only';

import emailjs, { EmailJSResponseStatus } from '@emailjs/nodejs';

import { seguroNombre, type QuoteData } from '@/lib/quote-schema';

import { getEmailJsConfig, MissingEnvError } from './env';

const TIMEOUT_MS = 10_000;

export type SendResult = { ok: true } | { ok: false; reason: 'config' | 'rejected' | 'network' };

/** «4441234567» → «444 123 4567» (más legible en el correo). */
function formatPhone(digits: string) {
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Tiempo de espera agotado (${ms} ms)`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

/**
 * Envía la solicitud con @emailjs/nodejs (publicKey + privateKey).
 * Los nombres de templateParams coinciden exactamente con las variables del
 * template de EmailJS: nombre, empresa, email, telefono, seguro, mensaje.
 *
 * Los errores se registran aquí, en el log del servidor, con el detalle
 * técnico; quien llama solo recibe un motivo genérico para el usuario.
 */
export async function sendQuoteEmail(data: QuoteData): Promise<SendResult> {
  let config;
  try {
    config = getEmailJsConfig();
  } catch (error) {
    console.error(error instanceof MissingEnvError ? error.message : '[EmailJS] Configuración inválida.');
    return { ok: false, reason: 'config' };
  }

  // El tipo de operación viaja al inicio de {{mensaje}}: el template de EmailJS
  // conserva sus seis variables (nombre, empresa, email, telefono, seguro, mensaje).
  const templateParams = {
    nombre: data.nombre,
    empresa: data.empresa || '—',
    email: data.email,
    telefono: formatPhone(data.telefono),
    seguro: seguroNombre(data.seguro),
    mensaje: `Tipo de operación: ${data.operacion}\n\n${data.mensaje}`,
  };

  try {
    await withTimeout(
      emailjs.send(config.serviceId, config.templateId, templateParams, {
        publicKey: config.publicKey,
        privateKey: config.privateKey,
      }),
      TIMEOUT_MS,
    );
    return { ok: true };
  } catch (error) {
    if (error instanceof EmailJSResponseStatus) {
      // Respuesta de la API (p. ej. 400 llave inválida, 403 API no habilitada para servidores, 429 límite).
      console.error(`[EmailJS] Envío rechazado: HTTP ${error.status} — ${error.text}`);
      return { ok: false, reason: 'rejected' };
    }
    console.error('[EmailJS] Error de red o tiempo de espera:', error instanceof Error ? error.message : error);
    return { ok: false, reason: 'network' };
  }
}
