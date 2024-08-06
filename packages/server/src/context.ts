import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { type APIContext, type AstroGlobal } from 'astro';

import type { AuthContext, LoginGovOptions } from '@atj/auth';
import { type DatabaseService } from '@atj/database';
import { type FormConfig, defaultFormConfig, service } from '@atj/forms';

import { type GithubRepository } from './lib/github';

export type AppContext = {
  auth: AuthContext;
  baseUrl: `${string}/`;
  formConfig: FormConfig;
  formService: service.FormService;
  github: GithubRepository;
  title: string;
  uswdsRoot: `${string}/`;
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
      database: serverOptions.database,
      loginGovOptions: serverOptions.loginGovOptions,
    }),
    baseUrl: env.BASE_URL,
    formConfig: defaultFormConfig,
    formService: service.createTestFormService(),
    github: env.GITHUB,
    title: serverOptions.title,
    uswdsRoot: `${env.BASE_URL}uswds/`,
  };
};

export type ServerOptions = {
  title: string;
  database: DatabaseService;
  loginGovOptions: LoginGovOptions;
};

const getDefaultServerOptions = async (): Promise<ServerOptions> => {
  const database = await createDefaultDatabaseService();
  return {
    title: 'Form Service',
    database,
    loginGovOptions: {
      loginGovUrl: 'https://idp.int.identitysandbox.gov',
      clientId:
        'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
      clientSecret: '',
      redirectURI: 'http://localhost:4322/signin/callback',
    },
  };
};

const getServerOptions = async (Astro: AstroGlobal | APIContext) => {
  return Astro.locals.serverOptions || (await getDefaultServerOptions());
};

const getDirname = () => dirname(fileURLToPath(import.meta.url));

const createDefaultDatabaseService = async () => {
  const { createDevDatabaseContext } = await import('@atj/database');
  const { createDatabaseService } = await import('@atj/database');
  const ctx = await createDevDatabaseContext(join(getDirname(), 'main.db'));
  return createDatabaseService(ctx);
};

const createDefaultAuthContext = async ({
  Astro,
  database,
  loginGovOptions,
}: {
  Astro: AstroGlobal | APIContext;
  database: DatabaseService;
  loginGovOptions: LoginGovOptions;
}) => {
  const { LoginGov, DevAuthContext } = await import('@atj/auth');
  return new DevAuthContext(
    database,
    new LoginGov(loginGovOptions),
    function getCookie(name: string) {
      return Astro.cookies.get(name)?.value;
    },
    function setCookie(cookie) {
      Astro.cookies.set(cookie.name, cookie.value, cookie.attributes);
    },
    function setUserSession({ session, user }) {
      Astro.locals.session = session;
      Astro.locals.user = user;
    }
  );
};

export const getUserSession = (Astro: any) => {
  return {
    session: Astro.locals.session,
    user: Astro.locals.user,
  };
};
