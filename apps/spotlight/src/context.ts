import { FormConfig } from '@atj/forms';
import { defaultFormConfig } from '@atj/forms';
import {
  type FormService,
  createBrowserFormService,
  createTestFormService,
} from '@atj/form-service';

import { type GithubRepository } from './lib/github';

export type AppContext = {
  baseUrl: `${string}/`;
  github: GithubRepository;
  formConfig: FormConfig;
  formService: FormService;
};

let _context: AppContext | null = null;

export const getAppContext = (): AppContext => {
  if (_context === null) {
    _context = createAppContext(import.meta.env);
  }
  return _context;
};

const createAppContext = (env: any) => {
  return {
    github: env.GITHUB,
    baseUrl: env.BASE_URL,
    formConfig: defaultFormConfig,
    formService: createAppFormService(),
  };
};

const createAppFormService = () => {
  if (globalThis.window) {
    return createBrowserFormService();
  } else {
    return createTestFormService();
  }
};
