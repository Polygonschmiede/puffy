import angular from '@analogjs/vite-plugin-angular';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    angular({
      tsconfig: 'tsconfig.app.json'
    })
  ],
  resolve: {
    alias: {
      pf: path.resolve(rootDir, 'projects/pf/src/public-api.ts')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.join(rootDir, 'vitest.worker-setup.ts')],
    include: ['projects/pf/**/*.spec.ts'],
    coverage: {
      reporter: ['text', 'html'],
      reportsDirectory: './coverage'
    }
  }
});
