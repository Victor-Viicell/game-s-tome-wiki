import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    
    createHtmlPlugin(),
    remix({
      
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    external: ['mock-aws-s3', 'aws-sdk', 'nock'],
  },
  build: {
    rollupOptions: {
      output: {
        format: 'esm',  // Ensure the format is ES module
      },
      external: ['mock-aws-s3', 'aws-sdk', 'nock'],
    },
  },
  css: {
    preprocessorOptions: {
      css: {},
    },
  },
});
