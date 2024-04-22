import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import FormEdit from '.';

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
    formId: 'test-form',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormEdit>;

export const FormEditTest: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    await editFieldLabel(canvasElement, 'Pattern 1', 'First field label');
    await editFieldLabel(canvasElement, 'Pattern 2', 'Second field label');
  },
};

export const FormEditAddPattern: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the initial count of inputs
    const initialCount = (await canvas.findAllByRole('textbox')).length;

    const select = canvas.getByLabelText('Add a pattern');
    await userEvent.selectOptions(select, 'Text input');

    const finalCount = (await canvas.findAllByRole('textbox')).length;
    expect(finalCount).toBeGreaterThan(initialCount);
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
  currentLabel: string,
  updatedLabel: string
) => {
  const canvas = within(element);

  // Give focus to the field matching `currentLabel`
  await userEvent.click(await canvas.findByLabelText(currentLabel));

  // Enter new text for first field
  const input = canvas.getByLabelText('Field label');
  await userEvent.clear(input);
  await userEvent.type(input, updatedLabel);

  waitFor(
    async () => {
      const newLabel = await canvas.getByLabelText(updatedLabel);
      await expect(newLabel).toBeInTheDocument();
    },
    { interval: 5 }
  );
};
