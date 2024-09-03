import { describe, expect, it } from 'vitest';

import { createForm } from '../index.js';
import { createTestFormServiceContext } from '../testing.js';

import { addForm } from './add-form.js';

const TEST_FORM = createForm({ title: 'Form Title', description: '' });

describe('addForm', () => {
  it('returns access denied (401) if user is not logged in', async () => {
    const ctx = await createTestFormServiceContext({
      isUserLoggedIn: () => false,
    });
    const result = await addForm(ctx, TEST_FORM);
    expect(result).toEqual({
      success: false,
      error: {
        status: 401,
        message: 'You must be logged in to add a form',
      },
    });
  });

  it('adds form successfully when user is logged in', async () => {
    const ctx = await createTestFormServiceContext({
      isUserLoggedIn: () => true,
    });
    const result = await addForm(ctx, TEST_FORM);
    expect(result).toEqual({
      success: true,
      data: {
        timestamp: expect.any(String),
        id: expect.any(String),
      },
    });
  });
});
