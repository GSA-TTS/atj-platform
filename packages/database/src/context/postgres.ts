import { type Knex } from 'knex';
import { type Kysely } from 'kysely';

import { getPostgresKnex } from '../clients/knex.js';
import { type Database } from '../clients/kysely/types.js';
import { createPostgresDatabase } from '../clients/kysely/postgres.js';
import { migrateDatabase } from '../management/migrate-database.js';

import { type DatabaseContext } from './types.js';

export class PostgresDatabaseContext implements DatabaseContext {
  public readonly engine = 'postgres';
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
    if (!this.kysely) {
      this.kysely = createPostgresDatabase(this.connectionUri);
    }
    return this.kysely;
  }

  async destroy() {
    if (this.kysely) {
      await this.kysely.destroy();
    }
    if (this.knex) {
      await this.knex.destroy();
    }
  }
}

export const createPostgresDatabaseContext = async (connectionUri: string) => {
  const ctx = new PostgresDatabaseContext(connectionUri);
  await migrateDatabase(ctx);
  return ctx;
};
