import React from 'react';

import { PatternComponent } from '../../Form';
import { useFormManagerStore } from '../store';

export const PreviewPattern: PatternComponent = function PreviewPattern(props) {
  const { context, setFocus } = useFormManagerStore(state => ({
    context: state.context,
    setFocus: state.setFocus,
    updatePatternById: state.updatePatternById,
  }));
  const EditComponent = context.editComponents[props.type];

  return (
    <div
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
      <EditComponent context={context} previewProps={props} />
    </div>
  );
};
