import { describe, expect, it } from 'vitest';

import { createInMemoryDatabaseContext } from '../../context/in-memory';
import { createUser } from './create-user';

describe('create user', () => {
  it('works with unknown email address', async () => {
    const ctx = await createInMemoryDatabaseContext();
    const resultUser = await createUser(ctx, 'new-user@email.com');
    if (resultUser === null) {
      expect.fail('User was not created');
    }

    const db = await ctx.getKysely();
    const insertedUser = await db
      .selectFrom('users')
      .select(['email', 'id'])
      .where('id', '=', resultUser.id)
      .executeTakeFirst();

    expect(resultUser.id).not.to.be.null;
    expect(insertedUser?.id).toEqual(resultUser.id);
  });

  it('fails with known email address', async () => {
    const ctx = await createInMemoryDatabaseContext();
    const existingUserResult = await createUser(ctx, 'new-user@email.com');
    if (existingUserResult === null) {
      expect.fail('User was not created');
    }
    const resultUser = await createUser(ctx, 'new-user@email.com');
    expect(resultUser).toBeNull();

    // Check that there is only one row in the users table
    const db = await ctx.getKysely();
    const insertedUser = await db
      .selectFrom('users')
      .select(db.fn.count('id').as('count'))
      .executeTakeFirst();
    expect(Number(insertedUser?.count)).toEqual(1);
  });
});
