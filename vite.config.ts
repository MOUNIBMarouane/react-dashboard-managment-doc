
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      // Disable the HMR overlay to prevent potential issues
      overlay: false
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Force Vite to clear its cache and reassess dependencies
  cacheDir: '.vite',
  optimizeDeps: {
    // Force Vite to re-bundle dependencies
    force: true
  }
});
