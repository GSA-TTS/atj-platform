import { generateCodeVerifier, generateState } from 'arctic';
import { AuthContext } from '..';

export const getProviderRedirect = async (ctx: AuthContext) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await ctx.provider.createAuthorizationURL(state, codeVerifier);
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
        sameSite: false,
      },
    ],
    url,
  };
};
