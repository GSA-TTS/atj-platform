import React from 'react';
import { useNavigate } from 'react-router-dom';

import { service } from '@atj/forms';

export default function FormDelete({
  formId,
  formService,
}: {
  formId: string;
  formService: service.FormService;
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
    <div className="deleteFormPage grid-container">
      <h1>Delete form</h1>
      <h2>Are you sure you want to delete the form: <span className="text-italic">{result.data.summary.title}</span>?</h2>
      <p className="padding-bottom-3">
        <button className="usa-button" onClick={deleteForm}>
          Delete form
        </button>
      </p>
      <details><pre><code>{JSON.stringify(form, null, 4)}</code></pre></details>
    </div>
  );
}
