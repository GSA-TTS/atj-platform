import { defaultFormConfig } from '../../index.js';

import { createBrowserFormService } from '../browser/index.js';
import { type TestData, createTestStorage } from './storage.js';

// In tests, use the browser form service with fakes injected.
export const createTestFormService = (testData: TestData = {}) => {
  return createBrowserFormService({
    config: defaultFormConfig,
    storage: createTestStorage(testData),
  });
};
