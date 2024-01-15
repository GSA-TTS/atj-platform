import {
  deleteFormFromStorage,
  getFormFromStorage,
} from '../context/browser/form-repo';

export const deleteForm = (formId: string) => {
  const form = getFormFromStorage(window.localStorage, formId);
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
