import type { APIContext } from 'astro';

import { logOut } from '@atj/auth';
import { getAstroAppContext } from '../../context';

export async function POST(context: APIContext): Promise<Response> {
  const { auth } = await getAstroAppContext(context);
  return logOut(auth, context.locals.session);
}
