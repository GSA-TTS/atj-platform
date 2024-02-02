import React from 'react';
import { Link } from 'react-router-dom';

import { FormService } from '@atj/form-service';
import PDFFileSelect from './PDFFileSelect';

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
      <table className="usa-table">
        <caption>My forms</caption>
        <thead>
          <tr>
            <th scope="col">Form title</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {result.data.map((form, index) => (
            <tr key={index}>
              <th scope="row">{form.title}</th>
              <td>{form.description}</td>
              <td>
                <Link to={`/${form.id}`}>Preview</Link> /
                <Link to={`/${form.id}/edit`}>Edit</Link> /
                <Link to={`/${form.id}/delete`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PDFFileSelect baseUrl={baseUrl} formService={formService} />
    </>
  );
}
