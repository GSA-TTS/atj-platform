import type { APIContext } from 'astro';
import { getAstroAppContext } from '../../context';

export async function POST(context: APIContext): Promise<Response> {
  if (!context.locals.session) {
    return new Response(null, {
      status: 401,
    });
  }

  const { database } = await getAstroAppContext(context);
  const lucia = await database.getLucia();

  await lucia.invalidateSession(context.locals.session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response();
}
