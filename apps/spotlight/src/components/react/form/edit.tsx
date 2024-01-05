import React from 'react';
import { Link } from 'react-router-dom';
import { getFormFromStorage, saveFormToStorage } from '../../../lib/form-repo';
import { addQuestions } from '@atj/forms';

export const FormEdit = ({ formId }: { formId: string }) => {
  const form = getFormFromStorage(window.localStorage, formId);
  if (!form) {
    return 'Form not found';
  }
  return (
    <div>
      <h1>Edit form interface</h1>
      <div>Editing form {formId}</div>
      <code>{JSON.stringify(form)}</code>
      <ul>
        <li>
          <button
            className="usa-button usa-button--unstyled"
            onClick={() => {
              const newForm = addQuestions(form, [
                {
                  id: 'question-1',
                  text: 'Test question',
                  initial: 'initial value',
                  required: true,
                },
                {
                  id: 'question-2',
                  text: 'Test question 2',
                  initial: 'initial value 2',
                  required: true,
                },
              ]);
              saveFormToStorage(window.localStorage, formId, newForm);
              window.location.reload();
            }}
          >
            ***Append sample form fields***
          </button>
        </li>
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
