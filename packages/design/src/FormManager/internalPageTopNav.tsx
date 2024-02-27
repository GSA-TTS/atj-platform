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
  const isPreviewPage = location.pathname === `/${formId}`;
  const isEditPage = location.pathname.includes(`/${formId}/edit`);
  const isImportDocuments = location.pathname.includes(
    `/${formId}/import-document`
  );
  return (
    <div className="innerPageTopNavWrapper">
      <div className="innerPageTopNav">
        <ul className="grid-row">
          {(isPreviewPage || isEditPage || isImportDocuments) && (
            <li className={`grid-col ${isEditPage ? 'currentPage' : ''}`}>
              <Link to={`/${formId}/edit`}>
                {isImportDocuments ? 'Back to Edit Page' : 'Edit'}
              </Link>
            </li>
          )}
          {/* {(isPreviewPage || isEditPage) && (
            <li className={`grid-col ${isPreviewPage ? 'currentPage' : ''}`}>
              <Link to={`/forms/${formId}`}>Preview</Link>
            </li>
          )} */}
          <li className="grid-col">
            <Link to="/">View all Forms</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
