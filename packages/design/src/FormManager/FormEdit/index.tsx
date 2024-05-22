import React from 'react';

import { createFormSession } from '@atj/forms';

import Form, { type ComponentForPattern } from '../../Form';

import { AddPatternDropdown } from './AddPatternDropdown';
import { PreviewPattern } from './PreviewPattern';
import { useFormManagerStore } from '../store';

export default function FormEdit({ queryString }: { queryString: string }) {
  return (
    <>
      <EditForm queryString={queryString} />
    </>
  );
}

const EditForm = ({ queryString }: { queryString: string }) => {
  const { form } = useFormManagerStore();
  const uiContext = useFormManagerStore(state => state.context);
  const disposable = createFormSession(form, queryString); // nullSession instead?

  return (
    <div className="position-relative edit-form-content-wrapper">
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

const createPreviewComponents = (
  components: ComponentForPattern
): ComponentForPattern => {
  const previewComponents: ComponentForPattern = {};
  for (const patternType of Object.keys(components)) {
    previewComponents[patternType] = PreviewPattern;
  }
  return previewComponents;
};
