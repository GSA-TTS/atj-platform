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
    const pagesetHeaderElement = await canvas.findByText(/Page 1/);
    await testUpdateFormFieldOnSubmitByElement(
      canvasElement,
      pagesetHeaderElement,
      'Page title',
      'Page 1 updated'
    );
  },
};
