import React from 'react';

import { createFormSession } from '@atj/forms';

import Form, {
  type ComponentForPattern,
  type PatternComponent,
} from '../../Form';

import { AddPatternDropdown } from './AddPatternDropdown';
import { PreviewPattern } from './PreviewPattern';
import { PatternPreviewSequence } from './components/PreviewSequencePattern';
import { useFormManagerStore } from '../store';

export default function FormEdit() {
  return (
    <>
      <h1>Edit form</h1>
      <p className="usa-intro">Your form has been imported for web delivery.</p>
      <EditForm />
    </>
  );
}

const EditForm = () => {
  const { form } = useFormManagerStore();
  const uiContext = useFormManagerStore(state => state.context);
  const disposable = createFormSession(form); // nullSession instead?

  return (
    <div className="position-relative">
      <div className="grid-row">
        <div className="grid-col-12">
          <AddPatternDropdown />
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col-12">
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
        </div>
      </div>
    </div>
  );
};

// TODO: We want to get rid of this and rely entirely on the injected
// editComponent configuration.
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
