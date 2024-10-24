import { describe, expect, it } from 'vitest';

import { submitPage } from './submit';
import { createFormSession } from '../../session';
import { createForm, defaultFormConfig } from '../..';
import { createPageSet } from '.';

const createTestSession = () => {
  const testForm = createForm(
    {
      title: 'Test form',
      description: 'A test form',
    },
    {
      root: 'page-set-1',
      patterns: [createPageSet('page-set-1')],
    }
  );
  return createFormSession(testForm);
};

describe('Page-set submission', () => {
  it('works', () => {
    const session = createTestSession();
    const result = submitPage(defaultFormConfig, {
      pattern: createPageSet('page-set-1'),
      session,
      data: {},
    });
  });
});
