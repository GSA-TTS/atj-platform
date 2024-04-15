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

// This test only works in a real browser, not via JSDOM as we use it.
/*
export const FormEditReorderPattern: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const grabber = await canvas.getAllByText(':::')[0];
    await grabber.focus();

    // Enter reordering mode with the spacebar
    await userEvent.type(grabber, ' ');
    await new Promise(r => setTimeout(r, 100));

    // Press the arrow down, to move the first pattern to the second position
    await userEvent.type(grabber, '[ArrowDown]');
    await new Promise(r => setTimeout(r, 100));

    // Press the spacebar to exit reordering mode
    await userEvent.type(grabber, ' ');
    await new Promise(r => setTimeout(r, 100));

    // Pattern 1 should be after pattern 2 in the document
    const pattern1 = canvas.getByText('Pattern 1');
    const pattern2 = canvas.getByText('Pattern 2');
    expect(pattern2.compareDocumentPosition(pattern1)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  },
};
*/

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
