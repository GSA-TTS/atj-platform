import type { Meta, StoryObj } from '@storybook/react';

import Fieldset from '.';

export default {
  title: 'patterns/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
} satisfies Meta<typeof Fieldset>;

export const FieldsetSection1 = {
  args: {
    legend: 'Section 1',
    type: 'fieldset',
    _patternId: 'test-id',
  },
} satisfies StoryObj<typeof Fieldset>;

export const FieldsetSection2 = {
  args: {
    legend: 'Section 2',
    type: 'fieldset',
    _patternId: 'test-id',
  },
} satisfies StoryObj<typeof Fieldset>;
