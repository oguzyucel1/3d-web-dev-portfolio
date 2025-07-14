import { useEffect, useState, Suspense } from "react";
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
import LoadingScreen from "./components/LoadingScreen.jsx";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const timeout = setTimeout(() => {
        ScrollTrigger.refresh(); // 🔁 tüm scroll trigger'ları güncelle
      }, 1000); // Loading tamamlandıktan sonra biraz bekle

      return () => clearTimeout(timeout);
    }
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && <LoadingScreen onLoadComplete={() => setIsLoaded(true)} />}

      <div
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <NavBar />
        <Suspense fallback={<div className="h-screen bg-black" />}>
          <Hero />
        </Suspense>
        <ShowcaseSection />
        <LogoBanner />
        <FeatureCards />
        <ExperienceSection />
        <TechStack />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default App;
