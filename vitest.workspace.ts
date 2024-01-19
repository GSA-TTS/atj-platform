import { defineWorkspace } from 'vitest/config';
import GithubActionsReporter from 'vitest-github-actions-reporter';

export default defineWorkspace(['apps/*', 'packages/*'], {
  test: {
    reporters: [new GithubActionsReporter()],
  },
});
//export default ['apps/*', 'packages/*'];
