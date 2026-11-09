import Link from 'next/link';

// Fase 1: versión mínima. Se rediseña junto con el layout (fase 3).
export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <p className="eyebrow">Error 404</p>
        <h1 className="section-title">Página no encontrada</h1>
        <p className="section-subtitle">La dirección que buscas no existe o cambió de lugar.</p>
        <Link href="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
