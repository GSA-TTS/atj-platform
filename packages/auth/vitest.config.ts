import { defineConfig, mergeConfig } from 'vitest/config';

import sharedTestConfig from '../../vitest.shared';

export default mergeConfig(
  sharedTestConfig,
  defineConfig({
    test: {
      setupFiles: ['./vitest.setup.ts'],
    },
  })
);
