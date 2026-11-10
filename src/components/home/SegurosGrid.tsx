import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { SeguroIcon } from '@/components/ui/SeguroIcon';
import { SEGUROS, type Seguro } from '@/data/seguros';
import { cssVars } from '@/lib/css';

import styles from './SegurosGrid.module.css';

function SeguroCard({ seguro, index }: { seguro: Seguro; index: number }) {
  const { slug, code, nombre, resumen, temas, icono, imagen } = seguro;
  return (
    <li className={styles.item} data-reveal style={cssVars({ '--i': index })}>
      <Link href={`/seguros/${slug}`} className={styles.card} transitionTypes={['nav-forward']} data-spotlight>
        <div className={styles.top}>
          <span className={styles.code}>Ficha {code}</span>
          <span className={styles.icon}>
            <SeguroIcon name={icono} />
          </span>
        </div>

        <ViewTransition name={`seguro-media-${slug}`} share="morph" default="none">
          <div className={styles.media}>
            <Image
              src={imagen.src}
              alt=""
              sizes="(min-width: 64em) 25vw, (min-width: 40em) 45vw, 100vw"
              placeholder="blur"
              className={styles.image}
            />
          </div>
        </ViewTransition>

        <h3 className={styles.title}>{nombre}</h3>
        <p className={styles.summary}>{resumen}</p>

        <ul role="list" className={styles.tags} aria-label="Temas principales">
          {temas.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <span className={styles.more}>
          Ver cobertura
          <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" className={styles.moreIcon} />
        </span>
      </Link>
    </li>
  );
}

export function SegurosGrid() {
  return (
    <section className={styles.section} id="seguros" aria-labelledby="seguros-title">
      <div className="container">
        <SectionHeader
          title="Coberturas para cada riesgo del sector energético"
          lead="Tres soluciones complementarias que protegen a las personas, el patrimonio y el medio ambiente en toda la operación."
          id="seguros-title"
          align="split"
        />
        <ul role="list" className={styles.grid}>
          {SEGUROS.map((s, i) => (
            <SeguroCard key={s.slug} seguro={s} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
