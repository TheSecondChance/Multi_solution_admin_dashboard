import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";
dotenv.config();
export default defineConfig({
  build: {
    outDir: "build",
  },
  server: {
    https: {
      key: "./multi-solutions-privateKey.key",
      cert: "./multi-solutions.crt",
    },
    // host: "localhost", // Optionally, specify the host if needed
    // port: 5000, // Specify the port you want to use
  },
  plugins: [react()],
  define: {
    "process.env.REACT_APP_API_URL": JSON.stringify(
      process.env.REACT_APP_API_URL
    ),
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      axios: "axios",
    },
  },
});
