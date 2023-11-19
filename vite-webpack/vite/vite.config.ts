import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/vite-sample.js",
        assetFileNames: "assets/vite-sample.css",
      },
    },
  },
});
