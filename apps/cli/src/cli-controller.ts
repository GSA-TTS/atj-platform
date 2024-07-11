import { promises as fs } from 'fs';
import { Command } from 'commander';

import { createDependencyGraph } from '@atj/dependency-graph';
import {
  createInMemorySecretsVault,
  getSecretMap,
  getSecretsVault,
} from '@atj/secrets';

type Context = {
  console: Console;
  workspaceRoot: string;
  file?: string;
};

const getContextSecretsVault = async (ctx: Context) => {
  if (ctx.file) {
    const maybeJsonString = (await fs.readFile(ctx.file)).toString();
    const result = createInMemorySecretsVault(maybeJsonString);
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error);
    }
  } else {
    return getSecretsVault();
  }
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
  const secrets = cli
    .command('secrets')
    .description('secrets management commands');

  secrets
    .command('get')
    .description('get a secret value')
    .argument('<string>', 'secret key name')
    .action(async (key: string) => {
      const vault = await getContextSecretsVault(ctx);
      const value = vault.getSecret(key);
      console.log(value);
    });

  secrets
    .command('set')
    .description('set a secret value')
    .argument('<string>', 'secret key name')
    .argument('<string>', 'secret value to set')
    .action(async (key: string, value: string) => {
      const vault = await getContextSecretsVault(ctx);
      await vault.setSecret(key, value);
      console.log(`Secret value to "${key}" saved`);
    });

  secrets
    .command('list')
    .description('list all secret keys')
    .action(async () => {
      const vault = await getContextSecretsVault(ctx);
      const secretKeys = await vault.getSecretKeys();
      console.log(JSON.stringify(secretKeys, null, 2));
    });

  secrets
    .command('show')
    .description('show all secrets')
    .action(async () => {
      const vault = await getContextSecretsVault(ctx);
      const secretMap = await getSecretMap(vault);
      console.log(JSON.stringify(secretMap, null, 2));
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
