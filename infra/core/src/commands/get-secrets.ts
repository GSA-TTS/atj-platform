import { type SecretsVault } from '../lib/types';

export const getSecrets = async (vault: SecretsVault) => {
  const allKeys = await vault.getSecretKeys();
  return await vault.getSecrets(allKeys);
};
