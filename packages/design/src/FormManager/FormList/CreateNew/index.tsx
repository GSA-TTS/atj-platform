import React from 'react';
import { useNavigate } from 'react-router-dom';

import { SAMPLE_DOCUMENTS } from '@atj/forms';

import { useFormManagerStore } from '../../store';
import { onFileInputChangeGetFile } from './file-input';

export default function CreateNew() {
  const navigate = useNavigate();
  const actions = useFormManagerStore(state => ({
    context: state.context,
    createNewForm: state.createNewForm,
    createNewFormByPDFUpload: state.createNewFormByPDFUpload,
    createNewFormByPDFUrl: state.createNewFormByPDFUrl,
  }));
  return (
    <div className="usa-form-group">
      <button
        className="usa-button"
        onClick={async () => {
          const result = await actions.createNewForm();
          if (result.success) {
            navigate(`/${result.data}/upload`);
          }
        }}
      >
        New form
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
              const result =
                await actions.createNewFormByPDFUpload(fileDetails);
              if (result.success) {
                navigate(`/${result.data}/create`);
              }
            })}
          />
        </div>
      </div>
      <label className="usa-label">
        Or use an example file, selected for testing purposes
        {SAMPLE_DOCUMENTS.map((document, index) => (
          <SampleDocumentButton
            key={index}
            callback={async url => {
              const result = await actions.createNewFormByPDFUrl(url);
              if (result.success) {
                navigate(`/${result.data}/create`);
              }
            }}
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
