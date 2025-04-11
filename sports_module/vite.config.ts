import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    origin: 'http://localhost:5174',
    port: 5174,
  },
  base: 'http://localhost:5174',
  plugins: [
    vue(),
    federation({
      name: 'sport',
      manifest: true,
      exposes: {
        './Sport': './src/App.vue',
        './SportView': './src/views/SportView.vue'
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
})
