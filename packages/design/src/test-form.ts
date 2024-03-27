import { createForm, createFormSession, defaultFormConfig } from '@atj/forms';

import {
  defaultPatternComponents,
  defaultPatternEditComponents,
} from './config';
import { FormUIContext } from 'Form';
import { type FormEditUIContext } from './FormManager/FormEdit/types';
import { SequencePattern } from '@atj/forms/src/patterns/sequence';
import { InputPattern } from '@atj/forms/src/patterns/input';

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
          initial: {
            patterns: [],
          },
        } as SequencePattern,
        {
          type: 'input',
          id: 'element-1',
          data: {
            label: 'Pattern 1',
            initial: '',
            required: true,
            maxLength: 128,
          },
          initial: {
            label: 'Pattern 1',
            initial: '',
            required: true,
            maxLength: 128,
          },
        } as InputPattern,
        {
          type: 'input',
          id: 'element-2',
          data: {
            label: 'Pattern 2',
            initial: 'test',
            required: true,
            maxLength: 128,
          },
          initial: {
            label: 'Pattern 2',
            initial: 'test',
            required: true,
            maxLength: 128,
          },
        } as InputPattern,
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

export const createTestFormEditContext = (): FormEditUIContext => {
  return {
    config: defaultFormConfig,
    components: defaultPatternComponents,
    editComponents: defaultPatternEditComponents,
    uswdsRoot: `/static/uswds/`,
  };
};

export const createTestSession = () => {
  const form = createTestForm();
  return createFormSession(form);
};
