import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShield, FiDroplet, FiActivity, FiArrowRight } from 'react-icons/fi';
import './Services.css';

const vp = { once: true, margin: '-50px' };

const SERVICES = [
  {
    num:   '01',
    icon:  FiShield,
    title: 'Seguro de Responsabilidad Civil',
    desc:  'Protección integral ante daños a terceros —personas, propiedades e instalaciones— durante toda la cadena de operación del gas LP e hidrocarburos.',
    href:  '/seguro-responsivo',
    tags:  ['RC Operación', 'Carga y Descarga', 'Transporte'],
  },
  {
    num:   '02',
    icon:  FiDroplet,
    title: 'Seguro de Responsabilidad Ambiental',
    desc:  'Cobertura para remediación, contención y restauración ambiental ante derrames, fugas y contaminación de suelo o agua en operaciones energéticas.',
    href:  '/seguro-ambiental',
    tags:  ['Remediación', 'Contaminación Gradual', 'Claims-Made'],
  },
  {
    num:   '03',
    icon:  FiActivity,
    title: 'Seguro de Gastos Médicos Mayores',
    desc:  'Cobertura médica para trabajadores expuestos a riesgos industriales, incluyendo accidentes en instalaciones de gas, transporte y operaciones de campo.',
    href:  '/gastos-medicos',
    tags:  ['Accidentes Laborales', 'Hospitalización', 'Rehabilitación'],
  },
];

const Services = () => (
  <section className="services section" id="servicios" aria-label="Nuestros seguros">
    <div className="services-inner">

      <div className="services-header">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6 }}
        >
          Nuestros Seguros
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          Coberturas para cada riesgo<br />del sector energético
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.14 }}
        >
          Tres soluciones complementarias que protegen personas, patrimonio y
          medio ambiente en toda la operación.
        </motion.p>
      </div>

      <div className="services-grid">
        {SERVICES.map(({ num, icon: Icon, title, desc, href, tags }, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link to={href} className="service-card" aria-label={`Ver ${title}`}>

              <div className="service-card-top">
                <span className="service-num">{num}</span>
                <div className="service-icon-wrap">
                  <Icon size={22} aria-hidden="true" />
                </div>
              </div>

              <h3 className="service-title">{title}</h3>
              <p className="service-desc">{desc}</p>

              <div className="service-tags">
                {tags.map(tag => (
                  <span key={tag} className="service-tag">{tag}</span>
                ))}
              </div>

              <div className="service-cta">
                <span>Ver detalles</span>
                <FiArrowRight size={15} className="service-arrow" aria-hidden="true" />
              </div>

            </Link>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default Services;
