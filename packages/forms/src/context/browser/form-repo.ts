import { Result } from '@atj/common';
import { type Blueprint } from '../../index.js';

export const getFormFromStorage = (
  storage: Storage,
  id?: string
): Blueprint | null => {
  if (!storage || !id) {
    return null;
  }
  const formString = storage.getItem(id);
  if (!formString) {
    return null;
  }
  return parseStringForm(formString);
};

export const getFormListFromStorage = (storage: Storage) => {
  const keys = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key === null) {
      return null;
    }
    keys.push(key);
  }
  return keys;
};

export const getFormSummaryListFromStorage = (storage: Storage) => {
  const forms = getFormListFromStorage(storage);
  if (forms === null) {
    return null;
  }
  return forms.map(key => {
    const form = getFormFromStorage(storage, key) as Blueprint;
    if (form === null) {
      throw new Error('key mismatch');
    }
    return {
      id: key,
      title: form.summary.title,
      description: form.summary.description,
    };
  });
};

export const addFormToStorage = (
  storage: Storage,
  form: Blueprint
): Result<{ timestamp: Date; id: string }> => {
  const uuid = crypto.randomUUID();

  const result = saveFormToStorage(storage, uuid, form);
  if (!result.success) {
    return result;
  }

  return {
    success: true,
    data: {
      timestamp: new Date(),
      id: uuid,
    },
  };
};

export const saveFormToStorage = (
  storage: Storage,
  formId: string,
  form: Blueprint
) => {
  try {
    storage.setItem(formId, stringifyForm(form));
  } catch {
    return {
      success: false as const,
      error: `error saving '${formId}' to storage`,
    };
  }
  return {
    success: true as const,
  };
};

export const deleteFormFromStorage = (storage: Storage, formId: string) => {
  storage.removeItem(formId);
};

const stringifyForm = (form: Blueprint) => {
  return JSON.stringify({
    ...form,
    outputs: form.outputs.map(output => ({
      ...output,
      // TODO: we probably want to do this somewhere in the documents module
      data: uint8ArrayToBase64(output.data),
    })),
  });
};

const parseStringForm = (formString: string): Blueprint => {
  const form = JSON.parse(formString) as Blueprint;
  return {
    ...form,
    outputs: form.outputs.map(output => ({
      ...output,
      data: base64ToUint8Array((output as any).data),
    })),
  };
};

const uint8ArrayToBase64 = (buffer: Uint8Array): string => {
  let binary = '';
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return btoa(binary);
};

const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};
