import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/naru-kami.github.io/',
  build: { chunkSizeWarningLimit: 4000, },
  plugins: [react()],
})