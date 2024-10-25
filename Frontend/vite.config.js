import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: import.meta.env.VITE_API_BASE_URL,
        changeOrigin: true,
      },
    },
  },
});
