# ASISTENCIA PARA GAS SC — sitio web

Sitio de seguros para la industria del gas LP e hidrocarburos en México:
Responsabilidad Civil, Responsabilidad Ambiental y Gastos Médicos Mayores.

**Stack:** Next.js 16 (App Router) · React 19.3 · TypeScript strict · CSS Modules con design tokens · lucide-react.
Todas las rutas se generan estáticas (SSG).

## Requisitos

- Node.js ≥ 20.9 (probado con 22).

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo (webpack: funciona aunque Windows bloquee el binario nativo de SWC). |
| `npm run dev:turbo` | Servidor de desarrollo con Turbopack (más rápido; requiere el binario nativo de SWC). |
| `npm run build` | Build de producción (Turbopack). Es lo que ejecuta Vercel. |
| `npm start` | Sirve el build de producción. |
| `npm run lint` | ESLint (config oficial de Next: core-web-vitals + typescript). |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run build:webpack` | Build con webpack para equipos donde Windows bloquea el binario nativo de SWC («An Application Control policy has blocked this file», p. ej. con Smart App Control activado). |

## Estructura

```
src/
  app/                      Rutas (App Router)
    page.tsx                Inicio
    seguros/[slug]/         Plantilla única de los 3 seguros (+ opengraph-image por seguro)
    not-found.tsx           404
    actions/submit-quote.ts Server Action del formulario
    sitemap.ts, robots.ts, icon.svg, apple-icon.tsx, opengraph-image.tsx
  data/                     ← Contenido editable
    seguros.ts              Los 3 seguros: textos, coberturas, exclusiones, escenarios, FAQ, SEO
    seguros-meta.ts         Identidad ligera (slug, nombre) para componentes cliente
    home.ts, faq-general.ts Contenido del inicio
    site.ts                 Nombre, dominio y datos de contacto
    navigation.ts           Menú
  components/               UI (Server Components por defecto; islas cliente en motion/, forms/ y MobileMenu)
  lib/                      SEO, JSON-LD, Open Graph, validación del formulario, adaptador de correo
  styles/                   tokens.css (único lugar con colores), base, motion, view-transitions
```

### Editar contenido

- **Seguros:** `src/data/seguros.ts`. Rutas, metadatos, JSON-LD, sitemap y tarjetas del inicio salen de aquí.
- **Contacto:** `src/data/site.ts`. Mientras un valor sea un marcador como `[TELÉFONO]`, se muestra como texto y su enlace (`tel:`, `mailto:`, `wa.me`) queda desactivado; el JSON-LD lo omite.

## Formulario de cotización

`src/components/forms/QuoteForm.tsx` valida en vivo con las mismas reglas que el servidor
(`src/lib/quote-schema.ts`) y envía con la Server Action `src/app/actions/submit-quote.ts`.

**Punto de conexión:** `src/lib/mail.ts`. Configura una opción con variables de entorno (ver `.env.example`):

- `QUOTE_WEBHOOK_URL`: POST JSON a cualquier webhook (Zapier, Make, n8n, Formspree, endpoint propio).
- `RESEND_API_KEY` + `QUOTE_TO_EMAIL` + `QUOTE_FROM_EMAIL`: correo vía Resend.

Sin configuración: en desarrollo la solicitud se imprime en la consola del servidor y se responde éxito;
en producción se muestra un error que invita a escribir por WhatsApp o correo.

## Despliegue en Vercel

1. Importa el repositorio con el preset **Next.js** (sin configuración extra).
2. Define `NEXT_PUBLIC_SITE_URL` y las variables del formulario.
3. Las rutas antiguas (`/seguro-responsivo`, `/seguro-ambiental`, `/gastos-medicos`) redirigen con 308
   a las nuevas (`next.config.ts`).

## Pendientes (TODO)

Búscalos con `grep -rn "TODO" src`. Resumen:

- Teléfono, correo, WhatsApp, dirección/ciudad (`src/data/site.ts`).
- Dominio final (`NEXT_PUBLIC_SITE_URL`).
- URL del aviso de privacidad y redes sociales (`src/data/site.ts`).
- Proveedor de correo y llaves del formulario.
- Confirmar cifras heredadas: límite USD 2,000,000; deducibles USD 30,000 / 10 % mín. USD 15,000;
  aviso de siniestro 24–72 h; emisión 3–7 días hábiles; respuesta en 48 h hábiles.
- Suma asegurada de Gastos Médicos Mayores.
- Imágenes propias para Responsabilidad Ambiental (derrame o suelo contaminado) y Gastos Médicos Mayores.
