import { createForm, defaultFormConfig } from '@atj/forms';

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
