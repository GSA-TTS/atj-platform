import type { APIContext } from 'astro';
import { getProviderRedirect } from '@atj/auth';

import { getAstroAppContext } from '../../context';

export async function GET(context: APIContext): Promise<Response> {
  const { auth } = await getAstroAppContext(context);
  return getProviderRedirect(auth, (key, value, sameSite) => {
    context.cookies.set(key, value, {
      path: '/',
      secure: import.meta.env.PROD,
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite,
    });
  });
}
