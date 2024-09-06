import { describe, expect, it } from 'vitest';

import {
  createForm,
  createFormSession,
  type Blueprint,
  type InputPattern,
  type PagePattern,
  type PageSetPattern,
} from '../index.js';
import { createTestFormServiceContext } from '../testing.js';
import { submitForm } from './submit-form.js';

const setupTestForm = async (form?: Blueprint) => {
  form = form || createForm({ title: 'test', description: 'description' });
  const ctx = await createTestFormServiceContext({
    isUserLoggedIn: () => false,
  });
  const addFormResult = await ctx.repository.addForm(form);
  if (addFormResult.success === false) {
    expect.fail('addForm failed');
  }
  return { ctx, id: addFormResult.data.id, form };
};

describe('submitForm', () => {
  it('succeeds with empty form', async () => {
    const { ctx, id, form } = await setupTestForm();
    const session = createFormSession(form);

    const result = await submitForm(ctx, session, id, {});
    expect(result).toEqual({
      success: true,
      data: [],
    });
  });

  it('fails with invalid form ID', async () => {
    const { ctx, form } = await setupTestForm();
    const session = createFormSession(form);
    const result = await submitForm(ctx, session, 'invalid-id', {});
    expect(result).toEqual({
      success: false,
      error: 'Form not found',
    });
  });

  it('fails with incomplete session', async () => {
    const { ctx, form, id } = await setupTestForm(createOnePatternTestForm());
    const session = createFormSession(form);
    const result = await submitForm(ctx, session, id, {});
    expect(result).toEqual({
      success: false,
      error: 'Session is not complete',
    });
  });

  it('succeeds with complete session', async () => {
    const { ctx, form, id } = await setupTestForm(createOnePatternTestForm());
    const session = createFormSession(form);
    const result = await submitForm(ctx, session, id, {
      'element-1': 'test',
    });
    expect(result).toEqual({ success: true, data: [] });
  });
});

export const createOnePatternTestForm = () => {
  return createForm(
    {
      title: 'Test form',
      description: 'Test description',
    },
    {
      root: 'root',
      patterns: [
        {
          type: 'page-set',
          id: 'root',
          data: {
            pages: ['page-1'],
          },
        } satisfies PageSetPattern,
        {
          type: 'page',
          id: 'page-1',
          data: {
            title: 'Page 1',
            patterns: ['element-1', 'element-2'],
          },
        } satisfies PagePattern,
        {
          type: 'input',
          id: 'element-1',
          data: {
            label: 'Pattern 1',
            initial: '',
            required: true,
            maxLength: 128,
          },
        } satisfies InputPattern,
      ],
    }
  );
};
