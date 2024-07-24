import { Kysely, SqliteDialect } from 'kysely';
import BetterSqliteDatabase, {
  Database as SqliteDatabase,
} from 'better-sqlite3';

import { type Database } from './types';

type TestDatabase = {
  kysely: Kysely<Database>;
  sqlite: SqliteDatabase;
};

export const createTestDatabase = (userDb?: SqliteDatabase): TestDatabase => {
  const database = userDb ?? new BetterSqliteDatabase(':memory:');
  return {
    kysely: new Kysely<Database>({
      dialect: new SqliteDialect({
        database,
      }),
    }),
    sqlite: database,
  };
};
