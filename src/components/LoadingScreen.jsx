import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";

const LoadingScreen = ({ onLoadComplete }) => {
  const { progress } = useProgress();
  const [isVisible, setIsVisible] = useState(true);
  const [simulatedProgress, setSimulatedProgress] = useState(0);

  useEffect(() => {
    // Scroll engelleme - daha güçlü versiyon
    const originalStyle = {
      overflow: document.body.style.overflow,
      height: document.body.style.height,
      position: document.body.style.position,
    };

    // Body ve HTML'i tamamen sabitle
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";

    // Touch olaylarını engelle (mobil cihazlar için)
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("scroll", preventScroll, { passive: false });

    // 3 saniye boyunca progress'i 0'dan 100'e animasyonla götür
    const startTime = Date.now();
    const duration = 3000; // 3 saniye

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);

      // Progress'i daha sık güncelle (her frame'de)
      setSimulatedProgress(Math.floor(progressPercent * 10) / 10); // 0.1 hassasiyetinde

      if (progressPercent < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        // 3 saniye tamamlandı, loading'i kapat
        setTimeout(() => {
          // Scroll engellemesini kaldır
          document.body.style.overflow = originalStyle.overflow || "auto";
          document.body.style.height = originalStyle.height || "auto";
          document.body.style.position = originalStyle.position || "static";
          document.body.style.width = "auto";
          document.documentElement.style.overflow = "auto";

          // Event listener'ları kaldır
          document.removeEventListener("touchmove", preventScroll);
          document.removeEventListener("wheel", preventScroll);
          document.removeEventListener("scroll", preventScroll);

          setIsVisible(false);
          onLoadComplete();
        }, 200);
      }
    };

    animateProgress();

    // Cleanup function - component unmount olduğunda tüm değişiklikleri geri al
    return () => {
      document.body.style.overflow = originalStyle.overflow || "auto";
      document.body.style.height = originalStyle.height || "auto";
      document.body.style.position = originalStyle.position || "static";
      document.body.style.width = "auto";
      document.documentElement.style.overflow = "auto";

      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("scroll", preventScroll);
    };
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="text-center">
        {/* Developer GIF */}
        <div className="relative mx-auto mb-8 w-32 h-32">
          <img
            src="/images/animations/developer_18925138.gif"
            alt="Developer Animation"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Modern Progress Bar */}
        <div className="mb-6 w-80 mx-auto">
          <div className="flex justify-between text-sm text-white-50 mb-3">
            <span>Loading Portfolio</span>
            <span>{Math.round(simulatedProgress)}%</span>
          </div>
          <div className="relative h-2 bg-black-200 rounded-full overflow-hidden">
            <div
              className="absolute inset-0 bg-white rounded-full"
              style={{
                width: `${simulatedProgress}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">
            Initializing Developer Portfolio
          </h2>
          <p className="text-white-50 text-sm">
            {simulatedProgress < 25 && "Loading components..."}
            {simulatedProgress >= 25 &&
              simulatedProgress < 50 &&
              "Preparing 3D models..."}
            {simulatedProgress >= 50 &&
              simulatedProgress < 75 &&
              "Setting up animations..."}
            {simulatedProgress >= 75 && "Almost ready..."}
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center mt-6 space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: "1.5s",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
