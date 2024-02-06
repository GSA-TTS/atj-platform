import { createForm } from '@atj/forms';

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
          elements: ['element-1', 'element-2'],
        },
        {
          type: 'input',
          id: 'element-1',
          text: 'FormElement 1',
          initial: '',
          required: true,
        },
        {
          type: 'input',
          id: 'element-2',
          text: 'FormElement 2',
          initial: 'initial value',
          required: false,
        },
      ],
    }
  );
};
