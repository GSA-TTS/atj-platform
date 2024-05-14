import { nanoid } from 'nanoid';
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
      const id = nanoid();
      set(state => ({
        notifications: [...state.notifications, { id, type, message }],
      }));
      setTimeout(() => {
        set(state => ({
          notifications: state.notifications.filter(
            notification => notification.id !== id
          ),
        }));
      }, timeout);
    },
  });
