/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    name: '@atj/server:browser',
    browser: {
      provider: 'playwright',
      enabled: true,
      name: 'chromium',
      headless: true,
    },
    include: ['src/**/*.browser.test.ts'],
  },
});
