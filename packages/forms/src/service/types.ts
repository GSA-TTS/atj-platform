import { type Result, type VoidResult } from '@atj/common';

import { type FormListItem } from './operations/get-form-list.js';
import { type Blueprint, type FormSession } from '../index.js';

export type FormService = {
  addForm: (form: Blueprint) => Result<{ timestamp: Date; id: string }>;
  deleteForm: (formId: string) => VoidResult;
  getForm: (formId: string) => Result<Blueprint>;
  getFormList: () => Result<FormListItem[]>;
  saveForm: (formId: string, form: Blueprint) => Result<{ timestamp: Date }>;
  submitForm: (
    //sessionId: string,
    session: FormSession, // TODO: load session from storage by ID
    formId: string,
    formData: Record<string, string>
  ) => Promise<Result<{ fileName: string; data: Uint8Array }[]>>;
};
