import { Cookie, Lucia } from 'lucia';

import {
  type TestDatabaseContext,
  createTestDatabaseContext,
} from '@atj/database';

import { type AuthContext, type UserSession } from '..';
import { createTestLuciaAdapter } from '../lucia';
import { LoginGov } from '../provider';

export const createTestAuthContext = async () => {
  const database = await createTestDatabaseContext();
  return new TestAuthContext(
    database,
    new LoginGov({
      loginGovUrl: 'https://idp.int.identitysandbox.gov',
      clientId:
        'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
      clientSecret: 'super-secret',
      redirectURI: 'http://www.10x.gov/a2j/signin/callback',
    }),
    function getCookie(name) {
      return '';
    },
    function setCookie(cookie) {},
    function setUserSession({ user, session }) {}
  );
};

export class TestAuthContext implements AuthContext {
  private lucia?: Lucia;

  constructor(
    public database: TestDatabaseContext,
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
