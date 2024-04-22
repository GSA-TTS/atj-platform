import { createForm, createFormSession, defaultFormConfig } from '@atj/forms';
import { type SequencePattern } from '@atj/forms/src/patterns/sequence';
import { type InputPattern } from '@atj/forms/src/patterns/input';
import { createTestFormService } from '@atj/form-service';

import { type FormUIContext } from './Form';
import { defaultPatternComponents } from './Form/components';
import { type FormManagerContext } from './FormManager/FormEdit/types';
import { defaultPatternEditComponents } from './FormManager/FormEdit/components';

export const createTestForm = () => {
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

export const createTestFormEditContext = (): FormManagerContext => {
  return {
    components: defaultPatternComponents,
    config: defaultFormConfig,
    editComponents: defaultPatternEditComponents,
    formService: createTestFormService(),
    uswdsRoot: `/static/uswds/`,
  };
};

export const createTestSession = () => {
  const form = createTestForm();
  return createFormSession(form);
};
