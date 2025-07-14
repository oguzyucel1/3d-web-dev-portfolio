import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Build optimizasyonları
    rollupOptions: {
      output: {
        manualChunks: {
          three: [
            "three",
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/postprocessing",
          ],
          gsap: ["gsap", "@gsap/react"],
        },
      },
    },
  },
  optimizeDeps: {
    // Development'ta hızlı yükleme için
    include: ["three", "@react-three/fiber", "@react-three/drei"],
  },
});
