import { Kysely, SqliteDialect } from 'kysely';
import BetterSqliteDatabase, {
  type Database as SqliteDatabase,
} from 'better-sqlite3';

import { type Database } from './types';

type TestDatabase = {
  kysely: Kysely<Database>;
  sqlite: SqliteDatabase;
};

export const createInMemoryDatabase = (): TestDatabase => {
  const database = new BetterSqliteDatabase(':memory:');
  return {
    kysely: new Kysely<Database>({
      dialect: new SqliteDialect({
        database,
      }),
    }),
    sqlite: database,
  };
};

export const createSqliteDatabase = (database: SqliteDatabase) => {
  return new Kysely<Database>({
    dialect: new SqliteDialect({
      database,
    }),
  });
};
