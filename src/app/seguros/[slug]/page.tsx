import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';

import { ContactSection } from '@/components/home/ContactSection';
import { FaqSection } from '@/components/home/FaqSection';
import { DirectionalTransition } from '@/components/motion/DirectionalTransition';
import { ReadingProgress } from '@/components/motion/ReadingProgress';
import { SeguroHero } from '@/components/seguro/SeguroHero';
import {
  AudienceSection,
  CoverageSection,
  ExtraSections,
  IntroSection,
  OtherSeguros,
  ScenariosSection,
} from '@/components/seguro/SeguroSections';
import { SEGUROS, getSeguro, otherSeguros } from '@/data/seguros';

/** Solo existen los slugs de src/data/seguros.ts; cualquier otro es 404 estático. */
export const dynamicParams = false;

export function generateStaticParams() {
  return SEGUROS.map(({ slug }) => ({ slug }));
}

/** Plantilla única para los tres seguros, alimentada por src/data/seguros.ts. */
export default async function SeguroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seguro = getSeguro(slug);
  if (!seguro) notFound();

  const extrasCount = seguro.extras.filter((e) => e.tipo !== 'datos').length;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <DirectionalTransition>
      {/* Navegación lateral entre seguros (misma ruta, otro slug): crossfade sin dirección. */}
      <ViewTransition key={seguro.slug} name="seguro-content" share="auto" enter="auto" default="none">
        <div>
          <ReadingProgress />
          <SeguroHero seguro={seguro} />
          <IntroSection seguro={seguro} index="01" />
          <CoverageSection seguro={seguro} index="02" />
          <AudienceSection seguro={seguro} index="03" />
          <ScenariosSection seguro={seguro} index="04" />
          <ExtraSections seguro={seguro} startIndex={5} />
          <FaqSection
            items={seguro.faqs}
            index={pad(5 + extrasCount)}
            title={`Preguntas sobre ${seguro.nombreCorto.toLowerCase()}`}
            lead={`Dudas frecuentes sobre el ${seguro.nombre.toLowerCase()}.`}
            group={`faq-${seguro.slug}`}
          />
          <ContactSection index={pad(6 + extrasCount)} defaultSeguro={seguro.slug} title={`Cotiza tu ${seguro.nombre.toLowerCase()}`} />
          <OtherSeguros seguros={otherSeguros(seguro.slug)} />
        </div>
      </ViewTransition>
    </DirectionalTransition>
  );
}
