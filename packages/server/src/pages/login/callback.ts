import type { APIContext } from 'astro';

import { processLoginGovCallback } from '@atj/auth';
import { getAstroAppContext } from '../../context';
import * as routes from '../../routes';

export async function GET(context: APIContext): Promise<Response> {
  const ctx = await getAstroAppContext(context);
  const result = await processLoginGovCallback(
    ctx.auth,
    {
      code: context.url.searchParams.get('code'),
      state: context.url.searchParams.get('state'),
    },
    {
      state: context.cookies.get('oauth_state')?.value || null,
      code: context.cookies.get('code_verifier')?.value || null,
    },
    routes.getHomeUrl(ctx.baseUrl)
  );
  if (!result.success) {
    return new Response(result.error.message, {
      status: result.error.status,
    });
  }
  context.cookies.set(
    result.data.sessionCookie.name,
    result.data.sessionCookie.value,
    result.data.sessionCookie.attributes
  );
  console.log('user logged in:', result.data.email);
  return context.redirect('/');
}
