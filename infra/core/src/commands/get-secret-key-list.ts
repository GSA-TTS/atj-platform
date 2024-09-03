import { type SecretsVault } from '../lib/types.js';

export const getSecretKeyList = async (vault: SecretsVault) => {
  return await vault.getSecretKeys();
};
