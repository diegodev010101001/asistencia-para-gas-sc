'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import './GastosMedicos.css';
import {
  FiArrowLeft, FiActivity, FiHeart, FiShield,
  FiTruck, FiAlertCircle, FiUser,
} from 'react-icons/fi';
import './GastosMedicos.css';

const vp = { once: true, margin: '-50px' };
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: vp,
  transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

const COVERAGES = [
  {
    icon: FiHeart,
    title: 'Atención Médica Inmediata',
    desc:  'Cobertura de gastos de urgencias médicas, hospitalización, cirugías y consultas derivadas de accidentes laborales.',
  },
  {
    icon: FiActivity,
    title: 'Rehabilitación y Recuperación',
    desc:  'Gastos de fisioterapia, rehabilitación motriz y terapia especializada para recuperación post-accidente.',
  },
  {
    icon: FiShield,
    title: 'Medicamentos y Terapias',
    desc:  'Cobertura de medicamentos prescritos, estudios de laboratorio, radiografías y tratamientos ambulatorios.',
  },
  {
    icon: FiTruck,
    title: 'Traslados y Ambulancia',
    desc:  'Gastos de ambulancia terrestre y aérea, así como traslados entre centros médicos en emergencias.',
  },
];

const EXCLUSIONS = [
  'Enfermedades preexistentes no declaradas',
  'Accidentes bajo influencia de alcohol o sustancias',
  'Lesiones autoinfligidas',
  'Tratamientos estéticos o electivos no relacionados con el accidente',
];

const GastosMedicos = () => (
  <div className="gm-wrapper">

    <Link href="/" className="back-btn" aria-label="Volver al inicio">
      <FiArrowLeft size={16} aria-hidden="true" />
      <span>Inicio</span>
    </Link>

    {/* ─── Hero ────────────────────────────────────────── */}
    <section className="gm-hero">
      <div className="gm-hero-bg" aria-hidden="true">
        <div className="gm-orb gm-orb-a" />
        <div className="gm-orb gm-orb-b" />
      </div>

      <div className="gm-hero-inner">
        <motion.div
          className="gm-hero-content"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="gm-hero-badge">
            <FiActivity size={13} />
            <span>Protección al Personal · Sector Energético</span>
          </div>

          <h1 className="gm-hero-title">
            Seguro de <span className="gradient-text">Gastos Médicos</span>
          </h1>

          <p className="gm-hero-subtitle">
            Protección médica especializada para personal expuesto a riesgos industriales
            en operaciones de gas LP, hidrocarburos y energía.
          </p>

          <div className="gm-hero-info glass-card">
            <div className="gm-info-row">
              <div className="gm-info-item">
                <span className="gm-info-label">Tipo de cobertura</span>
                <strong>Gastos médicos por accidente laboral</strong>
              </div>
              <div className="gm-info-divider" aria-hidden="true" />
              <div className="gm-info-item">
                <span className="gm-info-label">Aplicable a</span>
                <strong>Todo el personal operativo</strong>
              </div>
              <div className="gm-info-divider" aria-hidden="true" />
              <div className="gm-info-item">
                <span className="gm-info-label">Emisión</span>
                <strong>3 – 7 días hábiles</strong>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="gm-hero-icon-col"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-hidden="true"
        >
          <div className="gm-icon-visual">
            <FiUser size={64} />
          </div>
        </motion.div>
      </div>
    </section>

    {/* ─── Coverages ───────────────────────────────────── */}
    <section className="gm-section">
      <motion.p className="eyebrow" {...fadeUp(0)}>Coberturas</motion.p>
      <motion.h2 className="section-title" {...fadeUp(0.08)}>¿Qué cubre este seguro?</motion.h2>
      <motion.p className="section-subtitle" {...fadeUp(0.14)}>
        Protección médica completa ante accidentes en el entorno de trabajo.
      </motion.p>

      <div className="gm-coverage-grid">
        {COVERAGES.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            className="gm-coverage-card glass-card"
            {...fadeUp(i * 0.08)}
          >
            <div className="gm-coverage-icon">
              <Icon size={22} aria-hidden="true" />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ─── Exclusions ──────────────────────────────────── */}
    <section className="gm-section">
      <motion.p className="eyebrow eyebrow--warn" {...fadeUp(0)}>Importante</motion.p>
      <motion.h2 className="section-title" {...fadeUp(0.08)}>Exclusiones comunes</motion.h2>
      <motion.p className="section-subtitle" {...fadeUp(0.14)}>
        Revisa con tu asesor las condiciones particulares de tu póliza.
      </motion.p>

      <div className="gm-exclusions">
        {EXCLUSIONS.map((item, i) => (
          <motion.div key={item} className="gm-exclusion-item glass-card" {...fadeUp(i * 0.07)}>
            <FiAlertCircle size={15} className="gm-alert-icon" aria-hidden="true" />
            <span>{item}</span>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ─── CTA ─────────────────────────────────────────── */}
    <section className="gm-cta-section">
      <motion.div
        className="gm-cta-inner glass-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.7 }}
      >
        <FiActivity size={32} className="gm-cta-icon" aria-hidden="true" />
        <div>
          <h3>Protege a tu equipo hoy</h3>
          <p>Solicita una cotización personalizada para tu operación.</p>
        </div>
        <Link href="/#contacto" className="btn btn-primary">
          Solicitar Cotización
        </Link>
      </motion.div>
    </section>

  </div>
);

export default GastosMedicos;
