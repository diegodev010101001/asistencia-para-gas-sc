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
  experimental: {
    // CSS total ≈ 15 kB gzip: se incrusta en el <head> para eliminar las hojas
    // que bloquean el render (la mayoría de visitas llegan nuevas desde búsqueda).
    inlineCss: true,
  },
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
