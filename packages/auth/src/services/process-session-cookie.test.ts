import { randomUUID } from 'crypto';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createTestAuthContext } from '../context/test';
import { processSessionCookie } from './process-session-cookie';

describe('processSessionCookie', () => {
  const today = new Date(2020, 1, 1);
  const tenYearsAgo = new Date(2010, 1, 1);

  beforeEach(async () => {
    vi.setSystemTime(today);
  });

  it('sets null user session with unset session cookie', async () => {
    const mocks = {
      getCookie: vi.fn(() => undefined),
      setUserSession: vi.fn(),
    };
    const ctx = await createTestAuthContext(mocks);

    const result = await processSessionCookie(
      ctx,
      new Request('http://localhost', {
        headers: { Origin: 'http://localhost', Host: 'http://www.google.com' },
      })
    );

    expect(result.success).toEqual(true);
    expect(mocks.setUserSession).toHaveBeenCalledWith({
      session: null,
      user: null,
    });
  });

  it('resets session cookie and sets user session with fresh session cookie', async () => {
    const { ctx, mocks, sessionId, user } = await setUpTest(today);

    const result = await processSessionCookie(
      ctx,
      new Request('http://localhost', {
        headers: { Origin: 'http://localhost', Host: 'http://www.google.com' },
      })
    );

    expect(result.success).toEqual(true);
    expect(mocks.setCookie).toHaveBeenCalledWith(
      expect.objectContaining({
        attributes: {
          httpOnly: true,
          maxAge: 2592000,
          path: '/',
          sameSite: 'lax',
          secure: false,
        },
        name: 'auth_session',
        value: sessionId,
      })
    );
    expect(mocks.setUserSession).toHaveBeenCalledWith(
      expect.objectContaining({
        session: {
          expiresAt: expect.any(Date),
          fresh: true,
          id: sessionId,
          userId: user.id,
        },
        user: {
          email: 'user@test.gov',
          id: user.id,
        },
      })
    );
  });

  it('clears cookies with stale session cookie', async () => {
    const { ctx, mocks } = await setUpTest(tenYearsAgo);

    const result = await processSessionCookie(
      ctx,
      new Request('http://localhost', {
        headers: { Origin: 'http://localhost', Host: 'http://www.google.com' },
      })
    );

    expect(result.success).toEqual(true);
    expect(mocks.setCookie).toHaveBeenCalledWith(
      expect.objectContaining({
        attributes: {
          httpOnly: true,
          maxAge: 0,
          path: '/',
          sameSite: 'lax',
          secure: false,
        },
        name: 'auth_session',
        value: '',
      })
    );
    expect(mocks.setUserSession).toHaveBeenCalledWith(
      expect.objectContaining({
        session: null,
        user: null,
      })
    );
  });
});

const addOneDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
};

const setUpTest = async (sessionExpirationDate: Date) => {
  const mocks = {
    getCookie: vi.fn(() => sessionId || ''),
    setCookie: vi.fn(),
    setUserSession: vi.fn(),
  };
  const ctx = await createTestAuthContext(mocks);
  const user = await ctx.database.createUser('user@test.gov');
  if (!user) {
    expect.fail('error creating test user');
  }
  const sessionId = await ctx.database.createSession({
    id: randomUUID(),
    expiresAt: addOneDay(sessionExpirationDate),
    sessionToken: 'my-token',
    userId: user.id,
  });
  return { ctx, mocks, sessionId, user };
};
