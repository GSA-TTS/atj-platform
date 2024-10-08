import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { type APIContext, type AstroGlobal } from 'astro';

import {
  type AuthRepository,
  type AuthServiceContext,
  type LoginGovOptions,
  createAuthRepository,
} from '@atj/auth';
import { type DatabaseContext } from '@atj/database';
import {
  type FormConfig,
  type FormService,
  createFormsRepository,
  createFormService,
  defaultFormConfig,
} from '@atj/forms';

import { type GithubRepository } from './lib/github.js';

export type AppContext = {
  auth: AuthServiceContext;
  baseUrl: `${string}/`;
  formConfig: FormConfig;
  formService: FormService;
  github: GithubRepository;
  title: string;
  uswdsRoot: `${string}/`;
};

export type ServerOptions = {
  title: string;
  db: DatabaseContext;
  loginGovOptions: LoginGovOptions;
  isUserAuthorized: (email: string) => Promise<boolean>;
};

export const getAstroAppContext = async (Astro: any): Promise<AppContext> => {
  if (!Astro.locals.ctx) {
    Astro.locals.ctx = await createAstroAppContext(Astro, import.meta.env);
  }
  return Astro.locals.ctx;
};

const createAstroAppContext = async (
  Astro: AstroGlobal | APIContext,
  env: any
): Promise<AppContext> => {
  const serverOptions = await getServerOptions(Astro);
  return {
    auth: await createDefaultAuthContext({
      Astro,
      authRepository: createAuthRepository(serverOptions.db),
      loginGovOptions: serverOptions.loginGovOptions,
      isUserAuthorized: serverOptions.isUserAuthorized,
    }),
    baseUrl: env.BASE_URL,
    formConfig: defaultFormConfig,
    formService: createFormService({
      repository: createFormsRepository(serverOptions.db),
      config: defaultFormConfig,
      isUserLoggedIn: () => !!getUserSession(Astro).user,
    }),
    github: env.GITHUB,
    title: serverOptions.title,
    uswdsRoot: `${env.BASE_URL}uswds/`,
  };
};

const getDefaultServerOptions = async (): Promise<ServerOptions> => {
  const { createFilesystemDatabaseContext } = await import(
    '@atj/database/context'
  );
  const db = await createFilesystemDatabaseContext(
    join(dirname(fileURLToPath(import.meta.url)), '../main.db')
  );
  return {
    title: 'Form Service',
    db,
    loginGovOptions: {
      loginGovUrl: 'https://idp.int.identitysandbox.gov',
      clientId:
        'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
      //clientSecret: import.meta.env.SECRET_LOGIN_GOV_PRIVATE_KEY,
      redirectURI: 'http://localhost:4322/signin/callback',
    },
    isUserAuthorized: async (_email: string) => {
      return true;
    },
  };
};

const getServerOptions = async (Astro: AstroGlobal | APIContext) => {
  return Astro.locals.serverOptions || (await getDefaultServerOptions());
};

const getOriginFromRequest = (Astro: AstroGlobal | APIContext) => {
  const url = new URL(Astro.request.url);
  const scheme = url.protocol;
  const hostname = url.hostname;
  const port = url.port;
  return `${scheme}//${hostname}${port ? `:${port}` : ''}`;
};

const createDefaultAuthContext = async ({
  Astro,
  authRepository,
  loginGovOptions,
  isUserAuthorized,
}: {
  Astro: AstroGlobal | APIContext;
  authRepository: AuthRepository;
  loginGovOptions: LoginGovOptions;
  isUserAuthorized: (email: string) => Promise<boolean>;
}) => {
  const { LoginGov, BaseAuthContext } = await import('@atj/auth');
  return new BaseAuthContext(
    authRepository,
    new LoginGov({
      ...loginGovOptions,
      redirectURI: `${getOriginFromRequest(Astro)}/signin/callback`,
    }),
    function getCookie(name: string) {
      return Astro.cookies.get(name)?.value;
    },
    function setCookie(cookie) {
      Astro.cookies.set(cookie.name, cookie.value, cookie.attributes);
    },
    function setUserSession({ session, user }) {
      Astro.locals.session = session;
      Astro.locals.user = user;
    },
    isUserAuthorized
  );
};

export const getUserSession = (Astro: any) => {
  return {
    session: Astro.locals.session,
    user: Astro.locals.user,
  };
};
