import { type FormConfig, defaultFormConfig } from '../../..';

import { addForm } from '../../operations/add-form';
import { deleteForm } from '../../operations/delete-form';
import { getForm } from '../../operations/get-form';
import { getFormList } from '../../operations/get-form-list';
import { saveForm } from '../../operations/save-form';
import { submitForm } from '../../operations/submit-form';
import type { FormService } from '../../types';

type BrowserContext = {
  storage: Storage;
  config: FormConfig;
};

const createDefaultBrowserContext = (): BrowserContext => ({
  storage: window.localStorage,
  config: defaultFormConfig,
});

export const createBrowserFormService = (
  opts?: BrowserContext
): FormService => {
  const ctx = opts || createDefaultBrowserContext();
  return {
    addForm(form) {
      return addForm(ctx, form);
    },
    deleteForm(formId) {
      return deleteForm(ctx, formId);
    },
    getForm(formId) {
      return getForm(ctx, formId);
    },
    getFormList() {
      return getFormList(ctx);
    },
    saveForm(formId, form) {
      return saveForm(ctx, formId, form);
    },
    submitForm(session, formId, formData) {
      return submitForm(ctx, session, formId, formData);
    },
  };
};
