import { verifyRequestOrigin } from 'lucia';

import { type VoidResult } from '@atj/common';

import { type AuthContext } from '..';

export const processSessionCookie = async (
  ctx: AuthContext,
  request: Request
): Promise<VoidResult<{ status: number }>> => {
  if (request.method !== 'GET') {
    const originHeader = request.headers.get('Origin');
    const hostHeader = request.headers.get('Host');
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return {
        success: false,
        error: {
          status: 403,
        },
      };
    }
  }
  const lucia = await ctx.getLucia();

  const sessionId = ctx.getCookie(lucia.sessionCookieName);
  if (!sessionId) {
    ctx.setUserSession({ user: null, session: null });
    return {
      success: true,
    };
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    ctx.setCookie(sessionCookie);
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    ctx.setCookie(sessionCookie);
  }
  ctx.setUserSession({ user, session });
  return {
    success: true,
  };
};
