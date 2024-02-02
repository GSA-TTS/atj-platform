import { FormDefinition } from '@atj/forms';
import { addFormToStorage } from '../context/browser/form-repo';

export const addForm = (
  ctx: { storage: Storage },
  form: FormDefinition
): Result<string> => {
  return addFormToStorage(ctx.storage, form);
};
