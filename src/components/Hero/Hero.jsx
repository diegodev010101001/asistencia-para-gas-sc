import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero" id="inicio">

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <h1>
          Protección Inteligente para la Industria del Gas
        </h1>

        <p>
          Soluciones especializadas en responsabilidad civil,
          protección ambiental y gastos médicos.
        </p>

        <div className="hero-buttons">
          <a href="#contacto" className="btn-primary">
            Solicitar Cotización
          </a>

          <a href="#servicios" className="btn-secondary">
            Ver Servicios
          </a>
        </div>

      </div>

    </section>
  );
};

export default Hero;