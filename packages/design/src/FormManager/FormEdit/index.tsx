import React, { useEffect } from 'react';

import { Blueprint, createFormSession } from '@atj/forms';
import { type FormService } from '@atj/form-service';

import Form, { ComponentForPattern, PatternComponent } from '../../Form';

import { AddPatternDropdown } from './AddPatternDropdown';
import { PreviewPattern } from './PreviewPattern';
import { PatternPreviewSequence } from './components/PreviewSequencePattern';
import { FormEditProvider, useFormEditStore } from './store';
import { type FormEditUIContext } from './types';

export default function FormEdit({
  context,
  formId,
  formService,
}: {
  context: FormEditUIContext;
  formId: string;
  formService: FormService;
}) {
  const result = formService.getForm(formId);
  if (!result.success) {
    return 'Form not found';
  }
  const form = result.data;

  return (
    <>
      <div className="edit-form-page">
        <h1>Edit form</h1>
        <p className="usa-intro">Your form has been imported for web delivery.</p>
        <FormEditProvider context={context} form={form}>
          <EditForm saveForm={form => formService.saveForm(formId, form)} />
        </FormEditProvider>
      </div>
    </>
  );
}

const EditForm = ({ saveForm }: { saveForm: (form: Blueprint) => void }) => {
  const { form } = useFormEditStore();
  const uiContext = useFormEditStore(state => state.context);
  const disposable = createFormSession(form); // nullSession instead?
  useEffect(() => {
    saveForm(form);
  }, [form]);

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
