import { type SecretMap, type SecretsVault } from './types';

export { getSecretMapFromJsonString } from './types';
export * from './adapters';

export const getSecretMap = async (vault: SecretsVault): Promise<SecretMap> => {
  const secretKeys = await vault.getSecretKeys();
  const secretMap = await vault.getSecrets(secretKeys);
  return secretMap;
};
