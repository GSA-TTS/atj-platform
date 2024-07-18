import { describe, expect, it } from 'vitest';

import { createInMemorySecretsVault } from '../lib';
import { getSecretKeyList } from './get-secret-key-list';

const getTestVault = (vaultData: any) => {
  const result = createInMemorySecretsVault(JSON.stringify(vaultData));
  if (result.success) {
    return result.data;
  } else {
    throw new Error('Error creating in-memory test vault');
  }
};

describe('list-secret-keys command', () => {
  it('gets keys for vault', async () => {
    const vault = getTestVault({
      'secret-key-1': 'value-1',
      'secret-key-2': 'value-2',
      'secret-key-3': 'value-3',
    });
    const keys = await getSecretKeyList(vault);
    expect(keys).toEqual(['secret-key-1', 'secret-key-2', 'secret-key-3']);
  });

  it('returns empty array for empty vault', async () => {
    const vault = getTestVault({});
    const keys = await getSecretKeyList(vault);
    expect(keys).toEqual([]);
  });
});
