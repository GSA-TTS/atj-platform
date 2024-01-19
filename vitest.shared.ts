import type { UserConfig } from 'vitest/config';
import GithubActionsReporter from 'vitest-github-actions-reporter';

export default {
  test: {
    reporters: process.env.GITHUB_ACTIONS
      ? ['default', new GithubActionsReporter()]
      : 'default',
  },
} satisfies UserConfig;
