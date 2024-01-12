import { Form, FormSummary, createForm } from '@atj/forms';

export const getFormFromStorage = (
  storage: Storage,
  id?: string
): Form | null => {
  if (!storage || !id) {
    return null;
  }
  const formString = storage.getItem(id);
  if (!formString) {
    return null;
  }
  return JSON.parse(formString);
};

export const getFormListFromStorage = (storage: Storage) => {
  const keys = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    keys.push(key);
  }
  return keys;
};

export const addFormSummaryToStorage = (
  storage: Storage,
  summary: FormSummary
) => {
  const form = createForm(summary);
  const uuid = crypto.randomUUID();
  storage.setItem(uuid, JSON.stringify(form));
  return {
    success: true,
    data: uuid,
  };
};

export const saveFormToStorage = (
  storage: Storage,
  formId: string,
  form: Form
) => {
  storage.setItem(formId, JSON.stringify(form));
  return {
    success: true,
  };
};

export const deleteFormFromStorage = (storage: Storage, formId: string) => {
  storage.removeItem(formId);
};
