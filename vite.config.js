import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import shimReactPdf from "vite-plugin-shim-react-pdf";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://arm-thread-backend.herokuapp.com",
        changeOrigin: true,
        secure: true,
        ws: true,
      },
    },
  },
  plugins: [react(),reactRefresh(), shimReactPdf()],
});
