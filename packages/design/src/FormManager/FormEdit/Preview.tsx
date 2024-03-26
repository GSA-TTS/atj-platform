import React from 'react';

import { type PatternProps, createFormSession } from '@atj/forms';

import Form, {
  type ComponentForPattern,
  type FormElementComponent,
  type FormUIContext,
} from '../../Form';
import { useFormEditStore } from './store';

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

const createPreviewComponents = (
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

/*
const createSequencePatternPreviewComponent = (
  Component: FormElementComponent,
  previewComponents: ComponentForPattern
) => {
  const PatternPreviewSequenceComponent: FormElementComponent = ({
    pattern,
  }) => {
    const { form, setSelectedElement } = usePreviewContext();
    const element = getFormElement(form, pattern._elementId);
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

const createPatternPreviewComponent = (
  Component: FormElementComponent,
  uswdsRoot: string
) => {
  const PatternPreviewComponent: FormElementComponent = ({
    pattern,
  }: {
    pattern: Pattern;
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
