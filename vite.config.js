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
    target: 'baseline-widely-available', 
    minify: 'esbuild', 
    cssMinify: true,
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    esbuild: {
      drop: ['console', 'debugger'],
      legalComments: 'none',
    },
    rollupOptions: {
      output: {
       
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
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
    assetsInlineLimit: 4096, 
  },
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
