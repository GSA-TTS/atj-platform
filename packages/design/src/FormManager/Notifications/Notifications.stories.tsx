import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Notifications } from './Notifications';
import { FormManagerProvider, useFormManagerStore } from '../store';
import {
  createTestFormManagerContext,
  createTwoPatternTestForm,
} from '../../test-form';

const StoryImpl = () => {
  const { addNotification } = useFormManagerStore();
  return (
    <>
      <button
        onClick={() => addNotification('info', 'Notification triggered!')}
      >
        Trigger Notification
      </button>
      <Notifications />
    </>
  );
};

export default {
  title: 'FormManager/Notifications/Notifications',
  component: Notifications,
  decorators: [
    () => (
      <FormManagerProvider
        context={createTestFormManagerContext()}
        form={createTwoPatternTestForm()}
      >
        <StoryImpl />
      </FormManagerProvider>
    ),
  ],
} satisfies Meta<typeof Notifications>;

export const Default: StoryObj<typeof Notifications> = {};
