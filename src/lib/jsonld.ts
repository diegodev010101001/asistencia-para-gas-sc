/**
 * Datos estructurados (schema.org) generados a partir de src/data.
 * Los datos de contacto pendientes («[TELÉFONO]», etc.) se omiten en lugar
 * de publicarse como marcadores.
 */
import type { Faq } from '@/data/faq-general';
import type { Seguro } from '@/data/seguros';
import { SITE, absoluteUrl, isPlaceholder } from '@/data/site';

type JsonLdObject = Record<string, unknown>;

const ORG_ID = absoluteUrl('/#organizacion');
const SITE_ID = absoluteUrl('/#sitio');

const definedOrUndefined = (value: string) => (isPlaceholder(value) ? undefined : value);

export function organizationJsonLd(): JsonLdObject {
  const { contact } = SITE;
  const telephone = definedOrUndefined(contact.phone);
  const email = definedOrUndefined(contact.email);

  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    '@id': ORG_ID,
    name: SITE.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/apple-icon'),
    image: absoluteUrl('/opengraph-image'),
    description: SITE.description,
    areaServed: { '@type': 'Country', name: 'México' },
    knowsAbout: ['Gas LP', 'Hidrocarburos', 'Responsabilidad civil', 'Responsabilidad ambiental', 'Gastos médicos mayores', 'ASEA', 'CNE'],
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${contact.address.street}, ${contact.address.neighborhood}`,
      postalCode: contact.address.postalCode,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      addressCountry: 'MX',
    },
    sameAs: SITE.social.length > 0 ? SITE.social.map((s) => s.href) : undefined,
    contactPoint:
      telephone || email
        ? { '@type': 'ContactPoint', contactType: 'sales', telephone, email, areaServed: 'MX', availableLanguage: 'es' }
        : undefined,
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: absoluteUrl('/'),
    name: SITE.name,
    inLanguage: 'es-MX',
    publisher: { '@id': ORG_ID },
  };
}

export function serviceJsonLd(seguro: Seguro): JsonLdObject {
  const url = absoluteUrl(`/seguros/${seguro.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#servicio`,
    name: seguro.nombre,
    serviceType: seguro.serviceType,
    description: seguro.seo.description,
    url,
    image: absoluteUrl(`/seguros/${seguro.slug}/opengraph-image`),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'México' },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: seguro.dirigidoA.map((d) => d.titulo).join(', '),
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Coberturas del ${seguro.nombre.toLowerCase()}`,
      itemListElement: seguro.cubre.map((c) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: c.titulo, description: c.texto },
      })),
    },
  };
}

export function faqJsonLd(faqs: readonly Faq[], path: string): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#preguntas`,
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
