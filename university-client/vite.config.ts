import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    host: "0.0.0.0",
    origin: "http://0.0.0.0:5173",
  },
});
