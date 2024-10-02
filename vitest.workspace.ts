import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'apps/*/vitest.config.ts',
  'infra/*',
  // the design package is run separately due to the browser environment
  //'!packages/design',
  'packages/server',
]);
