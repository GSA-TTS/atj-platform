import { type SecretMap, type SecretsVault } from './types.js';

export { getSecretMapFromJsonString } from './types.js';
export * from './adapters/index.js';

export const getSecretMap = async (vault: SecretsVault): Promise<SecretMap> => {
  const secretKeys = await vault.getSecretKeys();
  const secretMap = await vault.getSecrets(secretKeys);
  return secretMap;
};
