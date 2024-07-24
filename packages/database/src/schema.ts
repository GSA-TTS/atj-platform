import { type Knex } from 'knex';

export const migrateDatabase = async (db: Knex) => {
  return await db.migrate.latest();
};

export const rollbackDatabase = async (db: Knex) => {
  return await db.migrate.rollback(undefined, true);
};
