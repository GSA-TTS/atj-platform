import React from 'react';
import { Link } from 'react-router-dom';

import { FormService } from '@atj/form-service';
import { PDFFileSelect } from './PDFFileSelect';

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
      <ul className="usa-list usa-list--unstyled">
        {result.data.map((formId, index) => (
          <li key={index}>
            {formId} <Link to={`/${formId}`}>View</Link> /{' '}
            <Link to={`/${formId}/edit`}>Edit</Link> /{' '}
            <Link to={`/${formId}/delete`}>Delete</Link>
          </li>
        ))}
      </ul>
      <PDFFileSelect baseUrl={baseUrl} />
    </>
  );
}
