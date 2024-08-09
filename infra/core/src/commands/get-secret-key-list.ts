import { type SecretsVault } from '../lib/types';

export const getSecretKeyList = async (vault: SecretsVault) => {
  return await vault.getSecretKeys();
};
