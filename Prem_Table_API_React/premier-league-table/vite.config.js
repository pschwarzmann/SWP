import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: [
          './index.html',
          './src/**/*.{js,ts,jsx,tsx}',
        ],
        theme: {
          extend: {
            colors: {
              'pl-primary': '#381D54',
              'pl-secondary': '#c6bece',
            },
            fontFamily: {
              sans: ['Arial', 'sans-serif'],
            },
          },
        },
      },
    }),
  ],
});