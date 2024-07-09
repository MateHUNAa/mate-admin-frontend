import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "../html",
  },
  base: "",
  server: {
    hmr: {
      protocol: "ws",
      port: 443,
      host: "localhost",
      overlay: true,
    },
  },
});
