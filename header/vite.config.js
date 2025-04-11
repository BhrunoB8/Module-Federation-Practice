import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { federation } from '@module-federation/vite';

export default defineConfig({
  server: {
    origin: 'http://localhost:5173',
    port: 5173,
  },
  base: 'http://localhost:5173',
  plugins: [
    vue(),
    federation({
      name: 'header',
      manifest: true,
      exposes: {
        './Header': './src/App.vue'
      },
      filename: 'remoteEntry.js',
      shareScope: 'default',
      shared: {
        vue: {
          singleton: true,
        },
        'vue-router': {
          singleton: true,
        },
      },
    }),
  ],
  build: {
    target: 'chrome89',
  },
});