import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    fs: {
      // Autoriser la lecture des packages workspace (SCSS theme, etc.)
      allow: ["../.."],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  optimizeDeps: {
    // Packages workspace en source TypeScript
    exclude: ["@newsite/theme", "@newsite/blocks", "@newsite/document", "@newsite/render"],
  },
});
