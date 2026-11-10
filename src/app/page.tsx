import { About } from '@/components/home/About';
import { ContactSection } from '@/components/home/ContactSection';
import { FaqSection } from '@/components/home/FaqSection';
import { Hero } from '@/components/home/Hero';
import { Process } from '@/components/home/Process';
import { SegurosGrid } from '@/components/home/SegurosGrid';
import { DirectionalTransition } from '@/components/motion/DirectionalTransition';
import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/JsonLd';
import { FAQ_GENERAL } from '@/data/faq-general';
import { SITE } from '@/data/site';
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Seguros para gaseras, autotanques y transporte de gas LP',
    description:
      'Seguros para la industria del gas LP en México: responsabilidad civil, responsabilidad ambiental (ASEA) y gastos médicos mayores para plantas, autotanques y transportistas.',
    path: '/',
    keywords: [
      'seguro para gaseras',
      'seguro autotanques gas LP',
      'responsabilidad civil gas LP',
      'seguro ambiental ASEA',
      'seguros hidrocarburos México',
    ],
  }),
  // En el inicio el título no lleva la plantilla «| ASISTENCIA PARA GAS SC» duplicada al final.
  title: { absolute: `Seguros para gaseras y la industria del gas LP | ${SITE.name}` },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(), faqJsonLd(FAQ_GENERAL, '/')]} />
      <DirectionalTransition>
        <Hero />
        <About />
        <SegurosGrid />
        <Process />
        <FaqSection items={FAQ_GENERAL} group="faq-general" />
        <ContactSection />
      </DirectionalTransition>
    </>
  );
}
