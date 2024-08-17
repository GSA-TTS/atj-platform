import { type Session } from 'lucia';
import { type AuthContext } from '..';

export const logOut = async (ctx: AuthContext, session: Session) => {
  const lucia = await ctx.getLucia();
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  return sessionCookie;
};
