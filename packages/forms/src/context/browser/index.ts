import {
  type FormConfig,
  createFormService,
  defaultFormConfig,
} from '../../index.js';

import type { FormService } from '../../services/index.js';

type BrowserContext = {
  storage: Storage;
  config: FormConfig;
};

export const createDefaultBrowserContext = (): BrowserContext => ({
  storage: window.localStorage,
  config: defaultFormConfig,
});

export const createBrowserFormService = (
  opts?: BrowserContext
): FormService => {
  const ctx = opts || createDefaultBrowserContext();
  return createFormService(ctx);
};
