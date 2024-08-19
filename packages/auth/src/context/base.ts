import { Cookie, Lucia } from 'lucia';

import { type DatabaseGateway } from '@atj/database';

import { type AuthContext, type UserSession } from '..';
import { createPostgresLuciaAdapter, createSqliteLuciaAdapter } from '../lucia';
import { LoginGov } from '../provider';

export class BaseAuthContext implements AuthContext {
  private lucia?: Lucia;

  constructor(
    public db: DatabaseGateway,
    public provider: LoginGov,
    public getCookie: (name: string) => string | undefined,
    public setCookie: (cookie: Cookie) => void,
    public setUserSession: (userSession: UserSession) => void
  ) {}

  async getLucia() {
    const sqlite3Adapter =
      this.db.getContext().engine === 'sqlite'
        ? createSqliteLuciaAdapter(
            await (this.db.getContext() as any).getSqlite3()
          )
        : createPostgresLuciaAdapter(
            await (this.db.getContext() as any).getPostgresPool()
          );
    if (!this.lucia) {
      this.lucia = new Lucia(sqlite3Adapter, {
        sessionCookie: {
          attributes: {
            secure: false,
          },
        },
        getUserAttributes: attributes => {
          return {
            email: attributes.email,
          };
        },
      });
    }
    return this.lucia;
  }
}
