import React, { useState } from 'react';

import { extractFormFieldData, suggestFormDetails } from '@atj/documents';
import { SuggestedForm } from '@atj/documents/src/suggestions';

import { onFileInputChangeGetFile } from '../../lib/file-input';

export const DocumentImporter = () => {
  const state = useState<SuggestedForm>();
  return (
    <div className="usa-form-group">
      <div className="usa-hint" id="file-input-specific-hint">
        Select a PDF document to base an interview on
      </div>
      <label className="usa-label">
        Input accepts a single PDF file
        <input
          id="file-input-single"
          className="usa-file-input"
          type="file"
          name="file-input-single"
          aria-describedby="file-input-specific-hint"
          accept=".pdf"
          onChange={onFileInputChangeGetFile(async fileDetails => {
            const fieldData = await extractFormFieldData(fileDetails.data);
            const fieldInfo = suggestFormDetails(fieldData);
            console.log(fieldInfo);
          })}
        />
      </label>
    </div>
  );
};
