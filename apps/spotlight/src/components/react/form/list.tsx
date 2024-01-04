import React from 'react';
import { getFormListFromStorage } from '../../../lib/form-repo';

export const FormList = () => {
  const formIds = getFormListFromStorage(window.localStorage);
  return (
    <>
      <ul className="usa-list usa-list--unstyled">
        {formIds.map(formId => (
          <li>
            <a href="#">{formId}</a>
          </li>
        ))}
      </ul>
      <form
        //action={form.action}
        //method="post"
        onSubmit={event => {
          event.preventDefault();
          //createFormContextFromQuestions([]);
        }}
        className="usa-form usa-form--large"
      >
        <h2>Create new form</h2>
        {/*<label className="usa-label">
          Title
          <input id="summary-title" type="text" className="usa-input" />
        </label>
        <label className="usa-label">
          Description
          <input
            id="summary-description"
            type="textarea"
            className="usa-input"
          />
        </label>*/}
        <input className="usa-button" type="submit" value="Create form"></input>
      </form>
    </>
  );
};
