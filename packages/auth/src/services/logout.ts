import { type Session } from 'lucia';
import { type AuthServiceContext } from './index.js';

export const logOut = async (ctx: AuthServiceContext, session: Session) => {
  const lucia = await ctx.getLucia();
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  return sessionCookie;
};
