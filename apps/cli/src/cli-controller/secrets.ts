import { Command } from 'commander';

import { commands, getSecretsVault } from '@atj/secrets';
import { Context } from './types';

export const addSecretCommands = (ctx: Context, cli: Command) => {
  const cmd = cli
    .command('secrets')
    .option('-f, --file <path>', 'Source JSON file for secrets.', path => {
      ctx.file = path;
    })
    .description('secrets management commands');

  cmd
    .command('get')
    .description('get a secret value')
    .argument('<string>', 'secret key name')
    .action(async (key: string) => {
      const vault = await getSecretsVault(ctx);
      const secret = await commands.getSecret(vault, key);
      console.log(secret);
    });

  cmd
    .command('set')
    .description('set a secret value')
    .argument('<string>', 'secret key name')
    .argument('<string>', 'secret value to set')
    .action(async (key: string, value: string) => {
      const vault = await getSecretsVault(ctx);
      await commands.setSecret(vault, key, value);
    });

  cmd
    .command('list')
    .description('list all secret keys')
    .action(async () => {
      const vault = await getSecretsVault(ctx);
      const secretKeys = await commands.getSecretKeyList(vault);
      console.log(JSON.stringify(secretKeys, null, 2));
    });

  cmd
    .command('show')
    .description('show all secrets')
    .action(async () => {
      const vault = await getSecretsVault(ctx);
      const allSecrets = await commands.getSecrets(vault);
      console.log(JSON.stringify(allSecrets, null, 2));
    });
};
