import { FormSummary, createForm } from '@atj/forms/src';
import formData from '../htmlParser/ud105-form-field-output.json';

export const getFormFromStorage = (storage: Storage, id?: string) => {
  if (!storage || !id) {
    return null;
  }
  const formString = storage.getItem(`forms/${id}`);
  if (!formString) {
    // FIXME: hardcode something for now
    if (id === 'hardcoded-form-id') {
      return formData;
    }
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

export const addFormToStorage = (storage: Storage, summary: FormSummary) => {
  const form = createForm(summary);
  const uuid = crypto.randomUUID();
  storage.setItem(uuid, JSON.stringify(form));
  return {
    success: true,
    data: uuid,
  };
};
