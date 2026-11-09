import { ImageResponse } from 'next/og';

import { BRAND_COLORS } from '@/lib/brand';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** apple-touch-icon: fondo sólido (iOS no admite transparencia) con el manómetro. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: BRAND_COLORS.ink,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 48 48">
          <path
            d="M34.61 13.39A15 15 0 1 0 34.61 34.61"
            fill="none"
            stroke={BRAND_COLORS.paper}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path d="M24 24H35.5" stroke={BRAND_COLORS.accentOnInk} strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="24" cy="24" r="3.6" fill={BRAND_COLORS.paper} />
        </svg>
      </div>
    ),
    size,
  );
}
