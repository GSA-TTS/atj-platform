import React from 'react';
import * as routes from '../routes';

export default function FormManagerFooter() {
  return (
    <p>
      <a href={routes.getManageUrl()} className="usa-button">
        Create New
      </a>
    </p>
  );
}
