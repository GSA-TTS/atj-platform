import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { FormService } from '@atj/form-service';

export default function FormDelete({
  formId,
  formService,
}: {
  formId: string;
  formService: FormService;
}) {
  const navigate = useNavigate();
  const result = formService.getForm(formId);
  if (!result.success) {
    return <div>Form {formId} not found.</div>;
  }
  const form = result.data;
  const deleteForm = () => {
    formService.deleteForm(formId);
    navigate('/');
  };
  return (
    <div>
      <h1>Delete form</h1>
      <div>Are you sure you want to delete the form with id: `{formId}`?</div>
      <code>{JSON.stringify(form, null, 4)}</code>
      <div>
        <button onClick={deleteForm}>Delete form</button>
      </div>
    </div>
  );
}
