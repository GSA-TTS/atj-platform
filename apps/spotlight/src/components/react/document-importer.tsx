import React, { PropsWithChildren, useReducer } from 'react';

import { extractFormFieldData, suggestFormDetails } from '@atj/documents';
import { SuggestedForm } from '@atj/documents/src/suggestions';

import { onFileInputChangeGetFile } from '../../lib/file-input';
import DynamicFormFieldset from './dynamic-form';

type State = { page: number; suggestedForm?: SuggestedForm };
type Action =
  | { type: 'SELECT_PDF'; data: SuggestedForm }
  | {
      type: 'SAVE_FORM_FIELDS';
      data: SuggestedForm;
    };

export const DocumentImporter = () => {
  const [state, dispatch] = useReducer(
    (state: State, action: Action) => {
      if (action.type === 'SELECT_PDF') {
        return {
          page: 2,
          suggestedForm: action.data,
        };
      }
      if (action.type === 'SAVE_FORM_FIELDS') {
        return {
          page: 3,
          suggestedForm: action.data,
        };
      }
      return state;
    },
    { page: 1 }
  );

  const Step: React.FC<
    PropsWithChildren<{ title: string; step: number; current: number }>
  > = ({ children, title, step, current }) => {
    if (current === step) {
      return (
        <li className="usa-step-indicator__segment usa-step-indicator__segment--current">
          <span className="usa-step-indicator__segment-label">
            {title}
            {children}
          </span>
        </li>
      );
    } else if (current < step) {
      return (
        <li className="usa-step-indicator__segment">
          <span className="usa-step-indicator__segment-label">
            {title}
            {children}
            <span className="usa-sr-only">not completed</span>
          </span>
        </li>
      );
    } else {
      return (
        <li className="usa-step-indicator__segment usa-step-indicator__segment--complete">
          <span className="usa-step-indicator__segment-label">
            {title}
            {children}
            <span className="usa-sr-only">completed</span>
          </span>
        </li>
      );
    }
  };

  const PDFFileSelect = () => {
    return (
      <div className="usa-form-group">
        <div className="usa-hint" id="file-input-specific-hint">
          Select a source PDF
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
              dispatch({ type: 'SELECT_PDF', data: fieldInfo });
            })}
          />
        </label>
      </div>
    );
  };

  const ButtonBar = () => {
    return (
      <div>
        <button className="usa-button">Next</button>
      </div>
    );
  };

  const BuildFormPage = () => {
    return (
      <form
        className="usa-form usa-form--large"
        onSubmit={event => {
          dispatch({
            type: 'SAVE_FORM_FIELDS',
            data: state.suggestedForm as SuggestedForm,
          });
        }}
      >
        <DynamicFormFieldset fields={state.suggestedForm as SuggestedForm} />
        <ButtonBar />
      </form>
    );
  };
  const PreviewFormPage = () => {
    return (
      <form
        className="usa-form usa-form--large"
        onSubmit={event => {
          dispatch({
            type: 'SAVE_FORM_FIELDS',
            data: state.suggestedForm as SuggestedForm,
          });
        }}
      >
        <DynamicFormFieldset fields={state.suggestedForm as SuggestedForm} />
        <ButtonBar />
      </form>
    );
  };

  return (
    <div>
      <h1>Create an interview from PDF</h1>
      <div className="usa-step-indicator" aria-label="progress">
        <ol className="usa-step-indicator__segments">
          <Step title="Select a PDF" step={1} current={state.page} />
          <Step title="Review document fields" step={2} current={state.page} />
          <Step title="Preview form" step={3} current={state.page} />
        </ol>
      </div>
      {state.page === 1 && <PDFFileSelect />}
      {state.page === 2 && <BuildFormPage />}
      {state.page === 3 && <PreviewFormPage />}
    </div>
  );
};
