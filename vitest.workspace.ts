import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'apps/*',
  'infra/*',
  // the design package is run separately due to the browser environment
  // '!packages/design',
  'packages/auth',
  'packages/common',
  'packages/database',
  'packages/dependency-graph',
  'packages/documents',
  'packages/forms',
  'packages/server',
]);
