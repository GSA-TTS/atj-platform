import { describe, expect, it } from 'vitest';

import { getTestKnex } from '../src/clients/knex';
import { migrateDatabase, rollbackDatabase } from '../src/schema';

describe('Knex migrations', {}, () => {
  it('migrate and rollback runs successfully', async () => {
    const db = getTestKnex();
    await migrateDatabase(db);
    expect(await db.schema.hasTable('users')).to.be.true;
    expect(await db.schema.hasTable('sessions')).to.be.true;

    await rollbackDatabase(db);
    expect(await db.schema.hasTable('users')).to.be.false;
    expect(await db.schema.hasTable('sessions')).to.be.false;

    await db.destroy();
  });
});
