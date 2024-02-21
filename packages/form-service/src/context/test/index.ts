import { defaultFormConfig } from '@atj/forms';

import { createBrowserFormService } from '../browser';
import { type TestData, createTestStorage } from './storage';

// In tests, use the browser form service with fakes injected.
export const createTestFormService = (testData: TestData = {}) => {
  return createBrowserFormService({
    config: defaultFormConfig,
    storage: createTestStorage(testData),
  });
};
