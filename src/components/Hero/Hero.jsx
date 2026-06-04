import { motion } from 'framer-motion';
import { FiArrowRight, FiShield } from 'react-icons/fi';
import imgPlanta from '../../assets/RC_plantagaslp.jpg.jpeg';
import './Hero.css';

const ease = [0.25, 0.46, 0.45, 0.94];

const fadeSlideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, ease, delay },
});

const STATS = [
  { value: '500+', label: 'Empresas protegidas' },
  { value: '10+',  label: 'Años de experiencia' },
  { value: '3',    label: 'Seguros especializados' },
];

const Hero = () => (
  <section className="hero noise-overlay" id="inicio" aria-label="Portada principal">

    {/* Ambient background orbs */}
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-orb hero-orb--a" />
      <div className="hero-orb hero-orb--b" />
      <div className="hero-grid" />
    </div>

    <div className="hero-inner">

      {/* ─── Left column ──────────────────────────────── */}
      <div className="hero-content">

        <motion.div className="hero-badge" {...fadeSlideUp(0)}>
          <FiShield size={13} />
          <span>Especialistas en el Sector Energético</span>
        </motion.div>

        <motion.h1 className="hero-heading" {...fadeSlideUp(0.1)}>
          Protección inteligente para la industria del{' '}
          <span className="gradient-text">gas</span>
        </motion.h1>

        <motion.p className="hero-subheading" {...fadeSlideUp(0.18)}>
          Soluciones aseguradoras de alto nivel para plantas, autotanques,
          transporte y operaciones energéticas en México.
        </motion.p>

        <motion.div className="hero-actions" {...fadeSlideUp(0.26)}>
          <a href="#contacto" className="btn btn-primary">
            Solicitar Cotización
            <FiArrowRight size={16} />
          </a>
          <a href="#servicios" className="btn btn-ghost">
            Ver Seguros
          </a>
        </motion.div>

        <motion.div className="hero-stats" {...fadeSlideUp(0.34)}>
          {STATS.map(({ value, label }, i) => (
            <div key={label} className="hero-stat">
              {i > 0 && <div className="hero-stat-divider" aria-hidden="true" />}
              <strong className="hero-stat-value">{value}</strong>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ─── Right column — image ──────────────────── */}
      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, x: 48, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
      >
        <div className="hero-image-frame">
          <img
            src={imgPlanta}
            alt="Planta de almacenamiento de Gas LP con sistema de tuberías industriales asegurada por responsabilidad civil"
            className="hero-image"
            loading="eager"
          />
          <div className="hero-image-overlay" aria-hidden="true" />

          <div className="hero-floating-chip" aria-label="Regulación CRE y ASEA">
            <div className="hero-chip-dot" aria-hidden="true" />
            <div>
              <div className="hero-chip-title">CRE · ASEA</div>
              <div className="hero-chip-sub">Cumplimiento regulatorio</div>
            </div>
          </div>
        </div>

        <div className="hero-corner-label" aria-hidden="true">
          Cobertura RC Especializada
        </div>
      </motion.div>

    </div>

    {/* Scroll hint */}
    <div className="hero-scroll-hint" aria-hidden="true">
      <span className="hero-scroll-line" />
    </div>

  </section>
);

export default Hero;
