import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ఒకవేళ ఈ కింద ఉన్న లైన్ లేకపోతే, దీన్ని యాడ్ చేసి గిట్‌హబ్‌కు పుష్ చేయండి
  base: '/', 
})
