import React from 'react';
import { useFormManagerStore } from '../../store';
import classNames from 'classnames';

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
      {notifications.map(({ id, type, message }) => (
        <div
          key={id}
          className={classNames(
            'usa-alert usa-alert--slim bg-light-blue padding-2',
            `usa-alert--${type}`
          )}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="usa-alert__body">
            <p className="usa-alert__text">{message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
