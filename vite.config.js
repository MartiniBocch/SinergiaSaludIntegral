import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: 'https://martinibocch.github.io/SinergiaSaludIntegral/',
  plugins: [react()],
})
