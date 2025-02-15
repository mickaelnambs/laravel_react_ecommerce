import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});
