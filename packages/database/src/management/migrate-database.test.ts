import { expect, it } from 'vitest';

import { type DbTestContext, describeDatabase } from '../testing';
import { migrateDatabase } from './migrate-database';

describeDatabase('Knex migrations', () => {
  it<DbTestContext>('migrate and rollback successfully', async ({ db }) => {
    const rollback = await migrateDatabase(db.ctx);
    const knex = await db.ctx.getKnex();
    expect(await knex.schema.hasTable('users')).to.be.true;
    expect(await knex.schema.hasTable('sessions')).to.be.true;

    await rollback();
    expect(await knex.schema.hasTable('users')).to.be.false;
    expect(await knex.schema.hasTable('sessions')).to.be.false;

    await knex.destroy();
  });
});
