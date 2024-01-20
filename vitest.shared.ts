import { env } from 'node:process';

import type { UserConfig } from 'vitest/config';
import GithubActionsReporter from 'vitest-github-actions-reporter';

export default {
  test: {
    //coverage: {
    //enabled: true,
    //reporter: ['text', 'json-summary', 'json'],
    //reportOnFailure: true,
    //},
    reporters: env.GITHUB_ACTIONS
      ? ['default', new GithubActionsReporter()]
      : ['default', 'html'],
    coverage: {
      provider: 'v8',
      reporter: [
        'lcov',
        'html',
        'text',
        'text-summary',
        'json',
        'json-summary',
      ],
      //reportOnFailure: true,
    },
  },
} satisfies UserConfig;
