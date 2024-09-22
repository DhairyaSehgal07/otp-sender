import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000, // Specify your desired port
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Target API URL
        changeOrigin: true,
        secure: false, // Set to true if the target server uses HTTPS
      },
    },
  },
});
