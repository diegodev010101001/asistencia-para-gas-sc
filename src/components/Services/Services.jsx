import "./Services.css";
import { FaShieldAlt, FaLeaf, FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <section className="services section" id="servicios">

      <h2>Nuestros Seguros</h2>

      <div className="services-grid">

        <Link
          to="/seguro-responsivo"
          className="service-card"
        >
          <FaShieldAlt className="service-icon" />

          <h3>Seguro Responsivo</h3>

          <p>
            Cobertura de responsabilidad civil.
          </p>
        </Link>

        <Link
          to="/seguro-ambiental"
          className="service-card"
        >
          <FaLeaf className="service-icon" />

          <h3>Seguro Ambiental</h3>

          <p>
            Protección ecológica especializada.
          </p>
        </Link>

        <Link
          to="/gastos-medicos"
          className="service-card"
        >
          <FaUserMd className="service-icon" />

          <h3>Gastos Médicos</h3>

          <p>
            Protección médica para personal.
          </p>
        </Link>

      </div>

    </section>
  );
};

export default Services;