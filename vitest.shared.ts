import type { UserConfig } from 'vitest/config';
const {
  default: GithubActionsReporter,
} = require('vitest-github-actions-reporter');

export default {
  test: {
    reporters: new GithubActionsReporter(),
  },
} satisfies UserConfig;
