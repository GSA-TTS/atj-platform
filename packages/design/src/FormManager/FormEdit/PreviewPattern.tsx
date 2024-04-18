import React from 'react';

import { PatternComponent } from '../../Form';
import { useFormEditStore } from './store';
import { PatternEdit } from './PatternEdit';

export const PreviewPattern: PatternComponent = function PreviewPattern(props) {
  const context = useFormEditStore(state => state.context);
  const focusedPattern = useFormEditStore(state => state.focusedPattern);
  const setFocus = useFormEditStore(state => state.setFocus);

  const isSelected = focusedPattern?.id === props._patternId;
  const divClassNames = isSelected
    ? 'form-group-row field-selected'
    : 'form-group-row';
  const Component = context.components[props.type];
  const EditComponent = context.editComponents[props.type];

  const selected = focusedPattern?.id === props._patternId;
  return (
    <div
      className={divClassNames}
      data-id={props._patternId}
      onFocus={event => {
        if (EditComponent) {
          event.stopPropagation();
          setFocus(props._patternId);
        }
      }}
    >
      {selected ? <PatternEdit /> : <Component {...props} />}
    </div>
  );
};
