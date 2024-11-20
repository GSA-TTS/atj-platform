import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@testing-library/react';

import {
  createPatternEditStoryMeta,
  testUpdateFormFieldOnSubmitByElement,
} from './common/story-helper.js';
import PageSetEdit from './PageSetEdit.js';
import { createTwoPageTwoPatternTestForm } from '../../../test-form.js';
import { userEvent } from '@storybook/test';

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

export const CreateCustomRule: StoryObj<typeof PageSetEdit> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    //const pagesetHeaderElement = await canvas.findByText(/Page 1/);
    const button = canvas.getByRole('button', { name: /Create custom rule/ });
    await userEvent.click(button);
  },
};
