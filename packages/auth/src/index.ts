import { type Cookie, type User, type Session, type Lucia } from 'lucia';

import { type DatabaseGateway } from '@atj/database';

export { DevAuthContext } from './context/dev';
import { type LoginGovOptions, LoginGov } from './provider';
export { type LoginGovOptions, LoginGov };
export { getProviderRedirect } from './services/get-provider-redirect';
export { logOut } from './services/logout';
export { processProviderCallback } from './services/process-provider-callback';
export { processSessionCookie } from './services/process-session-cookie';

// Need to move Lucia into the auth module in order to access these types.
export type UserSession = {
  user: User | null;
  session: Session | null;
};

export type AuthContext = {
  db: DatabaseGateway;
  provider: LoginGov;
  getCookie: (name: string) => string | undefined;
  setCookie: (cookie: Cookie) => void;
  setUserSession: (userSession: UserSession) => void;
  getLucia: () => Promise<Lucia>;
};
