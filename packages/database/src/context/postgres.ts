import { type Knex } from 'knex';
import { type Kysely } from 'kysely';

import { getPostgresKnex } from '../clients/knex.js';
import { type Database } from '../clients/kysely/index.js';
import { migrateDatabase } from '../management/migrate-database.js';

import { type DatabaseContext } from './types.js';

export class PostgresDatabaseContext implements DatabaseContext {
  knex?: Knex;
  kysely?: Kysely<Database>;

  constructor(private connectionUri: string) {}

  async getKnex() {
    if (!this.knex) {
      this.knex = getPostgresKnex(this.connectionUri);
    }
    return this.knex;
  }

  async getKysely(): Promise<Kysely<Database>> {
    throw new Error('Not implemented');
    /*
    if (!this.kysely) {
      const sqlite3 = await this.getSqlite3();
      this.kysely = createSqliteDatabase(sqlite3);
    }
    return this.kysely;
    */
  }
}

export const createPostgresDatabaseContext = async (connectionUri: string) => {
  const ctx = new PostgresDatabaseContext(connectionUri);
  await migrateDatabase(ctx);
  return ctx;
};
