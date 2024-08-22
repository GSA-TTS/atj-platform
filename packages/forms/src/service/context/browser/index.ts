import { type FormConfig, defaultFormConfig } from '../../../index.js';

import { addForm } from '../../operations/add-form.js';
import { deleteForm } from '../../operations/delete-form.js';
import { getForm } from '../../operations/get-form.js';
import { getFormList } from '../../operations/get-form-list.js';
import { saveForm } from '../../operations/save-form.js';
import { submitForm } from '../../operations/submit-form.js';
import type { FormService } from '../../types.js';

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
