import { createBrowserFormService } from '../browser';
import { type TestData, createTestStorage } from './storage';

// In tests, use the browser form service with fakes injected.
export const createTestFormService = (testData: TestData = {}) => {
  return createBrowserFormService({
    storage: createTestStorage(testData),
  });
};
