import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        id: "/",
        name: "Jobbtracker",
        short_name: "Jobbtracker",
        description: "Håll koll på jobb du sökt",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        screenshots: [
          {
            src: "/screenshots/desktop.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
            label: "Jobbtracker på dator"
          },
          {
            src: "/screenshots/mobile.png",
            sizes: "390x844",
            type: "image/png",
            label: "Jobbtracker på mobil"
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          chakra: ["@chakra-ui/react", "framer-motion"],
          icons: ["lucide-react", "react-icons"]
        }
      }
    }
  }
});
