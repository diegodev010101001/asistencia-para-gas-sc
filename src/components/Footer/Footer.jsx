import "./Footer.css";

import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <h3>asistencia para gas SC</h3>

      <p>
        Seguridad y protección especializada para la industria.
      </p>

      <div className="social-icons">

        <a href="#">
          <FaWhatsapp />
        </a>

        <a href="#">
          <FaFacebook />
        </a>

        <a href="#">
          <FaInstagram />
        </a>

      </div>

      <p className="copy">
        © 2026 asistencia para gas SC
      </p>

    </footer>
  );
};

export default Footer;