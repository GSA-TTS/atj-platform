import { defineConfig, mergeConfig } from 'vitest/config';

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
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        './src/FormManager/FormEdit/components/RichTextPatternEdit/RichTextPatternEdit.test.tsx',
      ],
    },
  })
);
