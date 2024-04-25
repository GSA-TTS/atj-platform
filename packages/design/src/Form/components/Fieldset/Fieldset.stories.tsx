import type { Meta, StoryObj } from '@storybook/react';

import Fieldset from '.';

export default {
  title: 'patterns/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
} satisfies Meta<typeof Fieldset>;

export const FieldsetSectionWithSubheader = {
  args: {
    legend: 'Default Heading',
    subheader: 'Default Subhead',
    type: 'fieldset',
    _patternId: 'test-id',
  },
} satisfies StoryObj<typeof Fieldset>;

export const FieldsetSectionWithoutSubheader = {
  args: {
    legend: 'Default Heading',
    type: 'fieldset',
    _patternId: 'test-id',
  },
} satisfies StoryObj<typeof Fieldset>;
