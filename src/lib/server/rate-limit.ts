import 'server-only';

import { headers } from 'next/headers';

/**
 * Rate limiting básico por IP: máximo 3 envíos cada 10 minutos.
 *
 * LIMITACIÓN: el registro vive en la memoria del proceso. En serverless
 * (Vercel) cada instancia de la función tiene su propio Map y se pierde en
 * cada arranque en frío, así que el límite es «por instancia» y aproximado:
 * frena el abuso casual y los dobles envíos, no un ataque distribuido.
 * Para un límite global y persistente, sustituir este módulo por un almacén
 * compartido (p. ej. Upstash Redis / Vercel KV con @upstash/ratelimit)
 * manteniendo la misma firma de checkRateLimit().
 */

export const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 } as const;

/** Tope de IPs registradas para que el Map no crezca sin límite. */
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, number[]>();

export type RateLimitResult = { ok: true; remaining: number } | { ok: false; retryAfterMs: number };

export function checkRateLimit(key: string, now = Date.now()): RateLimitResult {
  const windowStart = now - RATE_LIMIT.windowMs;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);

  if (recent.length >= RATE_LIMIT.max) {
    hits.set(key, recent);
    const oldest = recent[0] ?? now;
    return { ok: false, retryAfterMs: oldest + RATE_LIMIT.windowMs - now };
  }

  recent.push(now);
  hits.set(key, recent);
  if (hits.size > MAX_TRACKED_KEYS) prune(windowStart);
  return { ok: true, remaining: RATE_LIMIT.max - recent.length };
}

function prune(windowStart: number) {
  for (const [key, times] of hits) {
    if (times.every((t) => t <= windowStart)) hits.delete(key);
  }
  // Si aún hay demasiadas, se descartan las más antiguas (orden de inserción).
  while (hits.size > MAX_TRACKED_KEYS) {
    const first = hits.keys().next();
    if (first.done) break;
    hits.delete(first.value);
  }
}

/**
 * IP del cliente. En Vercel, x-forwarded-for la fija la plataforma (el primer
 * valor es la IP real); en local suele no existir y se usa «local».
 */
export async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || h.get('x-real-ip')?.trim() || 'local';
}
