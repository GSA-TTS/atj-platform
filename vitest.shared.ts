import { env } from 'node:process';

import type { UserConfig } from 'vitest/config';
const {
  default: GithubActionsReporter,
} = require('vitest-github-actions-reporter');

export default {
  test: {
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
    },
    reporters: env.GITHUB_ACTIONS
      ? ['default', new GithubActionsReporter()]
      : 'default',
  },
} satisfies UserConfig;
