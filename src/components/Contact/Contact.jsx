import "./Contact.css";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const Contact = () => {

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    motivo: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // CONFIGURAR EMAILJS
    emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      formData,
      "YOUR_PUBLIC_KEY"
    )
    .then(() => {
      alert("Mensaje enviado correctamente");
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <section className="contact section" id="contacto">

      <h2>Contáctanos</h2>

      <form className="contact-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          required
          onChange={handleChange}
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          required
          onChange={handleChange}
        />

        <textarea
          name="motivo"
          placeholder="Motivo de contacto"
          required
          onChange={handleChange}
        />

        <button type="submit">
          Enviar Mensaje
        </button>

      </form>

    </section>
  );
};

export default Contact;