import { type Database as SqliteDatabase } from 'better-sqlite3';
import { type Knex } from 'knex';
import { type Kysely } from 'kysely';

import { getTestKnex } from '../clients/knex';
import { type Database, createSqliteDatabase } from '../clients/kysely';
import { migrateDatabase } from '../management/migrate-database';

import { type DatabaseContext } from './types';

export class TestDatabaseContext implements DatabaseContext {
  knex?: Knex;
  kysely?: Kysely<Database>;
  sqlite3?: SqliteDatabase;

  constructor() {}

  async getKnex() {
    if (!this.knex) {
      this.knex = getTestKnex();
    }
    return this.knex;
  }

  async getSqlite3(): Promise<SqliteDatabase> {
    const knex = await this.getKnex();
    if (!this.sqlite3) {
      this.sqlite3 = (await knex.client.acquireConnection()) as SqliteDatabase;
    }
    return this.sqlite3;
  }

  async getKysely() {
    if (!this.kysely) {
      const sqlite3 = await this.getSqlite3();
      this.kysely = createSqliteDatabase(sqlite3);
    }
    return this.kysely;
  }
}

export const createTestDatabaseContext = async () => {
  const ctx = new TestDatabaseContext();
  await migrateDatabase(ctx);
  return ctx;
};
