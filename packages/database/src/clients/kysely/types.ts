import type {
  Generated,
  Insertable,
  Kysely,
  Selectable,
  Updateable,
} from 'kysely';

export interface Database {
  users: UsersTable;
  sessions: SessionsTable;
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

interface SessionsTable {
  id: string;
  user_id: string;
  session_token: string;
  expires_at: Date;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}
export type SessionsSelectable = Selectable<SessionsTable>;
export type SessionsInsertable = Insertable<SessionsTable>;
export type SessionsUpdateable = Updateable<SessionsTable>;

export type DatabaseClient = Kysely<Database>;
