import React from 'react';
import { motion } from 'framer-motion';
import './SeguroAmbiental.css';
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import imgTierraContaminada from '../assets/RA_tierracontaminada.jpg.jpeg';
import imgIndustria from '../assets/RA_industria.jpg.jpeg';
import imgCargaDescarga from '../assets/RCyRA_cargaydescarga.jpg.jpeg';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut', delay },
  }),
};

const SeguroAmbiental = () => {
  return (
    <div className="ra-page-wrapper">
      <Link to="/" className="back-home-btn">
        <FaArrowLeft />
        <span>Inicio</span>
      </Link>

      {/* ══════════════ HERO ══════════════ */}
      <header className="ra-hero">
        <div className="ra-hero-split">

          <motion.div
            className="ra-hero-content"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <span className="ra-hero-label">Cobertura Especializada · Sector Energético</span>
            <h1 className="ra-title">Responsabilidad Ambiental (RA)</h1>
            <p className="ra-subtitle">La cobertura debe incluir remediación, contención y restauración ambiental.</p>

            <div className="ra-limits-box glass-effect">
              <h3>Límites Típicos</h3>
              <ul>
                <li><strong>USD $2,000,000</strong> por evento y agregado.</li>
                <li>Cobertura para contaminación súbita, accidental y gradual.</li>
                <li>Gastos de emergencia y mitigación incluidos.</li>
              </ul>
              <div className="ra-alert-box">
                <span className="ra-badge-critical">Crítico</span>
                <p>Documentar el criterio técnico que justifica los límites contratados.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="ra-hero-image-wrap"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, ease: 'easeOut', delay: 0.35 }}
          >
            <div className="ra-img-hover-box ra-hero-img-box">
              <img
                src={imgTierraContaminada}
                alt="Planeta Tierra afectado por contaminación ambiental: derrames, emisiones industriales y residuos tóxicos"
                loading="eager"
              />
              <div className="ra-img-overlay">
                <span>Riesgo Ambiental Real</span>
              </div>
            </div>
          </motion.div>

        </div>
      </header>

      {/* ══════════════ BANNER INDUSTRIAL ══════════════ */}
      <motion.section
        className="ra-industry-banner"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1 }}
      >
        <div
          className="ra-industry-bg"
          style={{ backgroundImage: `url(${imgIndustria})` }}
        />
        <div className="ra-industry-overlay" />
        <div className="ra-industry-content">
          <span className="ra-industry-label">Impacto Industrial</span>
          <h2>Emisiones y contaminación industrial: el riesgo más costoso sin cobertura adecuada</h2>
          <p>
            Plantas industriales, chimeneas y operaciones de hidrocarburos generan pasivos
            ambientales de millones de dólares. Un seguro insuficiente expone al permisionario
            a responsabilidad personal ilimitada.
          </p>
        </div>
      </motion.section>

      {/* ══════════════ ENFOQUE CORRECTO VS INCORRECTO ══════════════ */}
      <section className="ra-section animate-fade-in delay-1">
        <h2 className="ra-section-title">Protección Real vs. Cumplimiento Administrativo</h2>
        <div className="ra-grid-2">

          <div className="ra-card ra-card-danger glass-effect">
            <div className="ra-card-header">
              <span className="ra-icon-x">❌</span>
              <h3>Enfoque Incorrecto</h3>
            </div>
            <p className="ra-italic">Contratar solo para "pasar el trámite"</p>
            <ul>
              <li>Límites insuficientes para riesgos reales</li>
              <li>Exclusiones no revisadas</li>
              <li>Deducibles impagables</li>
              <li>Sin análisis de exposición</li>
            </ul>
            <div className="ra-consequence glass-sub-effect">
              <span className="ra-badge-danger">Consecuencia:</span> En caso de siniestro mayor,
              la empresa enfrenta quiebra y responsabilidad penal por daños no cubiertos.
            </div>
          </div>

          <div className="ra-card ra-card-success glass-effect">
            <div className="ra-card-header">
              <span className="ra-icon-check">✓</span>
              <h3>Enfoque Correcto</h3>
            </div>
            <p className="ra-italic">Protección integral de sociedad y patrimonio</p>
            <ul>
              <li>Límites basados en análisis de riesgo real</li>
              <li>Cobertura de escenarios catastróficos</li>
              <li>Deducibles financieramente viables</li>
              <li>Revisión de exclusiones críticas</li>
            </ul>
            <div className="ra-consequence glass-sub-effect">
              <span className="ra-badge-success">Beneficio:</span> Protección efectiva ante
              eventos adversos, continuidad operativa y cumplimiento ético con la sociedad.
            </div>
          </div>

        </div>
        <div className="ra-footer-note">
          <p>
            Un siniestro mayor en gas LP puede generar daños por{' '}
            <strong>decenas de millones de pesos</strong>. Una póliza insuficiente deja al
            permisionario, sus socios y directivos con responsabilidad personal ilimitada.
          </p>
        </div>
      </section>

      {/* ══════════════ COBERTURAS Y CONDICIONES ══════════════ */}
      <section className="ra-section animate-fade-in delay-2">
        <h2 className="ra-section-title">Coberturas y Condiciones Especiales: RA</h2>
        <div className="ra-grid-3">
          <div className="ra-card glass-effect hover-glow">
            <h3>Remediación y Limpieza</h3>
            <p>Costos de remoción de contaminantes, restauración de suelo/agua, caracterización
            ambiental y monitoreo post-remediación.</p>
          </div>
          <div className="ra-card glass-effect hover-glow">
            <h3>Atención de Emergencias</h3>
            <p>Respuesta inmediata, contención de derrames, mitigación de impactos,
            contratación de consultores especializados.</p>
          </div>
          <div className="ra-card glass-effect hover-glow">
            <h3>Gastos Legales</h3>
            <p>Defensa ante demandas por daño ambiental, costos de peritos, honorarios
            de abogados (incluidos en suma asegurada).</p>
          </div>
        </div>

        <div className="ra-unique-features glass-effect mt-4">
          <h3>Características únicas de RA:</h3>
          <ul>
            <li>
              <strong>Base Claims-Made:</strong> Cubre reclamaciones presentadas durante
              vigencia (con retroactividad declarada).
            </li>
            <li>
              <strong>Contaminación gradual:</strong> A diferencia de RC, cubre eventos
              paulatinos detectados durante vigencia.
            </li>
            <li>
              <strong>Retroactividad:</strong> Fecha desde la cual se reconocen condiciones
              preexistentes.
            </li>
            <li>
              <strong>Requisitos de reporte:</strong> Plazos estrictos para notificar incidentes.
            </li>
          </ul>
        </div>
      </section>

      {/* ══════════════ DEDUCIBLES ══════════════ */}
      <section className="ra-section animate-fade-in delay-3">
        <h2 className="ra-section-title center">Deducibles</h2>

        <div className="ra-grid-2">
          <div className="ra-price-card glass-effect hover-glow">
            <h2>USD $30MIL</h2>
            <h4>Deducible RA</h4>
            <p>USD $30,000 por evento en instalaciones fijas</p>
          </div>
          <div className="ra-price-card glass-effect hover-glow">
            <h2>10%</h2>
            <h4>Deducible RA Transporte</h4>
            <p>10% del siniestro, mínimo USD $15,000 = USD $20,000 por evento en unidades móviles</p>
          </div>
        </div>

        {/* VISUAL: CARGA Y DESCARGA */}
        <motion.div
          className="ra-transport-visual"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          custom={0.1}
        >
          <div className="ra-img-hover-box ra-transport-img-box">
            <img
              src={imgCargaDescarga}
              alt="Operación de carga y descarga de cilindro de gas LP con manguera de llenado industrial"
              loading="lazy"
            />
            <div className="ra-img-overlay">
              <span>Carga y Descarga · Cobertura RA + RC</span>
            </div>
          </div>
          <div className="ra-transport-text glass-effect">
            <h3>Transporte y Maniobras de Carga/Descarga</h3>
            <p>
              Las operaciones de carga y descarga de gas LP son un punto de alto riesgo
              ambiental. Un derrame o fuga durante estas maniobras puede generar contaminación
              de suelo, subsuelo y mantos acuíferos.
            </p>
            <p>
              Los costos de remediación en estos eventos pueden superar con facilidad los
              límites básicos de cobertura, dejando expuesto al permisionario.
            </p>
            <div className="ra-transport-note">
              Deducible RA en transporte: 10% del siniestro con mínimo de USD $15,000
              (equivalente a USD $20,000 por evento).
            </div>
          </div>
        </motion.div>

        {/* OPERACIÓN DE DEDUCIBLES */}
        <h3 className="ra-subsection-title center mt-4">Operación de Deducibles en Caso de Siniestro</h3>
        <div className="ra-timeline">
          <div className="ra-timeline-step glass-effect hover-glow">
            <div className="ra-step-number">1</div>
            <h4>Ocurre el Siniestro</h4>
            <p>Explosión, derrame, accidente de transporte, contaminación detectada.</p>
          </div>
          <div className="ra-timeline-step glass-effect hover-glow">
            <div className="ra-step-number">2</div>
            <h4>Notificación Inmediata</h4>
            <p>Avisar a aseguradora dentro de plazos (24-72 hrs). Retraso puede anular cobertura.</p>
          </div>
          <div className="ra-timeline-step glass-effect hover-glow">
            <div className="ra-step-number">3</div>
            <h4>Ajuste y Valuación</h4>
            <p>Aseguradora envía ajustador, valúa daños, determina cobertura aplicable.</p>
          </div>
          <div className="ra-timeline-step glass-effect hover-glow">
            <div className="ra-step-number">4</div>
            <h4>Aplicación de Deducible</h4>
            <p>Permisionario paga deducible, aseguradora cubre el excedente hasta límite.</p>
          </div>
        </div>

        {/* EJEMPLO PRÁCTICO */}
        <div className="ra-example-box glass-effect mt-4">
          <h3>Ejemplo Práctico: RA</h3>
          <ul className="ra-example-list">
            <li>
              <strong>Siniestro:</strong> Derrame en transporte requiere remediación por
              <span> USD $200,000</span>
            </li>
            <li>
              <strong>Deducible RA transporte:</strong> 10% mínimo USD $15,000 =
              <span> USD $20,000</span>
            </li>
            <li>
              <strong>Pago del permisionario:</strong>
              <span className="highlight-blue"> USD $20,000</span>
            </li>
            <li>
              <strong>Pago de aseguradora:</strong>
              <span className="highlight-green"> USD $180,000</span>
            </li>
          </ul>
          <p className="ra-example-footer">Aviso oportuno puede reducir deducible en algunos casos.</p>
        </div>
      </section>

      {/* ══════════════ CASOS REALES: EXCLUSIONES ══════════════ */}
      <section className="ra-section animate-fade-in delay-4">
        <h2 className="ra-section-title">Casos Reales: Cuando la Póliza NO Cubre</h2>
        <div className="ra-grid-3 ra-exclusions-grid">

          <div className="ra-card ra-card-exclusion glass-effect hover-glow">
            <div className="ra-exclusion-number">1</div>
            <h3>Contaminación Gradual No Declarada</h3>
            <p>Fugas lentas de tanques subterráneos detectadas años después.</p>
            <div className="ra-exclusion-alert">
              <strong>Exclusión típica:</strong> condiciones preexistentes o conocidas no reportadas.
            </div>
          </div>

          <div className="ra-card ra-card-exclusion glass-effect hover-glow">
            <div className="ra-exclusion-number">2</div>
            <h3>Incumplimiento de Normas de Seguridad</h3>
            <p>Explosión por falta de mantenimiento documentado o violación de protocolos.</p>
            <div className="ra-exclusion-alert">
              <strong>Exclusión:</strong> negligencia grave o dolo.
            </div>
          </div>

          <div className="ra-card ra-card-exclusion glass-effect hover-glow">
            <div className="ra-exclusion-number">3</div>
            <h3>Conductor No Autorizado</h3>
            <p>Accidente en transporte con operador sin licencia vigente o no adecuada.</p>
            <div className="ra-exclusion-alert">
              <strong>Exclusión:</strong> conductores no autorizados.
            </div>
          </div>

          <div className="ra-card ra-card-exclusion glass-effect hover-glow">
            <div className="ra-exclusion-number">4</div>
            <h3>Daños Punitivos o Multas</h3>
            <p>Sanciones administrativas de ASEA o CRE por incumplimiento.</p>
            <div className="ra-exclusion-alert">
              <strong>Exclusión estándar:</strong> multas, sanciones y daños punitivos.
            </div>
          </div>

          <div className="ra-card ra-card-exclusion glass-effect hover-glow">
            <div className="ra-exclusion-number">5</div>
            <h3>Tanques Subterráneos (RA)</h3>
            <p>Contaminación de suelo/agua por tanques enterrados.</p>
            <div className="ra-exclusion-alert">
              <strong>Exclusión común en RA:</strong> tanques subterráneos requieren cobertura específica.
            </div>
          </div>

          <div className="ra-card ra-card-exclusion glass-effect hover-glow">
            <div className="ra-exclusion-number">6</div>
            <h3>Reporte Tardío (Claims-Made)</h3>
            <p>En pólizas base reclamación, no reportar incidente dentro de vigencia.</p>
            <div className="ra-exclusion-alert">
              <strong>Exclusión:</strong> reclamaciones fuera de periodo de reporte.
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default SeguroAmbiental;
