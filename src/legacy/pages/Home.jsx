import '../styles/global.css';
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Services from "../components/Services/Services";
import FAQ from "../components/FAQ/FAQ";
import Contact from "../components/Contact/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <FAQ />
      <Contact />
    </>
  );
};

export default Home;