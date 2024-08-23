import { describe, expect, it } from 'vitest';

import { setSecret } from './set-secret.js';
import { createInMemorySecretsVault } from '../lib/index.js';

const getTestVault = (vaultData: any) => {
  const result = createInMemorySecretsVault(JSON.stringify(vaultData));
  if (result.success) {
    return result.data;
  } else {
    throw new Error('Error creating in-memory test vault');
  }
};

describe('set-secret command', () => {
  it('sets existing value', async () => {
    const vault = getTestVault({
      'secret-key-1': 'value-1',
    });
    await setSecret(vault, 'secret-key-1', 'secret-value-updated');
    expect(await vault.getSecrets(await vault.getSecretKeys())).toEqual({
      'secret-key-1': 'secret-value-updated',
    });
  });

  it('sets unset value', async () => {
    const vault = getTestVault({
      'secret-key-1': 'value-1',
    });
    await setSecret(vault, 'secret-key-2', 'secret-value-updated');
    expect(await vault.getSecrets(await vault.getSecretKeys())).toEqual({
      'secret-key-1': 'value-1',
      'secret-key-2': 'secret-value-updated',
    });
  });
});
