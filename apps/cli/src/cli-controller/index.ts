import { Command } from 'commander';

import { createDependencyGraph } from '@atj/dependency-graph';
import type { Context } from './types.js';
import { addSecretCommands } from './secrets.js';

export const CliController = (ctx: Context) => {
  const cli = new Command().description(
    'CLI to interact with the ATJ workspace'
  );

  cli
    .command('hello')
    .description('say hello')
    .action(() => {
      ctx.console.log('Hello!');
    });

  cli
    .command('create-workspace-graph')
    .description('create a dependency graph of projects in the workspace')
    .action(async () => {
      await createDependencyGraph(ctx.workspaceRoot);
      ctx.console.log('wrote workspace dependency graph');
    });

  addSecretCommands(ctx, cli);

  return cli;
};
