import type { ComponentType } from 'react';
import { notFound } from 'next/navigation';

import { SEGUROS, isSeguroSlug, type SeguroSlug } from '@/data/seguros';
// TEMPORAL (fase 1): páginas heredadas. Se sustituyen por la plantilla única en la fase 5.
import SeguroResponsivo from '@/legacy/pages/SeguroResponsivo';
import SeguroAmbiental from '@/legacy/pages/SeguroAmbiental';
import GastosMedicos from '@/legacy/pages/GastosMedicos';

const LEGACY_PAGES: Record<SeguroSlug, ComponentType> = {
  'responsabilidad-civil': SeguroResponsivo,
  'responsabilidad-ambiental': SeguroAmbiental,
  'gastos-medicos-mayores': GastosMedicos,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return SEGUROS.map(({ slug }) => ({ slug }));
}

export default async function SeguroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isSeguroSlug(slug)) notFound();

  const LegacyPage = LEGACY_PAGES[slug];
  return <LegacyPage />;
}
