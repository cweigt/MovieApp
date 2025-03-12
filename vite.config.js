import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
//PURPOSE: allows to customize the build process
//plugins: array of plugins to use in the build process

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
