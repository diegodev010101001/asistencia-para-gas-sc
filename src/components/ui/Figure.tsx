import Image, { type StaticImageData } from 'next/image';

import styles from './Figure.module.css';

interface FigureProps {
  src: StaticImageData;
  alt: string;
  /** Atributo sizes de next/image: describe el ancho real en cada breakpoint. */
  sizes: string;
  caption?: string;
  /** Proporción del recorte, p. ej. "4 / 3". */
  ratio?: string;
  /** Posición del recorte (object-position). */
  position?: string;
  /** Imagen principal del primer pantallazo: se precarga con prioridad alta. */
  preload?: boolean;
  className?: string;
}

/**
 * Fotografía con tratamiento «ficha técnica»: desaturada, marco con
 * marcas de esquina y pie de foto opcional. next/image entrega AVIF/WebP
 * con width/height explícitos y lazy loading fuera del primer pantallazo.
 */
export function Figure({ src, alt, sizes, caption, ratio, position, preload = false, className }: FigureProps) {
  return (
    <figure className={[styles.figure, className].filter(Boolean).join(' ')}>
      <div className={styles.frame} style={ratio ? { aspectRatio: ratio } : undefined}>
        <Image
          src={src}
          alt={alt}
          sizes={sizes}
          placeholder="blur"
          preload={preload}
          fetchPriority={preload ? 'high' : undefined}
          className={styles.image}
          style={position ? { objectPosition: position } : undefined}
        />
        <span className={styles.corners} aria-hidden="true" />
      </div>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
