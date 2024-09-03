import { defineConfig, mergeConfig } from 'vitest/config';

import { getVitestDatabaseContainerGlobalSetupPath } from '@atj/database';
import sharedTestConfig from '../../vitest.shared';

export default mergeConfig(
  sharedTestConfig,
  defineConfig({
    test: {
      globalSetup: [getVitestDatabaseContainerGlobalSetupPath()],
    },
  })
);
