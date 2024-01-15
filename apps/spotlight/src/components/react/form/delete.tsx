import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createBrowserFormService } from '@atj/form-service';

export const FormDelete = ({ formId }: { formId: string }) => {
  const navigate = useNavigate();
  const service = createBrowserFormService();
  const result = service.getForm(formId);
  if (!result.success) {
    return <div>Form {formId} not found.</div>;
  }
  const form = result.data;
  const deleteForm = () => {
    service.deleteForm(formId);
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
};
