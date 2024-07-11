import { promises as fs } from 'fs';

import * as r from '@atj/common';

import { AWSParameterStoreSecretsVault } from './aws-param-store';
import {
  getSecretMapFromJsonString,
  type SecretMap,
  type SecretsVault,
} from './types';
import { InMemorySecretsVault } from './in-memory';
export { getSecretMapFromJsonString } from './types';

export const getSecretsVault = async (ctx?: { file?: string }) => {
  if (ctx?.file) {
    const maybeJsonString = (await fs.readFile(ctx.file)).toString();
    const result = createInMemorySecretsVault(maybeJsonString);
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error);
    }
  } else {
    return getAWSSecretsVault();
  }
};

export const getAWSSecretsVault = (): SecretsVault => {
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
