import LogoBanner from "./sections/LogoBanner.jsx";
import NavBar from "./components/NavBar.jsx";
import FeatureCards from "./sections/FeatureCards.jsx";
import Hero from "./sections/Hero.jsx";
import ShowcaseSection from "./sections/ShowcaseSection.jsx";
import ExperienceSection from "./sections/ExperienceSection.jsx";

const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <ShowcaseSection />
      <LogoBanner />
      <FeatureCards />
      <ExperienceSection />
    </>
  );
};

export default App;
