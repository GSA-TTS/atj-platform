import { describe, expect, it } from 'vitest';

import { createForm, createFormSession } from '../index.js';
import { createTestFormService } from '../context/test/index.js';

describe('submitForm', () => {
  it('succeeds with empty form', async () => {
    const service = await createTestFormService();
    const testForm = createForm({ title: 'test', description: 'description' });
    const addFormResult = await service.getContext().db.addForm(testForm);
    if (addFormResult.success === false) {
      expect.fail('addForm failed');
    }
    const session = createFormSession(testForm);

    const result = await service.submitForm(session, addFormResult.data.id, {});
    expect(result).toEqual({
      success: true,
      data: [],
    });
  });
});
