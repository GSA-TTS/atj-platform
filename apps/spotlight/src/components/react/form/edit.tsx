import React from 'react';
import { Link } from 'react-router-dom';
import { getFormFromStorage } from '../../../lib/form-repo';

export const FormEdit = ({ formId }: { formId: string }) => {
  const form = getFormFromStorage(window.localStorage, formId);
  return (
    <div>
      <h1>Edit form interface</h1>
      <div>Editing form {formId}</div>
      <code>{JSON.stringify(form)}</code>
      <ul>
        <li>
          <Link to={`/${formId}`}>View form</Link>
        </li>
        <li>
          <Link to="/">View all forms</Link>
        </li>
      </ul>
    </div>
  );
};
