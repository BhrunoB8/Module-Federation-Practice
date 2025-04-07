import { defineConfig } from 'vite';
import { federation } from '@module-federation/vite';

export default defineConfig({
    server: {
        origin: 'http://localhost:5170',
        port: 5170,
    },
    base: 'http://localhost:5170',
    plugins: [
        federation({
            name: 'host',
            remotes: {
                header: {
                    type: 'module',
                    name: 'header',
                    entry: 'http://localhost:5175/remoteEntry.js',
                },
            },
            shared: {
                vue: {
                    singleton: true,
                },
            },
        }),
    ],
    build: {
        target: 'chrome89',
    },
});