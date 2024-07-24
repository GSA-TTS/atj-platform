import { describe, expect, it } from 'vitest';

import { createUser } from './create-user';
import { createTestDatabase } from '../clients/kysely';
import { getTestKnex } from '../clients/knex';
import { migrateDatabase } from '../schema';

describe('create user', () => {
  it('', async () => {
    const knex = getTestKnex();
    await migrateDatabase(knex);
    const db = createTestDatabase(await knex.client.acquireConnection());
    const resultUser = await createUser(db.kysely, 'new-user@email.com');
    if (resultUser === null) {
      expect.fail('User was not created');
    }

    const insertedUser = await db.kysely
      .selectFrom('users')
      .select(['email', 'id'])
      .where('id', '=', resultUser.id)
      .executeTakeFirst();

    expect(resultUser.id).not.to.be.null;
    expect(insertedUser?.id).toEqual(resultUser.id);
  });
});
