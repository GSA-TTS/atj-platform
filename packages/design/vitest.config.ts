import { defineConfig, configDefaults, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';
import sharedTestConfig from '../../vitest.shared';

export default mergeConfig(
  viteConfig,
  defineConfig({
    ...sharedTestConfig,
    test: {
      ...sharedTestConfig.test,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      exclude: [
        ...configDefaults.exclude,
        './src/FormManager/FormEdit/components/RichTextPatternEdit/RichTextPatternEdit.test.tsx',
      ],
    },
  })
);
