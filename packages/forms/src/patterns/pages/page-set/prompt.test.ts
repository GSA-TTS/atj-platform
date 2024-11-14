import { describe, expect, it } from 'vitest';

import { defaultFormConfig } from '../..';
import { createFormSession } from '../../../session';

import { Input } from '../../input/builder';
import { Page } from '../page/builder';
import type { Blueprint } from '../../../types';

import { PageSet } from './builder';
import { createPrompt } from './prompt';

describe('Page prompt', () => {
  it('works', async () => {
    expect(true).toBe(true);
    const form = await createTestForm();
    const session = createFormSession(form, {
      params: {
        page: '0',
      },
      url: '',
    });
    const pattern = form.patterns[form.root];
    const prompt = createPrompt(defaultFormConfig, session, pattern, {
      validate: true,
    });
    expect(prompt).toEqual({
      children: [
        {
          children: [
            {
              children: [],
              props: {
                _patternId: 'input-1',
                error: { message: 'Required', type: 'custom' },
                inputId: 'input-1',
                label: 'Input 1',
                required: true,
                type: 'input',
              },
            },
          ],
          props: {
            _patternId: 'page-1',
            title: 'Page 1',
            type: 'page',
          },
        },
      ],
      props: {
        _patternId: 'page-set',
        actions: [
          {
            submitAction: 'action/page-set/page-set',
            text: 'Submit',
            type: 'submit',
          },
        ],
        pages: [
          {
            selected: true,
            title: 'Page 1',
            url: '?page=0',
          },
        ],
        type: 'page-set',
      },
    });
  });
});

const createTestForm = async (): Promise<Blueprint> => {
  const input1 = new Input(
    { label: 'Input 1', required: true, maxLength: 10 },
    'input-1'
  );
  const page1 = new Page(
    { title: 'Page 1', patterns: [input1.id], rules: [] },
    'page-1'
  );
  const pageSet = new PageSet({ pages: [page1.id] }, 'page-set');
  return {
    summary: {
      title: 'Test Form',
      description: 'A test form',
    },
    root: 'page-set',
    patterns: {
      'page-set': pageSet.toPattern(),
      'page-1': page1.toPattern(),
      'input-1': input1.toPattern(),
    },
    outputs: [],
  };
};
