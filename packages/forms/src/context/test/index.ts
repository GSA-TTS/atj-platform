import { defaultFormConfig } from '../../config.js';
import { createFormService } from '../../services/index.js';
import { createTestStorage, type TestData } from './storage.js';
import { BrowserFormRepository } from '../browser/form-repo.js';

// In tests, use the browser form service with fakes injected.
export const createTestFormService = (testData: TestData = {}) => {
  const storage = createTestStorage(testData);
  const db = new BrowserFormRepository(storage);
  const formService = createFormService({
    db,
    config: defaultFormConfig,
  });
  if (testData) {
    Object.entries(testData).forEach(([id, blueprint]) => {
      formService.saveForm(id, blueprint);
    });
  }
  return formService;
};
