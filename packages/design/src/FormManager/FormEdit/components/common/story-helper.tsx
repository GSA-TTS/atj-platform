import React from 'react';
import { type Meta } from '@storybook/react';

import { type Pattern } from '@atj/forms';

import {
  createSimpleTestBlueprint,
  createTestFormManagerContext,
} from '../../../../test-form';

import FormEdit from '../../../FormEdit';
import { FormManagerProvider } from '../../../store';

type PatternEditStoryMetaOptions = {
  pattern: Pattern;
};

export const createPatternEditStoryMeta = ({
  pattern,
}: PatternEditStoryMetaOptions): Meta<typeof FormEdit> => {
  const test = {
    title: 'Untitled pattern edit story',
    component: FormEdit,
    decorators: [
      (Story, args) => (
        <FormManagerProvider
          context={createTestFormManagerContext()}
          form={createSimpleTestBlueprint(pattern)}
        >
          <Story {...args} />
        </FormManagerProvider>
      ),
    ],
    args: {},
    tags: ['autodocs'],
  } satisfies Meta<typeof FormEdit>;
  return test;
};
