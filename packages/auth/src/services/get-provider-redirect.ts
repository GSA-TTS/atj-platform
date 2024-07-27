import { generateCodeVerifier, generateState } from 'arctic';
import { AuthContext } from '..';

export const getProviderRedirect = async (
  ctx: AuthContext,
  setCookie: (key: string, value: string, sameSite: 'lax' | false) => void
) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await ctx.provider.createAuthorizationURL(state, codeVerifier);

  setCookie('oauth_state', state, 'lax');
  setCookie('code_verifier', codeVerifier, false);

  return Response.redirect(url.toString());
};
