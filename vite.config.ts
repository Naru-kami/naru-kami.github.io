import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/naru-kami.github.io',
  plugins: [react()],
})