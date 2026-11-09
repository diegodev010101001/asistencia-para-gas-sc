'use client';

import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import logoImg from '@/assets/logo.png';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Inicio',    href: '#inicio' },
  { label: 'Nosotros',  href: '#nosotros' },
  { label: 'Seguros',   href: '#servicios' },
  { label: 'FAQ',       href: '#faq' },
  { label: 'Contacto',  href: '#contacto' },
];

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} aria-label="Navegación principal">

        <a href="#inicio" className="navbar-logo" aria-label="Inicio">
          <img src={logoImg.src} alt="ASISTENCIA PARA GAS SC" className="navbar-logo-img" aria-hidden="true" />
          <span className="navbar-logo-text">
            ASISTENCIA PARA GAS SC
          </span>
        </a>

        <ul className="navbar-links" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="navbar-link">
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contacto" className="btn btn-primary navbar-cta">
          Cotizar
        </a>

        <button
          className="navbar-burger"
          onClick={() => setMenuOpen(v => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay${menuOpen ? ' mobile-overlay--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-nav">
          <ul role="list">
            {NAV_LINKS.map(({ label, href }, i) => (
              <li key={href} style={{ '--i': i }}>
                <a href={href} className="mobile-link" onClick={closeMenu}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contacto" className="btn btn-primary mobile-cta" onClick={closeMenu}>
            Solicitar Cotización
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
