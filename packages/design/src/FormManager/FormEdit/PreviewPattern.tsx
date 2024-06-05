import React, { useEffect, useRef } from 'react';

import { PatternComponent } from '../../Form';
import { useFormManagerStore } from '../store';

export const PreviewPattern: PatternComponent = function PreviewPattern(props) {
  const { context, setFocus } = useFormManagerStore(state => ({
    context: state.context,
    setFocus: state.setFocus,
  }));
  const focus = useFormManagerStore(state => {
    if (state.focus?.pattern.id === props._patternId) {
      return state.focus;
    }
  });
  const focusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      focus &&
      focus.pattern.id === props._patternId &&
      focus.pattern.type !== 'page' &&
      focusRef.current?.scrollIntoView
    ) {
      focusRef.current?.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      });
    }
  }, [focus]);

  const EditComponent = context.editComponents[props.type];
  return (
    <div
      ref={focusRef}
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
      <EditComponent context={context} previewProps={props} focus={focus} />
    </div>
  );
};
