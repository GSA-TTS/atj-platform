import { type Session } from 'lucia';
import { type AuthContext } from '..';

export const logOut = async (ctx: AuthContext, session: Session | null) => {
  if (!session) {
    return new Response(null, {
      status: 401,
    });
  }

  const lucia = await ctx.database.getLucia();
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  ctx.setCookie(sessionCookie);

  return new Response();
};
