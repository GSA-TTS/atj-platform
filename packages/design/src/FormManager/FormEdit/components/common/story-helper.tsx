import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Meta } from '@storybook/react';

import { Pattern } from '@atj/forms';

import {
  createTestFormManagerContext,
  createSimpleTestBlueprint,
} from '../../../../test-form';

import { FormManagerProvider } from '../../../store';
import FormEdit from '../../../FormEdit';

type PatternEditStory = {
  pattern: Pattern;
};

export const createPatternEditStory = ({
  pattern,
}: PatternEditStory): Meta<typeof FormEdit> => {
  const test = {
    title: 'Untitled pattern edit story',
    component: FormEdit,
    decorators: [
      (Story, args) => (
        <MemoryRouter initialEntries={['/']}>
          <FormManagerProvider
            context={createTestFormManagerContext()}
            form={createSimpleTestBlueprint(pattern)}
          >
            <Story {...args} />
          </FormManagerProvider>
        </MemoryRouter>
      ),
    ],
    args: {},
    tags: ['autodocs'],
  } satisfies Meta<typeof FormEdit>;
  return test;
};
