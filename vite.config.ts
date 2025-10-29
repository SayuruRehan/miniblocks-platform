import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'import.meta.env.REACT_APP_GEMINI_API_KEY': JSON.stringify('AIzaSyAMC8rAvLAJuB6X31_kzR3d1nr8SgnNvBM')
  }
})