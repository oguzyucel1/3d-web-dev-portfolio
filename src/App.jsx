import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LogoBanner from "./sections/LogoBanner.jsx";
import NavBar from "./components/NavBar.jsx";
import FeatureCards from "./sections/FeatureCards.jsx";
import Hero from "./sections/Hero.jsx";
import ShowcaseSection from "./sections/ShowcaseSection.jsx";
import ExperienceSection from "./sections/ExperienceSection.jsx";
import TechStack from "./sections/TechStack.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";

const App = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh(); // 🔁 tüm scroll trigger'ları güncelle
    }, 500); // Sayfanın tamamı render olduktan sonra

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <NavBar />
      <Hero />
      <ShowcaseSection />
      <LogoBanner />
      <FeatureCards />
      <ExperienceSection />
      <TechStack />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
