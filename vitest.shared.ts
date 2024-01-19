import type { UserConfig } from 'vitest/config';
import { default as GithubActionsReporter } from 'vitest-github-actions-reporter';

export default {
  test: {
    reporters: new GithubActionsReporter(),
  },
} satisfies UserConfig;
