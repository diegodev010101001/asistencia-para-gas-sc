import Image from 'next/image';
import { ViewTransition } from 'react';

import { ButtonLink } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import type { Seguro } from '@/data/seguros';
import { WHATSAPP_MESSAGES } from '@/data/site';

import { Breadcrumbs } from './Breadcrumbs';
import styles from './SeguroHero.module.css';

export function SeguroHero({ seguro }: { seguro: Seguro }) {
  const { slug, code, nombre, nombreCorto, hero, temas, imagen } = seguro;
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

    </section>
  );
}
