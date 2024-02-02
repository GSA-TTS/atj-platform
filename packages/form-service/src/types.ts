import { FormDefinition } from '@atj/forms';
import { FormListItem } from './operations/get-form-list';

export type FormService = {
  addForm: (form: FormDefinition) => Result<string>;
  deleteForm: (formId: string) => VoidResult;
  getForm: (formId: string) => Result<FormDefinition>;
  getFormList: () => Result<FormListItem[]>;
  saveForm: (formId: string, form: FormDefinition) => VoidResult;
  submitForm: (
    formId: string,
    formData: Record<string, string>
  ) => Promise<Result<{ fileName: string; data: Uint8Array }[]>>;
};
