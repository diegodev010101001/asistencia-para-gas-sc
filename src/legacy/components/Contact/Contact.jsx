'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.css';

const vp = { once: true, margin: '-40px' };

const INFO_ITEMS = [
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: '+52 (444) 000-0000',
    href:  'https://wa.me/524440000000',
  },
  {
    icon: FiMail,
    label: 'Correo electrónico',
    value: 'contacto@asistenciaparagas.mx',
    href:  'mailto:contacto@asistenciaparagas.mx',
  },
  {
    icon: FiMapPin,
    label: 'Sede',
    value: 'San Luis Potosí, México',
    href:  null,
  },
];

const INITIAL = { nombre: '', correo: '', empresa: '', motivo: '' };

const Contact = () => {
  const [form,    setForm]    = useState(INITIAL);
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error

  const handleChange = ({ target: { name, value } }) =>
    setForm(prev => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        form,
        'YOUR_PUBLIC_KEY',
      );
      setStatus('success');
      setForm(INITIAL);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact section" id="contacto" aria-label="Contacto">
      <div className="contact-inner">

        {/* ─── Left — form ──────────────────────────────── */}
        <motion.div
          className="contact-form-col"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="eyebrow">Contacto</p>
          <h2 className="section-title contact-title">
            Solicita tu cotización<br />sin costo
          </h2>
          <p className="contact-lead">
            Cuéntanos sobre tu operación y te enviamos una propuesta
            personalizada en menos de 48 horas.
          </p>

          {status === 'success' ? (
            <div className="contact-success" role="alert">
              <FiCheckCircle size={28} />
              <div>
                <strong>Mensaje enviado</strong>
                <p>Te contactaremos en menos de 48 horas hábiles.</p>
              </div>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Formulario de contacto"
            >
              <div className="contact-row">
                <div className="contact-field">
                  <label htmlFor="cf-nombre" className="field-label">Nombre *</label>
                  <input
                    id="cf-nombre"
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre completo"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className="field-input"
                    autoComplete="name"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="cf-correo" className="field-label">Correo electrónico *</label>
                  <input
                    id="cf-correo"
                    type="email"
                    name="correo"
                    placeholder="tu@empresa.mx"
                    value={form.correo}
                    onChange={handleChange}
                    required
                    className="field-input"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="cf-empresa" className="field-label">Empresa</label>
                <input
                  id="cf-empresa"
                  type="text"
                  name="empresa"
                  placeholder="Nombre de tu empresa u operación"
                  value={form.empresa}
                  onChange={handleChange}
                  className="field-input"
                  autoComplete="organization"
                />
              </div>

              <div className="contact-field">
                <label htmlFor="cf-motivo" className="field-label">Mensaje *</label>
                <textarea
                  id="cf-motivo"
                  name="motivo"
                  placeholder="Describe tu operación: tipo de actividad, ubicación, flota, capacidad de almacenamiento…"
                  value={form.motivo}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="field-input field-textarea"
                />
              </div>

              {status === 'error' && (
                <div className="contact-error" role="alert">
                  <FiAlertCircle size={16} />
                  <span>Ocurrió un error. Intenta de nuevo o escríbenos por WhatsApp.</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary contact-submit"
                disabled={status === 'loading'}
                aria-busy={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span className="contact-spinner" aria-hidden="true" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <FiSend size={15} aria-hidden="true" />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* ─── Right — info ──────────────────────────────── */}
        <motion.div
          className="contact-info-col"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        >
          <div className="contact-info-card glass-card">
            <h3 className="contact-info-title">Información de contacto</h3>

            <div className="contact-info-items">
              {INFO_ITEMS.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="contact-info-item">
                  <div className="contact-info-icon">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="contact-info-label">{label}</span>
                    {href ? (
                      <a href={href} className="contact-info-value" target="_blank" rel="noopener noreferrer">
                        {value}
                      </a>
                    ) : (
                      <span className="contact-info-value">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-hours">
              <p className="contact-hours-title">Horario de atención</p>
              <p>Lunes – Viernes: 9:00 a 18:00 CST</p>
            </div>

            <div className="contact-response">
              <div className="contact-response-dot" aria-hidden="true" />
              <p>Respuesta garantizada en menos de <strong>48 horas hábiles</strong></p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
