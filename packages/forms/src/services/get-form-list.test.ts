import { describe, expect, it } from 'vitest';

import { createForm } from '../index.js';
import { type FormServiceContext } from '../context/index.js';
import { createTestFormServiceContext } from '../testing.js';

import { getFormList } from './get-form-list.js';

describe('getFormList', () => {
  it('returns access denied (401) if user is not logged in', async () => {
    const ctx = await createTestFormServiceContext({
      isUserLoggedIn: () => false,
    });
    const result = await getFormList(ctx);
    expect(result).toEqual({
      success: false,
      error: {
        status: 401,
        message: 'You must be logged in to delete a form',
      },
    });
  });

  it('gets form list successfully when user is logged in', async () => {
    const ctx = await createTestFormServiceContext({
      isUserLoggedIn: () => true,
    });
    await addTestForms(ctx, 5);

    const result = await getFormList(ctx);
    expect(result).toEqual({
      data: [
        {
          description: '',
          id: expect.any(String),
          title: 'Form 0',
        },
        {
          description: '',
          id: expect.any(String),
          title: 'Form 1',
        },
        {
          description: '',
          id: expect.any(String),
          title: 'Form 2',
        },
        {
          description: '',
          id: expect.any(String),
          title: 'Form 3',
        },
        {
          description: '',
          id: expect.any(String),
          title: 'Form 4',
        },
      ],
      success: true,
    });
  });
});

const addTestForms = async (ctx: FormServiceContext, count: number) => {
  const forms = [];
  for (let i = 0; i < count; i++) {
    const form = createForm({ title: `Form ${i}`, description: '' });
    const result = await ctx.repository.addForm(form);
    if (!result.success) {
      expect.fail('Failed to add form:', result.error);
    }
    forms.push(result.data);
  }
  return forms;
};
