/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fsExtra from "fs-extra"; // Import as default
import generateSitemap from "./src/utils/generateSitemap";

const { copySync } = fsExtra; // Destructure copySync

export default defineConfig({
  plugins: [
    react(),
    {
      name: "generate-sitemap",
      closeBundle() {
        generateSitemap();
        const srcDir = path.resolve(__dirname, "src/assets");
        const destDir = path.resolve(__dirname, "dist/assets");
        copySync(srcDir, destDir, { overwrite: true });
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          utils: ['./src/lib/utils.js', './src/lib/cookieUtils.js']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
});
