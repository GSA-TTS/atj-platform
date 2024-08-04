import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createUser } from '@atj/database';

import { processProviderCallback } from './process-provider-callback';
import { createTestAuthContext } from '../context/test';
import { AuthContext } from '..';

describe('processSessionCookie', () => {
  let ctx: AuthContext;

  it('works', async () => {
    const ctx = await createTestAuthContext();
    //processSessionCookie()
    expect(true).toBe(true);
  });
});
