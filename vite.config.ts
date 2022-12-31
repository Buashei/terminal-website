/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [tsconfigPaths(), eslint(), react()],
    test: {
      globals: true,
      environment: 'jsdom',
      // include: ['**/**/*.{test}.{ts,mts,cts,tsx}'],
      setupFiles: './vitest.setup.ts',
      coverage: {
        reporter: ['text', 'json', 'html'],
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 2137,
    },
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
        { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
        { find: '@services', replacement: path.resolve(__dirname, 'src/services') },
        { find: '@scss', replacement: path.resolve(__dirname, 'src/scss') },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            $phone-width: ${process.env.VITE_PHONE_WIDTH}px;
            $tablet-portrait-up-width: ${process.env.VITE_TABLET_PORTRAIT_UP_WIDTH}px;
            $tablet-landscape-up-width: ${process.env.VITE_TABLET_LANDSCAPE_UP_WIDTH}px;
            $desktop-up-width:  ${process.env.VITE_DESKTOP_UP_WIDTH}px;
            $big-desktop-up: ${process.env.VITE_BIG_DESKTOP_UP_WIDTH}px;
          `,
        },
      },
    },
  };
});
