import { motion } from 'framer-motion';
import { FiArrowRight, FiShield } from 'react-icons/fi';
import imgTanque from '../../assets/tanque.png';
import './Hero.css';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease, delay },
});

const STATS = [
  { value: '500+', label: 'Empresas\nprotegidas' },
  { value: '10+',  label: 'Años de\nexperiencia' },
  { value: '3',    label: 'Seguros\nespecializados' },
];

const Hero = () => (
  <section className="hero" id="inicio" aria-label="Portada principal">

    {/* ─── Background ─────────────────────────────── */}
    <div className="hero-bg" aria-hidden="true">
      <img
        src={imgTanque}
        alt=""
        className="hero-bg-img"
        loading="eager"
      />
      <div className="hero-vignette" />
      <div className="hero-noise" />
    </div>

    {/* ─── Compliance badge (top-right) ────────────── */}
    <motion.div
      className="hero-compliance"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.7 }}
      aria-label="Cumplimiento CNE y ASEA"
    >
      <span className="hero-compliance-dot" aria-hidden="true" />
      <div>
        <p className="hero-compliance-title">CNE · ASEA</p>
        <p className="hero-compliance-sub">Cumplimiento regulatorio</p>
      </div>
    </motion.div>

    {/* ─── Main content (bottom-left) ──────────────── */}
    <div className="hero-body">

      <motion.div className="hero-eyebrow" {...fadeUp(0)}>
        <FiShield size={11} aria-hidden="true" />
        <span>Especialistas en el Sector Energético</span>
      </motion.div>

      <motion.h1 className="hero-title" {...fadeUp(0.08)}>
        Protección inteligente<br />
        para la industria del{' '}
        <span className="hero-accent">GAS LP</span>
      </motion.h1>

      <motion.span className="hero-rule" {...fadeUp(0.15)} aria-hidden="true" />

      <motion.p className="hero-sub" {...fadeUp(0.21)}>
        Soluciones aseguradoras de alto nivel para plantas, autotanques,
        transporte y operaciones energéticas en México.
      </motion.p>

      <motion.div className="hero-cta" {...fadeUp(0.28)}>
        <a href="#contacto" className="hero-btn-primary">
          Solicitar Cotización
          <FiArrowRight size={15} aria-hidden="true" />
        </a>
        <a href="#servicios" className="hero-btn-ghost">
          Ver Seguros
        </a>
      </motion.div>

      <motion.div className="hero-metrics" {...fadeUp(0.35)}>
        {STATS.map(({ value, label }, i) => (
          <div key={value} className="hero-metric">
            {i > 0 && <div className="hero-metric-sep" aria-hidden="true" />}
            <strong className="hero-metric-val">{value}</strong>
            <span className="hero-metric-label">{label}</span>
          </div>
        ))}
      </motion.div>

    </div>

    {/* ─── Scroll indicator ────────────────────────── */}
    <div className="hero-scroll" aria-hidden="true">
      <span className="hero-scroll-line" />
    </div>

  </section>
);

export default Hero;
