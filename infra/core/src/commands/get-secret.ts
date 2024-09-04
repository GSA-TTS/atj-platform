import { type SecretsVault } from '../lib/types.js';

export const getSecret = async (vault: SecretsVault, key: string) => {
  return await vault.getSecret(key);
};
