import "./About.css";

const About = () => {
  return (
    <section className="about section" id="nosotros">

      <div className="about-container">

        <div className="about-text">
          <h2>Sobre Nosotros</h2>

          <p>
            En asistencia para gas SC protegemos operaciones industriales
            con soluciones aseguradoras especializadas para el sector energético.
          </p>

          <p>
            Nuestra misión es reducir riesgos críticos y garantizar continuidad operativa
            mediante coberturas diseñadas para entornos de alta exigencia.
          </p>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276"
            alt="Industria Gas"
          />
        </div>

      </div>

    </section>
  );
};

export default About;