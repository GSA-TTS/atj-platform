import type { SecretKey, SecretsVault } from '../lib/types';

export const deleteSecret = async (vault: SecretsVault, key: SecretKey) => {
  return await vault.deleteSecret(key);
};
