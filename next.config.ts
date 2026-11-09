import type { NextConfig } from 'next';

/** Rutas de la versión anterior del sitio → nuevas rutas (308 permanente). */
const LEGACY_REDIRECTS = [
  ['/seguro-responsivo', '/seguros/responsabilidad-civil'],
  ['/seguro-ambiental', '/seguros/responsabilidad-ambiental'],
  ['/gastos-medicos', '/seguros/gastos-medicos-mayores'],
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return LEGACY_REDIRECTS.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
