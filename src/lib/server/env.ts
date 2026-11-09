import 'server-only';

/**
 * Configuración de EmailJS, leída SOLO en el servidor.
 * Las variables no llevan el prefijo NEXT_PUBLIC_, así que Next nunca las
 * incrusta en el bundle del navegador; `server-only` además rompe el build si
 * algún componente cliente llegara a importar este módulo.
 */

const EMAILJS_VARS = ['EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', 'EMAILJS_PUBLIC_KEY', 'EMAILJS_PRIVATE_KEY'] as const;

export interface EmailJsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey: string;
}

export class MissingEnvError extends Error {
  override name = 'MissingEnvError';
}

/**
 * Devuelve la configuración o lanza un error que nombra las variables
 * faltantes (nunca sus valores). Se llama en cada envío, no al importar el
 * módulo, para que el build no dependa de que existan las llaves.
 */
export function getEmailJsConfig(): EmailJsConfig {
  const read = (name: (typeof EMAILJS_VARS)[number]) => process.env[name]?.trim() ?? '';
  const missing = EMAILJS_VARS.filter((name) => read(name) === '');

  if (missing.length > 0) {
    throw new MissingEnvError(
      `[EmailJS] Faltan variables de entorno: ${missing.join(', ')}. ` +
        'Defínelas en .env.local (desarrollo) o en Vercel → Settings → Environment Variables (producción).',
    );
  }

  return {
    serviceId: read('EMAILJS_SERVICE_ID'),
    templateId: read('EMAILJS_TEMPLATE_ID'),
    publicKey: read('EMAILJS_PUBLIC_KEY'),
    privateKey: read('EMAILJS_PRIVATE_KEY'),
  };
}
