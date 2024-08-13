import { describe, expect, it } from 'vitest';

import { createInMemoryDatabaseContext } from '../../context/test';
import { createSession } from './create-session';
import { createUser } from '../users/create-user';

describe('create session', () => {
  it('fails with unknown userId', async () => {
    const ctx = await createInMemoryDatabaseContext();
    expect(() =>
      createSession(ctx, {
        id: '1',
        expiresAt: new Date(),
        sessionToken: 'token',
        userId: 'user-id',
      })
    ).rejects.toThrow();
  });

  it('works with existing user', async () => {
    const ctx = await createInMemoryDatabaseContext();
    const user = await createUser(ctx, 'user@test.gov');
    if (user === null) {
      expect.fail('User was not created');
    }
    const sessionId = await createSession(ctx, {
      id: '1',
      expiresAt: new Date(),
      sessionToken: 'token',
      userId: user.id,
    });
    if (sessionId === null) {
      expect.fail('Session was not created');
    }

    const db = await ctx.getKysely();
    const insertedSession = await db
      .selectFrom('sessions')
      .select(['id'])
      .where('id', '=', sessionId)
      .executeTakeFirst();
    expect(insertedSession?.id).toEqual(sessionId);
  });
});
