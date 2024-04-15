import React from 'react';

import { createFormSession } from '@atj/forms';

import Form, { PatternComponent, type ComponentForPattern } from '../../Form';

import { PreviewPattern } from './PreviewPattern';
import { PatternPreviewSequence } from './PreviewSequencePattern';
import { useFormEditStore } from './store';

export const PreviewForm = () => {
  const uiContext = useFormEditStore(state => state.context);
  const form = useFormEditStore(state => state.form);

  const disposable = createFormSession(form); // nullSession instead?

  return (
    <Form
      isPreview={true}
      context={{
        config: uiContext.config,
        // TODO: We might want to hoist this definition up to a higher level,
        // so we don't have to regenerate it every time we render the form.
        components: createPreviewComponents(uiContext.components),
        uswdsRoot: uiContext.uswdsRoot,
      }}
      session={disposable}
    ></Form>
  );
};

const createPreviewComponents = (
  components: ComponentForPattern
): ComponentForPattern => {
  const previewComponents: ComponentForPattern = {};
  // TODO: Create a configurable way to to define preview components.
  for (const [patternType, Component] of Object.entries(components)) {
    previewComponents[patternType] = Component;
    if (patternType === 'sequence') {
      previewComponents[patternType] =
        PatternPreviewSequence as PatternComponent;
    } else {
      previewComponents[patternType] = PreviewPattern;
    }
  }
  return previewComponents;
};
