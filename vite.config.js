import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
//PURPOSE: allows to customize the build process
//plugins: array of plugins to use in the build process

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
      manifest: {
        name: 'Top Movies',
        short_name: 'Movies',
        theme_color: '#0d47a1',
        //background_color: '#ffffff',
        display: 'fullscreen',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'popcorn192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'popcorn512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
  })],
})
