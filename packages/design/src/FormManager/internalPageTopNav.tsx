import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { type FormService } from '@atj/form-service';

export default function InnerPageTopNav({
  formId,
  formService,
}: {
  formId: string;
  formService: FormService;
}) {

  const location = useLocation();
  const result = formService.getForm(formId);
  if (!result.success) {
    return 'Form not found';
  }
  const form = result.data;
  const ButtonBar = () => {
    return (
      <button className="usa-button usa-button--unstyled">Save Changes</button>
    );
  };
  const isPreviewPage = location.pathname === (`/${formId}`);
  const isEditPage = location.pathname.includes(`/${formId}/edit`);
  const isImportDocuments = location.pathname.includes(`/${formId}/import-document`);
  return (
    <div className="innerPageTopNavWrapper">
      <div className="innerPageTopNav">
        <ul className="grid-row">
          {(isPreviewPage || isEditPage) && (
            <li className={`grid-col ${isPreviewPage? 'currentPage' : ''}`}>
              <Link to={`/${formId}`}>Preview</Link>
            </li>
          )}
          {(isPreviewPage || isEditPage || isImportDocuments) && (
            <li className={`grid-col ${isEditPage ? 'currentPage' : ''}`}>
              <Link to={`/${formId}/edit`}>{isImportDocuments ? 'Back to Edit Page' : 'Edit'}</Link>
            </li>
          )}
          <li className={`grid-col ${isImportDocuments ? 'currentPage' : ''}`}>
            <Link to={`/${formId}/import-document`}>Import</Link>
          </li>
          <li className="grid-col">
            <Link to="/">Manage Forms</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}