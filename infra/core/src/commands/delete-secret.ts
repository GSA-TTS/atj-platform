import type { SecretKey, SecretsVault } from '../lib/types.js';

export const deleteSecret = async (vault: SecretsVault, key: SecretKey) => {
  return await vault.deleteSecret(key);
};
