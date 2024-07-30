import { describe, expect, it, vi } from 'vitest';

import { createTestAuthContext } from '../context/test';

import { logOut } from './logout';

describe('logOut database gateway', () => {
  it('works', async () => {
    const ctx = await createTestAuthContext();
    vi.setSystemTime(new Date(2024, 1, 1));
    const result = await logOut(ctx, {
      expiresAt: new Date(2024, 1, 2),
      fresh: true,
      id: 'session-id',
      userId: 'user-id',
    });
    expect(result).toEqual({
      attributes: {
        httpOnly: true,
        maxAge: 0,
        path: '/',
        sameSite: 'lax',
        secure: false,
      },
      name: 'auth_session',
      value: '',
    });
  });
});
