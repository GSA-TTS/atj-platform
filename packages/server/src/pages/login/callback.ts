import type { APIContext } from 'astro';

import { processLoginGovCallback } from '../../lib/auth';

export async function GET(context: APIContext): Promise<Response> {
  const result = await processLoginGovCallback(
    {
      code: context.url.searchParams.get('code'),
      state: context.url.searchParams.get('state'),
    },
    {
      state: context.cookies.get('oauth_state')?.value || null,
      code: context.cookies.get('code_verifier')?.value || null,
    }
  );
  if (!result.success) {
    return new Response(result.error.message, {
      status: result.error.status,
    });
  }
  console.log('user logged in:', result.data.email);
  return context.redirect('/');
}

interface GitHubUser {
  id: string;
  login: string;
}
