import { Command } from 'commander';

import { createDependencyGraph } from '@atj/dependency-graph';

type Context = {
  console: Console;
  workspaceRoot: string;
};

export const CliController = (ctx: Context) => {
  const cli = new Command();
  cli
    .command('hello-world <echo-value>')
    .description('hello world')
    .action(async echoValue => {
      await createDependencyGraph(ctx.workspaceRoot);
      ctx.console.log(`Hello, ${echoValue}!`);
    });
  cli
    .command('create-workspace-graph')
    .description('create a dependency graph of projects in the workspace')
    .action(async () => {
      await createDependencyGraph(ctx.workspaceRoot);
      ctx.console.log('wrote workspace dependency graph');
    });
  return cli;
};
