import { type SecretsVault } from '../lib/types.js';

export const getSecrets = async (vault: SecretsVault) => {
  const allKeys = await vault.getSecretKeys();
  return await vault.getSecrets(allKeys);
};
