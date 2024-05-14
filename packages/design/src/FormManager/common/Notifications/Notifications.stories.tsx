import { Meta, StoryObj } from '@storybook/react';
import { userEvent } from '@storybook/test';
import { waitFor, within } from '@testing-library/react';
import React from 'react';
import { expect } from 'vitest';
import { create } from 'zustand';

import { Notifications } from './Notifications';
import { createNotificationsSlice } from './store';
import { FormManagerProvider, useFormManagerStore } from '../../store';
import {
  createTestForm,
  createTestFormManagerContext,
} from '../../../test-form';

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
        form={createTestForm()}
      >
        <StoryImpl />
      </FormManagerProvider>
    ),
  ],
} satisfies Meta<typeof Notifications>;

export const Default: StoryObj<typeof Notifications> = {};
