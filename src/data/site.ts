/**
 * Datos generales del sitio y de contacto.
 * Los valores entre corchetes son marcadores pendientes: el sitio los muestra
 * como texto y desactiva sus enlaces (tel:, mailto:, wa.me) hasta que se
 * sustituyan por datos reales.
 */

export interface SiteContact {
  /** TODO: teléfono con lada, p. ej. "+52 (444) 123 4567". */
  phone: string;
  /** TODO: correo de contacto comercial. */
  email: string;
  /** TODO: número de WhatsApp en formato internacional, solo dígitos (ej. 524441234567). */
  whatsapp: string;
  /** TODO: dirección o ciudad de la oficina. */
  address: string;
  hours: string;
}

export interface SocialLink {
  label: 'Facebook' | 'Instagram' | 'LinkedIn';
  href: string;
}

const FALLBACK_URL = 'https://DOMINIO.com';

/** Acepta solo una URL absoluta válida; vacía o mal formada → dominio provisional. */
function resolveSiteUrl(value: string | undefined): string {
  const candidate = value?.trim();
  if (!candidate) return FALLBACK_URL;
  try {
    return new URL(candidate).origin;
  } catch {
    return FALLBACK_URL;
  }
}

export const SITE = {
  name: 'ASISTENCIA PARA GAS SC',
  /** TODO: dominio final. En Vercel se define con NEXT_PUBLIC_SITE_URL. */
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  locale: 'es_MX',
  description:
    'Seguros especializados para la industria del gas LP e hidrocarburos en México: responsabilidad civil, responsabilidad ambiental y gastos médicos mayores para plantas, autotanques y transportistas.',
  contact: {
    phone: '[TELÉFONO]',
    email: '[CORREO]',
    whatsapp: '[WHATSAPP]',
    address: '[DIRECCIÓN / CIUDAD]',
    hours: 'Lunes a viernes, 9:00 a 18:00 (hora del centro de México)',
  } satisfies SiteContact,
  /** TODO: perfiles reales de redes sociales (en el sitio anterior apuntaban a "#"). */
  social: [] as readonly SocialLink[],
  /** TODO: URL del aviso de privacidad. */
  privacyUrl: null as string | null,
  regulators: ['CNE', 'ASEA', 'NOM aplicables'] as const,
} as const;

/** true si el valor es un marcador pendiente como "[TELÉFONO]". */
export function isPlaceholder(value: string | null | undefined): boolean {
  return !value || /^\[.*\]$/.test(value.trim());
}

export function phoneHref(): string | null {
  const { phone } = SITE.contact;
  return isPlaceholder(phone) ? null : `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function emailHref(): string | null {
  const { email } = SITE.contact;
  return isPlaceholder(email) ? null : `mailto:${email}`;
}

export function whatsappHref(message?: string): string | null {
  const { whatsapp } = SITE.contact;
  if (isPlaceholder(whatsapp)) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${whatsapp.replace(/\D/g, '')}${text}`;
}

/** URL absoluta a partir de una ruta del sitio. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE.url).toString();
}
