import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

/**
 * Pon aquí el nombre exacto de tu repo (lo que va después de github.io/)
 * Ejemplo:
 * https://jpecinagithub.github.io/Recorrido-Historico-San-Josemaria-en-Logrono/#/  ->
 * repoName = "Recorrido-Historico-San-Josemaria-en-Logrono"
 */
const repoName = "Recorrido-Historico-San-Josemaria-en-Logrono";

export default defineConfig(({ mode }) => ({
  // GitHub Pages necesita el base con el nombre del repo
  base: `/${repoName}/`,

  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },

  plugins: [
    react(),

    // Solo en desarrollo (Lovable)
    mode === "development" && componentTagger(),

    // ==========================
    // PWA (OPCIÓN A - CORRECTA)
    // ==========================
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Recorrido Histórico San Josemaría",
        short_name: "Recorrido SJ",
        description: "Mapa interactivo con puntos de interés, audio y álbum.",

        // HashRouter
        start_url: "./#/",
        scope: "./",
        display: "standalone",

        theme_color: "#0B2F6A",
        background_color: "#0B2F6A",

        // IMPORTANTÍSIMO: rutas relativas (sin /repo/)
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {
        // ✅ clave: NO precachear audios grandes (wav/mp3)
        // Esto evita el error de 2MB de Workbox.
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff2}"],

        // ✅ opcional: cachea audios cuando el usuario los reproduce (runtime)
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "audio",
            handler: "CacheFirst",
            options: {
              cacheName: "audio-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
            },
          },
        ],
      },
    }),
    process.env.ANALYZE &&
      visualizer({
        open: true,
        filename: "bundle-stats.html",
      }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
