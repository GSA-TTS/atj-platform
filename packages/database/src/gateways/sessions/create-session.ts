import { randomUUID } from 'crypto';

import { type SessionSchema } from '../../schema';
import { type DatabaseContext } from '../../context/types';

type Session = {
  id: string;
  expiresAt: Date;
  sessionToken: string;
  userId: string;
};

export const createSession = async (ctx: DatabaseContext, session: Session) => {
  const db = await ctx.getKysely();
  const result = await db.transaction().execute(async trx => {
    return await trx
      .insertInto('sessions')
      .values({
        id: session.id,
        expires_at: Math.floor(session.expiresAt.getTime() / 1000),
        session_token: session.sessionToken,
        user_id: session.userId,
        //...session.attributes,
      })
      .execute();
  });
  if (result.length === 0) {
    return null;
  }
  return session.id;
};
