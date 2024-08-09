import { Cookie, Lucia } from 'lucia';
import { vi } from 'vitest';

import {
  type DatabaseGateway,
  createTestDatabaseContext,
  createDatabaseGateway,
} from '@atj/database';

import { type AuthContext, type UserSession } from '..';
import { createTestLuciaAdapter } from '../lucia';
import { LoginGov } from '../provider';

type Options = {
  getCookie: (name: string) => string | undefined;
  setCookie: (cookie: Cookie) => void;
  setUserSession: (userSession: UserSession) => void;
};

export const createTestAuthContext = async (opts?: Partial<Options>) => {
  const options: Options = {
    getCookie: opts?.getCookie || vi.fn(),
    setCookie: opts?.setCookie || vi.fn(),
    setUserSession: opts?.setUserSession || vi.fn(),
  };
  const dbContext = await createTestDatabaseContext();
  const database = createDatabaseGateway(dbContext);
  return new TestAuthContext(
    database,
    new LoginGov({
      loginGovUrl: 'https://idp.int.identitysandbox.gov',
      clientId:
        'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
      clientSecret: 'super-secret',
      redirectURI: 'http://www.10x.gov/a2j/signin/callback',
    }),
    options.getCookie,
    options.setCookie,
    options.setUserSession
  );
};

export class TestAuthContext implements AuthContext {
  private lucia?: Lucia;

  constructor(
    public db: DatabaseGateway,
    public provider: LoginGov,
    public getCookie: (name: string) => string | undefined,
    public setCookie: (cookie: Cookie) => void,
    public setUserSession: (userSession: UserSession) => void
  ) {}

  async getLucia() {
    const sqlite3 = await (this.db.getContext() as any).getSqlite3();
    const sqlite3Adapter = createTestLuciaAdapter(sqlite3);
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
