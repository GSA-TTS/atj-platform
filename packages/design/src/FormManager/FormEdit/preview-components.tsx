import React from 'react';

import { type PatternProps } from '@atj/forms';

import { type PatternComponent, type ComponentForPattern } from '../../Form';
import { useFormEditStore } from './store';

export const createPreviewComponents = (
  components: ComponentForPattern,
  uswdsRoot: string
): ComponentForPattern => {
  const previewComponents: ComponentForPattern = {};
  // TODO: Create a configurable way to to define preview components.
  for (const [patternType, Component] of Object.entries(components)) {
    if (patternType === 'sequence' || patternType === 'fieldset') {
      previewComponents[patternType] = Component;
      /*
      previewComponents[patternType] = createSequencePatternPreviewComponent(
        Component,
        previewComponents
      );
      */
    } else if (patternType === 'form-summary') {
      previewComponents[patternType] = Component;
    } else {
      //previewComponents[patternType] = Component;
      previewComponents[patternType] = createPatternPreviewComponent(
        Component,
        uswdsRoot
      );
    }
  }
  return previewComponents;
};

const createPatternPreviewComponent = (
  Component: PatternComponent,
  uswdsRoot: string
) => {
  const PatternPreviewComponent: PatternComponent = ({
    pattern,
  }: {
    pattern: PatternProps;
  }) => {
    const selectedElement = useFormEditStore(state => state.selectedElement);
    const handleEditClick = useFormEditStore(state => state.handleEditClick);

    const isSelected = selectedElement?.id === pattern._elementId;
    const divClassNames = isSelected
      ? 'form-group-row field-selected'
      : 'form-group-row';

    return (
      <div className={divClassNames} data-id={pattern._elementId}>
        <Component pattern={pattern} />
        <span className="edit-button-icon">
          <button
            className="usa-button usa-button--secondary usa-button--unstyled"
            onClick={() => handleEditClick(pattern)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleEditClick(pattern);
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
              <use xlinkHref={`${uswdsRoot}img/sprite.svg#settings`}></use>
            </svg>
          </button>
        </span>
      </div>
    );
  };
  return PatternPreviewComponent;
};

/*
const createSequencePatternPreviewComponent = (
  Component: PatternComponent,
  previewComponents: ComponentForPattern
) => {
  const PatternPreviewSequenceComponent: PatternComponent = ({
    pattern,
  }) => {
    const { form, setSelectedElement } = usePreviewContext();
    const element = getPattern(form, pattern._elementId);
    const Component = previewComponents[pattern.type];
    return (
      <DraggableList
        form={form}
        element={element}
        setSelectedElement={setSelectedElement}
      >
        <Component pattern={pattern} />
      </DraggableList>
    );
  };
  return PatternPreviewSequenceComponent;
};
*/
