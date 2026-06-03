import "./Navbar.css";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <div className="logo">
        asistencia para gas <span>SC</span>
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>

        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#nosotros">Sobre Nosotros</a></li>
        <li><a href="#servicios">Seguros</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#contacto">Contacto</a></li>

      </ul>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

    </nav>
  );
};

export default Navbar;