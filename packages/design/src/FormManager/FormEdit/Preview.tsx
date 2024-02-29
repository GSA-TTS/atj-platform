import React, { createContext, useContext } from 'react';

import {
  type FormDefinition,
  type FormElementId,
  type Pattern,
  createFormSession,
} from '@atj/forms';

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
    // I think we want to hoist this definition up to a higher level, so we
    // don't have to regenerate it every time we render the form.
    components: createPreviewComponents(uiContext.components),
  };
  const disposable = createFormSession(form); // nullSession instead?
  return <Form context={previewUiContext} session={disposable}></Form>;
};

const createPreviewComponents = (
  components: ComponentForPattern
): ComponentForPattern => {
  const previewComponents: ComponentForPattern = {};
  // TODO: Create a configurable way to to defined preview components.
  for (const [patternType, Component] of Object.entries(components)) {
    if (patternType === 'sequence') {
      previewComponents[patternType] = Component;
    } else {
      previewComponents[patternType] = createPatternPreviewComponent(Component);
    }
  }
  return previewComponents;
};

type PreviewContextValue = {
  selectedId?: FormElementId | null;
  setSelectedId: (id: FormElementId | null) => void;
};

export const PreviewContext = createContext<PreviewContextValue>(
  null as unknown as PreviewContextValue
);

const createPatternPreviewComponent = (Component: FormElementComponent) => {
  const PatternPreviewComponent: FormElementComponent = ({
    pattern,
  }: {
    pattern: Pattern;
  }) => {
    const { selectedId, setSelectedId } = useContext(PreviewContext);

    const handleEditClick = () => {
      if (selectedId === pattern._elementId) {
        setSelectedId(null);
      } else {
        setSelectedId(pattern._elementId);
      }
    };

    const isSelected = selectedId === pattern._elementId;
    const divClassNames = isSelected
      ? 'form-group-row field-selected'
      : 'form-group-row';

    const staticRoot = "/@fs/Users/npierrelouis/Documents/Git Repos/atj-platform/packages/design/";
    return (
      <div className={divClassNames}
        data-id={pattern._elementId}
      >
        <Component pattern={pattern} />
        <span className="edit-button-icon">
          <button 
            className="usa-button usa-button--secondary usa-button--unstyled"
            onClick={handleEditClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEditClick();
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
              <use xlinkHref={`${staticRoot}static/uswds/img/sprite.svg#settings`}></use>
            </svg>
          </button>
        </span>
      </div>
    );
  };
  return PatternPreviewComponent;
};
