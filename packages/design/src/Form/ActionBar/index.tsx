import React from 'react';

import { PromptAction } from '@atj/forms';

export default function ActionBar({ actions }: { actions: PromptAction[] }) {
  return (
    <p className="usa-button-wrapper">
      {actions.map((action, index) => {
        if (action.type === 'submit') {
          return (
            <button key={index} type={action.type} className="usa-button">
              {action.text}
            </button>
          );
        }
      })}
    </p>
  );
}
