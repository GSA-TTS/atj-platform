import { Cookie, Lucia } from 'lucia';

import { createService } from '@atj/common';

import {
  type UserSession,
  getProviderRedirect,
  logOut,
  processProviderCallback,
  processSessionCookie,
} from '../index.js';
import { LoginGov } from '../provider.js';
import { type AuthRepository } from '../repository/index.js';

export type AuthServiceContext = {
  db: AuthRepository;
  provider: LoginGov;
  getCookie: (name: string) => string | undefined;
  setCookie: (cookie: Cookie) => void;
  setUserSession: (userSession: UserSession) => void;
  getLucia: () => Promise<Lucia>;
  isUserAuthorized: (email: string) => Promise<boolean>;
};

export const createAuthService = (ctx: AuthServiceContext) =>
  createService(ctx, {
    getProviderRedirect,
    logOut,
    processProviderCallback,
    processSessionCookie,
  });

export type AuthService = Omit<
  ReturnType<typeof createAuthService>,
  'getContext'
>;
