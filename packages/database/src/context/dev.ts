import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { Database as SqliteDatabase } from 'better-sqlite3';
import knex, { type Knex } from 'knex';
import { type Kysely } from 'kysely';

import { type Database, createSqliteDatabase } from '../clients/kysely';
import { migrateDatabase } from '../management';

import { type DatabaseContext } from './types';

const getDirname = () => dirname(fileURLToPath(import.meta.url));
const migrationsDirectory = path.resolve(getDirname(), '../../migrations');

export class DevDatabaseContext implements DatabaseContext {
  knex?: Knex;
  kysely?: Kysely<Database>;
  sqlite3?: SqliteDatabase;

  constructor(private path: string) {}

  async getKnex() {
    if (!this.knex) {
      this.knex = knex({
        client: 'better-sqlite3',
        connection: {
          filename: this.path,
        },
        pool: {
          min: 1,
          max: 20,
        },
        useNullAsDefault: true,
        migrations: {
          directory: migrationsDirectory,
          loadExtensions: ['.mjs'],
        },
      });
    }
    return this.knex;
  }

  async getSqlite3(): Promise<SqliteDatabase> {
    const knex = await this.getKnex();
    return await knex.client.acquireConnection();
  }

  async getKysely() {
    if (!this.kysely) {
      const sqlite3 = await this.getSqlite3();
      this.kysely = createSqliteDatabase(sqlite3);
    }
    return this.kysely;
  }
}

export const createDevDatabaseContext = async (path: string) => {
  const ctx = new DevDatabaseContext(path);
  await migrateDatabase(ctx);
  return ctx;
};
