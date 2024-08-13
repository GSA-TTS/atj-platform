import { randomUUID } from 'crypto';
import { describe, expect, it } from 'vitest';

import { createInMemoryDatabaseContext } from '../../context/test';

import { getUserId } from './get-user-id';

describe('get user id', () => {
  it('returns null for non-existent user', async () => {
    const ctx = await createInMemoryDatabaseContext();
    const userId = await getUserId(ctx, 'new-user@email.com');
    expect(userId).to.be.null;
  });

  it('returns null for non-existent user', async () => {
    const ctx = await createInMemoryDatabaseContext();
    const id = randomUUID();

    const db = await ctx.getKysely();
    await db
      .insertInto('users')
      .values({
        id,
        email: 'user@agency.gov',
      })
      .executeTakeFirst();

    const userId = await getUserId(ctx, 'user@agency.gov');
    expect(userId).not.to.be.null;
    expect(userId).to.be.equal(id);
  });
});
