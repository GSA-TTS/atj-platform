import { createForm, createFormSession, defaultFormConfig } from '@atj/forms';

import { defaultFormElementComponent } from './config';

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
          default: {
            elements: [],
          },
          required: true,
        },
        {
          type: 'input',
          id: 'element-1',
          data: {
            text: 'FormElement 1',
            required: true,
            initial: '',
          },
          default: '',
          required: true,
        },
        {
          type: 'input',
          id: 'element-2',
          data: {
            text: 'FormElement 2',
            required: false,
            initial: 'test',
          },
          default: '',
          required: true,
        },
      ],
    }
  );
};

export const createTestFormConfig = () => {
  return defaultFormConfig;
};

export const createTestFormElementComponentMap = () => {
  return defaultFormElementComponent;
};

export const createTestFormContext = () => {
  return {
    config: defaultFormConfig,
    components: defaultFormElementComponent,
  };
};

export const createTestSession = () => {
  const form = createTestForm();
  return createFormSession(form);
};
