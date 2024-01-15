import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { createBrowserFormService } from '@atj/form-service';
import { createForm } from '@atj/forms';

export const FormList = () => {
  const navigate = useNavigate();
  const formService = createBrowserFormService();
  const formIds = formService.getFormList();
  return (
    <>
      <ul className="usa-list usa-list--unstyled">
        {formIds.map((formId, index) => (
          <li key={index}>
            {formId} <Link to={`/${formId}`}>View</Link> /{' '}
            <Link to={`/${formId}/edit`}>Edit</Link> /{' '}
            <Link to={`/${formId}/delete`}>Delete</Link>
          </li>
        ))}
      </ul>
      <form
        //action={form.action}
        //method="post"
        onSubmit={event => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const title = formData.get('summary-title')?.toString();
          const description = formData.get('summary-description')?.toString();
          if (!title || !description) {
            console.error('required fields not found');
            return;
          }
          const form = createForm({
            title,
            description,
          });
          const result = formService.addForm(form);
          if (result.success) {
            navigate(`/${result.data}/edit`);
          } else {
            console.error('Error saving form');
          }
        }}
        className="usa-form usa-form--large"
      >
        <h2>Create new form</h2>
        <label className="usa-label">
          Title
          <input
            id="summary-title"
            name="summary-title"
            type="text"
            className="usa-input"
            required
          />
        </label>
        <label className="usa-label">
          Description
          <input
            id="summary-description"
            name="summary-description"
            type="textarea"
            className="usa-input"
            required
          />
        </label>
        <input className="usa-button" type="submit" value="Create form"></input>
      </form>
    </>
  );
};
