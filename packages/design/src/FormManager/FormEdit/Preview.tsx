import React from 'react';

import { createFormSession, getPattern } from '@atj/forms';

import Form, {
  type ComponentForPattern,
  type PatternComponent,
  type FormUIContext,
} from '../../Form';
import { useFormEditStore } from './store';
import DraggableList from './DraggableList';

export const PreviewForm = () => {
  const uiContext = useFormEditStore(state => state.context);
  const form = useFormEditStore(state => state.form);

  const previewUiContext: FormUIContext = {
    config: uiContext.config,
    // TODO: We'll want to hoist this definition up to a higher level, so we
    // don't have to regenerate it every time we render the form.
    components: createPreviewComponents(
      uiContext.components,
      uiContext.uswdsRoot
    ),
    uswdsRoot: uiContext.uswdsRoot,
  };
  const disposable = createFormSession(form); // nullSession instead?

  return (
    <Form
      isPreview={true}
      context={previewUiContext}
      session={disposable}
    ></Form>
  );
};

const createSequencePatternPreviewComponent = (
  Component: PatternComponent,
  previewComponents: ComponentForPattern
) => {
  const PatternPreviewSequenceComponent: PatternComponent = props => {
    const form = useFormEditStore(state => state.form);
    const setSelectedPattern = useFormEditStore(
      state => state.setSelectedPattern
    );
    const pattern = getPattern(form, props._patternId);
    return (
      <DraggableList
        form={form}
        pattern={pattern}
        setSelectedPattern={setSelectedPattern}
      >
        <Component _patternId={pattern.id} {...pattern}></Component>
      </DraggableList>
    );
  };
  return PatternPreviewSequenceComponent;
};

const createPatternPreviewComponent = (
  Component: PatternComponent,
  uswdsRoot: string
) => {
  const PatternPreviewComponent: PatternComponent = props => {
    const context = useFormEditStore(state => state.context);
    const selectedPattern = useFormEditStore(state => state.selectedPattern);
    const handleEditClick = useFormEditStore(state => state.handleEditClick);

    const isSelected = selectedPattern?.id === props._patternId;
    const divClassNames = isSelected
      ? 'form-group-row field-selected'
      : 'form-group-row';
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
                <use xlinkHref={`${uswdsRoot}img/sprite.svg#settings`}></use>
              </svg>
            </button>
          ) : null}
        </span>
      </div>
    );
  };
  return PatternPreviewComponent;
};

const createPreviewComponents = (
  components: ComponentForPattern,
  uswdsRoot: string
): ComponentForPattern => {
  const previewComponents: ComponentForPattern = {};
  // TODO: Create a configurable way to to define preview components.
  for (const [patternType, Component] of Object.entries(components)) {
    previewComponents[patternType] = Component;
    if (patternType === 'sequence') {
      previewComponents[patternType] = createSequencePatternPreviewComponent(
        Component,
        previewComponents
      );
    }
    /*
    } else if (patternType === 'form-summary') {
      previewComponents[patternType] = Component;
    } else {
      //previewComponents[patternType] = Component;
      previewComponents[patternType] = createPatternPreviewComponent(
        Component,
        uswdsRoot
      );
    }
    */
  }
  return previewComponents;
};
