import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { BRAND_COLORS, LOGO_GEOMETRY } from '@/lib/brand';

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

interface OgOptions {
  eyebrow: string;
  title: string;
  footer: string;
}

// Satori requiere TTF/OTF: instancias estáticas de las fuentes del sitio (licencia OFL).
async function loadFonts() {
  const dir = join(process.cwd(), 'src/assets/fonts');
  const [display, body] = await Promise.all([
    readFile(join(dir, 'Archivo-ExpandedBold.ttf')),
    readFile(join(dir, 'PublicSans-Medium.ttf')),
  ]);
  return [
    { name: 'Archivo', data: display, weight: 700 as const, style: 'normal' as const },
    { name: 'Public Sans', data: body, weight: 500 as const, style: 'normal' as const },
  ];
}

/** Plantilla Open Graph «ficha técnica»: papel, retícula, titular expandido y acento. */
export async function renderOgImage({ eyebrow, title, footer }: OgOptions) {
  const fonts = await loadFonts();
  const c = BRAND_COLORS;
  const { arc, needle, pivot } = LOGO_GEOMETRY;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: c.paper,
          backgroundImage: `linear-gradient(${c.line} 1px, transparent 1px), linear-gradient(90deg, ${c.line} 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          backgroundPosition: '-1px -1px',
          color: c.ink,
          fontFamily: 'Public Sans',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 48 48">
            <path d={arc} fill="none" stroke={c.ink} strokeWidth="4.5" strokeLinecap="round" />
            <path d={needle} stroke={c.accent} strokeWidth="4.5" strokeLinecap="round" />
            <circle cx={pivot.cx} cy={pivot.cy} r={pivot.r} fill={c.ink} />
          </svg>
          <div style={{ fontFamily: 'Archivo', fontSize: 26, letterSpacing: 1 }}>ASISTENCIA PARA GAS SC</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 24, letterSpacing: 4, color: c.accent, textTransform: 'uppercase' }}>
            {eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Archivo',
              fontSize: title.length > 48 ? 62 : 74,
              lineHeight: 1.04,
              textTransform: 'uppercase',
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            paddingTop: 24,
            borderTop: `2px solid ${c.ink}`,
            fontSize: 24,
            color: c.textMuted,
          }}
        >
          <div style={{ display: 'flex', width: 40, height: 6, background: c.accent }} />
          {footer}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
