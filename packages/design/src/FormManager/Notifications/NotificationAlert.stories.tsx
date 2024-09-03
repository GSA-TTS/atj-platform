import { Meta, StoryObj } from '@storybook/react';

import { NotificationAlert } from './NotificationAlert.js';

export default {
  title: 'FormManager/Notifications/NotificationAlert',
  component: NotificationAlert,
} satisfies Meta<typeof NotificationAlert>;

export const Info: StoryObj<typeof NotificationAlert> = {
  args: {
    type: 'info',
    message: 'Informational message',
  },
};
export const Warning: StoryObj<typeof NotificationAlert> = {
  args: {
    type: 'warning',
    message: 'Informational message',
  },
};
export const Success: StoryObj<typeof NotificationAlert> = {
  args: {
    type: 'success',
    message: 'Success message',
  },
};
export const Error: StoryObj<typeof NotificationAlert> = {
  args: {
    type: 'error',
    message: 'Error message',
  },
};
export const Emergency: StoryObj<typeof NotificationAlert> = {
  args: {
    type: 'emergency',
    message: 'Emergency message',
  },
};
