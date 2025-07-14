import { counterItems } from "../constants";
import { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

const AnimatedCounter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true); // Animasyonun bir kez çalışmasını sağla
          }
        });
      },
      {
        threshold: 0.3, // Komponentin %30'u görünür olduğunda tetikle
        rootMargin: "0px 0px -50px 0px", // Alt kenardan 50px önce tetikle
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <div
            key={item.label || index}
            className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center"
          >
            <div className="counter-number text-white text-5xl font-bold mb-2">
              {isVisible ? (
                <CountUp
                  suffix={item.suffix}
                  end={item.value}
                  duration={2.5} // 2.5 saniye sürecek animasyon
                  delay={index * 0.2} // Her kart için 0.2s gecikme
                />
              ) : (
                <span>0{item.suffix}</span>
              )}
            </div>
            <div className="text-white-50 text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
