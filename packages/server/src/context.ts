import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { type DatabaseContext } from '@atj/database';
import { type FormConfig, defaultFormConfig, service } from '@atj/forms';

import { type GithubRepository } from './lib/github';

export type ServerOptions = {
  title: string;
};

const getDirname = () => dirname(fileURLToPath(import.meta.url));

export type AppContext = {
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

const createDefaultDatabaseContext = async (): Promise<DatabaseContext> => {
  const { createDevDatabaseContext } = await import('@atj/database');
  return createDevDatabaseContext(join(getDirname(), 'main.db'));
};

export const createAstroAppContext = async (
  serverOptions: ServerOptions,
  env: any
): Promise<AppContext> => {
  const database = await createDefaultDatabaseContext();
  return {
    baseUrl: env.BASE_URL,
    database,
    formConfig: defaultFormConfig,
    formService: service.createTestFormService(),
    github: env.GITHUB,
    title: serverOptions.title || 'Form Service',
    uswdsRoot: `${env.BASE_URL}uswds/`,
  };
};
