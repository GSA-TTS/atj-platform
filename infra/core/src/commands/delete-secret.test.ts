import { describe, expect, it } from 'vitest';

import { createInMemorySecretsVault } from '../lib/index.js';
import { deleteSecret } from './delete-secret.js';

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
