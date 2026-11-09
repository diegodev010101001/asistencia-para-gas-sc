import { About } from '@/components/home/About';
import { ContactSection } from '@/components/home/ContactSection';
import { FaqSection } from '@/components/home/FaqSection';
import { Hero } from '@/components/home/Hero';
import { Process } from '@/components/home/Process';
import { SegurosGrid } from '@/components/home/SegurosGrid';
import { FAQ_GENERAL } from '@/data/faq-general';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <SegurosGrid />
      <Process />
      <FaqSection items={FAQ_GENERAL} index="04" group="faq-general" />
      <ContactSection index="05" />
    </>
  );
}
