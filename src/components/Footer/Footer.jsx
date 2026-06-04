import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FiShield } from 'react-icons/fi';
import './Footer.css';

const NAV = [
  { label: 'Inicio',    href: '#inicio' },
  { label: 'Nosotros',  href: '#nosotros' },
  { label: 'Seguros',   href: '#servicios' },
  { label: 'FAQ',       href: '#faq' },
  { label: 'Contacto',  href: '#contacto' },
];

const SERVICES = [
  { label: 'Seguro Responsivo',   href: '/seguro-responsivo' },
  { label: 'Seguro Ambiental',    href: '/seguro-ambiental' },
  { label: 'Gastos Médicos',      href: '/gastos-medicos' },
];

const SOCIAL = [
  { icon: FaWhatsapp,  href: 'https://wa.me/524440000000',  label: 'WhatsApp' },
  { icon: FaFacebook,  href: '#',                           label: 'Facebook' },
  { icon: FaInstagram, href: '#',                           label: 'Instagram' },
];

const Footer = () => (
  <footer className="footer" aria-label="Pie de página">
    <div className="footer-inner">

      {/* Brand column */}
      <div className="footer-brand">
        <div className="footer-logo">
          <div className="footer-logo-mark" aria-hidden="true">AG</div>
          <span className="footer-logo-text">asistencia para gas <em>SC</em></span>
        </div>
        <p className="footer-tagline">
          Seguros especializados para la industria del gas e hidrocarburos en México.
        </p>
        <div className="footer-social">
          {SOCIAL.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="footer-social-link"
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon size={18} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* Navigation column */}
      <div className="footer-col">
        <p className="footer-col-title">Navegación</p>
        <ul>
          {NAV.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="footer-link">{label}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Services column */}
      <div className="footer-col">
        <p className="footer-col-title">Seguros</p>
        <ul>
          {SERVICES.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="footer-link">{label}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Compliance column */}
      <div className="footer-col">
        <p className="footer-col-title">Regulación</p>
        <ul className="footer-compliance">
          {['CRE', 'ASEA', 'NOM Aplicables', 'Gas LP', 'Hidrocarburos'].map(item => (
            <li key={item} className="footer-compliance-item">
              <FiShield size={11} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>

    <div className="footer-bottom">
      <hr className="h-divider" />
      <div className="footer-bottom-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} asistencia para gas SC. Todos los derechos reservados.
        </p>
        <p className="footer-disclaimer">
          Seguros especializados para el sector energético de México.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
