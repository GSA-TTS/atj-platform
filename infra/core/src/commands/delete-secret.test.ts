import { describe, expect, it } from 'vitest';

import { createInMemorySecretsVault } from '../lib';
import { getSecretKeyList } from './get-secret-key-list';
import { deleteSecret } from './delete-secret';

const getTestVault = (vaultData: any) => {
  const result = createInMemorySecretsVault(JSON.stringify(vaultData));
  if (result.success) {
    return result.data;
  } else {
    throw new Error('Error creating in-memory test vault');
  }
};

describe('delete-secret command', () => {
  it('removes key', async () => {
    const vault = getTestVault({
      'secret-key-1': 'value-1',
    });
    await deleteSecret(vault, 'secret-key-1');
    expect(await vault.getSecretKeys()).toEqual([]);
  });

  it('silently handles non-existent keys', async () => {
    const vault = getTestVault({});
    await deleteSecret(vault, 'secret-key-1');
    expect(await vault.getSecretKeys()).toEqual([]);
  });
});
