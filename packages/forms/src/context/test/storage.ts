import { type Blueprint } from '../../index.js';
import { saveForm } from '../browser/form-repo.js';

export type TestData = Record<string, Blueprint>;

export const createTestStorage = (testData: TestData): Storage => {
  const records: Record<string, string> = {};
  const storage: Storage = {
    clear() {},
    setItem(key, value) {
      records[key] = value || '';
    },
    getItem(key) {
      return key in records ? records[key] : null;
    },
    removeItem(key) {
      delete records[key];
    },
    get length() {
      return Object.keys(records).length;
    },
    key(index) {
      const keys = Object.keys(records);
      return keys[index] || null;
    },
  };
  populateStorage(storage, testData);
  return storage;
};

const populateStorage = (storage: Storage, testData: TestData) => {
  Object.entries(testData).forEach(([formId, form]) => {
    saveForm(storage, formId, form);
  });
};
