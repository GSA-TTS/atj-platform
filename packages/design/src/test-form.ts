import { createForm, createFormSession, defaultFormConfig } from '@atj/forms';

import {
  defaultPatternComponents,
  defaultPatternEditComponents,
} from './config';
import { FormUIContext } from 'Form';
import { type FormEditUIContext } from './FormManager/FormEdit/types';

export const createTestForm = () => {
  return createForm(
    {
      title: 'Test form',
      description: 'Test description',
    },
    {
      root: 'root',
      elements: [
        {
          type: 'sequence',
          id: 'root',
          data: {
            elements: ['element-1', 'element-2'],
          },
          initial: {
            elements: [],
          },
        },
        {
          type: 'input',
          id: 'element-1',
          data: {
            text: 'Pattern 1',
            required: true,
            initial: '',
          },
          initial: '',
        },
        {
          type: 'input',
          id: 'element-2',
          data: {
            text: 'Pattern 2',
            required: false,
            initial: 'test',
          },
          initial: '',
        },
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
