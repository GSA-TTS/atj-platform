import { describe, expect, it } from 'vitest';

import { createForm, createFormSession } from '../index.js';
import { createTestFormService } from '../context/test/index.js';

describe('submitForm', () => {
  it('succeeds with empty form', async () => {
    const service = createTestFormService({
      'test-form': createForm({ title: 'test', description: 'description' }),
    });
    const formResult = service.getForm('test-form');
    if (!formResult.success) {
      throw new Error('form not found');
    }
    const session = createFormSession(formResult.data);
    const result = await service.submitForm(session, 'test-form', {});
    expect(result).toEqual({
      success: true,
      data: [],
    });
  });
});
