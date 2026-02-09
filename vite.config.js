import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [path.resolve('node_modules')],
      },
    },
  },
})
