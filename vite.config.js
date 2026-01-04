import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@store': path.resolve(__dirname, './src/store'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@router': path.resolve(__dirname, './src/router'),
      '@locales': path.resolve(__dirname, './src/locales'),
    }
  },

  server: {
    sourcemapIgnoreList: (sourcePath) => {
      return sourcePath.includes('node_modules')
    }
  },

  build: {
    sourcemap: false,
    target: 'es2015',
    minify: 'esbuild', // Fastest minifier, built-in
    cssMinify: true,
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    // Drop console and debugger in production
    esbuild: {
      drop: ['console', 'debugger'],
      legalComments: 'none',
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React and React-DOM
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            // Redux ecosystem
            if (id.includes('redux') || id.includes('@reduxjs')) {
              return 'vendor-redux';
            }
            // Chart library
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            // Icons library
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            // Form library
            if (id.includes('react-hook-form')) {
              return 'vendor-forms';
            }
            // Utilities
            if (id.includes('lodash') || id.includes('axios') || id.includes('i18next')) {
              return 'vendor-utils';
            }
            // All other node_modules
            return 'vendor';
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            return 'assets/media/[name]-[hash].[ext]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash].[ext]';
          }
          return 'assets/[ext]/[name]-[hash].[ext]';
        },
      },
    },
    // Optimize asset inlining
    assetsInlineLimit: 4096, // 4kb
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux',
      'axios',
      'react-hook-form',
    ],
    exclude: ['@vitejs/plugin-react'],
  },
})  
