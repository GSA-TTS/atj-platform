import React from 'react';
import { FormService } from '@atj/form-service';

import CreateNew from './CreateNew';
import { ManageFormsTable } from './ManageFormsTable';

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
    <>
      <header className="text-center tablet:margin-bottom-5">
        <h1>Create a New Form</h1>
        <p>
          Create or Import a form to start building your guided application.
        </p>
      </header>
      <CreateNew />
    </>
  );
}
