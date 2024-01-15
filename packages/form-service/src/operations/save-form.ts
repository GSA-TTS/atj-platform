import { Form } from '@atj/forms';
import { saveFormToStorage } from '../context/browser/form-repo';

export const saveForm = (
  ctx: { storage: Storage },
  formId: string,
  form: Form
): VoidResult => {
  const result = saveFormToStorage(ctx.storage, formId, form);
  if (result.success === false) {
    return {
      success: false,
      error: result.error,
    };
  }
  return {
    success: true,
  };
};
