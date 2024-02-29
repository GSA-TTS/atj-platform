import React from 'react';

import {
  type FormDefinition,
  type Pattern,
  createFormSession,
  getFormElement,
} from '@atj/forms';

import { usePreviewContext } from './context';
import Form, {
  type ComponentForPattern,
  type FormElementComponent,
  type FormUIContext,
} from '../../Form';

type PreviewFormProps = {
  uiContext: FormUIContext;
  form: FormDefinition;
};

export const PreviewForm = ({ uiContext, form }: PreviewFormProps) => {
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
  return <Form context={previewUiContext} session={disposable}></Form>;
};

const createPreviewComponents = (
  components: ComponentForPattern,
  uswdsRoot: string
): ComponentForPattern => {
  const previewComponents: ComponentForPattern = {};
  // TODO: Create a configurable way to to define preview components.
  for (const [patternType, Component] of Object.entries(components)) {
    if (patternType === 'sequence') {
      previewComponents[patternType] = Component;
      /*
      previewComponents[patternType] = createSequencePatternPreviewComponent(
        Component,
        previewComponents
      );
      */
    } else if (patternType === 'form-summary') {
      console.log('skipping form-summary...');
      previewComponents[patternType] = Component;
    } else {
      previewComponents[patternType] = Component;
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
    const { form, selectedElement, setSelectedElement } = usePreviewContext();

    const handleEditClick = () => {
      if (selectedElement.id === pattern._elementId) {
        //setSelectedElement(null);
      } else {
        const element = getFormElement(form, pattern._elementId);
        setSelectedElement(element);
      }
    };

    const isSelected = selectedElement.id === pattern._elementId;
    const divClassNames = isSelected
      ? 'form-group-row field-selected'
      : 'form-group-row';

    // console.log("Current Selected ID:", selectedId);
    // console.log("Prompt ID:", prompt);

    // console.log("setSelectedId : ", setSelectedId );
    // console.log("Is Selected:", isSelected);
    // console.log("Class Names:", divClassNames);
    return (
      <div
        onClick={handleEditClick}
        className={divClassNames}
        //onKeyDown={handleKeyDown}
        role="button"
        aria-pressed={isSelected}
        aria-label="Select this pattern"
        tabIndex={0}
      >
        <Component pattern={pattern} />
        <span className="edit-button-icon">
          <a
            className="usa-link"
            href="javascript:void(0);"
            title="Click to edit"
          >
            <svg
              className="usa-icon"
              aria-label="Click here to edit form group"
              focusable="false"
              role="img"
            >
              <title>Edit form group</title>
              <desc>Click here to edit form group</desc>
              <use xlinkHref={`${uswdsRoot}img/sprite.svg#settings`}></use>
            </svg>
          </a>
        </span>
      </div>
    );
  };
  return PatternPreviewComponent;
};
