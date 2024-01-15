import {
  deleteFormFromStorage,
  getFormFromStorage,
} from '../context/browser/form-repo';

export const deleteForm = (
  ctx: { storage: Storage },
  formId: string
): VoidResult => {
  const form = getFormFromStorage(ctx.storage, formId);
  if (form === null) {
    return {
      success: false,
      error: `form '${formId} does not exist`,
    };
  }
  deleteFormFromStorage(window.localStorage, formId);
  return {
    success: true,
  };
};
