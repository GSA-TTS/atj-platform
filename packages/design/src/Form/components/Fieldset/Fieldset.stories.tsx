import type { Meta, StoryObj } from '@storybook/react';

import Fieldset from './index.js';

export default {
  title: 'patterns/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
} satisfies Meta<typeof Fieldset>;

export const FieldsetSection = {
  args: {
    legend: 'Default Heading',
    type: 'fieldset',
    _patternId: 'test-id',
  },
} satisfies StoryObj<typeof Fieldset>;
