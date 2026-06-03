import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft, FaShieldAlt, FaBuilding, FaTruck, FaGasPump,
  FaFire, FaIndustry, FaCheckCircle, FaTimesCircle,
  FaExclamationTriangle, FaBalanceScale, FaFileContract,
  FaHandshake, FaLock, FaAward, FaUsers, FaGlobe,
  FaWarehouse, FaTools, FaBolt, FaGavel, FaCertificate,
  FaChartLine, FaDollarSign, FaLeaf, FaFlask, FaRoute,
  FaCity, FaCar, FaHardHat, FaClipboardCheck, FaBan,
} from 'react-icons/fa';
import './SeguroResponsivo.css';
import imgPlanta from '../assets/RC_plantagaslp.jpg.jpeg';
import imgPersonas from '../assets/RC_personasplantagaslp.jpg.jpeg';
import imgTuberias from '../assets/RC_tuberiasgaslp.jpg.jpeg';
import imgQueNoCubre from '../assets/RC_quenocubrelapoliza.jpg.jpeg';
import imgCargaDescarga from '../assets/RCyRA_cargaydescarga.jpg.jpeg';

const empresas = [
  { icon: FaWarehouse, title: 'Plantas de Almacenamiento', tag: 'Gas LP' },
  { icon: FaGasPump,   title: 'Estaciones de Servicio',    tag: 'Combustibles' },
  { icon: FaBolt,      title: 'Estaciones de Carburación', tag: 'Gas vehicular' },
  { icon: FaTruck,     title: 'Autotanques y Pipas',       tag: 'Distribución' },
  { icon: FaRoute,     title: 'Transporte de Hidrocarburos', tag: 'Especializado' },
  { icon: FaFlask,     title: 'Cilindros Portátiles',      tag: 'Comercialización' },
  { icon: FaTools,     title: 'Instalación y Mantenimiento', tag: 'Equipos de gas' },
  { icon: FaIndustry,  title: 'Operaciones Industriales',  tag: 'y Comerciales' },
];

const protecciones = [
  { icon: FaUsers,         label: 'Personas',               desc: 'Lesiones corporales a terceros' },
  { icon: FaBuilding,      label: 'Bienes Materiales',       desc: 'Daños a propiedad ajena' },
  { icon: FaIndustry,      label: 'Instalaciones',           desc: 'Plantas y equipos industriales' },
  { icon: FaCity,          label: 'Propiedades Vecinas',     desc: 'Inmuebles colindantes' },
  { icon: FaBalanceScale,  label: 'Daños Morales',           desc: 'Perjuicios no materiales' },
  { icon: FaTruck,         label: 'Carga y Descarga',        desc: 'Maniobras operativas' },
  { icon: FaRoute,         label: 'Productos Transportados', desc: 'Durante traslado' },
  { icon: FaLeaf,          label: 'Contaminación Accidental',desc: 'Eventos súbitos' },
  { icon: FaGasPump,       label: 'Autotanques y Estaciones',desc: 'Operaciones completas' },
];

const coberturas = [
  { num: '01', icon: FaShieldAlt,   title: 'RC de Operación',              desc: 'Protección por daños derivados de las actividades normales del negocio.' },
  { num: '02', icon: FaTruck,       title: 'RC por Carga y Descarga',      desc: 'Cobertura para accidentes durante maniobras operativas.' },
  { num: '03', icon: FaLeaf,        title: 'Contaminación Súbita y Accidental', desc: 'Protección frente a eventos ambientales repentinos.' },
  { num: '04', icon: FaRoute,       title: 'RC por Transporte',            desc: 'Daños ocasionados por carga transportada.' },
  { num: '05', icon: FaCar,         title: 'RC Vehicular en Exceso',       desc: 'Cobertura complementaria para flotillas.' },
  { num: '06', icon: FaHandshake,   title: 'RC Cruzada',                   desc: 'Protección entre empresas relacionadas.' },
  { num: '07', icon: FaBuilding,    title: 'RC Arrendatario',              desc: 'Protección a inmuebles arrendados.' },
  { num: '08', icon: FaTools,       title: 'Trabajos Terminados',          desc: 'Cobertura por daños derivados de trabajos ya ejecutados.' },
];

const normativo = [
  { icon: FaCertificate,   label: 'Permisos CRE',                 desc: 'Comisión Reguladora de Energía' },
  { icon: FaLeaf,          label: 'Regulaciones ASEA',            desc: 'Agencia de Seguridad Energética' },
  { icon: FaFileContract,  label: 'Normas Oficiales Mexicanas',   desc: 'NOM aplicables al sector' },
  { icon: FaTruck,         label: 'Transporte y Expendio',        desc: 'Obligaciones operativas federales' },
  { icon: FaHandshake,     label: 'Contratos Gaseros',            desc: 'Grupos y concesionarios' },
];

const prevencion = [
  { icon: FaHardHat,       label: 'Capacitación Constante' },
  { icon: FaClipboardCheck,label: 'Protocolos Técnicos' },
  { icon: FaExclamationTriangle, label: 'Señalización Preventiva' },
  { icon: FaBan,           label: 'Prohibición de Fumar' },
  { icon: FaCheckCircle,   label: 'Cumplimiento de Normas Industriales' },
];

const exclusiones = [
  { label: 'Contaminación Gradual',              desc: 'Procesos lentos y progresivos no cubiertos.' },
  { label: 'Actos Intencionales',                desc: 'Daños causados deliberadamente.' },
  { label: 'Guerra o Terrorismo',                desc: 'Eventos de fuerza mayor o conflicto armado.' },
  { label: 'Responsabilidad Profesional',        desc: 'Errores en asesoría o servicios especializados.' },
  { label: 'Fallas Deliberadas',                 desc: 'Negligencia grave comprobada.' },
  { label: 'Daños Cibernéticos',                 desc: 'Ataques informáticos o fallas digitales.' },
  { label: 'Multas Administrativas',             desc: 'Sanciones de autoridades regulatorias.' },
  { label: 'Operaciones Fuera del Giro',         desc: 'Actividades no declaradas en la póliza.' },
  { label: 'Incumplimiento Deliberado de Normas',desc: 'Violación intencional de regulaciones.' },
];

const beneficios = [
  { icon: FaDollarSign,  title: 'Protección Financiera',    desc: 'Resguarda el patrimonio empresarial ante reclamaciones mayores.' },
  { icon: FaCertificate, title: 'Cumplimiento Regulatorio', desc: 'Satisface requisitos de CRE, ASEA y normativas federales.' },
  { icon: FaHandshake,   title: 'Confianza Comercial',      desc: 'Fortalece relaciones con clientes, socios y proveedores.' },
  { icon: FaGlobe,       title: 'Cobertura Adaptable',      desc: 'Ajustable a operaciones locales, regionales o nacionales.' },
  { icon: FaGavel,       title: 'Protección Jurídica',      desc: 'Incluye defensa legal y pago de fianzas.' },
];

const sectores = [
  { icon: FaFire,      label: 'Empresas Gaseras' },
  { icon: FaGasPump,   label: 'Distribuidores de Gas LP' },
  { icon: FaTruck,     label: 'Transportistas Especializados' },
  { icon: FaBolt,      label: 'Estaciones de Carburación' },
  { icon: FaChartLine, label: 'Comercializadores' },
  { icon: FaRoute,     label: 'Operadores Logísticos Energéticos' },
  { icon: FaIndustry,  label: 'Empresas Industriales' },
];

const finalPills = [
  { icon: FaLock,      label: 'Protección Patrimonial' },
  { icon: FaChartLine, label: 'Capacidad Financiera' },
  { icon: FaHardHat,   label: 'Responsabilidad Operativa' },
  { icon: FaAward,     label: 'Confianza ante Autoridades' },
];

const imgReveal = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const SeguroResponsivo = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('sr-visible');
        });
      },
      { threshold: 0.07 }
    );
    document.querySelectorAll('.sr-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sr-wrapper">

      <Link to="/" className="back-home-btn">
        <FaArrowLeft />
        <span>Inicio</span>
      </Link>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="sr-hero">
        <div className="sr-hero-bg">
          <div className="sr-orb sr-orb-1" />
          <div className="sr-orb sr-orb-2" />
          <div className="sr-orb sr-orb-3" />
        </div>

        <div className="sr-hero-inner">
          <div className="sr-hero-content sr-reveal">
            <div className="sr-hero-badge">
              <FaShieldAlt />
              <span>Seguro Especializado · Sector Energético</span>
            </div>

            <h1 className="sr-hero-title">
              Seguro de Responsabilidad Civil para
              <span className="sr-glow-text"> Gas LP e Hidrocarburos</span>
            </h1>

            <p className="sr-hero-subtitle">
              Protección integral para plantas, estaciones, autotanques y transporte especializado.
            </p>

            <div className="sr-hero-card glass-card">
              <div className="sr-hero-card-icon">
                <FaShieldAlt />
              </div>
              <div>
                <h3>Protección financiera y cumplimiento regulatorio</h3>
                <p>para operaciones energéticas en México.</p>
              </div>
            </div>
          </div>

          <motion.div
            className="sr-hero-image-col"
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.45 }}
          >
            <div className="sr-img-hover-box sr-hero-img-wrap">
              <img
                src={imgPlanta}
                alt="Planta de almacenamiento de Gas LP (LPG) con tanque de alta capacidad y sistema de tuberías"
                loading="eager"
              />
              <div className="sr-img-overlay">
                <span>Planta Gas LP · Cobertura RC</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="sr-hero-scroll-hint">
          <span />
        </div>
      </section>

      {/* ══════════════════════ INTRODUCCIÓN ══════════════════════ */}
      <section className="sr-section sr-reveal">
        <div className="sr-section-label">Qué es</div>
        <h2 className="sr-section-title">El Seguro de RC para Gas LP e Hidrocarburos</h2>
        <p className="sr-section-subtitle">
          Protege económicamente a las compañías frente a daños ocasionados a terceros
          durante operaciones en toda la cadena energética.
        </p>

        <div className="sr-intro-ops-grid">
          {[
            { icon: FaWarehouse, label: 'Almacenamiento' },
            { icon: FaTruck,     label: 'Distribución' },
            { icon: FaRoute,     label: 'Transporte' },
            { icon: FaGasPump,   label: 'Expendio de Combustibles' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="sr-intro-op-card glass-card">
              <div className="sr-intro-op-icon"><Icon /></div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="sr-intro-highlights glass-card sr-reveal">
          <div className="sr-intro-hl-item">
            <div className="sr-hl-icon-wrap"><FaCertificate /></div>
            <div>
              <strong>Cumplimiento regulatorio obligatorio</strong>
              <p>Satisface disposiciones federales y permisos operativos en México.</p>
            </div>
          </div>
          <div className="sr-intro-hl-divider" />
          <div className="sr-intro-hl-item">
            <div className="sr-hl-icon-wrap"><FaTruck /></div>
            <div>
              <strong>Transporte y expendio de hidrocarburos</strong>
              <p>Clave para operaciones seguras en toda la cadena de suministro.</p>
            </div>
          </div>
          <div className="sr-intro-hl-divider" />
          <div className="sr-intro-hl-item">
            <div className="sr-hl-icon-wrap"><FaFileContract /></div>
            <div>
              <strong>Permisos y concesiones vigentes</strong>
              <p>Condición frecuente para mantener autorizaciones ante autoridades.</p>
            </div>
          </div>
        </div>

        {/* BANNER: INFRAESTRUCTURA DE TUBERÍAS */}
        <motion.div
          className="sr-infra-banner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-70px' }}
          variants={imgReveal}
        >
          <div className="sr-img-hover-box sr-infra-img-box">
            <img
              src={imgTuberias}
              alt="Sistema de tuberías amarillas de gas LP con válvulas industriales en planta de distribución"
              loading="lazy"
            />
            <div className="sr-img-overlay">
              <span>Infraestructura Gas LP · Riesgo Asegurado</span>
            </div>
          </div>
          <div className="sr-infra-overlay" />
          <div className="sr-infra-content">
            <span className="sr-infra-label">Infraestructura Asegurada</span>
            <h3>Tuberías, válvulas y sistemas de distribución: activos de alto riesgo bajo cobertura RC</h3>
            <p>Fallas en infraestructura de gas LP pueden generar daños a terceros de millones de pesos en segundos.</p>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════ EMPRESAS ══════════════════════ */}
      <section className="sr-section sr-bg-alt">
        <div className="sr-reveal">
          <div className="sr-section-label">Dirigido a</div>
          <h2 className="sr-section-title">¿Qué Empresas Necesitan Este Seguro?</h2>
        </div>

        <div className="sr-grid-4">
          {empresas.map(({ icon: Icon, title, tag }) => (
            <div key={title} className="sr-empresa-card glass-card sr-reveal">
              <div className="sr-empresa-icon-wrap"><Icon /></div>
              <h4>{title}</h4>
              <span className="sr-card-tag">{tag}</span>
            </div>
          ))}
        </div>

        <div className="sr-adapt-note glass-card sr-reveal">
          <FaGlobe className="sr-adapt-icon" />
          <p>
            La cobertura puede adaptarse a operaciones{' '}
            <strong>locales, regionales o nacionales.</strong>
          </p>
        </div>

        {/* FEATURE: TRABAJADORES EN PLANTA */}
        <motion.div
          className="sr-img-feature-row sr-reveal"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={imgReveal}
        >
          <div className="sr-img-hover-box sr-feature-img-box">
            <img
              src={imgPersonas}
              alt="Tres ingenieros con equipo de seguridad industrial revisando documentación en planta de gas"
              loading="lazy"
            />
            <div className="sr-img-overlay">
              <span>Personal Operativo · Protegido por RC</span>
            </div>
          </div>
          <div className="sr-feature-text-col">
            <span className="sr-feature-label">Personas en Operación</span>
            <h3 className="sr-feature-title">
              Tu equipo opera en entornos de alto riesgo. El RC protege a terceros ante cualquier incidente.
            </h3>
            <p className="sr-feature-body">
              Ingenieros, técnicos y operadores trabajan día a día en instalaciones de gas LP.
              Cualquier accidente que afecte a terceros —personas o propiedades— activa la
              cobertura del Seguro de Responsabilidad Civil.
            </p>
            <div className="sr-feature-pills">
              <span className="sr-feature-pill">Lesiones corporales</span>
              <span className="sr-feature-pill">Daños a propiedades</span>
              <span className="sr-feature-pill">Responsabilidad patronal</span>
              <span className="sr-feature-pill">Defensa jurídica</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════ QUÉ PROTEGE ══════════════════════ */}
      <section className="sr-section sr-reveal">
        <div className="sr-section-label">Alcance</div>
        <h2 className="sr-section-title">¿Qué Protege el Seguro?</h2>

        <div className="sr-grid-3">
          {protecciones.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="sr-protection-card glass-card sr-reveal">
              <div className="sr-protection-icon"><Icon /></div>
              <div>
                <h4>{label}</h4>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sr-legal-card glass-card sr-reveal">
          <div className="sr-legal-icon-wrap"><FaGavel /></div>
          <div>
            <h3>Defensa Jurídica Incluida</h3>
            <p>
              Incluye gastos de defensa jurídica y pago de fianzas relacionadas
              con reclamaciones cubiertas.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════ COBERTURAS ══════════════════════ */}
      <section className="sr-section sr-bg-alt">
        <div className="sr-reveal">
          <div className="sr-section-label">Detalle</div>
          <h2 className="sr-section-title">Coberturas Más Importantes</h2>
        </div>

        <div className="sr-grid-4">
          {coberturas.map(({ num, icon: Icon, title, desc }) => (
            <div key={num} className="sr-coverage-card glass-card sr-reveal">
              <span className="sr-coverage-num">{num}</span>
              <div className="sr-coverage-icon-wrap"><Icon /></div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>

        {/* VISUAL: CARGA Y DESCARGA */}
        <motion.div
          className="sr-coverage-img-block sr-reveal"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={imgReveal}
        >
          <div className="sr-coverage-img-text">
            <span className="sr-section-label" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              Cobertura 02
            </span>
            <h3>RC por Carga y Descarga de Gas LP</h3>
            <p>
              Las maniobras de carga y descarga son momentos críticos de alta exposición.
              La cobertura RC protege al operador y a la empresa ante daños a terceros,
              infraestructura o personas durante estas operaciones.
            </p>
            <p>
              Esta cobertura aplica tanto en instalaciones fijas como en operaciones
              móviles de autotanques y pipas.
            </p>
          </div>
          <div className="sr-img-hover-box sr-coverage-img-box">
            <img
              src={imgCargaDescarga}
              alt="Manguera de llenado conectada a válvula de cilindro de gas LP durante operación de carga"
              loading="lazy"
            />
            <div className="sr-img-overlay">
              <span>Carga y Descarga · RC + RA</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════ NORMATIVO ══════════════════════ */}
      <section className="sr-section sr-reveal">
        <div className="sr-section-label">Regulación</div>
        <h2 className="sr-section-title">Cumplimiento Normativo y Regulatorio</h2>

        <div className="sr-norm-grid">
          {normativo.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="sr-norm-card glass-card sr-reveal">
              <div className="sr-norm-icon"><Icon /></div>
              <div>
                <h4>{label}</h4>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sr-prevention-block sr-reveal">
          <h3 className="sr-prevention-title">
            <FaClipboardCheck className="sr-prev-title-icon" />
            Medidas Obligatorias de Prevención
          </h3>
          <div className="sr-prevention-grid">
            {prevencion.map(({ icon: Icon, label }) => (
              <div key={label} className="sr-prev-item glass-card">
                <Icon className="sr-prev-icon" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ EXCLUSIONES ══════════════════════ */}
      <section className="sr-section sr-bg-alt sr-reveal">
        <div className="sr-section-label sr-label-danger">Importante</div>
        <h2 className="sr-section-title">¿Qué No Cubre Normalmente?</h2>

        {/* VISUAL CONTEXTUAL: OPERACIÓN NO CUBIERTA */}
        <motion.div
          className="sr-excl-image-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={imgReveal}
        >
          <div className="sr-img-hover-box sr-excl-img-box">
            <img
              src={imgQueNoCubre}
              alt="Persona manipulando cilindros de gas LP en la vía pública sin equipo de seguridad reglamentario"
              loading="lazy"
            />
            <div className="sr-img-overlay">
              <span>Operación sin protocolo</span>
            </div>
          </div>
          <div className="sr-excl-context">
            <span className="sr-excl-context-badge">Exclusión Común</span>
            <h3>Operaciones no declaradas o fuera de norma</h3>
            <p>
              El manejo informal de cilindros fuera de instalaciones autorizadas, sin equipo
              de protección y sin documentación en regla, representa una de las exclusiones
              más frecuentes en pólizas de RC para gas LP.
            </p>
            <p>
              La póliza protege operaciones <strong style={{ color: '#fff' }}>declaradas y
              apegadas a las NOM</strong>. Actividades fuera del giro o en incumplimiento
              deliberado de normas no están cubiertas.
            </p>
          </div>
        </motion.div>

        <div className="sr-grid-3" style={{ marginTop: '2rem' }}>
          {exclusiones.map(({ label, desc }) => (
            <div key={label} className="sr-excl-card glass-card sr-reveal">
              <div className="sr-excl-header">
                <FaTimesCircle className="sr-excl-x" />
                <span className="sr-badge-excl">Exclusión</span>
              </div>
              <h4>{label}</h4>
              <p>{desc}</p>
              <span className="sr-badge-review">Revisar póliza</span>
            </div>
          ))}
        </div>

        <div className="sr-excl-warning sr-reveal">
          <FaExclamationTriangle className="sr-warn-icon" />
          <p>
            <strong>Importante:</strong> Consulta siempre con tu asesor las condiciones
            particulares de tu póliza antes de contratar.
          </p>
        </div>
      </section>

      {/* ══════════════════════ BENEFICIOS ══════════════════════ */}
      <section className="sr-section sr-reveal">
        <div className="sr-section-label">Ventajas</div>
        <h2 className="sr-section-title">Beneficios para Tu Empresa</h2>

        <div className="sr-benefits-grid">
          {beneficios.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="sr-benefit-card glass-card sr-reveal">
              <div className="sr-benefit-icon"><Icon /></div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ SECTORES ══════════════════════ */}
      <section className="sr-section sr-bg-alt sr-reveal">
        <div className="sr-section-label">Industria</div>
        <h2 className="sr-section-title">Sectores que Comúnmente lo Contratan</h2>

        <div className="sr-sectors-grid">
          {sectores.map(({ icon: Icon, label }) => (
            <div key={label} className="sr-sector-card glass-card sr-reveal">
              <div className="sr-sector-icon-wrap"><Icon /></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ FINAL ══════════════════════ */}
      <section className="sr-final-section">
        <div className="sr-final-bg">
          <div className="sr-orb sr-orb-f1" />
          <div className="sr-orb sr-orb-f2" />
        </div>

        <div className="sr-final-content">
          <div className="sr-section-label sr-reveal">Perspectiva</div>
          <h2 className="sr-final-title sr-reveal">
            Importancia Actual del Seguro en México
          </h2>
          <p className="sr-final-body sr-reveal">
            Con el crecimiento del sector energético y el fortalecimiento de la regulación
            industrial y ambiental en México, el Seguro de Responsabilidad Civil se ha
            convertido en una <strong>herramienta indispensable</strong> para empresas del
            sector hidrocarburos y Gas LP.
          </p>

          <div className="sr-final-pills sr-reveal">
            {finalPills.map(({ icon: Icon, label }) => (
              <div key={label} className="sr-final-pill glass-card">
                <Icon />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="sr-final-cta glass-card sr-reveal">
            <FaShieldAlt className="sr-final-cta-icon" />
            <div>
              <h3>Protección estratégica para operaciones energéticas modernas.</h3>
              <p>Contáctanos y adapta tu cobertura a las necesidades reales de tu operación.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SeguroResponsivo;
