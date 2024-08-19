import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { type APIContext, type AstroGlobal } from 'astro';

import type { AuthContext, LoginGovOptions } from '@atj/auth';
import { type DatabaseGateway } from '@atj/database';
import { type FormConfig, defaultFormConfig, service } from '@atj/forms';

import { type GithubRepository } from './lib/github.js';

export type AppContext = {
  auth: AuthContext;
  baseUrl: `${string}/`;
  formConfig: FormConfig;
  formService: service.FormService;
  github: GithubRepository;
  title: string;
  uswdsRoot: `${string}/`;
};

export type ServerOptions = {
  title: string;
  db: DatabaseGateway;
  loginGovOptions: LoginGovOptions;
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
      db: serverOptions.db,
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

const getDefaultServerOptions = async (): Promise<ServerOptions> => {
  const db = await createDefaultDatabaseGateway();
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
  };
};

const getServerOptions = async (Astro: AstroGlobal | APIContext) => {
  return Astro.locals.serverOptions || (await getDefaultServerOptions());
};

const getDirname = () => dirname(fileURLToPath(import.meta.url));

const createDefaultDatabaseGateway = async () => {
  const { createDatabaseGateway, createFilesystemDatabaseContext } =
    await import('@atj/database');
  const ctx = await createFilesystemDatabaseContext(
    join(getDirname(), '../main.db')
  );
  const gateway = createDatabaseGateway(ctx);
  return Promise.resolve(gateway);
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
  db,
  loginGovOptions,
}: {
  Astro: AstroGlobal | APIContext;
  db: DatabaseGateway;
  loginGovOptions: LoginGovOptions;
}) => {
  const { LoginGov, BaseAuthContext } = await import('@atj/auth');
  return new BaseAuthContext(
    db,
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
    }
  );
};

export const getUserSession = (Astro: any) => {
  return {
    session: Astro.locals.session,
    user: Astro.locals.user,
  };
};
