import classNames from 'classnames';
import React from 'react';

import { type Notification } from './store';

export const NotificationAlert = ({ id, type, message }: Notification) => (
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
);
