import { describe, expect, it } from 'vitest';

import { createTestAuthContext } from '../context/test.js';

import { getProviderRedirect } from './get-provider-redirect.js';

describe('getProviderRedirect database gateway', () => {
  it('returns cookies and redirect url', async () => {
    const ctx = await createTestAuthContext();
    const result = await getProviderRedirect(ctx);
    expect(Object.fromEntries(result.url.searchParams)).toEqual(
      expect.objectContaining({
        acr_values: 'http://idmanagement.gov/ns/assurance/ial/1',
        response_type: 'code',
        client_id:
          'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
        state: expect.any(String),
        scope: 'openid email',
        redirect_uri: 'http://www.10x.gov/a2j/signin/callback',
        code_challenge: expect.any(String),
        code_challenge_method: 'S256',
        nonce: expect.any(String),
      })
    );
    expect(result.cookies).toEqual([
      expect.objectContaining({
        name: 'oauth_state',
        sameSite: 'lax',
        value: expect.any(String),
      }),
      expect.objectContaining({
        name: 'code_verifier',
        sameSite: expect.any(Boolean),
        value: expect.any(String),
      }),
      expect.objectContaining({
        name: 'nonce_code',
        sameSite: 'lax',
        value: expect.any(String),
      }),
    ]);
  });
});
