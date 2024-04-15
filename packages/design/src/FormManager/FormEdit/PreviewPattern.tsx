import React from 'react';

import { PatternComponent } from '../../Form';
import { useFormEditStore } from './store';

export const PreviewPattern: PatternComponent = function PreviewPattern(props) {
  const context = useFormEditStore(state => state.context);
  const selectedPattern = useFormEditStore(state => state.selectedPattern);
  const handleEditClick = useFormEditStore(state => state.handleEditClick);

  const isSelected = selectedPattern?.id === props._patternId;
  const divClassNames = isSelected
    ? 'form-group-row field-selected'
    : 'form-group-row';
  const Component = context.components[props.type];
  const EditComponent = context.editComponents[props.type];

  return (
    <div className={divClassNames} data-id={props._patternId}>
      <Component {...props} />
      <span className="edit-button-icon">
        {EditComponent ? (
          <button
            className="usa-button usa-button--secondary usa-button--unstyled"
            onClick={() => handleEditClick(props._patternId)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleEditClick(props._patternId);
              }
            }}
            tabIndex={0}
            aria-label="Edit form group"
          >
            <svg
              className="usa-icon"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use
                xlinkHref={`${context.uswdsRoot}img/sprite.svg#settings`}
              ></use>
            </svg>
          </button>
        ) : null}
      </span>
    </div>
  );
};
