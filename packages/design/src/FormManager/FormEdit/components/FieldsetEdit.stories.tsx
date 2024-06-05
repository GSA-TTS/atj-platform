import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@testing-library/react';

import { type FieldsetPattern } from '@atj/forms/src/patterns/fieldset';

import {
  createPatternEditStoryMeta,
  testUpdateFormFieldOnSubmitByElement,
} from './common/story-helper';
import FormEdit from '..';

const pattern: FieldsetPattern = {
  id: '1',
  type: 'fieldset',
  data: {
    patterns: [],
  },
};

const storyConfig: Meta = {
  title: 'Edit components/FieldsetPattern',
  ...createPatternEditStoryMeta({
    pattern,
  }),
} as Meta<typeof FormEdit>;
export default storyConfig;

export const Basic: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await testUpdateFormFieldOnSubmitByElement(
      canvasElement,
      await canvas.findByText('Empty sections will not display.'),
      'Legend Text Element',
      'Updated fieldset pattern'
    );
  },
};

export const Error: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await testUpdateFormFieldOnSubmitByElement(
      canvasElement,
      await canvas.findByText('Empty sections will not display.'),
      'Legend Text Element',
      'Updated fieldset pattern'
    );
  },
};
