import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Notifications } from './Notifications.js';
import { FormManagerProvider, useFormManagerStore } from '../store.js';
import {
  createTestFormManagerContext,
  createTestSession,
  createTwoPatternTestForm,
} from '../../test-form.js';

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
        session={createTestSession({ form: createTwoPatternTestForm() })}
      >
        <StoryImpl />
      </FormManagerProvider>
    ),
  ],
} satisfies Meta<typeof Notifications>;

export const Default: StoryObj<typeof Notifications> = {};
