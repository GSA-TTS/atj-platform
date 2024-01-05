import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteFormFromStorage,
  getFormFromStorage,
} from '../../../lib/form-repo';

export const FormDelete = ({ formId }: { formId: string }) => {
  const navigate = useNavigate();
  const form = getFormFromStorage(window.localStorage, formId);
  const deleteForm = () => {
    deleteFormFromStorage(window.localStorage, formId);
    navigate('/');
  };
  return (
    <div>
      <h1>Delete form</h1>
      <div>Are you sure you want to delete the form with id: `{formId}`?</div>
      <code>{JSON.stringify(form)}</code>
      <div>
        <button onClick={deleteForm}>Delete form</button>
      </div>
    </div>
  );
};
