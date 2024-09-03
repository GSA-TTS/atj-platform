import { describe, expect, it } from 'vitest';

import { getSecrets } from './get-secrets.js';
import { createInMemorySecretsVault } from '../lib/index.js';

const getTestVault = (vaultData: any) => {
  const result = createInMemorySecretsVault(JSON.stringify(vaultData));
  if (result.success) {
    return result.data;
  } else {
    throw new Error('Error creating in-memory test vault');
  }
};

describe('get-secrets command', () => {
  it('returns existing values', async () => {
    const vaultSecrets = {
      'secret-key-1': 'value-1',
      'secret-key-2': 'value-2',
    };
    const vault = getTestVault(vaultSecrets);
    const secrets = await getSecrets(vault);
    expect(secrets).toEqual(vaultSecrets);
  });

  it('returns empty object for empty vault', async () => {
    const vault = getTestVault({});
    const value = await getSecrets(vault);
    expect(value).toEqual({});
  });
});
