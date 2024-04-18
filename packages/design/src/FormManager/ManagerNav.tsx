import React from 'react';

export default function ManagerNav() {
  return (
    <div className="usa-step-indicator" aria-label="progress">
      <ol className="usa-step-indicator__segments">
        <li className="usa-step-indicator__segment usa-step-indicator__segment--complete">
          <span className="usa-step-indicator__segment-label">
            Upload <span className="usa-sr-only">completed</span>
          </span>
        </li>
        <li className="usa-step-indicator__segment usa-step-indicator__segment--complete">
          <span className="usa-step-indicator__segment-label">
            Create <span className="usa-sr-only">completed</span>
          </span>
        </li>
        <li
          className="usa-step-indicator__segment usa-step-indicator__segment--current"
          aria-current="true"
        >
          <span className="usa-step-indicator__segment-label">Configure</span>
        </li>
        <li className="usa-step-indicator__segment">
          <span className="usa-step-indicator__segment-label">
            Publish <span className="usa-sr-only">not completed</span>
          </span>
        </li>
      </ol>
      {/*<ul className="grid-row">
        {(isPreviewPage || isEditPage || isImportDocuments) && (
          <li className={`grid-col ${isEditPage ? 'currentPage' : ''}`}>
            <Link to={`/${formId}/edit`}>
              {isImportDocuments ? 'Back to Edit Page' : 'Edit'}
            </Link>
          </li>
        )}
        <li className="grid-col">
          <Link to="/">View all Forms</Link>
        </li>
      </ul>*/}
    </div>
  );
}
