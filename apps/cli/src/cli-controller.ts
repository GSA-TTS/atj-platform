import { Command } from 'commander';

import { createDependencyGraph } from '@atj/dependency-graph';

type Context = {
  console: Console;
  workspaceRoot: string;
  //docassemble: DocassembleClientContext;
};

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

  /*
  const docassemble = cli
    .command('docassemble')
    .description('docassemble commands');

  docassemble
    .command('populate')
    .description('populate a docassemble instance with test data')
    .option(
      '-r, --repository',
      'repository to populate from',
      'https://github.com/SuffolkLITLab/docassemble-MassAccess'
    )
    .option('-b, --branch', 'branch of git repository to populate from', 'main')
    .action(async ({ repository, branch }) => {
      const client = new DocassembleClient(ctx.docassemble);
      const result = await client.addPackage(repository, branch);
      ctx.console.log('populated docassemble instance', result);
    });

  docassemble
    .command('list-interviews')
    .description('list docassemble interviews')
    .action(async () => {
      const client = new DocassembleClient(ctx.docassemble);
      const interviews = await client.getInterviews();
      ctx.console.log('populated docassemble instance');
    });
    */

  return cli;
};
