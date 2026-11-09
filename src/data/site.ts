/**
 * Datos generales del sitio y de contacto (fuente única: contacto, footer,
 * botones de WhatsApp y JSON-LD salen de aquí).
 * Un valor entre corchetes («[…]») se trata como marcador pendiente: se muestra
 * como texto y su enlace (tel:, mailto:, wa.me) queda desactivado.
 */

export interface PostalAddress {
  street: string;
  neighborhood: string;
  postalCode: string;
  locality: string;
  /** Abreviatura del estado tal como se muestra («Ags.»). */
  regionShort: string;
  region: string;
}

export interface SiteContact {
  /** Teléfono tal como se muestra; el enlace tel: se genera solo con los dígitos. */
  phone: string;
  email: string;
  /** WhatsApp tal como se muestra; el enlace wa.me se normaliza (ver whatsappHref). */
  whatsapp: string;
  address: PostalAddress;
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
    phone: '+52 449 239 3813',
    email: 'asisgassc@gmail.com',
    whatsapp: '+52 1 449 106 1582',
    address: {
      street: 'Julian Piñon Valenzuela 242 B',
      neighborhood: 'Los Pocitos',
      postalCode: '20328',
      locality: 'Pocitos',
      regionShort: 'Ags.',
      region: 'Aguascalientes',
    },
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

/**
 * Enlace a WhatsApp. En México, WhatsApp ya no usa el «1» de celular después
 * del 52: «+52 1 449 106 1582» se convierte en wa.me/524491061582.
 */
export function whatsappHref(message?: string): string | null {
  const { whatsapp } = SITE.contact;
  if (isPlaceholder(whatsapp)) return null;
  let digits = whatsapp.replace(/\D/g, '');
  if (digits.length === 13 && digits.startsWith('521')) digits = `52${digits.slice(3)}`;
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${text}`;
}

/** Dirección en una línea (para listas de contacto). */
export function addressText(): string {
  const a = SITE.contact.address;
  return `${a.street}, ${a.neighborhood}, CP ${a.postalCode} ${a.locality}, ${a.regionShort}`;
}

/** Mensajes predefinidos para los botones de WhatsApp. */
export const WHATSAPP_MESSAGES = {
  general: 'Hola, me gustaría cotizar un seguro para mi operación.',
  seguro: (nombre: string) => `Hola, me interesa el ${nombre}. ¿Me pueden dar información?`,
} as const;

/** URL absoluta a partir de una ruta del sitio. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE.url).toString();
}
