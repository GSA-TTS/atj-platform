import React, { PropsWithChildren, useReducer } from 'react';

import {
  DocumentFieldMap,
  addDocumentFieldsToForm,
  getDocumentFieldData,
  suggestFormDetails,
} from '@atj/documents';

import { onFileInputChangeGetFile } from '../../../lib/file-input';
import { FormView } from '../form/view';
import { Form, createFormContext, createPrompt } from '@atj/forms';
import { saveFormToStorage } from '../../../lib/form-repo';
import { useNavigate } from 'react-router-dom';

type State = {
  page: number;
  form: Form;
  documentFields?: DocumentFieldMap;
  previewForm?: Form;
};
type Action =
  | {
      type: 'SELECT_PDF';
      data: DocumentFieldMap;
    }
  | {
      type: 'PREVIEW_FORM';
      data: DocumentFieldMap;
    }
  | {
      type: 'GOTO_PAGE';
      page: number;
    };

export const DocumentImporter = ({
  formId,
  form,
}: {
  formId: string;
  form: Form;
}) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(
    (state: State, action: Action) => {
      if (action.type === 'SELECT_PDF') {
        return {
          page: 2,
          documentFields: action.data,
          form: state.form,
        };
      }
      if (action.type === 'PREVIEW_FORM') {
        return {
          page: 3,
          documentFields: action.data,
          form: state.form,
        };
      }
      if (action.type === 'GOTO_PAGE') {
        return {
          ...state,
          page: action.page,
          form: state.form,
        };
      }
      return state;
    },
    {
      page: 1,
      form: form,
    }
  );

  const selectDocumentByUrl = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const data = new Uint8Array(await blob.arrayBuffer());
    const fieldData = await getDocumentFieldData(data);
    const fieldInfo = suggestFormDetails(fieldData);
    dispatch({ type: 'SELECT_PDF', data: fieldInfo });
  };

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
          <button
            className="usa-button--unstyled"
            onClick={() => dispatch({ type: 'GOTO_PAGE', page: step })}
          >
            <span className="usa-step-indicator__segment-label">
              {title}
              {children}
              <span className="usa-sr-only">completed</span>
            </span>
          </button>
        </li>
      );
    }
  };

  const PDFFileSelect = () => {
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
                const fieldData = await getDocumentFieldData(fileDetails.data);
                const fieldInfo = suggestFormDetails(fieldData);
                dispatch({ type: 'SELECT_PDF', data: fieldInfo });
              })}
            />
          </div>
        </div>
        <label className="usa-label">
          Or use an example file, selected for testing purposes:
          <button
            className="usa-button--unstyled"
            onClick={async () => {
              selectDocumentByUrl(
                'sample-documents/ca-unlawful-detainer/ud105.pdf'
              );
            }}
          >
            sample-documents/ca-unlawful-detainer/ud105.pdf
          </button>
          <button
            className="usa-button--unstyled"
            onClick={async () => {
              selectDocumentByUrl(
                'sample-documents/alabama-name-change/ps-12.pdf'
              );
            }}
          >
            sample-documents/alabama-name-change/ps-12.pdf
          </button>
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
            type: 'PREVIEW_FORM',
            data: state.documentFields || {},
          });
        }}
      >
        {/*<EditFieldset fields={state.suggestedForm} />*/}
        <ul>
          {Object.values(state.documentFields || {}).map((field, index) => {
            return <li key={index}>{JSON.stringify(field)}</li>;
          })}
        </ul>
        <ButtonBar />
      </form>
    );
  };
  const PreviewFormPage = () => {
    const previewForm = addDocumentFieldsToForm(
      form,
      state.documentFields || {}
    );
    const formContext = createFormContext(previewForm);
    const prompt = createPrompt(formContext);
    return (
      <>
        <FormView prompt={prompt} />
        <form
          className="usa-form usa-form--large"
          onSubmit={event => {
            event.preventDefault();
            saveFormToStorage(window.localStorage, formId, previewForm);
            navigate(`/${formId}/edit`);
          }}
        >
          <ButtonBar />
        </form>
      </>
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
