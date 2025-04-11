import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: 'host',
      remotes: {
          header: {
              type: 'module',
              name: 'header',
              entry: 'http://localhost:5173/remoteEntry.js',
          },
          sport: {
            type: 'module',
            name: 'sport',
            entry: 'http://localhost:5174/remoteEntry.js',
        },
      },
      shared: {
          vue: {
              singleton: true,
          },
      },
  }),
    vue(),
    vueDevTools(),
  ],
  build: {
    target: 'chrome89',
  },
  server: {
    origin: 'http://localhost:5170',
    port: 5170,
  },
  base: 'http://localhost:5170',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
})
