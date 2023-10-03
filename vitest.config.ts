import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest';

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environment: 'node',
    testTimeout: 30000,
    coverage: {
      provider: 'istanbul'
    }
  }
});
