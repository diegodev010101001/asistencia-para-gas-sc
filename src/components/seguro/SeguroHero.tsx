import Image from 'next/image';
import { ViewTransition } from 'react';

import { ButtonLink } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import type { Seguro } from '@/data/seguros';
import { WHATSAPP_MESSAGES } from '@/data/site';

import { Breadcrumbs } from './Breadcrumbs';
import styles from './SeguroHero.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

/** Índice de la ficha con los mismos números que llevan sus secciones. */
function buildIndex(seguro: Seguro) {
  const extras = seguro.extras.filter((e) => e.tipo !== 'datos').length;
  return [
    { href: '#cobertura', label: 'Cobertura', num: pad(2) },
    { href: '#dirigido', label: 'A quién va dirigido', num: pad(3) },
    { href: '#escenarios', label: 'Escenarios', num: pad(4) },
    { href: '#preguntas', label: 'Preguntas', num: pad(5 + extras) },
    { href: '#cotizar', label: 'Cotizar', num: pad(6 + extras) },
  ];
}

export function SeguroHero({ seguro }: { seguro: Seguro }) {
  const { slug, code, nombre, nombreCorto, hero, temas, imagen } = seguro;
  const index = buildIndex(seguro);

  return (
    <section className={styles.hero} aria-labelledby="seguro-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Seguros', href: '/#seguros' }, { label: nombreCorto }]} />

          <h1 id="seguro-title" className={`display ${styles.title}`}>
            {hero.titulo}
          </h1>
          <p className={styles.lead}>{hero.subtitulo}</p>

          {/* Línea de especificaciones: código de la ficha y temas, sin cajas que parezcan botones. */}
          <ul role="list" className={styles.temas} aria-label="Ficha y temas principales">
            <li className={styles.code}>Ficha {code}</li>
            {temas.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className={styles.actions}>
            <ButtonLink href="#cotizar" variant="primary" size="l" arrow>
              Cotizar este seguro
            </ButtonLink>
            <WhatsAppButton message={WHATSAPP_MESSAGES.seguro(nombre)} label="Hablar por WhatsApp" size="l" />
          </div>
        </div>

        <ViewTransition name={`seguro-media-${slug}`} share="morph" default="none">
          <div className={styles.media}>
            <Image
              src={imagen.src}
              alt={imagen.alt}
              sizes="(min-width: 64em) 40vw, 100vw"
              placeholder="blur"
              preload
              fetchPriority="high"
              className={styles.image}
            />
            <span className={styles.corners} aria-hidden="true" />
          </div>
        </ViewTransition>
      </div>

      <nav aria-label="Contenido de la ficha" className={`container ${styles.index}`}>
        <ol className={styles.indexList}>
          {index.map(({ href, label, num }) => (
            <li key={href}>
              <a href={href} className={styles.indexLink}>
                <span className={styles.indexNum} aria-hidden="true">
                  {num}
                </span>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
