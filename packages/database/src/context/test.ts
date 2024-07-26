import { Database as SqliteDatabase } from 'better-sqlite3';
import { type Knex } from 'knex';
import { type Kysely } from 'kysely';
import { Lucia } from 'lucia';

import { getTestKnex } from '../clients/knex';
import { type Database, createSqliteDatabase } from '../clients/kysely';
import { createTestLuciaAdapter } from '../clients/lucia';
import { migrateDatabase } from '../management';

import { type DatabaseContext } from './types';

export class TestDatabaseContext implements DatabaseContext {
  knex?: Knex;
  kysely?: Kysely<Database>;
  lucia?: Lucia;
  sqlite3?: SqliteDatabase;

  constructor() {}

  async getKnex() {
    if (!this.knex) {
      this.knex = getTestKnex();
    }
    return this.knex;
  }

  private async getSqlite3() {
    const knex = await this.getKnex();
    return (await knex.client.acquireConnection()) as SqliteDatabase;
  }

  async getKysely() {
    if (!this.kysely) {
      const sqlite3 = await this.getSqlite3();
      this.kysely = createSqliteDatabase(sqlite3);
    }
    return this.kysely;
  }

  async getLucia() {
    const sqlite3Adapter = createTestLuciaAdapter(await this.getSqlite3());
    if (!this.lucia) {
      this.lucia = new Lucia(sqlite3Adapter, {
        sessionCookie: {
          attributes: {
            secure: false,
          },
        },
        getUserAttributes: attributes => {
          return {
            email: attributes.email,
          };
        },
      });
    }
    return this.lucia;
  }
}

export const createTestDatabaseContext = async () => {
  const ctx = new TestDatabaseContext();
  await migrateDatabase(ctx);
  return ctx;
};
