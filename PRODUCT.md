# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Empresas de la cadena del gas LP e hidrocarburos en México que necesitan asegurar su operación. Quien llega al sitio y pide la cotización puede ser cualquiera de estos perfiles (confirmados):

- **Dueños o directores** de gaseras, plantas de gas LP o empresas de transporte, que deciden la compra.
- **Responsables de cumplimiento o seguridad industrial**, que necesitan la póliza para obtener o mantener permisos ante ASEA y CNE.
- **Personal de administración o compras**, que cotiza y compara pólizas por encargo.
- **Transportistas independientes**, dueños u operadores de pocos autotanques o pipas.

Su tarea: entender qué cubre cada seguro y qué no, comprobar que responde a lo que exige la regulación, y pedir una cotización por formulario o WhatsApp.

## Product Purpose

Sitio comercial de ASISTENCIA PARA GAS SC. Explica tres seguros especializados para el sector (Responsabilidad Civil, Responsabilidad Ambiental y Gastos Médicos Mayores) y convierte la visita en una solicitud de cotización. El éxito es una solicitud bien calificada (seguro de interés, operación, contacto) o una conversación iniciada por WhatsApp.

## Positioning

ASISTENCIA PARA GAS SC es un **agente o intermediario de seguros**: asesora, cotiza y coloca pólizas con aseguradoras; no emite pólizas propias. Se especializa exclusivamente en la cadena del gas LP e hidrocarburos (almacenamiento, distribución, transporte, carga y descarga, expendio) y atiende operaciones en **todo México** desde su oficina en Pocitos, Aguascalientes.

## Operating Context

- Marco regulatorio que el visitante tiene en mente: permisos de la CNE, disposiciones de ASEA y NOM aplicables al sector hidrocarburos.
- Canales de contacto: formulario de cotización (enviado en el servidor con EmailJS) y WhatsApp; también teléfono y correo.
- Proceso descrito en el sitio: el cliente describe su operación → análisis de exposición → propuesta sin costo → emisión de la póliza.

## Capabilities and Constraints

- Tres seguros, cada uno con su página: `/seguros/responsabilidad-civil`, `/seguros/responsabilidad-ambiental`, `/seguros/gastos-medicos-mayores`. El contenido vive en `src/data/seguros.ts`.
- Next.js 16 App Router, todas las rutas estáticas (SSG), con metadatos, JSON-LD y sitemap generados desde los datos.
- Formulario: Server Action con `@emailjs/nodejs`, validación zod compartida cliente/servidor, honeypot y rate limit por IP. Las llaves nunca llegan al cliente.
- Idioma: español de México (`es-MX`).
- Contacto (`src/data/site.ts`): WhatsApp +52 1 449 106 1582, teléfono +52 449 239 3813, asisgassc@gmail.com, Julian Piñon Valenzuela 242 B, Los Pocitos, CP 20328 Pocitos, Ags.
- **Decisiones abiertas** (no inventar mientras sigan abiertas): dominio final; URL del aviso de privacidad; redes sociales; nombres de las aseguradoras con las que coloca; suma asegurada de Gastos Médicos Mayores.

## Brand Commitments

- El nombre se escribe siempre en mayúsculas: **ASISTENCIA PARA GAS SC**.
- Se usa «CNE» (Comisión Nacional de Energía), nunca «CRE».
- El seguro se llama «Seguro de Responsabilidad Civil» (no «Seguro Responsivo»).
- Dirección visual aprobada por el cliente: **«Ficha técnica»**. Los refinamientos la preservan; no se rediseña desde cero.
- Logo «Manómetro» en SVG (`src/components/brand/Logo.tsx`).

## Evidence on Hand

- Cifras confirmadas para usar tal cual: **500+ empresas protegidas, 10+ años de experiencia, 3 seguros especializados**.
- Cifras heredadas del sitio anterior, pendientes de confirmación (marcadas `TODO` en el código): límite USD 2,000,000 por evento; deducibles USD 30,000 (instalaciones fijas) y 10 % con mínimo USD 15,000 (transporte); aviso de siniestro en 24–72 h; emisión en 3–7 días hábiles; respuesta en menos de 48 h hábiles.
- Fotografías en `src/assets/`. Responsabilidad Ambiental y Gastos Médicos Mayores no tienen foto propia (pendiente).
- **No existen** testimonios, nombres de clientes, casos de éxito, certificaciones, premios ni nombres de aseguradoras. No se deben fabricar.

## Product Principles

1. **Claridad antes que persuasión:** qué cubre, qué no cubre y en qué situaciones; el visitante compra certeza.
2. **Cumplimiento visible:** la relación con CNE, ASEA y las NOM se explica con precisión, sin promesas que la póliza no sostiene.
3. **Ningún dato sin respaldo:** cifras, clientes o garantías solo si están confirmados; lo pendiente se marca, no se rellena.
4. **Contacto sin fricción:** cotizar o escribir por WhatsApp debe estar a un toque desde cualquier página, con el seguro ya identificado.
5. **Especialización por encima de amplitud:** todo el contenido habla de la operación real del gas LP, no de seguros en general.

## Accessibility & Inclusion

- WCAG 2.1 AA: contraste, foco visible y navegación completa con teclado.
- `prefers-reduced-motion` respetado en toda animación.
- Uso frecuente desde celular en campo u oficina: sin scroll horizontal desde 320 px y alternativas táctiles (`hover: none`) para los efectos de cursor.
