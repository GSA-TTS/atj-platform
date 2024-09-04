import { describe, expect, it } from 'vitest';

import { createForm } from '../index.js';
import { createTestFormServiceContext } from '../testing.js';

import { getForm } from './get-form.js';

const TEST_FORM = createForm({ title: 'Form Title', description: '' });

describe('getForm', () => {
  it('returns access denied (401) if user is not logged in', async () => {
    const ctx = await createTestFormServiceContext({
      isUserLoggedIn: () => false,
    });
    const result = await getForm(ctx, 'any-id');
    expect(result).toEqual({
      success: false,
      error: {
        status: 401,
        message: 'You must be logged in to delete a form',
      },
    });
  });

  it('gets form successfully when user is logged in', async () => {
    const ctx = await createTestFormServiceContext({
      isUserLoggedIn: () => true,
    });
    const addResult = await ctx.repository.addForm(TEST_FORM);
    if (!addResult.success) {
      expect.fail('Failed to add form:', addResult.error);
    }

    const result = await getForm(ctx, addResult.data.id);
    if (!result.success) {
      expect.fail('Failed to add form:', result.error);
    }
    expect(result.data).toEqual(TEST_FORM);
  });
});
