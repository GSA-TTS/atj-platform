import React from 'react';

import Form, { type ComponentForPattern } from '../../Form';

import { AddPatternDropdown } from './AddPatternDropdown';
import { PreviewPattern } from './PreviewPattern';
import { useFormManagerStore } from '../store';
import { Toolbar } from './Toolbar';

const EditForm = () => {
  const session = useFormManagerStore(state => state.session);
  const uiContext = useFormManagerStore(state => state.context);

  return (
    <div className="position-relative">
      <Toolbar uswdsRoot={uiContext.uswdsRoot} />
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
            session={session}
          ></Form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;

const createPreviewComponents = (
  components: ComponentForPattern
): ComponentForPattern => {
  const previewComponents: ComponentForPattern = {};
  for (const patternType of Object.keys(components)) {
    previewComponents[patternType] = PreviewPattern;
  }
  return previewComponents;
};
