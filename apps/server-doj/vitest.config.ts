import { defineConfig } from 'vitest/config';
import { getDatabaseTestContainerGlobalSetupPath } from '@atj/database';

import sharedTestConfig from '../../vitest.shared';

export default defineConfig({
  ...sharedTestConfig,
  test: {
    ...sharedTestConfig.test,
    globalSetup: [getDatabaseTestContainerGlobalSetupPath()],
  },
});
