import type { Meta, StoryObj } from '@storybook/react';
import { userEvent } from '@storybook/test';
import { within } from '@testing-library/react';

import { type CheckboxPattern } from '@atj/forms/src/patterns/checkbox';

import CheckboxPatternEdit from './CheckboxPatternEdit';
import { createPatternEditStory } from './common/story-helper';
import FormEdit from '..';

const pattern: CheckboxPattern = {
  id: '1',
  type: 'checkbox',
  data: {
    label: 'Checkbox pattern',
    defaultChecked: false,
  },
};
//const patternConfig = defaultFormConfig['patterns'][pattern.type];

export default {
  title: 'Edit components/CheckboxPatternEdit',
  ...createPatternEditStory({
    pattern,
  }),
} as Meta<typeof FormEdit>;

export const FormEditTest: StoryObj<typeof CheckboxPatternEdit> = {
  play: async ({ canvasElement }) => {
    userEvent.setup();

    const canvas = within(canvasElement);

    // Give focus to the field matching `currentLabel`
    await userEvent.click(await canvas.findByLabelText('Checkbox pattern'));

    // Enter new text for first field
    const input = canvas.getByLabelText('Field label');
    await userEvent.clear(input);
    await userEvent.type(input, 'Updated checkbox pattern{enter}');
  },
};
