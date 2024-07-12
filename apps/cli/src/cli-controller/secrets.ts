import { Command } from 'commander';

import { commands, getSecretsVault } from '@atj/secrets';
import { Context } from './types';
import { type DeployEnv } from '@atj/secrets/src/values';
import path from 'path';

export const addSecretCommands = (ctx: Context, cli: Command) => {
  const cmd = cli
    .command('secrets')
    .option('-f, --file <path>', 'Source JSON file for secrets.', path => {
      ctx.file = path;
    })
    .description('secrets management commands');

  cmd
    .command('delete')
    .description('delete a secret')
    .argument('<string>', 'secret key name')
    .action(async (key: string) => {
      const vault = await getSecretsVault(ctx.file);
      await commands.deleteSecret(vault, key);
    });

  cmd
    .command('get')
    .description('get a secret value')
    .argument('<string>', 'secret key name')
    .action(async (key: string) => {
      const vault = await getSecretsVault(ctx.file);
      const secret = await commands.getSecret(vault, key);
      console.log(secret);
    });

  cmd
    .command('set')
    .description('set a secret value')
    .argument('<string>', 'secret key name')
    .argument('<string>', 'secret value to set')
    .action(async (key: string, value: string) => {
      const vault = await getSecretsVault(ctx.file);
      await commands.setSecret(vault, key, value);
    });

  cmd
    .command('list')
    .description('list all secret keys')
    .action(async () => {
      const vault = await getSecretsVault(ctx.file);
      const secretKeys = await commands.getSecretKeyList(vault);
      console.log(JSON.stringify(secretKeys, null, 2));
    });

  cmd
    .command('show')
    .description('show all secrets')
    .action(async () => {
      const vault = await getSecretsVault(ctx.file);
      const allSecrets = await commands.getSecrets(vault);
      console.log(JSON.stringify(allSecrets, null, 2));
    });

  cmd
    .command('set-login-gov-keys')
    .description(
      'generate and save login.gov keypair; if it already exists, it is not ' +
        'updated (future work might include adding key rotation)'
    )
    .argument('<deploy-env>', 'deployment environment (dev, staging)')
    .argument('<app-key>', 'application key')
    .action(async (env: DeployEnv, appKey: string) => {
      const vault = await getSecretsVault(ctx.file);
      const secretsDir = path.resolve(__dirname, '../../../infra/secrets');
      const loginResult = await commands.setLoginGovSecrets(
        { vault, secretsDir },
        env,
        appKey
      );
      if (loginResult.preexisting) {
        console.log('Keypair already exists.');
      } else {
        console.log(`New keypair added`);
      }
    });
};
