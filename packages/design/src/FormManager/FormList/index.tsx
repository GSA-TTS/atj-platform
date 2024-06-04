import React from 'react';
import { FormService } from '@atj/form-service';

import CreateNew from './CreateNew';

export default function FormList({
  formService,
}: {
  formService: FormService;
}) {
  const result = formService.getFormList();
  if (!result.success) {
    return <div>Error loading form list</div>;
  }
  return (
    <section className="usa-section grid-container">
      <div className="grid-row flex-justify-center">
        <div className="grid-col-12 tablet:grid-col-10 desktop:grid-col-7">
          <header className="text-center margin-bottom-1 tablet:margin-bottom-6">
            <h1 className="margin-bottom-1">Create a New Form</h1>
            <p className="margin-top-0">
              Create or Import a form to start building your guided application.
            </p>
          </header>
          <CreateNew />
        </div>
      </div>
    </section>
  );
}
