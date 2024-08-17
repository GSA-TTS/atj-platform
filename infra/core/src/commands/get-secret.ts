import { type SecretsVault } from '../lib/types';

export const getSecret = async (vault: SecretsVault, key: string) => {
  return await vault.getSecret(key);
};
