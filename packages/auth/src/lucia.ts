import { NodePostgresAdapter } from '@lucia-auth/adapter-postgresql';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { type Database as Sqlite3Database } from 'better-sqlite3';
import { Lucia } from 'lucia';

import { type Database } from '@atj/database';

export const createSqliteLuciaAdapter = (db: Sqlite3Database) => {
  const adapter = new BetterSqlite3Adapter(db, {
    user: 'users',
    session: 'sessions',
  });
  return adapter;
};

export const createPostgresLuciaAdapter = (pgPool: any) => {
  const adapter = new NodePostgresAdapter(pgPool, {
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

/*
export class KyselyAdapter implements Adapter {
  getSessionAndUser(
    sessionId: string
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    throw new Error('Method not implemented.');
  }
  getUserSessions(userId: string): Promise<DatabaseSession[]> {
    throw new Error('Method not implemented.');
  }
  setSession(session: DatabaseSession): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteSession(sessionId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteUserSessions(userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteExpiredSessions(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
*/
