import { env } from 'node:process';

import type { UserConfig } from 'vitest/config';
const {
  default: GithubActionsReporter,
} = require('vitest-github-actions-reporter');

console.log('****');
console.log(env.GITHUB_ACTIONS);

export default {
  test: {
    reporters: env.GITHUB_ACTIONS
      ? ['default', new GithubActionsReporter()]
      : 'default',
  },
} satisfies UserConfig;
