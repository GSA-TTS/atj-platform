import { describe, expect, it } from 'vitest';

import { createForm, createFormSession } from '../index.js';
import { createTestFormServiceContext } from '../testing.js';
import { submitForm } from './submit-form.js';

describe('submitForm', () => {
  it('succeeds with empty form', async () => {
    const ctx = await createTestFormServiceContext({
      isUserLoggedIn: () => false,
    });
    const testForm = createForm({ title: 'test', description: 'description' });
    const addFormResult = await ctx.repository.addForm(testForm);
    if (addFormResult.success === false) {
      expect.fail('addForm failed');
    }
    const session = createFormSession(testForm);

    const result = await submitForm(ctx, session, addFormResult.data.id, {});
    expect(result).toEqual({
      success: true,
      data: [],
    });
  });
});
