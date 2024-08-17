import { describe, expect, it } from 'vitest';

import { BlueprintBuilder } from './index.js';
import { createForm, getPattern } from '../index.js';
import { defaultFormConfig } from '../patterns/index.js';
import { type InputPattern } from '../patterns/input/index.js';
import { PageSetPattern } from '../patterns/page-set/config.js';
import { PagePattern } from '../patterns/page/config.js';

describe('form builder', () => {
  it('addPattern adds initial pattern of given type', () => {
    const builder = new BlueprintBuilder(defaultFormConfig);
    expect(Object.keys(builder.form.patterns).length).toEqual(2);
    builder.addPatternToPage('input');
    expect(Object.keys(builder.form.patterns).length).toEqual(3);
  });

  it('addPattern preserves existing structure', () => {
    const initial = createTestBlueprint();
    const builder = new BlueprintBuilder(defaultFormConfig, initial);
    const newPattern = builder.addPatternToPage('input');
    expect(builder.form.patterns[newPattern.id]).toEqual(newPattern);
    const oldPage = getPattern<PagePattern>(initial, 'page-1');
    const newPage = getPattern<PagePattern>(builder.form, 'page-1');
    expect(newPage.data).toEqual({
      ...oldPage.data,
      patterns: [...oldPage.data.patterns, newPattern.id],
    });
  });

  it('removePattern removes pattern and sequence reference', () => {
    const initial = createTestBlueprint();
    const builder = new BlueprintBuilder(defaultFormConfig, initial);
    builder.removePattern('element-2');
    expect(builder.form.patterns).toEqual({
      root: {
        type: 'page-set',
        id: 'root',
        data: { pages: ['page-1'] },
      } satisfies PageSetPattern,
      'page-1': {
        type: 'page',
        id: 'page-1',
        data: {
          title: 'Page 1',
          patterns: ['element-1'],
        },
      } satisfies PagePattern,
      'element-1': {
        type: 'input',
        id: 'element-1',
        data: {
          label: 'Pattern 1',
          initial: '',
          required: true,
          maxLength: 128,
        },
      },
    });
  });
});

export const createTestBlueprint = () => {
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
        {
          type: 'input',
          id: 'element-2',
          data: {
            label: 'Pattern 2',
            initial: 'test',
            required: true,
            maxLength: 128,
          },
        } satisfies InputPattern,
      ],
    }
  );
};
