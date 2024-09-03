import { generateCodeVerifier, generateState } from 'arctic';
import { type AuthServiceContext } from './index.js';

export const getProviderRedirect = async (ctx: AuthServiceContext) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const nonceCode = generateCodeVerifier();
  const url = await ctx.provider.createAuthorizationURL(state, codeVerifier, {
    nonce: nonceCode,
  });
  return {
    cookies: [
      {
        name: 'oauth_state',
        value: state,
        sameSite: 'lax' as const,
      },
      {
        name: 'code_verifier',
        value: codeVerifier,
        sameSite: false as const,
      },
      {
        name: 'nonce_code',
        value: nonceCode,
        sameSite: 'lax' as const,
      },
    ],
    url,
  };
};
