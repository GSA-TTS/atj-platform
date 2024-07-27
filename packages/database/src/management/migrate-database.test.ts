import { describe, expect, it } from 'vitest';

import { createTestDatabaseContext } from '../context';

import { migrateDatabase } from './migrate-database';

describe('Knex migrations', {}, () => {
  it('migrate and rollback successfully', async () => {
    const ctx = await createTestDatabaseContext();
    const rollback = await migrateDatabase(ctx);
    const db = await ctx.getKnex();
    expect(await db.schema.hasTable('users')).to.be.true;
    expect(await db.schema.hasTable('sessions')).to.be.true;

    await rollback();
    expect(await db.schema.hasTable('users')).to.be.false;
    expect(await db.schema.hasTable('sessions')).to.be.false;

    await db.destroy();
  });
});