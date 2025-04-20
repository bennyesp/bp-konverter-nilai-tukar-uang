import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/plugin-services/background-min.js',
          dest: '.',
          rename: "background.js"
        },
        {
          src: 'src/plugin-services/key-template.js',
          dest: '.'
        },
        {
          src: 'src/plugin-services/key.js',
          dest: '.'
        },
        {
          src: 'manifest.json',
          dest: '.'
        },
        {
          src: 'README.md',
          dest: '.'
        },
        {
          src: 'LICENSE',
          dest: '.'
        },
        {
          src: 'CHANGELOG.md',
          dest: '.'
        }
      ]
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: 'index.html',
      }
    }
  }
});