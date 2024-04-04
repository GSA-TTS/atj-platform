import React from 'react';

import { SAMPLE_DOCUMENTS } from '@atj/forms';
import { FormService } from '@atj/form-service';

import { onFileInputChangeGetFile } from './file-input';
import { useDocumentImporter } from './hooks';

export default function CreateNew({
  formService,
  baseUrl,
}: {
  formService: FormService;
  baseUrl: string;
}) {
  const { actions } = useDocumentImporter(formService, baseUrl);
  return (
    <div className="usa-form-group">
      <button
        className="usa-button usa-button--secondary"
        onClick={() => actions.createNewForm()}
      >
        Create empty form
      </button>
      <label
        className="usa-label"
        id="file-input-specific-hint"
        htmlFor="file-input-specific"
      >
        Select a single PDF file
      </label>
      <div className="usa-file-input">
        <div className="usa-sr-only" aria-live="polite">
          No files selected.
        </div>
        <div className="usa-file-input__target">
          <div className="usa-file-input__box"></div>
          <div className="usa-file-input__instructions" aria-hidden="true">
            Drag file here or{' '}
            <span className="usa-file-input__choose">choose from folder</span>
          </div>

          <input
            className="usa-file-input__input"
            id="file-input-specific"
            aria-describedby="file-input-specific-hint"
            type="file"
            accept=".pdf"
            onChange={onFileInputChangeGetFile(async fileDetails => {
              actions.stepOneSelectPdfByUpload(fileDetails);
            })}
          />
        </div>
      </div>
      <label className="usa-label">
        Or use an example file, selected for testing purposes
        {SAMPLE_DOCUMENTS.map((document, index) => (
          <SampleDocumentButton
            key={index}
            callback={actions.stepOneSelectPdfByUrl}
            documentPath={document.path}
          />
        ))}
      </label>
    </div>
  );
}

const SampleDocumentButton = ({
  callback,
  documentPath,
}: {
  callback: (path: string) => Promise<void>;
  documentPath: string;
}) => {
  return (
    <button
      className="usa-button--unstyled"
      onClick={async () => {
        await callback(documentPath);
      }}
    >
      {documentPath}
    </button>
  );
};
