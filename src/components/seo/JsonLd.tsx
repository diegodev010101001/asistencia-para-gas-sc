/**
 * JSON-LD renderizado en el servidor (queda en el HTML estático).
 * Se escapa «<» para impedir que el contenido cierre la etiqueta <script>
 * (recomendación de la guía de JSON-LD de Next.js).
 */
export function JsonLd({ data }: { data: Record<string, unknown> | readonly Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
