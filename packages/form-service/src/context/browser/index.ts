import { submitForm } from '../../operations';

type BrowserContext = {
  storage: Storage;
};

const createDefaultBrowserContext = (): BrowserContext => ({
  storage: window.localStorage,
});

export const createBrowserFormService = (opts?: BrowserContext) => {
  const ctx = opts || createDefaultBrowserContext();
  return {
    submitForm(formId: string, formData: Record<string, string>) {
      return submitForm(ctx, formId, formData);
    },
  };
};
