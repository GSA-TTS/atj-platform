import { Form } from '@atj/forms';

export type FormService = {
  addForm: (form: Form) => Result<string>;
  deleteForm: (formId: string) => void;
  getForm: (formId: string) => Form | null;
  getFormList: () => string[];
  saveForm: (formId: string, form: Form) => void;
  submitForm: (
    formId: string,
    formData: Record<string, string>
  ) => Promise<Result<{ fileName: string; data: Uint8Array }[]>>;
};
