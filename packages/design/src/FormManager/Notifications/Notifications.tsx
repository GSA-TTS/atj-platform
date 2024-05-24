import React from 'react';
import { useFormManagerStore } from '../store';
import { NotificationAlert } from './NotificationAlert';

export const Notifications = () => {
  const { notifications } = useFormManagerStore();
  return (
    <div
      className={`position-fixed z-200`}
      style={{
        top: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '90%',
      }}
    >
      {notifications.map(notification => (
        <NotificationAlert
          key={notification.id}
          type={notification.type}
          message={notification.message}
        />
      ))}
    </div>
  );
};
