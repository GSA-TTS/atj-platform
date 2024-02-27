import classNames from 'classnames';
import React, { createContext, useContext } from 'react';

import {
  type FormDefinition,
  type FormElementId,
  type Pattern,
  createFormSession,
  nullSession,
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
  selectedId?: FormElementId;
  setSelectedId: (id: FormElementId) => void;
};

export const PreviewContext = createContext<PreviewContextValue>(
  null as unknown as PreviewContextValue
);

const createPatternPreviewComponent = (Component: FormElementComponent) => {
  return function PatternPreviewComponent({ prompt }: { prompt: Pattern }) {
    const { selectedId, setSelectedId } = useContext(PreviewContext);
    return (
      <div
        onClick={() => {
          setSelectedId(prompt._elementId);
        }}
        className={classNames({
          'bg-primary-lighter': selectedId === prompt._elementId,
        })}
        //onKeyDown={handleKeyDown}
        role="button"
        aria-pressed={selectedId === prompt._elementId}
        aria-label="Select this pattern"
        tabIndex={0}
      >
        <Component prompt={prompt} />
      </div>
    );
  };
};
