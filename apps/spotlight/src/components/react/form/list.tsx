import React from 'react';
import {
  addFormToStorage,
  getFormListFromStorage,
} from '../../../lib/form-repo';
import { getFormEditUrl } from '../../../lib/routes';

export const FormList = () => {
  const formIds = getFormListFromStorage(window.localStorage);
  return (
    <>
      <ul className="usa-list usa-list--unstyled">
        {formIds.map(formId => (
          <li>
            <a href={getFormEditUrl(formId)}>{formId}</a>
          </li>
        ))}
      </ul>
      <form
        //action={form.action}
        //method="post"
        onSubmit={event => {
          event.preventDefault();
          addFormToStorage(window.localStorage, {
            title: 'My test form',
            description: 'This is a guided interview long description.',
          });
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
