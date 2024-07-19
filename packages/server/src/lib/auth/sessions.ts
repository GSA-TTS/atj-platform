import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { Lucia } from 'lucia';

import { getServerSecrets } from '../../secrets';
import { type DatabaseUser, db } from '../db';
import { LoginGov } from './login-gov';

const adapter = new BetterSqlite3Adapter(db, {
  user: 'user',
  session: 'session',
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD,
    },
  },
  getUserAttributes: attributes => {
    return {
      email: attributes.email,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, 'id'>;
  }
}

const secrets = getServerSecrets((import.meta as any).env);

export const loginGov = new LoginGov({
  loginGovUrl: 'https://idp.int.identitysandbox.gov',
  clientId:
    'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
  clientSecret: secrets.loginGov.clientSecret,
  redirectURI: 'http://localhost:4322/login/callback',
});
