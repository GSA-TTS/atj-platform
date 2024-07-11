import * as r from '@atj/common';

import { AWSParameterStoreSecretsVault } from './aws-param-store';
import {
  getSecretMapFromJsonString,
  type SecretMap,
  type SecretsVault,
} from './types';
import { InMemorySecretsVault } from './in-memory';
export { getSecretMapFromJsonString } from './types';

export const getSecretsVault = (): SecretsVault => {
  return new AWSParameterStoreSecretsVault();
};

export const createInMemorySecretsVault = (
  jsonString?: any
): r.Result<SecretsVault> => {
  const result = getSecretMapFromJsonString(jsonString);
  if (result.success) {
    return r.success(new InMemorySecretsVault(result.data));
  } else {
    return r.failure(result.error);
  }
};

export const getSecretMap = async (vault: SecretsVault): Promise<SecretMap> => {
  const secretKeys = await vault.getSecretKeys();
  const secretMap = await vault.getSecrets(secretKeys);
  return secretMap;
};
