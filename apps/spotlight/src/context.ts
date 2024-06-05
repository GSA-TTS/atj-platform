import { FormConfig } from '@atj/forms';
import { defaultFormConfig } from '@atj/forms';
import { service } from '@atj/forms';

import { type GithubRepository } from './lib/github';

export type AppContext = {
  baseUrl: `${string}/`;
  github: GithubRepository;
  formConfig: FormConfig;
  formService: service.FormService;
  uswdsRoot: `${string}/`;
};

let _context: AppContext | null = null;

export const getAppContext = (): AppContext => {
  if (_context === null) {
    _context = createAppContext(import.meta.env);
  }
  return _context;
};

const createAppContext = (env: any): AppContext => {
  return {
    github: env.GITHUB,
    baseUrl: env.BASE_URL,
    formConfig: defaultFormConfig,
    formService: createAppFormService(),
    uswdsRoot: `${env.BASE_URL}uswds/`,
  };
};

const createAppFormService = () => {
  if (globalThis.window) {
    return service.createBrowserFormService();
  } else {
    return service.createTestFormService();
  }
};
