import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect, userEvent, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';

import { createForm } from '@atj/forms';
import { createTestFormService } from '@atj/form-service';

import FormList from '.';

export default {
  title: 'FormManager/FormList',
  component: FormList,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
  args: {
    formService: createTestFormService({
      'test-form': createForm(
        {
          title: 'Test form',
          description: 'Test description',
        },
        [
          {
            id: 'question-1',
            text: 'Question 1',
            initial: '',
            required: true,
          },
          {
            id: 'question-2',
            text: 'Question 2',
            initial: 'initial value',
            required: false,
          },
        ]
      ),
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormList>;

export const FormListEmpty = {} satisfies StoryObj<typeof FormList>;

export const FormListFilled = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Title' }),
      'My guided interview'
    );
    await userEvent.type(
      canvas.getByRole('textbox', { name: 'Description' }),
      "My super guided interview is an example of awesomeness that you simply won't believe."
    );

    // See https://storybook.js.org/docs/essentials/actions#automatically-matching-args
    // to learn how to setup logging in the Actions panel
    //await userEvent.click(canvas.getByRole('button'));

    expect(canvas.getByRole('button')).toBeEnabled();
  },
} satisfies StoryObj<typeof FormList>;
