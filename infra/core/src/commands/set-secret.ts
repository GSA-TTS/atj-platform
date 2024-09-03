import { type SecretsVault } from '../lib/types.js';

export const setSecret = async (
  vault: SecretsVault,
  key: string,
  value: string
) => {
  await vault.setSecret(key, value);
};
