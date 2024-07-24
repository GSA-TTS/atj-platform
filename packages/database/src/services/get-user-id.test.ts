import { randomUUID } from 'crypto';
import { describe, expect, it } from 'vitest';

import { createTestDatabase } from '../clients/kysely';
import { getTestKnex } from '../clients/knex';
import { migrateDatabase } from '../schema';

import { getUserId } from './get-user-id';

describe('get user id', () => {
  it('returns null for non-existent user', async () => {
    const knex = getTestKnex();
    await migrateDatabase(knex);
    const db = createTestDatabase(await knex.client.acquireConnection());

    const userId = await getUserId(db.kysely, 'new-user@email.com');
    expect(userId).to.be.null;
  });

  it('returns null for non-existent user', async () => {
    const knex = getTestKnex();
    await migrateDatabase(knex);
    const db = createTestDatabase(await knex.client.acquireConnection());
    const id = randomUUID();
    await db.kysely
      .insertInto('users')
      .values({
        id,
        email: 'user@agency.gov',
      })
      .executeTakeFirst();

    const userId = await getUserId(db.kysely, 'user@agency.gov');
    expect(userId).not.to.be.null;
    expect(userId).to.be.equal(id);
  });
});
