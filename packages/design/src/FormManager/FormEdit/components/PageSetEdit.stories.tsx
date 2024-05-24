import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@testing-library/react';

import {
  createPatternEditStoryMeta,
  testUpdateFormFieldOnSubmitByElement,
} from './common/story-helper';
import PageSetEdit from './PageSetEdit';
import { createTwoPageTwoPatternTestForm } from '../../../test-form';

const blueprint = createTwoPageTwoPatternTestForm();

const storyConfig: Meta<typeof PageSetEdit> = {
  title: 'Edit components/PageSetEdit',
  ...createPatternEditStoryMeta({
    blueprint,
  }),
};
export default storyConfig;

export const Basic: StoryObj<typeof PageSetEdit> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await testUpdateFormFieldOnSubmitByElement(
      canvasElement,
      await canvas.findByText('Page X'),
      'Page title',
      'Page 1 updated'
    );
  },
};
