import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { Database as Sqlite3Database } from 'better-sqlite3';
import { Lucia } from 'lucia';

import { type Database } from '@atj/database';

export const createTestLuciaAdapter = (db: Sqlite3Database) => {
  const adapter = new BetterSqlite3Adapter(db, {
    user: 'users',
    session: 'sessions',
  });
  return adapter;
};

declare module 'lucia' {
  interface Register {
    Lucia: Lucia;
    DatabaseUserAttributes: Omit<Database['users'], 'id'>;
  }
}
