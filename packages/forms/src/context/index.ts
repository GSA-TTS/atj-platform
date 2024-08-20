import { type Result, type VoidResult } from '@atj/common';
import {
  createFormService,
  defaultFormConfig,
  type Blueprint,
  type FormService,
} from '../index.js';
import { type FormConfig } from '../pattern.js';
import {
  addFormToStorage,
  deleteFormFromStorage,
  getFormFromStorage,
  getFormListFromStorage,
  getFormSummaryListFromStorage,
  saveFormToStorage,
} from '../context/browser/form-repo.js';

export type FormServiceContext = {
  db: FormRepository;
  config: FormConfig;
  storage: Storage;
};

export interface FormRepository {
  addFormToStorage(
    storage: Storage,
    form: Blueprint
  ): Result<{ timestamp: Date; id: string }>;
  deleteFormFromStorage(storage: Storage, formId: string): void;
  getFormFromStorage(storage: Storage, id?: string): Blueprint | null;
  getFormListFromStorage(storage: Storage): string[] | null;
  getFormSummaryListFromStorage(storage: Storage):
    | {
        id: string;
        title: string;
        description: string;
      }[]
    | null;
  saveFormToStorage(
    storage: Storage,
    formId: string,
    form: Blueprint
  ): VoidResult;
}

export const createDefaultBrowserContext = (
  storage: Storage = window?.localStorage
): FormServiceContext => ({
  db: {
    addFormToStorage,
    deleteFormFromStorage,
    getFormFromStorage,
    getFormListFromStorage,
    getFormSummaryListFromStorage,
    saveFormToStorage,
  },
  storage,
  config: defaultFormConfig,
});

export const createBrowserFormService = (
  opts?: FormServiceContext
): FormService => {
  const ctx = opts || createDefaultBrowserContext();
  return createFormService(ctx);
};
