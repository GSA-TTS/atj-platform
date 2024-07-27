import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { type APIContext, type AstroGlobal } from 'astro';

import { type AuthContext, LoginGov } from '@atj/auth';
import { type DatabaseContext } from '@atj/database';
import { type FormConfig, defaultFormConfig, service } from '@atj/forms';

import { type GithubRepository } from './lib/github';
import { getServerSecrets } from './secrets';

export type AppContext = {
  auth: AuthContext;
  baseUrl: `${string}/`;
  database: DatabaseContext;
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
  const database = await createDefaultDatabaseContext();
  const secrets = getServerSecrets(env);
  const serverOptions = getServerOptions(Astro);
  return {
    auth: {
      database,
      provider: new LoginGov({
        loginGovUrl: 'https://idp.int.identitysandbox.gov',
        clientId:
          'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:tts-10x-atj-dev-server-doj',
        clientSecret: secrets.loginGov.clientSecret,
        redirectURI: 'http://localhost:4322/login/callback',
      }),
      setCookie: cookie =>
        Astro.cookies.set(cookie.name, cookie.value, cookie.attributes),
    } satisfies AuthContext,
    baseUrl: env.BASE_URL,
    database,
    formConfig: defaultFormConfig,
    formService: service.createTestFormService(),
    github: env.GITHUB,
    title: serverOptions.title,
    uswdsRoot: `${env.BASE_URL}uswds/`,
  };
};

export type ServerOptions = {
  title: string;
};

const defaultServerOptions: ServerOptions = {
  title: 'Form Service',
};

const getServerOptions = (Astro: AstroGlobal | APIContext) => {
  return Astro.locals.serverOptions || defaultServerOptions;
};

const getDirname = () => dirname(fileURLToPath(import.meta.url));

const createDefaultDatabaseContext = async (): Promise<DatabaseContext> => {
  const { createDevDatabaseContext } = await import('@atj/database');
  return createDevDatabaseContext(join(getDirname(), 'main.db'));
};
