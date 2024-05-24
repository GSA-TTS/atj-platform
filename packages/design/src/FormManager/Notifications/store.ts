import { StateCreator } from 'zustand';

type NotificationType = 'info' | 'warning' | 'success' | 'error' | 'emergency';

export type Notification = {
  type: NotificationType;
  id: string;
  message: string;
};

export type NotificationSlice = {
  notifications: Notification[];
  addNotification: (type: NotificationType, message: string) => void;
};

type NotificationStoreCreator = StateCreator<
  NotificationSlice,
  [],
  [],
  NotificationSlice
>;

export const createNotificationsSlice =
  (timeout: number = 5000): NotificationStoreCreator =>
  set => ({
    notifications: [],
    addNotification: (type, message) => {
      const id = crypto.randomUUID();
      set(state => ({
        notifications: [...state.notifications, { id, type, message }],
      }));

      // Add an extra second timeout for each 120 words in the message.
      const naiveWordCount = message.split(' ').length;
      const extraTimeout = Math.floor(naiveWordCount / 120) * 1000;

      setTimeout(() => {
        set(state => ({
          notifications: state.notifications.filter(
            notification => notification.id !== id
          ),
        }));
      }, timeout + extraTimeout);
    },
  });
