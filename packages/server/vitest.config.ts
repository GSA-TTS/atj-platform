/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';
import { configDefaults } from 'vitest/config';

export default getViteConfig({
  test: {
    ...configDefaults,
    setupFiles: ['./vitest.setup.ts'],
  },
});
