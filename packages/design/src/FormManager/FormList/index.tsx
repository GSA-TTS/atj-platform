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
      <ManageFormsTable formListItems={result.data} />
      <CreateNew />
    </>
  );
}
