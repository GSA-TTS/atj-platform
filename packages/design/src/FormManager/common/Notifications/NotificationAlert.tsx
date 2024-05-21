import classNames from 'classnames';
import React from 'react';

import { type Notification } from './store';

type NotificationAlertProps = {
  type: Notification['type'];
  message: Notification['message'];
};

export const NotificationAlert = ({
  type,
  message,
}: NotificationAlertProps) => (
  <div
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
);
