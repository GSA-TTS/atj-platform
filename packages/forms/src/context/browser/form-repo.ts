import { failure, Result, VoidResult } from '@atj/common';
import type { FormRepository } from '@atj/database';

import { type Blueprint } from '../../index.js';

export class BrowserFormRepository implements FormRepository {
  constructor(private storage: Storage) {}

  async addForm(
    form: Blueprint
  ): Promise<Result<{ timestamp: string; id: string }>> {
    const uuid = crypto.randomUUID();

    const result = await this.saveForm(uuid, form);
    if (!result.success) {
      return result;
    }

    return {
      success: true,
      data: {
        timestamp: new Date().toISOString(),
        id: uuid,
      },
    };
  }

  async deleteForm(formId: string): Promise<VoidResult> {
    this.storage.removeItem(formId);
    return { success: true };
  }

  async getForm(id?: string): Promise<Blueprint | null> {
    if (!this.storage || !id) {
      return null;
    }
    const formString = this.storage.getItem(id);
    if (!formString) {
      return null;
    }
    return parseStringForm(formString);
  }

  async getFormList(): Promise<
    { id: string; title: string; description: string }[] | null
  > {
    const forms = await getFormList(this.storage);
    if (forms === null) {
      return null;
    }
    return Promise.all(
      forms.map(async key => {
        const form = await this.getForm(key);
        if (form === null) {
          throw new Error('key mismatch');
        }
        return {
          id: key,
          title: form.summary.title,
          description: form.summary.description,
        };
      })
    );
  }

  async saveForm(formId: string, form: Blueprint): Promise<VoidResult> {
    try {
      this.storage.setItem(formId, stringifyForm(form));
    } catch {
      return failure(`error saving '${formId}' to storage`);
    }
    return { success: true };
  }
}

export const getFormList = (storage: Storage) => {
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

export const saveForm = (storage: Storage, formId: string, form: Blueprint) => {
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
