import { motion } from 'framer-motion';
import imgPersonas from '../../assets/RC_personasplantagaslp.jpg.jpeg';
import './About.css';

const vp = { once: true, margin: '-60px' };
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: vp,
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

const STATS = [
  { value: '10+',  label: 'Años de trayectoria',          accent: false },
  { value: '500+', label: 'Empresas protegidas',           accent: true  },
  { value: '100%', label: 'Especialización energética',    accent: false },
];

const About = () => (
  <section className="about section section--alt" id="nosotros" aria-label="Sobre nosotros">
    <div className="about-inner">

      {/* ─── Left — text ────────────────────────────────── */}
      <div className="about-text-col">
        <motion.p className="eyebrow" {...fadeUp(0)}>Sobre Nosotros</motion.p>

        <motion.h2 className="section-title" {...fadeUp(0.08)}>
          Protegemos lo que mueve a México
        </motion.h2>

        <motion.p className="about-body" {...fadeUp(0.14)}>
          En <strong>ASISTENCIA PARA GAS SC</strong> diseñamos soluciones aseguradoras
          especializadas para la cadena energética: desde plantas de almacenamiento
          y autotanques hasta operaciones de transporte y comercialización de gas LP e
          hidrocarburos.
        </motion.p>

        <motion.p className="about-body" {...fadeUp(0.2)}>
          Nuestra misión es reducir la exposición al riesgo de nuestros clientes con
          coberturas construidas para entornos de alta exigencia operativa,
          garantizando continuidad, cumplimiento regulatorio y tranquilidad financiera.
        </motion.p>

        <motion.div className="about-value-row" {...fadeUp(0.26)}>
          <div className="about-value-item">
            <span className="about-value-dot" aria-hidden="true" />
            <span>Responsabilidad civil y ambiental</span>
          </div>
          <div className="about-value-item">
            <span className="about-value-dot" aria-hidden="true" />
            <span>Cumplimiento CNE y ASEA</span>
          </div>
          <div className="about-value-item">
            <span className="about-value-dot" aria-hidden="true" />
            <span>Cobertura local, regional y nacional</span>
          </div>
        </motion.div>
      </div>

      {/* ─── Right — stats + image ───────────────────── */}
      <div className="about-visual-col">

        <motion.div className="about-stats" {...fadeUp(0.1)}>
          {STATS.map(({ value, label, accent }) => (
            <div
              key={label}
              className={`about-stat-card glass-card${accent ? ' about-stat-card--accent' : ''}`}
            >
              <strong className="about-stat-value">{value}</strong>
              <span className="about-stat-label">{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="about-image-wrap"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.16 }}
        >
          <img
            src={imgPersonas}
            alt="Ingenieros con equipo de seguridad industrial en planta de gas LP"
            className="about-image"
            loading="lazy"
          />
          <div className="about-image-badge" aria-hidden="true">
            <span>Equipo técnico especializado</span>
          </div>
        </motion.div>

      </div>

    </div>
  </section>
);

export default About;
