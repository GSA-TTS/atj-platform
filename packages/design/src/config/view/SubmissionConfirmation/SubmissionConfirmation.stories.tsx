import type { Meta, StoryObj } from '@storybook/react';

import SubmissionConfirmation, { type SubmissionConfirmationProps } from '.';

export default {
  title: 'patterns/SubmissionConfirmation',
  component: SubmissionConfirmation,
  tags: ['autodocs'],
} satisfies Meta<typeof SubmissionConfirmation>;

export const SubmissionConfirmationExample = {
  args: {
    prompt: {
      type: 'submission-confirmation',
      table: [
        { label: 'Field 1', value: 'Value 1' },
        { label: 'Field 2', value: 'Value 2' },
        { label: 'Field 3', value: 'Value 3' },
        { label: 'Field 4', value: 'Value 4' },
      ],
    },
  } satisfies SubmissionConfirmationProps,
} satisfies StoryObj<typeof SubmissionConfirmation>;
