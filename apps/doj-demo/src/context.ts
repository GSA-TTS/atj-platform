import { FormConfig } from '@atj/forms';
import { defaultFormConfig } from '@atj/forms';
import {
  type FormService,
  createBrowserFormService,
  createTestFormService,
} from '@atj/form-service';

export type AppContext = {
  baseUrl: `${string}/`;
  formConfig: FormConfig;
  formService: FormService;
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
    baseUrl: env.BASE_URL,
    formConfig: defaultFormConfig,
    formService: createAppFormService(),
    uswdsRoot: `${env.BASE_URL}uswds/`,
  };
};

const createAppFormService = () => {
  if (globalThis.window) {
    return createBrowserFormService();
  } else {
    return createTestFormService();
  }
};
