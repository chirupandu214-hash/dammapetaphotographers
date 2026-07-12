import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // ఇది లేకపోతే సర్వర్ లో CSS ఫైల్స్ లోడ్ అవ్వవు
});
