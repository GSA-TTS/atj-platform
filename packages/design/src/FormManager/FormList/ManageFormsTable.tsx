import React from 'react';
import { Link } from 'react-router-dom';

import { FormListItem } from '@atj/form-service/src/operations/get-form-list';

type ManageFormsTableProps = {
  formListItems: FormListItem[];
};

export const ManageFormsTable = ({ formListItems }: ManageFormsTableProps) => {
  return (
    <>
      {' '}
      <h1>Manage Forms</h1>
      <table className="usa-table usa-table--stacked">
        <thead>
          <tr>
            <th className="column1" scope="col">
              Form title
            </th>
            <th className="column2" scope="col">
              Description
            </th>
            <th className="column3" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {formListItems.map((form, index) => (
            <tr key={index}>
              <th data-label="Form title" scope="row">
                {form.title}
              </th>
              <td data-label="Description">{form.description}</td>
              <td data-label="Actions" className="actionColumn">
                {/* <span><Link to={`/${form.id}`}>Preview</Link></span> */}
                <span>
                  <Link to={`/${form.id}/create`}>Edit</Link>
                </span>
                <span>
                  <Link to={`/${form.id}/delete`}>Delete</Link>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
