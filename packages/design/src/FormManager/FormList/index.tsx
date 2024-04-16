import React from 'react';
import { Link } from 'react-router-dom';

import { FormService } from '@atj/form-service';
import CreateNew from './CreateNew';

export default function FormList({
  baseUrl,
  formService,
}: {
  baseUrl: string;
  formService: FormService;
}) {
  const result = formService.getFormList();
  if (!result.success) {
    return <div>Error loading form list</div>;
  }
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
          {result.data.map((form, index) => (
            <tr key={index}>
              <th data-label="Form title" scope="row">
                {form.title}
              </th>
              <td data-label="Description">{form.description}</td>
              <td data-label="Actions" className="actionColumn">
                {/* <span><Link to={`/${form.id}`}>Preview</Link></span> */}
                <span>
                  <Link to={`/${form.id}/edit`}>Edit</Link>
                </span>
                <span>
                  <Link to={`/${form.id}/delete`}>Delete</Link>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateNew baseUrl={baseUrl} formService={formService} />
    </>
  );
}
