import type {
  Generated,
  Insertable,
  Kysely,
  Selectable,
  Updateable,
} from 'kysely';
import { type DbDate } from './db-helpers';

export type Engine = 'sqlite' | 'postgres';

export interface Database<T extends Engine = Engine> {
  users: UsersTable;
  sessions: SessionsTable<T>;
}

interface UsersTable {
  id: string;
  email: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}
export type UsersSelectable = Selectable<UsersTable>;
export type UsersInsertable = Insertable<UsersTable>;
export type UsersUpdateable = Updateable<UsersTable>;

interface SessionsTable<T extends Engine> {
  id: string;
  user_id: string;
  session_token: string;
  expires_at: DbDate<T>;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}
export type SessionsSelectable<T extends Engine> = Selectable<SessionsTable<T>>;
export type SessionsInsertable<T extends Engine> = Insertable<SessionsTable<T>>;
export type SessionsUpdateable<T extends Engine> = Updateable<SessionsTable<T>>;

export type DatabaseClient = Kysely<Database>;
