import React from 'react';
import { onFileInputChangeGetFile } from './file-input';
import { useDocumentImporter } from './hooks';

export function PDFFileSelect({ baseUrl }: { baseUrl: string }) {
  const { actions } = useDocumentImporter(baseUrl);
  return (
    <div className="usa-form-group">
      <div className="usa-hint" id="file-input-specific-hint">
        Select a single PDF file
      </div>
      <div className="usa-file-input">
        <div className="usa-file-input__target">
          <div className="usa-file-input__instructions" aria-hidden="true">
            Drag file here or{' '}
            <span className="usa-file-input__choose">choose from folder</span>
          </div>
          <div className="usa-file-input__box"></div>
          <input
            className="usa-file-input__input"
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
        Or use an example file, selected for testing purposes:
        <button
          className="usa-button--unstyled"
          onClick={async () => {
            actions.stepOneSelectPdfByUrl(
              'sample-documents/ca-unlawful-detainer/ud105.pdf'
            );
          }}
        >
          sample-documents/ca-unlawful-detainer/ud105.pdf
        </button>
        <button
          className="usa-button--unstyled"
          onClick={async () => {
            actions.stepOneSelectPdfByUrl(
              'sample-documents/alabama-name-change/ps-12.pdf'
            );
          }}
        >
          sample-documents/alabama-name-change/ps-12.pdf
        </button>
      </label>
    </div>
  );
}
