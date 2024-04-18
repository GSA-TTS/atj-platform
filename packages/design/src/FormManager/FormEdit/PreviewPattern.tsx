import React from 'react';

import { PatternComponent } from '../../Form';
import { useFormEditStore } from './store';

export const PreviewPattern: PatternComponent = function PreviewPattern(props) {
  const { context, setFocus } = useFormEditStore(state => ({
    context: state.context,
    setFocus: state.setFocus,
  }));
  const focusedPattern = useFormEditStore(state => state.focusedPattern);

  const isSelected = focusedPattern?.id === props._patternId;
  const divClassNames = isSelected
    ? 'form-group-row field-selected'
    : 'form-group-row';

  const EditComponent = context.editComponents[props.type];

  return (
    <div
      className={divClassNames}
      data-id={props._patternId}
      onClick={event => {
        if (EditComponent) {
          event.stopPropagation();
          setFocus(props._patternId);
        }
      }}
      onFocus={event => {
        if (EditComponent) {
          event.stopPropagation();
          setFocus(props._patternId);
        }
      }}
    >
      <EditComponent {...props} />
    </div>
  );
};
