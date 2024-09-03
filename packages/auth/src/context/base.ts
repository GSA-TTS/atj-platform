import { Cookie, Lucia } from 'lucia';

import { type AuthServiceContext, type UserSession } from '../index.js';
import {
  createPostgresLuciaAdapter,
  createSqliteLuciaAdapter,
} from '../lucia.js';
import { LoginGov } from '../provider.js';
import { type AuthRepository } from '../repository/index.js';

export class BaseAuthContext implements AuthServiceContext {
  private lucia?: Lucia;

  constructor(
    public db: AuthRepository,
    public provider: LoginGov,
    public getCookie: (name: string) => string | undefined,
    public setCookie: (cookie: Cookie) => void,
    public setUserSession: (userSession: UserSession) => void,
    public isUserAuthorized: (email: string) => Promise<boolean>
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
