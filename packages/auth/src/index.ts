import { type User, type Session } from 'lucia';

import { type LoginGovOptions, LoginGov } from './provider.js';

export { BaseAuthContext } from './context/base.js';
export { type LoginGovOptions, LoginGov };
export { getProviderRedirect } from './services/get-provider-redirect.js';
export { logOut } from './services/logout.js';
export { processProviderCallback } from './services/process-provider-callback.js';
export { processSessionCookie } from './services/process-session-cookie.js';
export { User, Session };
export type { AuthServiceContext } from './services/index.js';

export type UserSession = {
  user: User | null;
  session: Session | null;
};
