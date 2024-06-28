import { type FormConfig } from '@atj/forms';
import { defaultFormConfig } from '@atj/forms';
import { service } from '@atj/forms';

import { type GithubRepository } from './lib/github';

export type AppContext = {
  baseUrl: `${string}/`;
  formConfig: FormConfig;
  formService: service.FormService;
  github: GithubRepository;
  title: string;
  uswdsRoot: `${string}/`;
};

export const getAstroAppContext = (Astro: any): AppContext => {
  if (!Astro.locals.ctx) {
    Astro.locals.ctx = createAstroAppContext(Astro, import.meta.env);
  }
  return Astro.locals.ctx;
};

const createAstroAppContext = (Astro: any, env: any): AppContext => {
  return {
    baseUrl: env.BASE_URL,
    formConfig: defaultFormConfig,
    formService: service.createTestFormService(),
    github: env.GITHUB,
    title: Astro.locals.serverOptions.title,
    uswdsRoot: `${env.BASE_URL}uswds/`,
  };
};
