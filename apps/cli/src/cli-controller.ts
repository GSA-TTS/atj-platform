import { Command } from 'commander';

import { createDependencyGraph } from '@atj/dependency-graph';
import { commands as secretCommands, getSecretsVault } from '@atj/secrets';

type Context = {
  console: Console;
  workspaceRoot: string;
  file?: string;
};

export const CliController = (ctx: Context) => {
  const cli = new Command().description(
    'CLI to interact with the ATJ workspace'
  );

  cli.option('-f, --file <path>', 'Source JSON file for secrets.', path => {
    ctx.file = path;
  });

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
  //addDocassembleCommands(ctx, cli);

  return cli;
};

const addSecretCommands = (ctx: Context, cli: Command) => {
  const cmd = cli.command('secrets').description('secrets management commands');

  cmd
    .command('get')
    .description('get a secret value')
    .argument('<string>', 'secret key name')
    .action(async (key: string) => {
      const vault = await getSecretsVault(ctx);
      const secret = await secretCommands.getSecret(vault, key);
      console.log(secret);
    });

  cmd
    .command('set')
    .description('set a secret value')
    .argument('<string>', 'secret key name')
    .argument('<string>', 'secret value to set')
    .action(async (key: string, value: string) => {
      const vault = await getSecretsVault(ctx);
      await secretCommands.setSecret(vault, key, value);
    });

  cmd
    .command('list')
    .description('list all secret keys')
    .action(async () => {
      const vault = await getSecretsVault(ctx);
      const secretKeys = await secretCommands.getSecretKeyList(vault);
      console.log(JSON.stringify(secretKeys, null, 2));
    });

  cmd
    .command('show')
    .description('show all secrets')
    .action(async () => {
      const vault = await getSecretsVault(ctx);
      const allSecrets = await secretCommands.getSecrets(vault);
      console.log(JSON.stringify(allSecrets, null, 2));
    });
};

/*
const addDocassembleCommands = (ctx: Context, cli: Command) => {
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
};
*/
