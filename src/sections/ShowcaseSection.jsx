import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <a
                href="https://github.com/oguzyucel1/izu-kampus-bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/kampus.png" alt="Kampus Bot" />
              </a>
            </div>
            <div className="text-content">
              <h2>IZU Kampus Tracker Bot Automation</h2>
              <p className="text-white-50 md:text-xl">
                A Python app that logs into the IZU student system and checks
                for updates like new announcements, events, or grades. Sends
                instant notifications to students via a Telegram bot.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <a
                  href="https://github.com/AOghuz/EyeCareAIProject"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/eyecare.png" alt="EyeCare AI" />
                </a>
              </div>
              <h2>
                Eye Hospital Management System with AI Powered Disease Diagnosis
              </h2>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div className="image-wrapper bg-[#e3d0ef]">
                <a
                  href="https://github.com/oguzyucel1/staff-records-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/staff-left.png" alt="Staff Records App" />
                </a>
              </div>
              <h2>QR Based Employee Management System</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
