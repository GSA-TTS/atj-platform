import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { Database as Sqlite3Database } from 'better-sqlite3';

export const createTestLuciaAdapter = (db: Sqlite3Database) => {
  const adapter = new BetterSqlite3Adapter(db, {
    user: 'users',
    session: 'sessions',
  });
  return adapter;
};
