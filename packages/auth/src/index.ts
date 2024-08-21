import { type Cookie, type User, type Session, type Lucia } from 'lucia';

import { type AuthRepository } from '@atj/database';

export { BaseAuthContext } from './context/base';
import { type LoginGovOptions, LoginGov } from './provider';
export { type LoginGovOptions, LoginGov };
export { getProviderRedirect } from './services/get-provider-redirect';
export { logOut } from './services/logout';
export { processProviderCallback } from './services/process-provider-callback';
export { processSessionCookie } from './services/process-session-cookie';
export { User, Session };

export type UserSession = {
  user: User | null;
  session: Session | null;
};

export type AuthContext = {
  db: AuthRepository;
  provider: LoginGov;
  getCookie: (name: string) => string | undefined;
  setCookie: (cookie: Cookie) => void;
  setUserSession: (userSession: UserSession) => void;
  getLucia: () => Promise<Lucia>;
  isUserAuthorized: (email: string) => Promise<boolean>;
};
