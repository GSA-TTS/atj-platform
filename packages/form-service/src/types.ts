import { Form } from '@atj/forms';

export type FormService = {
  addForm: (form: Form) => Result<string>;
  deleteForm: (formId: string) => VoidResult;
  getForm: (formId: string) => Result<Form>;
  getFormList: () => Result<string[]>;
  saveForm: (formId: string, form: Form) => VoidResult;
  submitForm: (
    formId: string,
    formData: Record<string, string>
  ) => Promise<Result<{ fileName: string; data: Uint8Array }[]>>;
};
