/**
 * Valores de marca para contextos donde no existen variables CSS
 * (ImageResponse de next/og: favicon, apple-icon e imágenes Open Graph).
 * Deben coincidir con src/styles/tokens.css.
 */
export const BRAND_COLORS = {
  paper: '#f4f2ee',
  paperSunken: '#ebe8e2',
  ink: '#16181b',
  textMuted: '#5b6066',
  line: '#d9d5ce',
  accent: '#c2410c',
  accentOnInk: '#f0743d',
} as const;

/**
 * Geometría del logo «Manómetro» (viewBox 48×48):
 * arco de 270° abierto a la derecha (lee como una «G») y aguja horizontal
 * que funciona como el travesaño de la G.
 */
export const LOGO_GEOMETRY = {
  viewBox: '0 0 48 48',
  arc: 'M36.73 11.27A18 18 0 1 0 36.73 36.73',
  needle: 'M24 24H38.5',
  pivot: { cx: 24, cy: 24, r: 3.6 },
  stroke: 4.5,
} as const;
