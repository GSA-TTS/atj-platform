import { describe, expect, it } from 'vitest';

import { createForm } from '@atj/forms';
import { createTestFormService } from '../context/test';

describe('submitForm', () => {
  it('works with empty form', async () => {
    const service = createTestFormService({
      'test-form': createForm({ title: 'test', description: 'description' }),
    });
    const result = await service.submitForm('test-form', {});
    expect(result).toEqual({
      success: true,
      data: [],
    });
  });
});
