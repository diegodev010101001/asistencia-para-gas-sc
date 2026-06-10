import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import './FAQ.css';

const vp = { once: true, margin: '-40px' };

const FAQS = [
  {
    q: '¿Qué tipo de empresas pueden contratar estos seguros?',
    a: 'Cualquier empresa dentro de la cadena energética: plantas de almacenamiento de Gas LP, estaciones de servicio, distribuidoras, transportistas especializados, estaciones de carburación, operadores logísticos y empresas industriales con operaciones en hidrocarburos.',
  },
  {
    q: '¿Cuál es la diferencia entre el Seguro de Responsabilidad Civil y el Seguro Ambiental?',
    a: 'El Seguro de Responsabilidad Civil (RC) cubre daños a terceros —personas y propiedades— producto de la operación normal de tu empresa. El Seguro Ambiental (RA) cubre específicamente los costos de remediación, limpieza y restauración ambiental por contaminación de suelo o agua, incluyendo eventos graduales.',
  },
  {
    q: '¿La cotización tiene algún costo?',
    a: 'No. La cotización es completamente gratuita y personalizada a la operación específica de tu empresa. Contáctanos con los detalles de tu actividad y te preparamos una propuesta sin compromiso.',
  },
  {
    q: '¿Los seguros cumplen con los requisitos de CNE y ASEA?',
    a: 'Sí. Nuestras pólizas están diseñadas para satisfacer las disposiciones regulatorias de la Comisión Nacional de Energía (CNE), la Agencia de Seguridad Energética Ambiental y Nuclear (ASEA) y las Normas Oficiales Mexicanas aplicables al sector hidrocarburos.',
  },
  {
    q: '¿Cuánto tiempo tarda en emitirse una póliza?',
    a: 'El tiempo de emisión depende del perfil de riesgo. Operaciones estándar pueden tener una póliza emitida en 3 a 7 días hábiles. Para riesgos complejos o de alta capacidad, el proceso puede tomar hasta 15 días hábiles, incluyendo análisis técnico y aceptación por parte de aseguradora.',
  },
];

const FAQ = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="faq section section--alt" id="faq" aria-label="Preguntas frecuentes">
      <div className="faq-inner">

        <div className="faq-header">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6 }}
          >
            FAQ
          </motion.p>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Preguntas frecuentes
          </motion.h2>

          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.14 }}
          >
            Todo lo que necesitas saber antes de cotizar.
          </motion.p>
        </div>

        <div className="faq-list" role="list">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = active === i;
            return (
              <motion.div
                key={i}
                className={`faq-item${isOpen ? ' faq-item--open' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                role="listitem"
              >
                <button
                  className="faq-trigger"
                  onClick={() => setActive(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="faq-num">0{i + 1}</span>
                  <span className="faq-question">{q}</span>
                  <span className="faq-icon" aria-hidden="true">
                    {isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      className="faq-answer"
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="faq-answer-inner">
                        <p>{a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="faq-cta-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>¿Tienes otra pregunta?</p>
          <a href="#contacto" className="btn btn-ghost">
            Contáctanos directamente
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;
