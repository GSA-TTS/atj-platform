import { Cookie, Lucia } from 'lucia';

import { type DevDatabaseContext } from '@atj/database';

import { type AuthContext, type UserSession } from '..';
import { createTestLuciaAdapter } from '../lucia';
import { LoginGov } from '../provider';

export class DevAuthContext implements AuthContext {
  private lucia?: Lucia;

  constructor(
    public database: DevDatabaseContext,
    public provider: LoginGov,
    public getCookie: (name: string) => string | undefined,
    public setCookie: (cookie: Cookie) => void,
    public setUserSession: (userSession: UserSession) => void
  ) {}

  async getLucia() {
    const sqlite3Adapter = createTestLuciaAdapter(
      await this.database.getSqlite3()
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
