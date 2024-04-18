import React from 'react';

import { PatternProps, getPattern } from '@atj/forms';

import { PatternComponent } from '../../Form';
import DraggableList from './DraggableList';
import { useFormEditStore } from './store';
import { SequencePattern } from '@atj/forms/src/patterns/sequence';

// TODO: consider merging this component with DraggableList, to clean up
// sematics around how its children are handled.
export const PatternPreviewSequence: PatternComponent<
  PatternProps<SequencePattern>
> = function PatternPreviewSequence(props) {
  const form = useFormEditStore(state => state.form);
  const updatePattern = useFormEditStore(state => state.updatePattern);
  const pattern = getPattern(form, props._patternId);

  /**
   * Here, we assume that we are rendering a "sequence" pattern, and that
   * sequences have no styling of their own. If sequences were to get their
   * own styling (like other components), this component would need to be
   * updated to replicate the styles, or the wrapping structure would need to
   * be updated to ensure that we pass the correct children to DraggableList.
   *
   * In other words, we'd want to render:
   *    const Component = context.components[props.type];
   * ... and then something like:
   *  <Component _patternId={pattern.id} {...pattern}>{props.children}</Component>
   */
  return (
    <DraggableList
      order={pattern.data.patterns}
      updateOrder={order => {
        updatePattern({
          id: pattern.id,
          type: pattern.type,
          data: {
            patterns: order,
          },
        });
      }}
    >
      {props.children}
    </DraggableList>
  );
};
