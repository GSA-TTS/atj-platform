import { generateCodeVerifier, generateState } from 'arctic';
import type { APIContext } from 'astro';

import { loginGov } from '../../lib/auth/sessions';

export async function GET(context: APIContext): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await loginGov.createAuthorizationURL(state, codeVerifier);

  context.cookies.set('oauth_state', state, {
    path: '/',
    secure: import.meta.env.PROD,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });
  context.cookies.set('code_verifier', codeVerifier, {
    secure: import.meta.env.PROD,
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10,
  });

  return context.redirect(url.toString());
}
