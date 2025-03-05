import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass,
            },
        },
    },
    resolve: {
        alias: {
            // Core
            '@constants': '/src/core/constants',
            '@context': '/src/core/context',
            '@routes': '/src/core/routes',
            '@services': '/src/core/services',
            '@hooks': '/src/core/hooks',
            '@utils': '/src/core/utils',

            // Assets
            '@css': '/src/assets/css',
            '@images': '/src/assets/images',
            '@svg': '/src/assets/svg',

            // Features
            '@auth': '/src/features/auth',
            '@events': '/src/features/events',
            '@control': '/src/features/control',
            '@home': '/src/features/home',
            '@newsletter': '/src/features/newsletter',

            // Shared
            '@components': '/src/shared/components',
            '@layouts': '/src/shared/layouts',
            '@pages': '/src/shared/pages',
            '@styles': '/src/shared/styles',
        },
    },
})
