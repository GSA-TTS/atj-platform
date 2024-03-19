import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { createTestFormService } from '@atj/form-service';

import FormEdit from '.';
import { createTestForm, createTestFormEditContext } from '../../test-form';
import { userEvent, within } from '@storybook/test';

export default {
  title: 'FormManager/FormEdit',
  component: FormEdit,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
  args: {
    context: createTestFormEditContext(),
    formId: 'test-form',
    formService: createTestFormService({
      'test-form': createTestForm(),
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormEdit>;

export const FormEditTest: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    await editFieldLabel(canvasElement, 0, 'First field label');
    await editFieldLabel(canvasElement, 1, 'Second field label');
  },
};

const editFieldLabel = async (
  element: HTMLElement,
  buttonIndex: number,
  fieldLabel: string
) => {
  const canvas = within(element);

  // Click "edit form" button for first field
  await userEvent.click(canvas.getAllByRole('button')[buttonIndex]);

  // Enter new text for first field
  const input = canvas.getByLabelText('Field label');
  await userEvent.clear(input);
  await userEvent.type(input, fieldLabel);

  // Save the field to the form
  await userEvent.click(canvas.getByRole('button', { name: 'Save' }));
};
