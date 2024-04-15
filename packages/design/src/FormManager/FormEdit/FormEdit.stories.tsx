import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { createTestFormService } from '@atj/form-service';

import FormEdit from '.';
import { createTestForm, createTestFormEditContext } from '../../test-form';
import { expect, userEvent, waitFor, within } from '@storybook/test';

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
    await editFieldLabel(canvasElement, 1, 'First field label');
    await editFieldLabel(canvasElement, 2, 'Second field label');
  },
};

export const FormEditAddPattern: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Select the first pattern for editing
    const button = (await canvas.findAllByLabelText('Edit form group'))[0];
    await userEvent.click(button);

    // Get the initial count of inputs
    const initialCount = (await canvas.findAllByLabelText('Edit form group'))
      .length;

    const select = canvas.getByLabelText('Add a pattern');
    await userEvent.selectOptions(select, 'Text input');

    const finalCount = (await canvas.findAllByLabelText('Edit form group'))
      .length;
    expect(finalCount).toEqual(initialCount + 1);
  },
};

const editFieldLabel = async (
  element: HTMLElement,
  buttonIndex: number,
  fieldLabel: string
) => {
  const canvas = within(element);

  // Click "edit form" button for first field
  await userEvent.click(
    (await canvas.findAllByLabelText('Edit form group'))[buttonIndex]
  );

  // Enter new text for first field
  const input = canvas.getByLabelText('Field label');
  await userEvent.clear(input);
  await userEvent.type(input, fieldLabel);

  // Save the field to the form
  await userEvent.click(canvas.getByRole('button', { name: 'Save' }));

  waitFor(
    async () => {
      const newLabel = await canvas.getByLabelText(fieldLabel);
      await expect(newLabel).toBeInTheDocument();
    },
    { interval: 5 }
  );
};
