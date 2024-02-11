import { createForm, defaultFormConfig } from '@atj/forms';

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
        },
        {
          type: 'input',
          id: 'element-1',
          data: {
            text: 'FormElement 1',
            required: true,
            initial: '',
          },
        },
        {
          type: 'input',
          id: 'element-2',
          data: {
            text: 'FormElement 2',
            required: false,
            initial: 'test',
          },
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
