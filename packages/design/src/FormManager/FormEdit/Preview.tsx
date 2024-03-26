import React from 'react';

import { createSession } from '@atj/forms';

import Form from '../../Form';
import { useFormEditStore } from './store';

export const PreviewForm = () => {
  const uiContext = useFormEditStore(state => state.context);
  const form = useFormEditStore(state => state.form);
  const disposable = createSession(form); // nullSession instead?

  return (
    <Form
      isPreview={true}
      context={{
        config: uiContext.config,
        // TODO: We'll want to hoist this definition up to a higher level, so we
        // don't have to regenerate it every time we render the form.
        components: uiContext.components,
        uswdsRoot: uiContext.uswdsRoot,
      }}
      session={disposable}
    ></Form>
  );
};
