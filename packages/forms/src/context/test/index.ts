import {
  createBrowserFormService,
  createDefaultBrowserContext,
} from '../index.js';
import { type TestData, createTestStorage } from './storage.js';

// In tests, use the browser form service with fakes injected.
export const createTestFormService = (testData: TestData = {}) => {
  const ctx = createDefaultBrowserContext(createTestStorage(testData));
  return createBrowserFormService(ctx);
};
