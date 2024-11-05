import { defineConfig } from 'vite';
import laravel, { refreshPaths }  from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';


export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx','resources/css/app.css', 'resources/js/app.js'],
            refresh:[ ...refreshPaths,
            'app/Livewire/**',
                 ],
        }),
        react(),
    ],
});
