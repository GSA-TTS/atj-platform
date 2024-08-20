import { describe, expect, it } from 'vitest';

import { BlueprintBuilder } from './index.js';
import { type Pattern, createForm, getPattern } from '../index.js';
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

  it('movePattern on the currentpage', () => {
    const initial = createTwoPageThreePatternTestForm();
    const builder = new BlueprintBuilder(defaultFormConfig, initial);
    const pattern = getPattern<Pattern>(builder.form, 'element-1');
    expect(builder.form.patterns[pattern.id]).toEqual(pattern);
    const oldPage = getPattern<PagePattern>(initial, 'page-1');
    const newPage = getPattern<PagePattern>(builder.form, 'page-1');
    builder.movePatternBetweenPages(
      oldPage.id,
      newPage.id,
      pattern.id,
      'bottom'
    );

    expect(builder.form.patterns).toEqual({
      root: {
        type: 'page-set',
        id: 'root',
        data: {
          pages: ['page-1', 'page-2'],
        },
      } satisfies PageSetPattern,
      'page-1': {
        type: 'page',
        id: 'page-1',
        data: {
          title: 'Page 1',
          patterns: ['element-2', 'element-1'],
        },
      } satisfies PagePattern,
      'page-2': {
        type: 'page',
        id: 'page-2',
        data: {
          title: 'Page 2',
          patterns: ['element-3'],
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
      'element-2': {
        type: 'input',
        id: 'element-2',
        data: {
          label: 'Pattern 2',
          initial: '',
          required: true,
          maxLength: 128,
        },
      },
      'element-3': {
        type: 'input',
        id: 'element-3',
        data: {
          label: 'Pattern 3',
          initial: '',
          required: true,
          maxLength: 128,
        },
      },
    });
  });

  it('movePattern to top of a different page', () => {
    const initial = createTwoPageThreePatternTestForm();
    const builder = new BlueprintBuilder(defaultFormConfig, initial);
    const pattern = getPattern<Pattern>(builder.form, 'element-1');
    expect(builder.form.patterns[pattern.id]).toEqual(pattern);
    const oldPage = getPattern<PagePattern>(initial, 'page-1');
    const newPage = getPattern<PagePattern>(builder.form, 'page-2');
    builder.movePatternBetweenPages(oldPage.id, newPage.id, pattern.id, 'top');
    expect(builder.form.patterns).toEqual({
      root: {
        type: 'page-set',
        id: 'root',
        data: {
          pages: ['page-1', 'page-2'],
        },
      } satisfies PageSetPattern,
      'page-1': {
        type: 'page',
        id: 'page-1',
        data: {
          title: 'Page 1',
          patterns: ['element-2'],
        },
      } satisfies PagePattern,
      'page-2': {
        type: 'page',
        id: 'page-2',
        data: {
          title: 'Page 2',
          patterns: ['element-1', 'element-3'],
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
      'element-2': {
        type: 'input',
        id: 'element-2',
        data: {
          label: 'Pattern 2',
          initial: '',
          required: true,
          maxLength: 128,
        },
      },
      'element-3': {
        type: 'input',
        id: 'element-3',
        data: {
          label: 'Pattern 3',
          initial: '',
          required: true,
          maxLength: 128,
        },
      },
    });
  });

  it('movePattern to bottom of a different page', () => {
    const initial = createTwoPageThreePatternTestForm();
    const builder = new BlueprintBuilder(defaultFormConfig, initial);
    const pattern = getPattern<Pattern>(builder.form, 'element-1');
    expect(builder.form.patterns[pattern.id]).toEqual(pattern);
    const oldPage = getPattern<PagePattern>(initial, 'page-1');
    const newPage = getPattern<PagePattern>(builder.form, 'page-2');
    builder.movePatternBetweenPages(
      oldPage.id,
      newPage.id,
      pattern.id,
      'bottom'
    );
    expect(builder.form.patterns).toEqual({
      root: {
        type: 'page-set',
        id: 'root',
        data: {
          pages: ['page-1', 'page-2'],
        },
      } satisfies PageSetPattern,
      'page-1': {
        type: 'page',
        id: 'page-1',
        data: {
          title: 'Page 1',
          patterns: ['element-2'],
        },
      } satisfies PagePattern,
      'page-2': {
        type: 'page',
        id: 'page-2',
        data: {
          title: 'Page 2',
          patterns: ['element-3', 'element-1'],
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
      'element-2': {
        type: 'input',
        id: 'element-2',
        data: {
          label: 'Pattern 2',
          initial: '',
          required: true,
          maxLength: 128,
        },
      },
      'element-3': {
        type: 'input',
        id: 'element-3',
        data: {
          label: 'Pattern 3',
          initial: '',
          required: true,
          maxLength: 128,
        },
      },
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

export const createTwoPageThreePatternTestForm = () => {
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
            pages: ['page-1', 'page-2'],
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
          type: 'page',
          id: 'page-2',
          data: {
            title: 'Page 2',
            patterns: ['element-3'],
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
            initial: '',
            required: true,
            maxLength: 128,
          },
        } satisfies InputPattern,
        {
          type: 'input',
          id: 'element-3',
          data: {
            label: 'Pattern 3',
            initial: '',
            required: true,
            maxLength: 128,
          },
        } satisfies InputPattern,
      ],
    }
  );
};
