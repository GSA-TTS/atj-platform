import { beforeEach, describe, expect, it, vi } from 'vitest';

import { processProviderCallback } from './process-provider-callback';
import { createTestAuthContext } from '../context/test';
import { AuthContext } from '..';

describe('processProviderCallback', () => {
  let ctx: AuthContext;

  beforeEach(async () => {
    // Set up global mocks
    //fetchMock.resetMocks();

    // Create test auth context with a test user in the db
    ctx = await createTestAuthContext();
    const user = await ctx.db.createUser('fake-user@gsa.com');
    if (!user) {
      expect.fail('error creating test user');
    }

    // Mock the response from login.gov's `userinfo` endpoint.
    fetchMock.doMock(async request => {
      if (request.url.endsWith('/api/openid_connect/token')) {
        return JSON.stringify({
          access_token: 'x1lKd1e3CIrsSN_rnu85SQ',
          refresh_token: null,
          id_token:
            'eyJraWQiOiJmNWNlMTIzOWUzOWQzZGE4MzZmOTYzYmNjZDg1Zjg1ZDU3ZDQzMzVjZmRjNmExNzAzOWYyNzQzNjFhMThiMTNjIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI5YmY3MzRjNC01NGE0LTQ0MDYtYjJmMS00ZjBjNDZjMmE0YTYiLCJpc3MiOiJodHRwczovL2lkcC5pbnQuaWRlbnRpdHlzYW5kYm94Lmdvdi8iLCJlbWFpbCI6ImRhbmllbC5uYWFiQGdzYS5nb3YiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaWFsIjoiaHR0cDovL2lkbWFuYWdlbWVudC5nb3YvbnMvYXNzdXJhbmNlL2lhbC8xIiwiYWFsIjoidXJuOmdvdjpnc2E6YWM6Y2xhc3NlczpzcDpQYXNzd29yZFByb3RlY3RlZFRyYW5zcG9ydDpkdW8iLCJub25jZSI6InQwajVBWTVrNG9MQWN4ZmFaZFJzTWZWWkdCQ2dCamxmaWhnb1ZxMzRZR28iLCJhdWQiOiJ1cm46Z292OmdzYTpvcGVuaWRjb25uZWN0LnByb2ZpbGVzOnNwOnNzbzpnc2E6dHRzLTEweC1hdGotZGV2LXNlcnZlci1kb2oiLCJqdGkiOiIyeEpaYlBsMmYxQlpxZmhhUG5aUlhBIiwiYXRfaGFzaCI6Im91U3JIdWhFQTdYX25UZ0VIeUlrM3ciLCJjX2hhc2giOiJWOUNDb1l1TElhTFd3VUZRelZwNS1RIiwiYWNyIjoiaHR0cDovL2lkbWFuYWdlbWVudC5nb3YvbnMvYXNzdXJhbmNlL2lhbC8xIiwiZXhwIjoxNzIyNTcxNTY4LCJpYXQiOjE3MjI1NzA2NjgsIm5iZiI6MTcyMjU3MDY2OH0.Aa8zNA5VyPAOR5hHObiO1c1n4Y2Tu43FF4ec4sgz2GEuHmr-N6q4OSg1icB7v7dX0Ekd2CrjieXx4p9qOE0UxNcEK6bXL0hpfmeu5qn3g6I435hyw-XNFw5QF7MCZD7tjwYSva6IVVmTsjPCELekcK1n_CzGXe31FiRVgyxyw9nttkymsAh48FxWzla2_PLcA4bwuSEJLwx_-YIYbvgEfVkqd1vcaK2QWr1grlIYFpsyobFFd8duBVco9UdJVuH_aBNjF92zZRG0CKLFnxF6AXP7iE6JCm0z8ppnA2__r3l-O9KPkOYe73D-K2U-kL_-aBpWPL1eioNTxG7Ah8ZDSg',
        });
      } else if (request.url.endsWith('/api/openid_connect/userinfo')) {
        return JSON.stringify({
          sub: 'ignored',
          iss: 'ignored',
          email: 'fake-user@gsa.gov',
          email_verified: true,
          ial: 'ignored',
          aal: 'ignored',
        });
      } else if (request.url.includes('openid_connect/authorize')) {
        throw new Error('authorize endpoint: todo');
      }
      throw new Error(`unexpected url: ${request.url}`);
    });
  });

  it('works with matching verification codes', async () => {
    const ctx = await createTestAuthContext();
    const result = await processProviderCallback(
      ctx,
      {
        code: 'params-code',
        state: 'params-state',
      },
      {
        code: 'params-code',
        state: 'params-state',
        nonce: 't0j5AY5k4oLAcxfaZdRsMfVZGBCgBjlfihgoVq34YGo',
      }
    );
    expect(result).toEqual(
      expect.objectContaining({
        success: true,
        data: {
          email: 'fake-user@gsa.gov',
          sessionCookie: {
            name: 'auth_session',
            value: expect.any(String),
            attributes: {
              httpOnly: true,
              secure: false,
              sameSite: 'lax',
              path: '/',
              maxAge: 2592000,
            },
          },
        },
      })
    );
  });

  it('fails with non-matching verification codes', async () => {
    const ctx = await createTestAuthContext();
    vi.setSystemTime(new Date(2024, 1, 1));
    const result = await processProviderCallback(
      ctx,
      {
        code: 'params-code',
        state: 'params-state',
      },
      {
        code: 'cookie-stored-code',
        state: 'cookie-stored-state',
        nonce: '123456789012345678901234567890',
      }
    );
    expect(result).toEqual({
      success: false,
      error: {
        message: 'bad request',
        status: 400,
      },
    });
  });
});
