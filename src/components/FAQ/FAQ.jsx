import "./FAQ.css";
import { useState } from "react";

const FAQ = () => {

  const [active, setActive] = useState(null);

  const faqs = [
    {
      question: "¿Qué industrias pueden contratar cobertura?",
      answer: "Empresas del sector gas, hidrocarburos y energía."
    },
    {
      question: "¿Ofrecen cobertura ambiental?",
      answer: "Sí, contamos con protección especializada ambiental."
    },
    {
      question: "¿La cotización es gratuita?",
      answer: "Sí, completamente gratuita y personalizada."
    }
  ];

  return (
    <section className="faq section" id="faq">

      <h2>Preguntas Frecuentes</h2>

      <div className="faq-container">

        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${active === index ? "active" : ""}`}
          >

            <div
              className="faq-question"
              onClick={() => setActive(active === index ? null : index)}
            >
              {faq.question}
            </div>

            <div className="faq-answer">
              {faq.answer}
            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default FAQ;