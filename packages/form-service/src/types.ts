import { Result, VoidResult } from '@atj/common';
import { Blueprint, FormSession } from '@atj/forms';

import { FormListItem } from './operations/get-form-list';

export type FormService = {
  addForm: (form: Blueprint) => Result<string>;
  deleteForm: (formId: string) => VoidResult;
  getForm: (formId: string) => Result<Blueprint>;
  getFormList: () => Result<FormListItem[]>;
  saveForm: (formId: string, form: Blueprint) => VoidResult;
  submitForm: (
    //sessionId: string,
    session: FormSession, // TODO: load session from storage by ID
    formId: string,
    formData: Record<string, string>
  ) => Promise<Result<{ fileName: string; data: Uint8Array }[]>>;
};
