import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from "path";

export default defineConfig({
  plugins: [react(), viteStaticCopy({
  targets: [
    {
      src: 'node_modules/govuk-frontend/dist/govuk/assets/*',
      dest: 'assets'
    }
  ]
})],
  root: '.',
  publicDir: 'public',
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [
          path.resolve("node_modules"),
          path.resolve("node_modules/govuk-frontend"),
        ],
      },
    },
  },
});
