import { type Cookie } from 'lucia';

import { type DatabaseContext } from '@atj/database';

import { LoginGov } from './provider';
export { LoginGov };
export { getProviderRedirect } from './services/get-provider-redirect';
export { logOut } from './services/logout';
export { processLoginGovCallback } from './services/process-provider-callback';

export type AuthContext = {
  database: DatabaseContext;
  provider: LoginGov;
  setCookie: (cookie: Cookie) => void;
};
