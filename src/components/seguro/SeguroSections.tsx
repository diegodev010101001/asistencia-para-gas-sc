import Link from 'next/link';
import { ArrowUpRight, Check, X } from 'lucide-react';

import { Figure } from '@/components/ui/Figure';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SeguroIcon } from '@/components/ui/SeguroIcon';
import type { BloqueExtra, Seguro } from '@/data/seguros';
import { cssVars } from '@/lib/css';

import styles from './SeguroSections.module.css';

type DatosBlock = Extract<BloqueExtra, { tipo: 'datos' }>;

const pad = (n: number) => String(n).padStart(2, '0');

/* ─── Qué es + hoja de datos ──────────────────────────────────────────── */
export function IntroSection({ seguro, index }: { seguro: Seguro; index: string }) {
  const datos = seguro.extras.filter((e): e is DatosBlock => e.tipo === 'datos');

  return (
    <section className={styles.section} aria-labelledby="intro-title">
      <div className={`container ${styles.split}`}>
        <div>
          <SectionHeader index={index} label="Qué es" title={`El ${seguro.nombre.toLowerCase()}, en breve`} id="intro-title" />
          <div className={styles.prose}>
            {seguro.descripcion.map((p, i) => (
              <p key={i} data-reveal style={cssVars({ '--i': i })}>
                {p}
              </p>
            ))}
          </div>
          {seguro.alcance ? (
            <div className={styles.alcance} data-reveal>
              <h3 className="label">Protege frente a daños a</h3>
              <ul role="list" className={styles.chips}>
                {seguro.alcance.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {datos.length > 0 ? (
          <aside className={styles.sheets} aria-label="Datos de la póliza">
            {datos.map((d) => (
              <DatosSheet key={d.id} block={d} />
            ))}
          </aside>
        ) : null}
      </div>
    </section>
  );
}

function DatosSheet({ block }: { block: DatosBlock }) {
  return (
    <div className={styles.sheet} data-reveal>
      <h3 className={styles.sheetTitle}>{block.titulo}</h3>
      {block.intro ? <p className={styles.sheetIntro}>{block.intro}</p> : null}
      <dl className={styles.sheetList}>
        {block.items.map(({ etiqueta, valor, detalle }) => (
          <div key={etiqueta} className={styles.sheetRow}>
            <dt>{etiqueta}</dt>
            <dd>
              <strong>{valor}</strong>
              {detalle ? <span>{detalle}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
      {block.nota ? <p className={styles.sheetNote}>{block.nota}</p> : null}
    </div>
  );
}

/* ─── Qué cubre / qué no cubre ────────────────────────────────────────── */
export function CoverageSection({ seguro, index }: { seguro: Seguro; index: string }) {
  return (
    <section className={`${styles.section} ${styles.sunken}`} id="cobertura" aria-labelledby="cobertura-title">
      <div className="container">
        <SectionHeader
          index={index}
          label="Cobertura"
          title="Qué cubre y qué no cubre"
          lead="Lo que responde la póliza y las exclusiones que conviene conocer antes de contratar."
          id="cobertura-title"
          align="split"
        />
        <div className={styles.coverage}>
          <div className={styles.coverCol}>
            <h3 className={styles.colTitle}>
              <span className={`${styles.badge} ${styles.badgeYes}`} aria-hidden="true">
                <Check size={16} strokeWidth={2.25} />
              </span>
              Qué cubre
            </h3>
            <ul role="list" className={styles.points}>
              {seguro.cubre.map(({ titulo, texto }, i) => (
                <li key={titulo} className={styles.point} data-reveal style={cssVars({ '--i': i })}>
                  <Check size={18} strokeWidth={2} className={styles.pointYes} aria-hidden="true" />
                  <div>
                    <strong>{titulo}</strong>
                    {texto ? <p>{texto}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.coverCol}>
            <h3 className={styles.colTitle}>
              <span className={`${styles.badge} ${styles.badgeNo}`} aria-hidden="true">
                <X size={16} strokeWidth={2.25} />
              </span>
              Qué no cubre
            </h3>
            <ul role="list" className={styles.points}>
              {seguro.noCubre.map(({ titulo, texto }, i) => (
                <li key={titulo} className={styles.point} data-reveal style={cssVars({ '--i': i })}>
                  <X size={18} strokeWidth={2} className={styles.pointNo} aria-hidden="true" />
                  <div>
                    <strong>{titulo}</strong>
                    {texto ? <p>{texto}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
            {seguro.noCubreImagen ? (
              <Figure
                src={seguro.noCubreImagen.src}
                alt={seguro.noCubreImagen.alt}
                sizes="(min-width: 64em) 40vw, 100vw"
                ratio="16 / 9"
                caption="Exclusión común: operación fuera de norma"
                className={styles.coverFigure}
              />
            ) : null}
            <p className={styles.notice}>{seguro.notaExclusiones}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── A quién va dirigido ─────────────────────────────────────────────── */
export function AudienceSection({ seguro, index }: { seguro: Seguro; index: string }) {
  return (
    <section className={styles.section} id="dirigido" aria-labelledby="dirigido-title">
      <div className="container">
        <SectionHeader index={index} label="A quién va dirigido" title="Pensado para estas operaciones" id="dirigido-title" />
        <ul role="list" className={styles.audience}>
          {seguro.dirigidoA.map(({ titulo, texto }, i) => (
            <li key={titulo} className={styles.audienceItem} data-reveal style={cssVars({ '--i': i })}>
              <span className={styles.audienceNum} aria-hidden="true">
                {pad(i + 1)}
              </span>
              <strong>{titulo}</strong>
              {texto ? <span className={styles.audienceTag}>{texto}</span> : null}
            </li>
          ))}
        </ul>
        {seguro.notaDirigido ? <p className={styles.footnote}>{seguro.notaDirigido}</p> : null}
      </div>
    </section>
  );
}

/* ─── Escenarios de riesgo ────────────────────────────────────────────── */
export function ScenariosSection({ seguro, index }: { seguro: Seguro; index: string }) {
  return (
    <section className={`${styles.section} on-ink ${styles.ink}`} id="escenarios" aria-labelledby="escenarios-title">
      <div className="container">
        <SectionHeader
          index={index}
          label="Escenarios de riesgo"
          title="Cómo responde la póliza en situaciones del sector"
          lead="Casos ilustrativos basados en las coberturas y exclusiones de este seguro."
          id="escenarios-title"
          tone="inverse"
          align="split"
        />
        <ol role="list" className={styles.scenarios}>
          {seguro.escenarios.map(({ titulo, situacion, respuesta, resultado }, i) => (
            <li key={titulo} className={styles.scenario} data-result={resultado} data-reveal style={cssVars({ '--i': i })}>
              <div className={styles.scenarioHead}>
                <span className={styles.scenarioNum} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <span className={styles.result}>
                  {resultado === 'cubierto' ? <Check size={14} strokeWidth={2.5} aria-hidden="true" /> : <X size={14} strokeWidth={2.5} aria-hidden="true" />}
                  {resultado === 'cubierto' ? 'Cubierto' : 'Excluido'}
                </span>
              </div>
              <h3 className={styles.scenarioTitle}>{titulo}</h3>
              <p className={styles.scenarioText}>{situacion}</p>
              <p className={styles.scenarioAnswer}>
                <span className="visually-hidden">Respuesta de la póliza: </span>
                {respuesta}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── Bloques adicionales (listas, pasos, comparación) ────────────────── */
export function ExtraSections({ seguro, startIndex }: { seguro: Seguro; startIndex: number }) {
  const blocks = seguro.extras.filter((e) => e.tipo !== 'datos');
  return (
    <>
      {blocks.map((block, i) => (
        <section key={block.id} className={styles.section} id={block.id} aria-labelledby={`${block.id}-title`}>
          <div className="container">
            <SectionHeader index={pad(startIndex + i)} label={labelFor(block)} title={block.titulo} lead={block.intro} id={`${block.id}-title`} />
            <ExtraBody block={block} />
          </div>
        </section>
      ))}
    </>
  );
}

function labelFor(block: BloqueExtra) {
  switch (block.tipo) {
    case 'pasos':
      return 'Procedimiento';
    case 'comparacion':
      return 'Enfoque';
    default:
      return 'Requisitos';
  }
}

function ExtraBody({ block }: { block: BloqueExtra }) {
  switch (block.tipo) {
    case 'lista':
      return (
        <ul role="list" className={styles.checklist}>
          {block.items.map(({ titulo, texto }, i) => (
            <li key={titulo} data-reveal style={cssVars({ '--i': i })}>
              <Check size={18} strokeWidth={2} className={styles.pointYes} aria-hidden="true" />
              <div>
                <strong>{titulo}</strong>
                {texto ? <p>{texto}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      );
    case 'pasos':
      return (
        <>
          <ol role="list" className={styles.steps}>
            {block.items.map(({ titulo, texto }, i) => (
              <li key={titulo} className={styles.step} data-reveal style={cssVars({ '--i': i })}>
                <span className={styles.stepNum} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <strong>{titulo}</strong>
                {texto ? <p>{texto}</p> : null}
              </li>
            ))}
          </ol>
          {block.nota ? <p className={styles.footnote}>{block.nota}</p> : null}
        </>
      );
    case 'comparacion':
      return (
        <div className={styles.compare}>
          {(['malo', 'bueno'] as const).map((side) => {
            const col = block[side];
            return (
              <div key={side} className={styles.compareCol} data-side={side} data-reveal>
                <h3 className={styles.compareTitle}>
                  {side === 'bueno' ? <Check size={18} aria-hidden="true" /> : <X size={18} aria-hidden="true" />}
                  {col.titulo}
                </h3>
                <ul role="list">
                  {col.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <p className={styles.compareResult}>
                  <strong>{side === 'bueno' ? 'Resultado: ' : 'Riesgo: '}</strong>
                  {col.consecuencia}
                </p>
              </div>
            );
          })}
        </div>
      );
    case 'datos':
      return null;
  }
}

/* ─── Navegación hacia los otros seguros ──────────────────────────────── */
export function OtherSeguros({ seguros }: { seguros: readonly Seguro[] }) {
  return (
    <nav className={styles.others} aria-labelledby="otros-title">
      <div className="container">
        <h2 id="otros-title" className={`label ${styles.othersTitle}`}>
          Otros seguros
        </h2>
        <ul role="list" className={styles.othersList}>
          {seguros.map(({ slug, code, nombre, resumen, icono }) => (
            <li key={slug}>
              <Link href={`/seguros/${slug}`} className={styles.otherCard}>
                <span className={styles.otherTop}>
                  <span className={styles.otherCode}>Ficha {code}</span>
                  <span className={styles.otherIcon}>
                    <SeguroIcon name={icono} size={18} />
                  </span>
                </span>
                <span className={styles.otherName}>{nombre}</span>
                <span className={styles.otherText}>{resumen}</span>
                <ArrowUpRight size={22} strokeWidth={1.5} className={styles.otherArrow} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
