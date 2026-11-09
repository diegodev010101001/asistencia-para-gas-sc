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
  lib/                      SEO, JSON-LD, Open Graph, esquema zod del formulario; lib/server/: EmailJS, env, rate limit (solo servidor)
  styles/                   tokens.css (único lugar con colores), base, motion, view-transitions
```

### Editar contenido

- **Seguros:** `src/data/seguros.ts`. Rutas, metadatos, JSON-LD, sitemap y tarjetas del inicio salen de aquí.
- **Contacto:** `src/data/site.ts`. Mientras un valor sea un marcador como `[TELÉFONO]`, se muestra como texto y su enlace (`tel:`, `mailto:`, `wa.me`) queda desactivado; el JSON-LD lo omite.

## Formulario de cotización (EmailJS desde el servidor)

- **Cliente:** `src/components/forms/QuoteForm.tsx` valida en vivo con el esquema zod de
  `src/lib/quote-schema.ts` y envía con `useActionState`.
- **Servidor:** la Server Action `src/app/actions/submit-quote.ts` aplica, en orden:
  honeypot (`sitio_web` lleno → éxito fingido, sin envío) → validación con el mismo esquema →
  rate limit por IP (3 envíos / 10 min, `src/lib/server/rate-limit.ts`) → envío con
  `@emailjs/nodejs` (`src/lib/server/emailjs.ts`).
- **Llaves:** `src/lib/server/env.ts` (con `import "server-only"`) lee y valida
  `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` y `EMAILJS_PRIVATE_KEY`.
  No llevan `NEXT_PUBLIC_`, así que nunca entran al bundle del navegador. Si falta alguna, el
  log del servidor dice cuál (sin mostrar valores) y el usuario ve un mensaje amable.
- **Template de EmailJS:** variables `{{nombre}}`, `{{empresa}}`, `{{email}}`, `{{telefono}}`,
  `{{seguro}}` (nombre legible del seguro) y `{{mensaje}}`.
- El rate limit vive en memoria: en Vercel es por instancia y se reinicia en arranques en frío
  (ver comentario en el módulo para cambiarlo por Upstash/Vercel KV).

### Probar un envío real en local

1. En EmailJS → **Account → Security**, activa **«Allow EmailJS API for non-browser
   applications»** (sin esto la API responde 403 a los envíos desde servidor) y, recomendado,
   **«Use Private Key»**.
2. Completa `.env.local` con Service ID, Template ID, Public Key y Private Key.
3. Reinicia el servidor (`npm run dev`): las variables de entorno solo se leen al arrancar.
4. Envía el formulario. El correo llega a la dirección configurada en el template;
   cualquier error aparece en la terminal como `[EmailJS] …`.
5. El rate limit permite 3 envíos cada 10 minutos por IP; reinicia el servidor para limpiarlo.

## Despliegue en Vercel

1. Importa el repositorio con el preset **Next.js** (sin configuración extra).
2. En **Settings → Environment Variables** agrega, para *Production* (y *Preview* si quieres
   probar en ramas): `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`,
   `EMAILJS_PRIVATE_KEY` y `NEXT_PUBLIC_SITE_URL`. Marca las de EmailJS como **Sensitive**.
3. Vuelve a desplegar (Deployments → Redeploy): las variables se aplican en el siguiente deploy.
4. Las rutas antiguas (`/seguro-responsivo`, `/seguro-ambiental`, `/gastos-medicos`) redirigen con 308
   a las nuevas (`next.config.ts`).

## Pendientes (TODO)

Búscalos con `grep -rn "TODO" src`. Resumen:

- Teléfono, correo, WhatsApp, dirección/ciudad (`src/data/site.ts`).
- Dominio final (`NEXT_PUBLIC_SITE_URL`).
- URL del aviso de privacidad y redes sociales (`src/data/site.ts`).
- Llaves de EmailJS en `.env.local` y en Vercel.
- Confirmar cifras heredadas: límite USD 2,000,000; deducibles USD 30,000 / 10 % mín. USD 15,000;
  aviso de siniestro 24–72 h; emisión 3–7 días hábiles; respuesta en 48 h hábiles.
- Suma asegurada de Gastos Médicos Mayores.
- Imágenes propias para Responsabilidad Ambiental (derrame o suelo contaminado) y Gastos Médicos Mayores.
