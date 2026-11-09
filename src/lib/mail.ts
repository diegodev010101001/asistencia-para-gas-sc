import { SEGURO_OPTIONS, type QuoteValues } from '@/lib/quote-schema';

/**
 * Adaptador de envío de solicitudes de cotización.
 * ─────────────────────────────────────────────────────────────────────────
 * PUNTO DE CONEXIÓN ÚNICO. Configura UNA de estas opciones con variables de
 * entorno (en Vercel: Project → Settings → Environment Variables):
 *
 *  A) Webhook (Zapier, Make, n8n, un endpoint propio, Formspree…):
 *       QUOTE_WEBHOOK_URL=https://…
 *     Recibe un POST JSON con los datos de la solicitud.
 *
 *  B) Correo vía Resend (https://resend.com), sin dependencias extra:
 *       RESEND_API_KEY=re_…
 *       QUOTE_TO_EMAIL=ventas@tu-dominio.mx        (TODO: correo que recibe)
 *       QUOTE_FROM_EMAIL=cotizaciones@tu-dominio.mx (dominio verificado en Resend)
 *
 * Sin configuración: en desarrollo se registra en consola y se responde
 * éxito; en producción se responde error para no perder solicitudes.
 * Las llaves viven solo en el servidor; nunca llegan al navegador.
 */

export type DeliveryResult = { ok: true } | { ok: false; reason: 'not-configured' | 'failed' };

function seguroLabel(value: string) {
  return SEGURO_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

function toText(q: QuoteValues) {
  return [
    `Nombre: ${q.nombre}`,
    `Empresa: ${q.empresa || '—'}`,
    `Correo: ${q.correo}`,
    `Teléfono: ${q.telefono || '—'}`,
    `Seguro: ${seguroLabel(q.seguro)}`,
    `Operación: ${q.operacion}`,
    '',
    q.mensaje,
  ].join('\n');
}

export async function deliverQuote(quote: QuoteValues): Promise<DeliveryResult> {
  const webhook = process.env.QUOTE_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;

  try {
    if (webhook) {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...quote, seguroLabel: seguroLabel(quote.seguro), receivedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(10_000),
      });
      return res.ok ? { ok: true } : { ok: false, reason: 'failed' };
    }

    if (resendKey && to && from) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: quote.correo,
          subject: `Solicitud de cotización · ${seguroLabel(quote.seguro)} · ${quote.empresa || quote.nombre}`,
          text: toText(quote),
        }),
        signal: AbortSignal.timeout(10_000),
      });
      return res.ok ? { ok: true } : { ok: false, reason: 'failed' };
    }
  } catch {
    return { ok: false, reason: 'failed' };
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info('[cotización] Sin adaptador configurado; solicitud recibida en desarrollo:\n' + toText(quote));
    return { ok: true };
  }
  return { ok: false, reason: 'not-configured' };
}
