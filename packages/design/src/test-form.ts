import {
  createForm,
  createFormSession,
  defaultFormConfig,
  type Blueprint,
  type Pattern,
} from '@atj/forms';
import { type SequencePattern } from '@atj/forms/src/patterns/sequence';
import { type InputPattern } from '@atj/forms/src/patterns/input';
import { service } from '@atj/forms';

import { type FormUIContext } from './Form';
import { defaultPatternComponents } from './Form/components';
import { defaultPatternEditComponents } from './FormManager/FormEdit/components';
import { type FormManagerContext } from './FormManager';
import { type PageSetPattern } from '@atj/forms/src/patterns/page-set/config';
import { type PagePattern } from '@atj/forms/src/patterns/page/config';

export const createOnePageTwoPatternTestForm = () => {
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

export const createTwoPageTwoPatternTestForm = () => {
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
            patterns: [],
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

export const createTwoPatternTestForm = () => {
  return createForm(
    {
      title: 'Test form',
      description: 'Test description',
    },
    {
      root: 'root',
      patterns: [
        {
          type: 'sequence',
          id: 'root',
          data: {
            patterns: ['element-1', 'element-2'],
          },
        } satisfies SequencePattern,
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

export const createSimpleTestBlueprint = (pattern: Pattern) => {
  return createForm(
    {
      title: 'Test form',
      description: 'Test description',
    },
    {
      root: 'root',
      patterns: [
        {
          type: 'sequence',
          id: 'root',
          data: {
            patterns: [pattern.id],
          },
        } satisfies SequencePattern,
        pattern,
      ],
    }
  );
};

export const createTestFormConfig = () => {
  return defaultFormConfig;
};

export const createTestPatternComponentMap = () => {
  return defaultPatternComponents;
};

export const createTestFormContext = (): FormUIContext => {
  return {
    config: defaultFormConfig,
    components: defaultPatternComponents,
    uswdsRoot: '/uswds/',
  };
};

export const createTestFormManagerContext = (): FormManagerContext => {
  const mockGetUrl = (id: string) => id;

  return {
    baseUrl: '/',
    components: defaultPatternComponents,
    config: defaultFormConfig,
    editComponents: defaultPatternEditComponents,
    formService: service.createTestFormService(),
    uswdsRoot: `/static/uswds/`,
    urlForForm: mockGetUrl,
    urlForFormManager: mockGetUrl,
  };
};

export const createTestSession = (options?: {
  form?: Blueprint;
  routeParams?: string;
}) => {
  return createFormSession(
    options?.form || createTwoPatternTestForm(),
    options?.routeParams
  );
};
