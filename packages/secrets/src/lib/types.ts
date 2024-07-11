import * as z from 'zod';
import { Result } from '@atj/common/src';

export type SecretKey = string;
export type SecretValue = string;
export type SecretMap = Record<SecretKey, SecretValue>;

const secretMap = z.record(z.string());

export const getSecretMapFromJsonString = (
  jsonString?: string
): Result<SecretMap> => {
  const inputObject = jsonString ? JSON.parse(jsonString) : null;
  const result = secretMap.safeParse(inputObject);
  if (result.success) {
    return {
      success: true,
      data: result.data as SecretMap,
    };
  } else {
    return {
      success: false,
      error: result.error.message,
    };
  }
};

export interface SecretsVault {
  getSecret(key: SecretKey): Promise<SecretValue>;
  getSecrets(keys: SecretKey[]): Promise<SecretMap>;
  setSecret(key: SecretKey, value: SecretValue): Promise<void>;
  setSecrets(secrets: SecretMap): Promise<void>;
  getSecretKeys(): Promise<SecretKey[]>;
}
