import Image from 'next/image';
import { ViewTransition } from 'react';

import { ButtonLink } from '@/components/ui/Button';
import { SeguroIcon } from '@/components/ui/SeguroIcon';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import type { Seguro } from '@/data/seguros';
import { WHATSAPP_MESSAGES } from '@/data/site';

import { Breadcrumbs } from './Breadcrumbs';
import styles from './SeguroHero.module.css';

const INDEX = [
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#dirigido', label: 'A quién va dirigido' },
  { href: '#escenarios', label: 'Escenarios' },
  { href: '#preguntas', label: 'Preguntas' },
  { href: '#cotizar', label: 'Cotizar' },
] as const;

export function SeguroHero({ seguro }: { seguro: Seguro }) {
  const { slug, code, nombre, nombreCorto, hero, temas, imagen, icono } = seguro;

  return (
    <section className={styles.hero} aria-labelledby="seguro-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Seguros', href: '/#seguros' }, { label: nombreCorto }]} />

          <p className={`label ${styles.label}`}>
            <span className={styles.icon}>
              <SeguroIcon name={icono} size={18} />
            </span>
            Ficha {code} — {nombre}
          </p>

          <h1 id="seguro-title" className={`display ${styles.title}`}>
            {hero.titulo}
          </h1>
          <p className={styles.lead}>{hero.subtitulo}</p>

          <ul role="list" className={styles.temas} aria-label="Temas principales">
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
          {INDEX.map(({ href, label }, i) => (
            <li key={href}>
              <a href={href} className={styles.indexLink}>
                <span className={styles.indexNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
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
