import {URL, fileURLToPath} from 'node:url';
import {defineConfig, normalizePath} from 'vite';

import vue from '@vitejs/plugin-vue';
import {viteStaticCopy} from 'vite-plugin-static-copy';
import {federation} from '@module-federation/vite';

const {getAbsoluteFSPath} = await import('swagger-ui-dist');
const swaggerUiPath = getAbsoluteFSPath();

// eslint-disable-next-line prefer-const
let config = defineConfig({
  plugins: [
    federation({
      name: 'sport',
      manifest: true,
      exposes: {
        './SportCreate': './src/main/webapp/app/entities/sport/sport-update.vue',
        './SportList': './src/main/webapp/app/entities/sport/sport.vue',
        './export-app': './src/main/webapp/app/exportApp.ts',
      },
      filename: 'remoteEntry.js',
      shareScope: 'default',
      shared:  ['vue', 'vue-router', 'pinia', 'axios']
    }),
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: [
            `${normalizePath(swaggerUiPath)}/*.{js,css,html,png}`,
            `!${normalizePath(swaggerUiPath)}/**/index.html`,
            normalizePath(fileURLToPath(new URL('./dist/axios.min.js', import.meta.resolve('axios/package.json')))),
            normalizePath(fileURLToPath(new URL('./src/main/webapp/swagger-ui/index.html', import.meta.url))),
          ],
          dest: 'swagger-ui',
        },
      ],
    }),
  ],
  root: fileURLToPath(new URL('./src/main/webapp/', import.meta.url)),
  publicDir: fileURLToPath(new URL('./target/classes/static/public', import.meta.url)),
  cacheDir: fileURLToPath(new URL('./target/.vite-cache', import.meta.url)),
  build: {
    target: 'esnext',
    emptyOutDir: true,
    outDir: fileURLToPath(new URL('./target/classes/static/', import.meta.url)),
    rollupOptions: {
      input: {
        app: fileURLToPath(new URL('./src/main/webapp/index.html', import.meta.url)),
      },
    },
  },
  resolve: {
    alias: {
      vue: '@vue/compat/dist/vue.esm-bundler.js',
      '@': fileURLToPath(new URL('./src/main/webapp/app/', import.meta.url)),
      '@content': fileURLToPath(new URL('./src/main/webapp/content/', import.meta.url)),
    },
  },
  define: {
    I18N_HASH: '"generated_hash"',
    SERVER_API_URL: '"/"',
    APP_VERSION: `"${process.env.APP_VERSION ? process.env.APP_VERSION : 'DEV'}"`,
  },
  server: {
    port: 5174,
    origin: 'http://localhost:5174',
    proxy: Object.fromEntries(
      ['/api', '/management', '/v3/api-docs', '/h2-console'].map(res => [
        res,
        {
          target: 'http://localhost:8080',
        },
      ]),
    ),
  },
  base: 'http://localhost:5174',
});

// jhipster-needle-add-vite-config - JHipster will add custom config

export default config;
