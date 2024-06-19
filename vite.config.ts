import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

const METEO_SOURCE_URL = 'https://www.meteosource.com/api/v1/free';
const OPEN_WEATHER_URL = 'https://api.openweathermap.org/geo/1.0/direct';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/assets/styles'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    proxy: {
      '/meteoSourceAPI': {
        target: METEO_SOURCE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/meteoSourceAPI/, ''),
      },
      '/openWeatherAPI': {
        target: OPEN_WEATHER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/openWeatherAPI/, ''),
      },
    },
  },
});
