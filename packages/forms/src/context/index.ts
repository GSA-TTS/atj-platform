import { type Result, type VoidResult, createService } from '@atj/common';
import {
  createFormService,
  defaultFormConfig,
  type Blueprint,
  type FormService,
} from '../index.js';
import { type FormConfig } from '../pattern.js';
import {
  addFormToStorage,
  deleteForm,
  getForm,
  getFormSummaryList,
  saveForm,
} from '../context/browser/form-repo.js';

export type FormServiceContext = {
  db: FormRepository;
  config: FormConfig;
  storage: Storage;
};

export interface FormRepository {
  addForm(form: Blueprint): Result<{ timestamp: Date; id: string }>;
  deleteForm(formId: string): void;
  getForm(id?: string): Blueprint | null;
  getFormList():
    | {
        id: string;
        title: string;
        description: string;
      }[]
    | null;
  saveForm(formId: string, form: Blueprint): VoidResult;
}

export const createDefaultBrowserContext = (
  storage: Storage = window?.localStorage
): FormServiceContext => ({
  db: createService(storage, {
    addForm: addFormToStorage,
    deleteForm,
    getForm,
    getFormList: getFormSummaryList,
    saveForm,
  }),
  storage,
  config: defaultFormConfig,
});

export const createBrowserFormService = (
  opts?: FormServiceContext
): FormService => {
  const ctx = opts || createDefaultBrowserContext();
  return createFormService(ctx);
};
