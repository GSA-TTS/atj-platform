import { describe, expect, it } from 'vitest';

import { getSecret } from './get-secret';
import { createInMemorySecretsVault } from '../lib';

const getTestVault = (vaultData: any) => {
  const result = createInMemorySecretsVault(JSON.stringify(vaultData));
  if (result.success) {
    return result.data;
  } else {
    throw new Error('Error creating in-memory test vault');
  }
};

describe('get-secret command', () => {
  it('gets existing value', async () => {
    const vault = getTestVault({
      'secret-key-1': 'value-1',
    });
    const value = await getSecret(vault, 'secret-key-1');
    expect(value).toEqual('value-1');
  });

  it('return undefined with non-existing value', async () => {
    const vault = getTestVault({
      'secret-key-1': 'value-1',
    });
    const value = await getSecret(vault, 'secret-key-2');
    expect(value).toEqual(undefined);
  });
});
