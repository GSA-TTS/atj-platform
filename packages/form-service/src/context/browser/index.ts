import { submitForm } from '../../operations/submit-form';
import { FormService } from '../../types';
import {
  addFormToStorage,
  deleteFormFromStorage,
  getFormFromStorage,
  getFormListFromStorage,
  saveFormToStorage,
} from './form-repo';

type BrowserContext = {
  storage: Storage;
};

const createDefaultBrowserContext = (): BrowserContext => ({
  storage: window.localStorage,
});

export const createBrowserFormService = (
  opts?: BrowserContext
): FormService => {
  const ctx = opts || createDefaultBrowserContext();
  return {
    addForm(form) {
      return addFormToStorage(ctx.storage, form);
    },
    deleteForm(formId) {
      return deleteFormFromStorage(ctx.storage, formId);
    },
    getForm(formId) {
      return getFormFromStorage(ctx.storage, formId);
    },
    getFormList() {
      return getFormListFromStorage(ctx.storage);
    },
    saveForm(formId, form) {
      saveFormToStorage(ctx.storage, formId, form);
    },
    submitForm(formId, formData) {
      return submitForm(ctx, formId, formData);
    },
  };
};
